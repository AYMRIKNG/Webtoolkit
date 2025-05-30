import React, { useEffect, useState } from 'react';


export default function Card({site}) {   
if (!site) return null;
  return (
   <a href={site.url} target="_blank">
    
            <div className='flex flex-col gap-y-2 h-fit cursor-pointer'> 
                 <div
    className="aspect-[16/10] rounded-sm bg-center bg-no-repeat bg-cover bg-zoom"
    style={{ backgroundImage: `url(${site.preview_image})` }}
  ></div>
                <h4 className='font-bold'>{site.name}</h4>
                <h5>{site.description}</h5>
            </div>
         
   </a>
  );
}


