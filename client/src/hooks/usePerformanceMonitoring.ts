import { useEffect } from 'react';
import { onCLS, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';
import { trpc } from '../lib/trpc';

/**
 * Hook to monitor Core Web Vitals and send metrics to the server
 * Tracks: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), 
 * TTFB (Time to First Byte), INP (Interaction to Next Paint)
 * Note: FID is deprecated in favor of INP
 */
export function usePerformanceMonitoring() {
  const reportMetric = trpc.performance.report.useMutation();

  useEffect(() => {
    // Function to send metric to server
    const sendToAnalytics = (metric: Metric) => {
      const data = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
        url: window.location.pathname,
        userAgent: navigator.userAgent,
      };

      // Send to server (fire and forget)
      reportMetric.mutate(data);
    };

    // Register Core Web Vitals observers
    onCLS(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);
  }, [reportMetric]);
}
