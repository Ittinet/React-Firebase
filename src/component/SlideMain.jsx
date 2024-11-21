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
            <div>
                <Swiper
                    modules={[Navigation, Pagination, EffectFade, EffectCoverflow, Autoplay]}
                    spaceBetween={0}
                    autoplay={{
                        delay: 5000
                    }}
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
                        <div className='max-h-[80vh] max-w-[100%] m-auto'><img className='h-full w-[100%] m-auto object-cover' src="https://www.mcshop.com/media/.renditions/wysiwyg/homepage/banner/mcshop-Spot-Club-2880x1280.jpg?auto=webp&format=pjpg&quality=85" alt="" /></div></SwiperSlide>
                    <SwiperSlide><div className='max-h-[80vh] max-w-[100%] m-auto'><img className='h-full w-[100%] m-auto object-cover' src="https://www.mcshop.com/media/wysiwyg/mcshop-Gold_selvedge-2880_1.jpg?auto=webp&format=pjpg&quality=85" alt="" /></div></SwiperSlide>
                    <SwiperSlide><div className='max-h-[80vh] max-w-[100%] m-auto'><img className='h-full w-[100%] m-auto object-cover' src="https://www.mcshop.com/media/.renditions/wysiwyg/homepage/banner/mcshop-ONLINE-EX-2880x1280.jpg?auto=webp&format=pjpg&quality=85" alt="" /></div></SwiperSlide>

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