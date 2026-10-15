import React, { useState, useEffect } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  fileSizeKb?: number;
  dimensions?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  priority = true,
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state whenever src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-stone-900 border border-stone-200/80 ${aspectRatioClass}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => {
            console.warn('Image failed to load, switching to resilient fallback:', src);
            setHasError(true);
          }}
          className={`w-full h-full object-cover block transition-transform duration-300 ${className}`}
        />
      ) : (
        /* Themed futuristic AI editorial fallback plate if network error occurs */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-radial from-[#1e293b] to-[#0a0f1d] text-stone-200 select-none">
          <svg
            className="w-12 h-12 text-[#38BDF8] mb-3 opacity-90 animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18" />
            <path d="M3 12h18" />
            <circle cx="12" cy="12" r="3" fill="#0284C7" />
          </svg>
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest text-[#38BDF8] bg-sky-950/80 border border-sky-800 rounded">
            Future AI Horizon Plate
          </span>
          <p className="text-xs text-stone-200 mt-2 max-w-sm font-editorial italic line-clamp-2">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
};
