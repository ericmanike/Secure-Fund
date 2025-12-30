"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Cloud({ src, alt, width, height }: { src?: string; alt: string; width?: number; height?: number }) {
  return (
    <CldImage
       alt={alt}
      src={src || "cld-sample-5"}  // Use this sample image or upload your own via the Media Library
      width={width} // Transform the image: auto-crop to square aspect_ratio
      height={height}
      crop={{
        type: 'auto',
        source: true
      }}
    />
  );
}