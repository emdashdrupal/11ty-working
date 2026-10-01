export default async (request, context) => {
  const accept = request.headers.get("accept") || "";

  // Check if client explicitly requests text/markdown
  if (accept.includes("text/markdown")) {
    const url = new URL(request.url);
    let mdPath = url.pathname;

    if (mdPath.endsWith("/")) {
      mdPath += "index.md";
    } else if (!mdPath.endsWith(".md") && !mdPath.includes(".")) {
      mdPath += "/index.md";
    }

    if (mdPath !== url.pathname) {
      const mdUrl = new URL(mdPath, request.url);
      try {
        const response = await context.rewrite(mdUrl);
        if (response && response.status === 200) {
          const newHeaders = new Headers(response.headers);
          newHeaders.set("content-type", "text/markdown; charset=utf-8");
          return new Response(response.body, {
            status: 200,
            statusText: response.statusText,
            headers: newHeaders
          });
        }
      } catch (err) {
        // Fall back to standard response if rewrite fails
      }
    }
  }

  return context.next();
};
