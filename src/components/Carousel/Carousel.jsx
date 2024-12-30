// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import bgimg1 from '../../assets/hero first.jpg'
import bgimg2 from '../../assets/hero second.jpg'
import bgimg3 from '../../assets/hero third.jpg'
import Slide from '../Slide/Slide'

export default function Carousel() {
  return (
    <div className=' mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Explore The World With Your Beloved Person Forever'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Explore The World With Your Beloved Person Forever'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Explore The World With Your Beloved Person Forever'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
