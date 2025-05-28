import { useState } from 'react'
import Navbar from './component/navbar';



function App() {
  const [authPopupOpen, setAuthPopupOpen] = useState(false);

  return (
    <section className='flex bg-black h-screen'>
    <Navbar/>
 
    </section>
  


  )
}

export default App


