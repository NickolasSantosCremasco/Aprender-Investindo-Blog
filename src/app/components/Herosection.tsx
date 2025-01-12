'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import { Navigation, Pagination } from "swiper/modules";
export default function HeroSection() {
    
    const slides = [
        'https://img.freepik.com/fotos-gratis/mulheres-felizes-de-encomendar-produtos-de-clientes-empresarios-que-trabalham-em-casa-em-um-backg-branco_1150-8107.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
        'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
        'https://img.freepik.com/fotos-gratis/empresarios-em-branco_1385-2446.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid'
    ];

   

    return (
       <section className=" max-w-screen-xl mx-auto bg-sky-950">
        {/* Sliders */}
         <Swiper 
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable:true}}
            spaceBetween={50} 
            slidesPerView={1}
            loop={true}
            className="w-1/2 float-right"
        >
            {/* Iterar sobre o array dos slides */}
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <img 
                        src={slide} 
                        alt={`Slide ${index + 1}`} 
                        className="w-1/2 h-80 object-cover" 
                    />
                </SwiperSlide>
            ))}
         </Swiper>
       </section>
    )
}