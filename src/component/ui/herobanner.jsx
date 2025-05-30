import React, { useEffect, useState } from 'react';


export default function HeroBanner({image}) {   

  return (
    <div className='w-full rounded-sm h-2/5'>
      <img src={image} alt="" srcset="" className='h-full object-cover w-full rounded-md' />
    </div>
  );
}


