'use client';

import { cn } from '@/lib/utils';

interface AdSlotProps {
  className?: string;
  size?: 'leaderboard' | 'rectangle' | 'skyscraper' | 'banner';
  label?: string;
}

const sizeClasses = {
  leaderboard: 'min-h-[90px] max-w-[728px]',
  rectangle: 'min-h-[250px] max-w-[300px]',
  skyscraper: 'min-h-[600px] max-w-[160px]',
  banner: 'min-h-[60px] max-w-[468px]',
};

/**
 * Ad Slot Component
 *
 * Placeholder for Google Ads / AdSense.
 * Replace the inner content with actual ad code when deploying.
 *
 * For Google AdSense:
 * <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" />
 */
export function AdSlot({ className, size = 'rectangle', label }: AdSlotProps) {
  // Hide ad slots until actual ad code is configured
  const hasAdCode = false; // Set to true when Google AdSense is configured

  if (!hasAdCode) return null;

  return (
    <div
      className={cn(
        'ad-slot flex items-center justify-center',
        sizeClasses[size],
        'w-full mx-auto',
        className
      )}
      data-ad-slot={size}
      aria-label="Advertisement"
    >
      <div className="text-center text-xs text-zinc-600">
        <span className="uppercase tracking-wider">{label || 'Advertisement'}</span>
      </div>

      {/* Google AdSense placeholder */}
      {/* Uncomment and configure when deploying:
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_AD_CLIENT_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </div>
  );
}

/**
 * In-Article Ad Slot
 * Placed between content sections with proper spacing
 */
export function InArticleAd({ className }: { className?: string }) {
  return (
    <div className={cn('my-8', className)}>
      <AdSlot size="rectangle" label="Sponsored" />
    </div>
  );
}

/**
 * Sidebar Ad Slot
 */
export function SidebarAd({ className }: { className?: string }) {
  return (
    <div className={cn('sticky top-24', className)}>
      <AdSlot size="skyscraper" />
    </div>
  );
}
