import { useSwiper } from 'swiper/react'

const SwiperNavButtonsPrev = () => {
    const swiper = useSwiper();
    return (
        <div className='swiper-nav-btns-prev'>
            <button onClick={() => swiper.slidePrev()}>Prev</button>
        </div>
    )
}

export default SwiperNavButtonsPrev