import React, { useEffect, useState } from 'react';

export default function Navbar() {   

  return (
    <nav className='h-14 w-full flex items-center bg-red-500 px-4'>
      <ul className='flex justify-between w-full'>
        <li className='flex'> 
            LOGO
            <h1>WEBTOOLKIT</h1></li>
        <li> DYNAMIQUE</li>
        <li className='flex gap-x-4'>
            filtre
            <input type="search" name="" id="" />
            <a href="https://www.linkedin.com/in/aymerickng/"><h4>Linkedin</h4></a>
            <a target='_blank' href="https://github.com/AYMRIKNG"><h4>Github</h4></a>
            <a target='_blank' href="https://ay-one.vercel.app"><h4>Portfolio</h4></a>
        </li>
      </ul>
    </nav>
  );
}


