export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = "https://api.mwapi.dev" + url.pathname + url.search;

    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
      redirect: "follow",
    });

    // Set Host header to match origin
    newRequest.headers.set("Host", "api.mwapi.dev");

    const response = await fetch(newRequest);

    // Clone response so headers can be modified if needed (e.g. CORS)
    const newResponse = new Response(response.body, response);
    return newResponse;
  },
};
