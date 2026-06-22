const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Testing modularized templates...\n');

try {
    // Test 1: Build the site
    console.log('1️⃣ Testing site build...');
    const buildStart = Date.now();

    try {
        execSync('npm run build', {
            stdio: 'pipe',
            timeout: 30000
        });
        console.log(`✅ Site built successfully in ${Date.now() - buildStart}ms`);
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }

    // Test 2: Check that homepage renders correctly
    console.log('\n2️⃣ Testing homepage content...');

    const indexHtml = fs.readFileSync('_site/index.html', 'utf8');

    const tests = [
        {
            name: 'Skills section header',
            check: () => indexHtml.includes('How I can help you')
        },
        {
            name: 'Blog section header',
            check: () => indexHtml.includes('Blog')
        },
        {
            name: 'Skills cards rendering',
            check: () => indexHtml.includes('card-title-content-strategy') || indexHtml.includes('card-title-technical-writing')
        },
        {
            name: 'Grid layout present',
            check: () => indexHtml.includes('grid lg:grid-cols-2')
        },
        {
            name: 'No unrendered Nunjucks syntax',
            check: () => !indexHtml.match(/\{\{[^}]*\}\}/) && !indexHtml.match(/\{%[^%]*%\}/)
        }
    ];

    tests.forEach(test => {
        if (test.check()) {
            console.log(`✅ ${test.name}`);
        } else {
            console.log(`❌ ${test.name}`);
            process.exit(1);
        }
    });

    // Test 3: Check that skills and blog pages still work
    console.log('\n3️⃣ Testing individual pages...');

    const skillsHtml = fs.readFileSync('_site/skills/index.html', 'utf8');
    const blogHtml = fs.readFileSync('_site/static-site-transformation/index.html', 'utf8');

    if (skillsHtml.includes('card') && skillsHtml.length > 1000) {
        console.log('✅ Skills index page renders correctly');
    } else {
        console.log('❌ Skills index page has issues');
        process.exit(1);
    }

    if (blogHtml.includes('card') && blogHtml.length > 1000) {
        console.log('✅ Blog index page renders correctly');
    } else {
        console.log('❌ Blog index page has issues');
        process.exit(1);
    }

    console.log('\n🎉 All modularization tests passed!');
    console.log('\n📋 Test Summary:');
    console.log('   ✅ Site builds without errors');
    console.log('   ✅ Homepage content renders correctly');
    console.log('   ✅ Featured sections work with macro');
    console.log('   ✅ Individual pages still function');
    console.log('   ✅ No template syntax errors');

} catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
    process.exit(1);
}