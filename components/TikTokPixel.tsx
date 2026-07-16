"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    ttq: {
      page: () => void;
      track: (event: string, params?: Record<string, unknown>) => void;
      load: (pixelId: string) => void;
      [key: string]: unknown;
    };
  }
}

const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

function TikTokPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.page();
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (typeof window === "undefined" || !window.ttq) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Find the nearest interactive element
      const interactiveEl = target.closest("a, button, [role='button'], input[type='submit'], input[type='button']");
      
      if (interactiveEl) {
        const text = interactiveEl.textContent?.trim() || "";
        const id = interactiveEl.id || "";
        const href = interactiveEl.getAttribute("href") || "";
        const role = interactiveEl.getAttribute("role") || interactiveEl.tagName.toLowerCase();
        
        // Truncate text if it's too long (e.g. nested layouts)
        const cleanText = text.replace(/\s+/g, ' ').substring(0, 50);

        window.ttq.track("ClickButton", {
          button_name: cleanText || id || href || role,
          button_id: id || undefined,
          button_link: href || undefined,
          button_type: role,
        });
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}

export default function TikTokPixel() {
  return (
    <>
      {/* TikTok Pixel Code Start */}
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                n=document.createElement("script");
                n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n,e)
              };
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />
      {/* TikTok Pixel Code End */}
      <TikTokPageTracker />
    </>
  );
}
