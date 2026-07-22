'use client';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface AdSlotProps {
  className?: string;
  size?: 'leaderboard' | 'rectangle' | 'skyscraper' | 'banner' | 'auto';
  slot?: string;
}

const sizeStyles = {
  leaderboard: { height: '90px', maxWidth: '728px' },
  rectangle: { height: '250px', maxWidth: '300px' },
  skyscraper: { height: '600px', maxWidth: '160px' },
  banner: { height: '60px', maxWidth: '468px' },
  auto: { height: 'auto', maxWidth: '100%' },
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSlot({ className, size = 'auto', slot }: AdSlotProps) {
  const style = sizeStyles[size];

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={cn('ad-slot w-full mx-auto', className)}>
      <ins
        className="adsbygoogle block"
        style={{
          display: 'block',
          height: style.height,
          maxWidth: style.maxWidth,
          width: '100%',
        }}
        data-ad-client="ca-pub-1812733940760212"
        data-ad-slot={slot || 'auto'}
        data-ad-format={size === 'auto' ? 'auto' : 'rectangle'}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function InArticleAd({ className }: { className?: string }) {
  return (
    <div className={cn('my-8', className)}>
      <AdSlot size="rectangle" slot="auto" />
    </div>
  );
}

export function SidebarAd({ className }: { className?: string }) {
  return (
    <div className={cn('sticky top-24', className)}>
      <AdSlot size="skyscraper" slot="auto" />
    </div>
  );
}
