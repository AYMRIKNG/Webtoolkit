import React from 'react';

export default function CardMini({ site }) {
  if (!site || !site.url) return null;

  const logoUrl = site.logo || `https://www.google.com/s2/favicons?sz=64&domain=${new URL(site.url).hostname}`;

  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer">
      <div className="flex gap-x-2 p-2 hover:bg-zinc-800 rounded-md">
        <img src={logoUrl} alt="logo" className="h-14 w-14 rounded-md" />
        <div className='my-auto'>
          <h4 className="text-sm font-semibold">{site.name}</h4>
          <h5 className="text-xs text-zinc-400 truncate">{site.description}</h5>
        </div>
      </div>
    </a>
  );
}
