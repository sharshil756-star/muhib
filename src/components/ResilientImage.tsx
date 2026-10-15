import React, { useState } from 'react';

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
  fileSizeKb,
  dimensions,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-stone-200/70 border border-stone-200 ${aspectRatioClass}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          width={800}
          height={600}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-200 ${className}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-stone-200">
          <p className="font-mono-tabular text-xs uppercase tracking-widest text-stone-400 mb-2">
            Aethelgard Archival Plate
          </p>
          <p className="font-editorial text-lg italic max-w-md text-stone-100">{alt}</p>
        </div>
      )}

      {fileSizeKb && (
        <div className="absolute bottom-2.5 right-2.5 bg-stone-950/75 backdrop-blur-xs text-stone-100 px-2 py-0.5 text-[11px] font-mono-tabular">
          {dimensions ? `${dimensions} · ` : ''}
          {fileSizeKb} KB · ALT VERIFIED
        </div>
      )}
    </div>
  );
};
