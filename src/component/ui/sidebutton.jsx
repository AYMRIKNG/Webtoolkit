import React, { useEffect, useState } from 'react';


export default function Sidebutton({image,tittle,onClick}) {   

  return (
     <div onClick={onClick} className='flex gap-x-1 h-fit py-2 w-full text-white hover:bg-zinc-800 hover:rounded-md cursor-pointer' >
                <img className='h-6 w-6 items-center' src={image} alt="" srcset="" />
                <h4 className=' items-center'>{tittle}</h4>
     </div>
  );
}


