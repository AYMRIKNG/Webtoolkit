import React, { useState } from 'react';
import CardMini from './cardmobile';

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== '') {
      setIsOpen(true); // Si une lettre est entrée → ouvrir
    }
  };

  return (
    <div
      className='w-72 relative'
      onMouseLeave={() => setIsOpen(false)} // Ferme quand la souris sort
    >
      <input
        className='w-full p-1 px-3 text-white bg-black border-[1px] rounded-sm border-zinc-800 outline-none focus:border-lime-300'
        type="search"
        placeholder='Chercher un site web'
        value={inputValue}
        onClick={() => setIsOpen(true)}     // Ouvre au focus
        onChange={handleInputChange}        // Ouvre quand on tape
      />

      {isOpen && (
        <div className='flex flex-col bg-black b min-h-72 gap-y-1 border-[1px] border-zinc-800 p-2 border-t-0 ga rounded-br-sm rounded-bl-sm w-96 absolute z-10 top-full left-0'>
       
          <CardMini/>
          <CardMini/>
        </div>
      )}
    </div>
  );
}
