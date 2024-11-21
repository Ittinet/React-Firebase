import { useSwiper } from 'swiper/react'

const SwiperNavButtonsNext = () => {
    const swiper = useSwiper();
    return (
        <div className='swiper-nav-btns-next'>
            <button onClick={() => swiper.slideNext()}>Next</button>
        </div>
    )
}

export default SwiperNavButtonsNext