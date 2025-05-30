import { useState } from 'react'
import Navbar from './component/navbar';
import Sidemeu from './component/sidemenu';
import Tabcontent from './component/tabcontent';



function App() {
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState('Explore');
  return (
    <section className='flex flex-col bg-black h-screen overflow-hidden'>
    <Navbar selectedCategory={selectedCategory}/>
      <section className='flex h-full '>
      <Sidemeu onCategorySelect={setSelectedCategory} />
      <Tabcontent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </section>

    </section>
  


  )
}

export default App


