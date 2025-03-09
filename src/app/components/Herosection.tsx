'use client'

import { useRouter } from "next/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import { Autoplay, Navigation} from "swiper/modules";
export default function HeroSection() {
    
    const slides = [
        {
            image: 'https://img.freepik.com/fotos-gratis/mulheres-felizes-de-encomendar-produtos-de-clientes-empresarios-que-trabalham-em-casa-em-um-backg-branco_1150-8107.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
            text: 'Transforme Sua Vida Financeira!',
            subtext: 'Molde sua realidade e inspire pessoas com seus conhecimentos'
        },

        {
            image:'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
            text: 'Aprenda a construir sua liberdade financeira!',
            subtext:'Aprenda a iniciar sua jornada no mercado de ações e faça da sua vida um exemplo para os mais novos'
        },

        {
            image: 'https://img.freepik.com/fotos-gratis/empresarios-em-branco_1385-2446.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
            text: 'Transforma sonhos em realidade com investimentos!',
            subtext: 'Começe já a investir para mudar não só a sua realidade mas como a de todos presentes na sua vida'
        }
    
       
    ];

   
    const router = useRouter();

    return (
       <section className=" max-w-screen-xl mx-auto bg-sky-950 shadow-2xl p-5">
        {/* Sliders */}
         <Swiper 
            modules={[Navigation, Autoplay]}
            navigation
            pagination={{ clickable:true}}
            spaceBetween={50} 
            slidesPerView={1}
            autoplay={{delay: 3000, disableOnInteraction:false}}
            loop={true}
            className="w-full mySwiper"
        >
            {/* Iterar sobre o array dos slides */}
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="flex">
                    <div className="relative h-96">
                         {/* Texto sobreposto */}
                         <div className="absolute inset-0  bg-opacity-50 flex items-center justify-start left-10">
                            <div className="px-8 max-w-md text-center md:text-left">
                                <p className="text-yellow-300">Aprender Investindo</p>
                                <h2 className="text-4xl font-bold mb-4 sm:text-white text-">{slide.text}</h2>
                                <p className="text-lg">{slide.subtext}</p>
                                <button onClick={() => router.push('/pages/contact')} className="bg-amber-400 pl-4 pr-4 p-2 rounded-xl text-sky-800 mt-4">
                                    Começe Agora!
                                </button>
                            </div>
                        </div>
                        {/* Imagem de fundo */}
                        <img 
                            src={slide.image} 
                            alt={`Slide ${index + 1}`} 
                            className="sm:w-1/2 w-full h-full object-cover sm:float-right sm:rounded-full rounded-2xl sm:p-10 p-1 shadow-slate-50" 
                        />
                       
                    </div>
                </SwiperSlide>
            ))}
         </Swiper>
       </section>
    )
}