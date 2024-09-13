import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import './style.css';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

const Slider = () => {
    return (
        <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
        // pagination={true}
        modules={[Autoplay,EffectCube]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/abc1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/abc2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/abc3.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/abc4.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/abc5.png" />
        </SwiperSlide>
      </Swiper>
    );
};

export default Slider;
