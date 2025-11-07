// src/lib/adFunnelConfig.ts
import { supabase } from "@/integrations/supabase/client";

/** In-memory fallback (if DB empty) */
const FALLBACK = {
  pages: [
    { id: 1, countdown: 5, ads: [] },
    { id: 2, countdown: 5, ads: [] },
    { id: 3, countdown: 5, ads: [] },
    { id: 4, countdown: 5, ads: [] },
  ],
};

export function loadConfig() {
  // Minimal: read a JSON blob from config table key "ad_pages"
  // If not present, return FALLBACK
  // For now we’ll just synchronously return fallback; you can expand this to async DB load in Admin.
  return FALLBACK;
}

export async function updatePageVisit(page: number) {
  // optional: store visit
  await supabase.from("ad_visits").insert({ page, ts: new Date().toISOString() });
}

export async function updateAdClick(adId: string) {
  // optional: store click
  await supabase.from("ad_clicks").insert({ ad_id: adId, ts: new Date().toISOString() });
}
