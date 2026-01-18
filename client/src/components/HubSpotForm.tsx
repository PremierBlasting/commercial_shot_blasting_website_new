import { useEffect, useRef } from "react";

interface HubSpotFormProps {
  portalId?: string;
  formId?: string;
  region?: string;
  className?: string;
}

/**
 * HubSpot Form Component
 * Embeds a HubSpot form using their JavaScript API
 */
export function HubSpotForm({
  portalId = "147618128",
  formId = "b6f4f2e0-afe6-4351-9a63-5a9663bf6f37",
  region = "eu1",
  className = "",
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCreated = useRef(false);

  useEffect(() => {
    // Prevent double creation in React strict mode
    if (formCreated.current) return;

    const createForm = () => {
      if (containerRef.current && (window as any).hbspt) {
        // Clear any existing content
        containerRef.current.innerHTML = "";
        
        (window as any).hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: containerRef.current,
          css: "",
          cssClass: "hubspot-form-custom",
        });
        formCreated.current = true;
      }
    };

    // Check if HubSpot script is already loaded
    if ((window as any).hbspt) {
      createForm();
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if ((window as any).hbspt) {
          clearInterval(checkInterval);
          createForm();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);

      return () => clearInterval(checkInterval);
    }
  }, [portalId, formId, region]);

  return (
    <div 
      ref={containerRef} 
      className={`hubspot-form-container ${className}`}
    />
  );
}
