export const detectDeviceType = () => {
  if (typeof window === "undefined") return "ssr";
  const { userAgent } = window.navigator;
  const isMobile = /Mobile/.test(userAgent);
  const isTablet = /Tablet/.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  if (isDesktop) return "desktop";
  return "unknown";
};
