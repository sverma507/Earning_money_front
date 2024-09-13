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
          <img src={require("./solar all products.png")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("./ev-charger-2.jpg")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("./ev-charger.png")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("./solar-controllers.webp")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("./solar-tuvel.webp")} />
        </SwiperSlide>
      </Swiper>
    );
};

export default Slider;
