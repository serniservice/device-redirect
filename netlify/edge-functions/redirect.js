export default async (request, context) => {
  const url = new URL(request.url);

  // 1. Target URLs (edit these)
  const MOBILE_URL = "https://www.mobile.com";
  const DESKTOP_URL = "https://www.desk.com";

  // 2. High-speed detection using headers
  const ua = request.headers.get("user-agent") || "";
  const secChUaMobile = request.headers.get("sec-ch-ua-mobile");

  // Modern browsers send `?1` for mobile
  let isMobile = secChUaMobile === "?1";

  // Fallback to standard User-Agent header
  if (!isMobile) {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
  }

  const targetBase = isMobile ? MOBILE_URL : DESKTOP_URL;

  // Preserve query parameters (e.g. ?utm_source=... or ?ref=...)
  const destination = `${targetBase}${url.search}`;

  // 302 Temporary Redirect (use 301 only if you are 100% sure it will never change)
  return Response.redirect(destination, 302);
};
