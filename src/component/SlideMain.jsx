import banner1 from '../assets/img1/banner/2.jpg'
import banner2 from '../assets/img1/banner/parallax.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, EffectCoverflow, EffectFade, Navigation, Pagination } from 'swiper/modules';


const SlideMain = () => {
    return (
        <div>
            <div className='shadow-lg'>
                <Swiper
                    modules={[Navigation, Pagination, EffectFade, EffectCoverflow, Autoplay]}
                    spaceBetween={0}
                    // autoplay={{
                    //     delay: 5000
                    // }}
                    pagination={{
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next', // ปุ่มถัดไป
                        prevEl: '.swiper-button-prev'
                    }}
                    slidesPerView={1}
                    loop={true}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div className='w-full max-h-[80vh] m-auto'>
                            <div className='BannerSlide-1 grid grid-cols-4 px-5'>
                                <div className='col-span-2 flex justify-center items-center ml-16 mb-26 flex-col'>
                                    <p className='text-3xl font-bold'>Shop in Dream</p>
                                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptatum.</h1>
                                    <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
                                    <button className='bg-teal-700 text-white font-bold px-2 py-1 mt-5 text-lg'>Shop Now!</button>
                                </div>
                                <div className='absolute w-full h-full bg-white top-0 opacity-20 z-10'>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide><div className='w-full max-h-[80vh] m-auto'>
                        <div className='BannerSlide-2 grid grid-cols-4 px-5'>
                            <div className='col-span-2 flex justify-center items-center ml-16 mb-26 flex-col'>
                                <p className='text-3xl font-bold'>Shop in your Dream</p>
                                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptatum.</h1>
                                <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
                                <button className='bg-orange-600 px-2 py-1 mt-5 text-lg'>Shop Now!</button>
                            </div>
                            <div className='absolute w-full h-full bg-white top-0 opacity-20 z-10'>
                            </div>
                        </div>
                    </div></SwiperSlide>

                    <SwiperSlide><div className='w-full max-h-[80vh] m-auto'>
                        <div className='BannerSlide-3 grid grid-cols-4 px-5'>
                            <div className='col-span-2 flex justify-center items-center ml-16 mb-26 flex-col'>
                                <p className='text-3xl font-bold'>Shop in your Dream</p>
                                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptatum.</h1>
                                <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
                                <button className='bg-orange-600 px-2 py-1 mt-5 text-lg'>Shop Now!</button>
                            </div>
                            <div className='absolute w-full h-full bg-white top-0 opacity-20 z-10'>
                            </div>
                        </div>
                    </div></SwiperSlide>

                    {/* เพิ่มลูกศรเพื่อการนำทาง */}
                    <div className='swiper-pagination'></div>
                    <div className='swiper-button-next'></div>
                    <div className='swiper-button-prev'></div>
                </Swiper>


            </div>
        </div>
    )
}

export default SlideMain