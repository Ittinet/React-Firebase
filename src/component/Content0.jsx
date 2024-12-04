import React from 'react'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import category1 from '../assets/productimg/category-1.jpg'
import category2 from '../assets/productimg/category-2.jpg'
import category3 from '../assets/productimg/category-3.jpg'
import category4 from '../assets/productimg/category-4.jpg'
import category5 from '../assets/productimg/category-5.jpg'
import category6 from '../assets/productimg/category-8.jpg'

const Content0 = () => {
    return (
        <div>
            <div className='mt-8 mx-6'>
                <p className='mb-5'>Popular Category</p>
                <div className='w-full'>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={20}
                        slidesPerView={6}
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
                            0: { slidesPerView: 2 },
                            620: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                            1280: { slidesPerView: 6 },
                        }}
                    >
                        <SwiperSlide>
                            <div className='bg-white max-w-[230px] mx-auto  p-3 border border-gray-200 rounded-2xl'>
                                <div>
                                    <img className="w-full object-cover rounded-2xl" src={category1} alt="" />
                                </div>
                                <div className="mt-4 px-1">
                                    <p className='text-center'>Shirt</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='bg-white max-w-[230px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div>
                                    <img className="w-full object-cover rounded-2xl" src={category2} alt="" />
                                </div>
                                <div className="mt-4 px-1">
                                    <p className='text-center'>Bags</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='bg-white max-w-[230px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div>
                                    <img className="w-full object-cover rounded-2xl" src={category3} alt="" />
                                </div>
                                <div className="mt-4 px-1">
                                    <p className='text-center'>Shoes</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='bg-white max-w-[230px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div>
                                    <img className="w-full object-cover rounded-2xl" src={category4} alt="" />
                                </div>
                                <div className="mt-4 px-1">
                                    <p className='text-center'>Cap</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='bg-white max-w-[230px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div>
                                    <img className="w-full object-cover rounded-2xl" src={category5} alt="" />
                                </div>
                                <div className="mt-4 px-1">
                                    <p className='text-center'>Boot</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='bg-white max-w-[230px] mx-auto p-3 border border-gray-200 rounded-2xl'>
                                <div>
                                    <img className="w-full object-cover rounded-2xl" src={category6} alt="" />
                                </div>
                                <div className="mt-4 px-1">
                                    <p className='text-center'>Hat</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>


                </div>

            </div>

        </div >
    )
}

export default Content0