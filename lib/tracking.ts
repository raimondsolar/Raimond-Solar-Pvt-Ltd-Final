// Tracking helper for Raimond Solar
// Integrates GTM-MDZX962M and AW-17980567026

export type TrackingEventName =
  | "Form Submission"
  | "Button Click"
  | "WhatsApp Click"
  | "Phone Click"
  | "Calculator Usage"
  | "Chat Open"
  | "Chat Message Sent";

// Declare global window types
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Initializes tracking in the browser (GTM and Google Ads removed as per user request).
 */
export function initTracking() {
  if (typeof window === "undefined") return;
  console.log("[Raimond Tracking] Local tracking system initialized successfully (GTM & Google Ads disabled).");
}

/**
 * Tracks custom events, pushes to local logger and diagnostic tools.
 */
export function trackEvent(eventName: TrackingEventName, details: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  console.log(`[Raimond Tracking] Event Logged: "${eventName}"`, details);

  // Initialize dataLayer locally for compatibility but without GTM tracking IDs
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName.replace(/\s+/g, "_").toLowerCase(),
    ...details,
  });
}
