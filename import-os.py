import os
import re
import yaml

# Compiled regular expression pattern for extracting frontmatter (between ---)
FRONTMATTER_RE = re.compile(r'^---\n(.*?)\n---', re.DOTALL)

# Get list of markdown files from uploads directory
uploads_dir = 'content/blog/static-site-transformation'
files = [os.path.join(uploads_dir, f) for f in os.listdir(uploads_dir) if f.endswith('.md')]

# Also include the blog index to resolve 'Blog' parent references
files.append('content/blog/index.md')

print("=== Navigation Validation Script ===\n")

# Function to extract frontmatter and navigation data
def parse_frontmatter(file_path):
    """Parses frontmatter from a file and returns navigation data."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract frontmatter (between ---)
        frontmatter_match = FRONTMATTER_RE.search(content)
        if not frontmatter_match:
            return None

        frontmatter_content = frontmatter_match.group(1)
        try:
            # Try to parse as YAML
            parsed_fm = yaml.safe_load(frontmatter_content)
        except yaml.YAMLError as e:
            print(f"YAML parsing error in {os.path.basename(file_path)}: {e}")
            return None

        # Check for eleventyNavigation
        if not parsed_fm or 'eleventyNavigation' not in parsed_fm:
            return None

        nav_data = parsed_fm['eleventyNavigation']
        return {
            'file': os.path.basename(file_path),
            'key': nav_data.get('key'),
            'parent': nav_data.get('parent')
        }
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

# Collect all navigation entries
all_navigation_entries = []
for full_path in files:
    result = parse_frontmatter(full_path)
    if result:
        all_navigation_entries.append(result)

print("All Navigation Entries Found:")
for entry in all_navigation_entries:
    print(f"  File: {entry['file']}")
    print(f"    Key: {entry['key']}")
    print(f"    Parent: {entry['parent']}")
    print()

# Identify missing parent keys
all_keys = {entry['key'] for entry in all_navigation_entries if entry['key']}
missing_parents = []

print("Checking for Missing Parent Keys:")
for entry in all_navigation_entries:
    parent_key = entry['parent']
    if parent_key and parent_key not in all_keys:
        missing_parents.append({
            'file': entry['file'],
            'parent_referenced': parent_key,
            'key_used': entry['key']
        })
        print(f"  ❌ {entry['file']} references non-existent parent: '{parent_key}'")

if not missing_parents:
    print("  ✓ All parent references are valid")
else:
    print("\n⚠️  Issues Found:")
    for issue in missing_parents:
        print(f"  - {issue['file']}: References parent '{issue['parent_referenced']}' which doesn't exist as a navigation key")

# Check for circular references by looking at self-references
print("\nChecking for Self-References:")
self_references = []
for entry in all_navigation_entries:
    if entry['key'] and entry['parent'] == entry['key']:
        self_references.append(entry)
        print(f"  ❌ {entry['file']} has itself as parent")

if not self_references:
    print("  ✓ No self-references found")
else:
    print("\n⚠️  Self-reference issues detected!")

# Summary
print(f"\n=== SUMMARY ===")
print(f"Total pages with eleventyNavigation: {len(all_navigation_entries)}")
print(f"Unique keys defined: {len(all_keys)}")
if missing_parents:
    print(f"Issues found: {len(missing_parents)} page(s) with invalid parent references")
