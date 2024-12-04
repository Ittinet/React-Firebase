import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ShoppingCart } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import product1 from "../assets/images1/product-1.jpg"
import women2 from "../assets/img/products/women2.jpg"
import women3 from "../assets/img/products/women3.jpg"
import women4 from "../assets/img/products/women4.jpg"
import product2 from "../assets/images1/product-4.jpg"
import product3 from "../assets/images1/product-6.jpg"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

import category1 from '../assets/productimg/category-1.jpg'
import category2 from '../assets/productimg/category-2.jpg'
import category3 from '../assets/productimg/category-3.jpg'
import category4 from '../assets/productimg/category-4.jpg'
import category5 from '../assets/productimg/category-5.jpg'
import category6 from '../assets/productimg/category-8.jpg'

const Content2 = () => {

    return (
        <div>
            <div className='mt-8 mx-6'>
                <p className='mb-5'>Popular Category</p>
                <div className='w-full '>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={20}
                        slidesPerView={4}
                        loop={true}
                        navigation
                        // pagination={{
                        //     clickable: true,
                        //     type: 'bullets',
                        //     bulletActiveClass: 'swiper-pagination-bullet-active',
                        // }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            620: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        <SwiperSlide>
                            <div className='bg-white max-w-[350px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div className='relative'>
                                    <img className="w-full object-cover rounded-2xl" src={category6} alt="" />
                                    <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                        <p className='text-[10px] text-center'>Hot</p>
                                    </div>
                                </div>
                                <div className="mt-4 px-1 relative">
                                    <p className="text-[10px] text-gray-600 mb-2">Clothing</p>
                                    <h1 className="text-[16px] font-extrabold mb-2">Colorful Pattern Shirts</h1>
                                    <div className="flex mb-3"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                    <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">$238</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                    <button className='absolute right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                </div>
                            </div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='bg-white max-w-[350px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div className='relative'>
                                    <img className="w-full object-cover rounded-2xl" src={category2} alt="" />
                                    <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                        <p className='text-[10px] text-center'>Hot</p>
                                    </div>
                                </div>
                                <div className="mt-4 px-1 relative">
                                    <p className="text-[10px] text-gray-600 mb-2">Clothing</p>
                                    <h1 className="text-[16px] font-extrabold mb-2">Colorful Pattern Shirts</h1>
                                    <div className="flex mb-3"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                    <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">$238</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                    <button className='absolute right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                </div>
                            </div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='bg-white max-w-[350px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div className='relative'>
                                    <img className="w-full object-cover rounded-2xl" src={category3} alt="" />
                                    <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                        <p className='text-[10px] text-center'>Hot</p>
                                    </div>
                                </div>
                                <div className="mt-4 px-1 relative">
                                    <p className="text-[10px] text-gray-600 mb-2">Clothing</p>
                                    <h1 className="text-[16px] font-extrabold mb-2">Colorful Pattern Shirts</h1>
                                    <div className="flex mb-3"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                    <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">$238</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                    <button className='absolute right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                </div>
                            </div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='bg-white max-w-[350px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div className='relative'>
                                    <img className="w-full object-cover rounded-2xl" src={category1} alt="" />
                                    <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                        <p className='text-[10px] text-center'>Hot</p>
                                    </div>
                                </div>
                                <div className="mt-4 px-1 relative">
                                    <p className="text-[10px] text-gray-600 mb-2">Clothing</p>
                                    <h1 className="text-[16px] font-extrabold mb-2">Colorful Pattern Shirts</h1>
                                    <div className="flex mb-3"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                    <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">$238</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                    <button className='absolute right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                </div>
                            </div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='bg-white max-w-[350px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div className='relative'>
                                    <img className="w-full object-cover rounded-2xl" src={category5} alt="" />
                                    <div className='bg-red-300 text-white px-2 py-1 w-10 absolute top-2 left-2 rounded-full'>
                                        <p className='text-[10px] text-center'>Hot</p>
                                    </div>
                                </div>
                                <div className="mt-4 px-1 relative">
                                    <p className="text-[10px] text-gray-600 mb-2">Clothing</p>
                                    <h1 className="text-[16px] font-extrabold mb-2">Colorful Pattern Shirts</h1>
                                    <div className="flex mb-3"><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /><FontAwesomeIcon className="text-yellow-500 text-[10px]" icon={faStar} /></div>
                                    <div className="flex gap-3 items-center"><p className="font-bold text-teal-700">$238</p><p><s className="text-[13px] font-bold text-gray-400">$250</s></p></div>
                                    <button className='absolute right-3 bottom-2 bg-emerald-50 border  rounded-full p-2.5'><ShoppingCart size={20} /></button>
                                </div>
                            </div>

                        </SwiperSlide>


                    </Swiper>


                </div>

            </div>

        </div >
    )
}

export default Content2