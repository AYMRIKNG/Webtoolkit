import React from 'react';

export default function Card({ site }) {
  if (!site) return null;

  const hasImage = site.preview_image && site.preview_image.trim() !== '';
  const fallbackLogo = site.logo && site.logo.trim() !== '';

  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col gap-y-2 h-fit cursor-pointer">
        <div className="aspect-[16/10] rounded-sm bg-center bg-no-repeat bg-cover bg-zoom overflow-hidden flex items-center justify-center">
          {hasImage ? (
            <img
              src={site.preview_image}
              alt={site.name}
              className="w-full h-full object-cover"
            />
          ) : fallbackLogo ? (
            <img
              src={site.logo}
              alt={`${site.name} logo`}
              className="h-12 object-contain"
            />
          ) : (
            <div className="text-sm text-zinc-400">Aucune image</div>
          )}
        </div>
        <h4 className="font-bold">{site.name}</h4>
        <h5>{site.description}</h5>
      </div>
    </a>
  );
}
