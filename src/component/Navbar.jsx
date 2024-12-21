import { Link } from 'react-router-dom';
import { CircleUserRound, ShoppingCart, MoonStar } from 'lucide-react';
import { useState, useEffect } from 'react';
import account from '../assets/images/account.png'
import usefbStore from '../Store/store';
import Login from '../Login';
import CartSlide from './User/CartSlide';
import usedataStore from '../store/datastore';

const Navbar = () => {

  // กำหนด state สำหรับเปิด/ปิดเมนู
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setdarkMode] = useState(false);
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false)

  const init = usefbStore(state => state.init)
  const user = usefbStore(state => state.user)
  const stopListening = usefbStore(state => state.stopListening)
  const logout = usefbStore(state => state.logout)

  // let popup = null
  // if (isPopupOpen) {
  //   popup = <Login isClosePopup={() => { setisPopupOpen(false) }} isPopupOpen={isPopupOpen} />
  // } else {
  //   popup = null
  // }


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode])

  useEffect(() => {
    init()

    return () => {
      stopListening()
    }
  }, [init, stopListening])


  const handdleLogout = async () => {
    await logout()
    console.log('Logut Complete')
  }

  const toggleDarkMode = () => {
    setdarkMode(!darkMode);
  }

  // ฟังก์ชันที่จะใช้ในการ toggle เมนู
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartOpen = () => {
    setisCartOpen(true)
  }

  const handleCartClose = () => {
    setisCartOpen(false)
  }


  return (
    <div className="items-center relative">



      <nav className="bg-white border-gray-200 dark:bg-gray-900 relative shadow-lg z-50">
        {/* Logo */}
        <div className="max-w-full flex  items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>

          {/* icon */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* <button onClick={toggleDarkMode} className={`mr-4 p-1 rounded-full ${!darkMode ? 'bg-gray-200' : 'text-white'}`}>
              <MoonStar />
            </button> */}

            {
              user ? <div className='flex gap-2 '>
                <button onClick={handleCartOpen} className='flex items-center'>
                  <ShoppingCart size={25} />
                </button>

                <button type="button" className="flex text-sm  rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={account} alt="user photo" />
                </button>

                <button onClick={handdleLogout} type='button' className='bg-red-400 px-1 rounded-md text-sm'>Logout</button>
              </div> : <button onClick={() => setisPopupOpen(!isMenuOpen)} className='text-[12px] pt-1 hover:text-orange-400'>เข้าสู่ระบบ/สมัครสมาชิก</button>
            }

            <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>

            </button>
          </div>

          {/* Menu */}
          <div className="hidden items-center justify-between w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to={'/'} className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-blue-500" >Home</Link>
              </li>
              <li>
                <Link to={'/shop'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Submenu */}
          <div className={`${isMenuOpen ? "translate-x-0" : "translate-x-full"} top-3 right-0 z-10 fixed transition-all duration-500 ease-in-out items-center justify-between md:hidden`}>
            <div className='flex justify-between items-start bg-gray-300'>
              <a href='#' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Menu</a>
              <button onClick={toggleMenu} className='font-bold text-2xl px-3 text-black'>x</button>
            </div>

            <ul className={`flex flex-col font-medium p-4 md:p-0 border border-gray-100 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}>
              <li>
                <Link to={'/'} className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-blue-500" >Home</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
              </li>
            </ul>
          </div>

        </div>
      </nav >
      <Login isClosePopup={() => { setisPopupOpen(false) }} isPopupOpen={isPopupOpen} />
      {/* {isCartOpen && <CartSlide onclose={handleCartClose} isCartOpen={isCartOpen} />} */}
      <CartSlide onclose={handleCartClose} isCartOpen={isCartOpen} />

    </div >
  )
}

export default Navbar