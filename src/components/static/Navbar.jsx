import { useContext, useState } from 'react'
import logo from '../../assets/imgs/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { user } from '../../Context/UserContext'
import { UserCart } from '../../Context/CaryContext'

export default function Nav() {
    const [OpenNav,setOpenNav] = useState('hidden')
    const [CloseBTN,setCloseBTN] = useState('hidden')
    const [OpenBTN,setOpenBTN] = useState('inline-flex')
    const [openMenu,setopenMenu] = useState('flex')
    const [closeMenu,setcloseMenu] = useState('hidden')
    const [Menu,setMenu] = useState('hidden')
    const [searchQuery, setSearchQuery] = useState('');
    let {token,LogOut} = useContext(user)
    let {NumOfItems} = useContext(UserCart)
    const router = useNavigate()
    function OpenNavbuttn() {
        setOpenNav('block')
        setCloseBTN('inline-flex')
        setOpenBTN('hidden')
    }
    function CloseClose() {
        setOpenNav('hidden')
        setCloseBTN('hidden')
        setOpenBTN('inline-flex')
    }
    function openMenuNav() {
        setopenMenu('hidden')
        setcloseMenu('inline-flex')
        setMenu('block')
    }
    function closeMenuNav () {
        setopenMenu('inline-flex')
        setcloseMenu('hidden')
        setMenu('hidden')
    }
    function handleSearch(e) {      
      e.preventDefault()
        if (searchQuery.trim().toLowerCase() !== "") {
          console.log("helloo");
          return router(`/Searching/${searchQuery}`)
        }  
          else return router("/")
    }

  return <>


<nav className=" border-gray-200 bg-white shadow-md  fixed top-0 right-0 left-0 z-50">
  <div className=" container flex flex-wrap items-center justify-between mx-auto py-2">
    <Link to={`/`}  className="w-64 sm:w-1/4 flex items-center space-x-3 rtl:space-x-reverse">
     <img src={logo} className='w-[80%] lg:w-[60%]' alt="" />
    </Link>
    <button onClick={()=>{
OpenNavbuttn()
    }} data-collapse-toggle="navbar-dropdown" type="button" className={`${OpenBTN} items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 `} aria-controls="navbar-dropdown" aria-expanded="false">
    <i className="fa-solid fa-bars-staggered text-3xl"></i>

    </button>
    <button onClick={()=>{
   CloseClose()
    }} data-collapse-toggle="navbar-dropdown" type="button" className={`${CloseBTN} items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 00 ay-700 gray-600`} aria-controls="navbar-dropdown" aria-expanded="false">
    <i className="fa-solid fa-bars-staggered text-3xl"></i>

    </button>
    <div className={`${OpenNav} w-full md:block md:w-auto`} id="navbar-dropdown">
        
      <ul className="flex md:items-center flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  md: -700">
        {token ? <>
          <li>
        <form
                        onSubmit={(e)=>{
                        handleSearch(e)
                        }}
                        className="flex md:hidden  items-center gap-2 p-1 ml-auto"
                    >
                        <input
                            type="text"
                            placeholder="Search By Product Name ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border flex-grow border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-vip focus:border-vip w-64"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-vip text-white rounded-md hover:bg-vip-dark transition"
                        >
                            <i className="fa-solid fa-search"></i>
                        </button>
                    </form>
        </li>
        
          <li>
          <NavLink to={`/`} className="block py-2 px-3 text-gray-900  rounded md:bg-transparent  md:p-0  hover:text-gray-500 transition-colors duration-500" aria-current="page">Home</NavLink>
        </li>
        </> : ""}
      
        {
          token ? <>
            <li>
          <NavLink to={`/Products`} className="transition-colors duration-500 block py-2 px-3 text-gray-900 rounded   md:p-0  ay-700 white md:ansparent hover:text-gray-500">Products</NavLink>
        </li>
        <li>
          <NavLink to={`/Category`} className="transition-colors duration-500 block py-2 px-3 text-gray-900 rounded   md:p-0  ay-700 white md:ansparent hover:text-gray-500 ">Category</NavLink>
        </li>
        <li>
          <NavLink to={`/Brands`} className="transition-colors duration-500 block py-2 px-3 text-gray-900 rounded   md:p-0  ay-700 white md:ansparent hover:text-gray-500 ">Brands</NavLink>
        </li>
        <li>
        <form
                        onSubmit={(e)=>{
                        handleSearch(e)
                        }}
                        className="hidden md:flex  items-center gap-2 p-1 ml-auto"
                    >
                        <input
                            type="text"
                            placeholder="Search By Product Name ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border flex-grow border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-vip focus:border-vip w-64"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-vip text-white rounded-md hover:bg-vip-dark transition"
                        >
                            <i className="fa-solid fa-search"></i>
                        </button>
                    </form>
        </li>

          </> : ""
        }
          <li>
            <button onClick={()=>{
                openMenuNav()
            }} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`transition-colors duration-500 ${openMenu} items-center gap-3 w-full py-2 px-3 text-gray-900 rounded   md:p-0 md:w-auto hover:text-gray-500 `}>Account <i className="fa-solid fa-sort-down -translate-y-[2px]"></i></button>
            <button onClick={()=>{
                closeMenuNav()
            }} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`transition-colors duration-500 ${closeMenu} relative items-center gap-3 w-full py-2 px-3 text-gray-900 rounded   md:p-0 md:w-auto hover:text-gray-500 `}>Account <i className="fa-solid fa-sort-up translate-y-[6px]"></i></button>
            <div id="dropdownNavbar" className={`z-10 ${Menu} absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-fit`}>
                <ul className="py-2 text-sm text-gray-700 00 " aria-labelledby="dropdownLargeButton">

                  {token ? <>
                    <li>
                    <Link to={`/allorders`} className="transition-colors duration-500 block px-4 py-2 hover:bg-gray-100 ay-600 white hover:text-gray-500">Dashboard</Link>
                  </li>
                  <li className='relative flex items-center justify-between px-5 pt-4'>
          <NavLink to={`/Cart`} className="transition-colors duration-500 block py-2 px-3 text-gray-900 rounded   md:p-0  ay-700 white md:ansparent hover:text-gray-500 "><i class="fa-solid fa-cart-shopping "></i> {NumOfItems === 0 ? "" : <span className='bg-vip text-white rounded-full w-6 h-5 flex justify-center items-center absolute -top-[2px] left-[16px] text-sm'>{NumOfItems}</span>}</NavLink>
          <NavLink to={`/BestProducts`} className="transition-colors duration-500 block py-2 px-3 text-gray-900 rounded   md:p-0  ay-700 white md:ansparent hover:text-gray-500 "><i class="fa-solid fa-heart "></i> {NumOfItems === 0 ? "" : <span className='bg-vip text-white rounded-full w-6 h-5 flex justify-center items-center absolute -top-[2px] left-[16px] text-sm'>{NumOfItems}</span>}</NavLink>
        </li>
                  
        </> : ""}

                </ul>

                {!token ? <>
                  <div className="py-1">
                  <NavLink to={`/auth/Login`} className="transition-colors duration-500 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ay-600 00 white hover:text-gray-500">Login</NavLink>
                </div>
                <div className="py-1">
                  <NavLink to={`/auth/SignUp`} className="transition-colors duration-500 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ay-600 00 white hover:text-gray-500">Sign Up</NavLink>
                </div>
                </> : <>
                
                <div className="py-1">
                  <NavLink to={`/auth/Login`} onClick={()=>{
                    LogOut()
                  }} className="transition-colors duration-500 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ay-600 00 white hover:text-gray-500">Sign out</NavLink>
                </div>
                </>}


            </div>
        </li>
      </ul>
    </div>
  </div>
</nav>




  
  
  </>
}