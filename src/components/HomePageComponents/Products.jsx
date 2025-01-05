import React, { useContext, useState } from 'react';
import UseAllProducts from '../../CustomeHooks/UseAllProducts';
import { Helmet } from "react-helmet";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { UserCart } from '../../Context/CaryContext';
import { WishlistContext } from '../../Context/Wishlist';

export default function ProductsHome() {
  const [sortType, setSortType] = useState('lowest');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortClass, setSortClass] = useState("hidden");
  const [sortDesign, setsortDesign] = useState("hidden");
  const [OpenOrClose, setOpenOrClose] = useState(false);
  const [OpenOrCloseDesign, setOpenOrCloseDesign] = useState(false);
  const [design, setDesign] = useState(" col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 ");
  const itemsPerPage = 20;

  const { data, isLoading } = UseAllProducts();
  const { AddToCart } = useContext(UserCart);
  const { AddProductToFev, DeleteProductFromFev } = useContext(WishlistContext);
  const Products = data?.data?.data;

  // ترتيب المنتجات
  const sortedProducts = React.useMemo(() => {
    if (!Products) return [];
    switch (sortType) {
      case 'lowest':
        return [...Products].sort((a, b) => a.price - b.price);
      case 'highest':
        return [...Products].sort((a, b) => b.price - a.price);
      case 'old':
        return [...Products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'modern':
        return [...Products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return Products;
    }
  }, [Products, sortType]);

  // تقسيم المنتجات حسب الصفحة
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  // حساب عدد الصفحات
  const totalPages = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Helmet>
          <title>Fresh Home</title>
        </Helmet>
        <div className='grid grid-cols-12 gap-5 mt-10'>
          <div className='col-span-12 flex relative'>
            <button className='addBtn me-3' onClick={() => {
              if (OpenOrClose) {
                console.log("yes");

                setSortClass("hidden")
                setOpenOrClose(false)
              }
              else {
                console.log("no ");
                setSortClass("flex")
                setOpenOrClose(true)
              }
            }} >Click me to Sort</button>
            <button className='addBtn' onClick={() => {
              if (OpenOrCloseDesign) {
                setsortDesign("hidden")
                setOpenOrCloseDesign(false)
              }
              else {
                console.log("no ");
                setsortDesign("flex")
                setOpenOrCloseDesign(true)
              }
            }} >Click me to Change Design</button>
            <div className={`flex-grow gap-2 ${sortDesign} mt-14 flex-col absolute   left-[47.5%] lg:mt-8 lg:left-[11%] z-10 bg-white py-5 rounded-lg`}>
              <p onClick={()=>{setDesign(" col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 ")}} className='font-serif font-bold cursor-pointer hover:bg-slate-100 duration-300 transition-colors flex-grow px-3'>default</p>
              <p onClick={()=>{setDesign(" col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 ")}}  className='font-serif font-bold cursor-pointer hover:bg-slate-100 duration-300 transition-colors flex-grow px-3'>2 - items</p>
              <p onClick={()=>{setDesign(" col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4 ")}} className='font-serif font-bold cursor-pointer hover:bg-slate-100 duration-300 transition-colors flex-grow px-3'>3 - items</p>
              <p onClick={()=>{setDesign(" col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3 ")}} className='font-serif font-bold cursor-pointer hover:bg-slate-100 duration-300 transition-colors flex-grow px-3'>4 - items</p>
              <p onClick={()=>{setDesign(" col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 ")}} className='font-serif font-bold cursor-pointer hover:bg-slate-100 duration-300 transition-colors flex-grow px-3'>6 - items</p>
            </div>
            <div className={`flex-grow gap-2 ${sortClass}  flex-col absolute top-14 lg:top-8 z-10 bg-white p-5 rounded-lg`}>
              <div className='flex items-center gap-2 cursor-pointer '>
                <input
                  id='lowest'
                  type="radio"

                  name="sort"
                  className='cursor-pointer rounded-full w-3 h-3'
                  checked={sortType === 'lowest'}
                  onChange={() => setSortType('lowest')}
                />
                <label htmlFor="lowest" className='cursor-pointer'>Lowest price</label>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <input
                  id='highest'
                  type="radio"

                  name="sort"
                  className='cursor-pointer rounded-full w-3 h-3'
                  checked={sortType === 'highest'}
                  onChange={() => setSortType('highest')}
                />
                <label htmlFor="highest" className='cursor-pointer'>Highest price</label>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <input
                  id='old'
                  type="radio"

                  name="sort"
                  className='cursor-pointer rounded-full w-3 h-3'
                  checked={sortType === 'old'}
                  onChange={() => setSortType('old')}
                />
                <label htmlFor="old" className='cursor-pointer'>Old</label>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <input
                  id='modern'
                  type="radio"

                  name="sort"
                  className='cursor-pointer rounded-full w-3 h-3'
                  checked={sortType === 'modern'}
                  onChange={() => setSortType('modern')}
                />
                <label htmlFor="modern" className='cursor-pointer'>Modern</label>
              </div>
            </div>
          </div>
          {
            paginatedProducts?.map((product) => {
              const isFavorite = localStorage.getItem("Best")?.includes(product.id);
              return (
                <div key={product.id} className={` ${design}  relative shadow-md rounded-sm overflow-hidden`}>
                  <div className='relative rounded-md overflow-hidden group'>
                    <img src={product.imageCover} className='w-full object-cover' alt="" />
                    <div className='flex justify-center items-center gap-5 absolute top-0 left-0 right-0 bottom-0 bg-slate-100 opacity-0 group-hover:opacity-95 transition-all duration-500 cursor-pointer'>
                      <Link to={`/ProductsDetails/${product.id}/${product.category.name}`}>
                        <span className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'>
                          <i className="fa-solid fa-eye text-white"></i>
                        </span>
                      </Link>
                      <span
                        className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'
                        onClick={() => { AddToCart(product.id) }}
                      >
                        <i className="fa-solid fa-cart-arrow-down text-white"></i>
                      </span>
                      {isFavorite ?
                        <span
                          onClick={() => { DeleteProductFromFev(product.id) }}
                          className='flex justify-center items-center w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-500'
                        >
                          <i className="fa-solid fa-bookmark text-white"></i>
                        </span> :
                        <span
                          onClick={() => { AddProductToFev(product.id) }}
                          className='flex justify-center items-center w-12 h-12 bg-vip rounded-full hover:bg-green-800 transition-all duration-500'
                        >
                          <i className="fa-solid fa-bookmark text-white"></i>
                        </span>
                      }
                    </div>
                  </div>
                  <div className='px-3 flex flex-col '>
                    <div className=''><span className='font-semibold text-sm text-vip '>{product.category.name}</span></div>
                    <div className=''><span className='font-semibold text-lg line-clamp-1'>{product.title}</span></div>
                  </div>
                  <div className='flex flex-wrap justify-between px-3'>
                    <p className='font-bold'><span className='text-vip font-semibold'>{product.price}</span> EGP</p>
                    <p className='font-semibold'><i className='fa-solid fa-star text-yellow-400'></i> {product.ratingsAverage}</p>
                  </div>
                  <span className='block ps-3 text-sm mb-3 text-gray-600 '>{new Date(product.createdAt).toDateString()}</span>
                </div>
              );
            })
          }
        </div>
        <div className='flex justify-center items-center gap-2 mt-5'>
          <button
            className='addBtn'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className='addBtn'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
