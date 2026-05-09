'use client'

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CodeSnippetValue from "./Slide/CodeSnippetValue";
import TerminalDashboard from "./Slide/TerminalDashboard";
import DataSchema from "./Slide/DataSchema";

// Importando módulos necessários do Swiper e GSAP
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";

export default function HeroSection() {
    
    // Novas Copy focada em Empreendedorismo/Fullstack
    const slides = [
        {
            title: 'Do Código ao Mercado.',
            subtitle: 'Construindo o Futuro das Startups com Stacks Modernas (Build in Public).',
            brand: 'Aprender Investindo Tech',
            brandColor: 'text-amber-400',
            buttonText: 'Ver Meus Projetos',
            targetPath: '/projetos'
        },
        {
            title: 'Automação que Escala.',
            subtitle: 'Como uso Python e n8n para otimizar processos e reduzir custos operacionais de MVP.',
            brand: 'Aprender Investindo Tech',
            brandColor: 'text-amber-400',
            buttonText: 'Solicitar Consultoria Técnica',
            targetPath: '/consultoria'
        },
        {
            title: 'ADS Unicsul & Aplicação Real.',
            subtitle: 'Relatórios semanais de como aplico arquitetura de software da faculdade no meu próprio SaaS.',
            brand: 'Aprender Investindo Tech',
            brandColor: 'text-amber-400',
            buttonText: 'Ver Blog do Desenvolvedor',
            targetPath: '/blog'
        }
    ];

    const codes = [
        {},
    ]

    const router = useRouter();
    const swiperRef = useRef(null); 
    const heroContentRefs = useRef<Array<HTMLDivElement | null>>([]);

    // GSAP: Animação de Entrada (Intro)
    useEffect(() => {
        // Selecionamos todos os elementos dentro do slide ativo atual
        const currentSlideContent = heroContentRefs.current[swiperRef.current?.swiper.activeIndex || 0];
        if (!currentSlideContent) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

        tl.fromTo(currentSlideContent.querySelector('.hero-brand'), 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1 }, "+=0.2"
        )
        tl.fromTo(currentSlideContent.querySelector('.hero-title'), 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1 }, "-=0.5"
        )
        tl.fromTo(currentSlideContent.querySelector('.hero-subtitle'), 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1 }, "-=0.5"
        )
        tl.fromTo(currentSlideContent.querySelector('.hero-button'), 
            { y: 30, opacity: 0, scale: 0.9 }, 
            { y: 0, opacity: 1, scale: 1 }, "-=0.5"
        );

    }, []); // Roda apenas na montagem

    // GSAP: Animação na Mudança de Slide
    const onSlideChangeAnimation = (swiper: any) => {
        const activeIndex = swiper.activeIndex;
        const currentContent = heroContentRefs.current[activeIndex];
        
        if (!currentContent) return;

        // Resetamos a opacidade antes de reanimar
        gsap.set(currentContent.querySelectorAll('.hero-brand, .hero-title, .hero-subtitle, .hero-button'), { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });

        tl.fromTo(currentContent.querySelector('.hero-brand'), 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1 }, "+=0.1"
        )
        tl.fromTo(currentContent.querySelector('.hero-title'), 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1 }, "-=0.4"
        )
        tl.fromTo(currentContent.querySelector('.hero-subtitle'), 
            { y: 25, opacity: 0 }, 
            { y: 0, opacity: 1 }, "-=0.4"
        )
        tl.fromTo(currentContent.querySelector('.hero-button'), 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1 }, "-=0.4"
        );
    };

    return (
        // Alteração de Cor: De sky-950 para um tech-dark (#0a0b10)
        <section className="w-full bg-[#0a0b10] text-white overflow-hidden border-b border-gray-800 shadow-2xl">
            <div className="max-w-screen-xl mx-auto p-5 md:py-16">
                
                {/* Sliders */}
                 <Swiper 
                    ref={swiperRef}
                    modules={[Navigation, Autoplay, Pagination]} // Adicionado Pagination de volta
                    navigation
                    pagination={{ clickable:true }}
                    spaceBetween={50} 
                    slidesPerView={1}
                    autoplay={{delay: 5000, disableOnInteraction:false}} // Aumentei o delay para leitura
                    loop={true}
                    onSlideChangeTransitionStart={onSlideChangeAnimation} // Hook do Swiper para GSAP
                    className="w-full mySwiper"
                >
                    {/* Iterar sobre o array dos slides com a nova copy */}
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center">
                            
                            {/* Container do Conteúdo com Ref para GSAP */}
                            <div 
                                ref={el => heroContentRefs.current[index] = el}
                                className="w-full over flex flex-col md:flex-row items-center gap-10 md:gap-16 h-[450px] md:h-[400px]"
                            >
                                
                                {/* Texto do Slide (Esquerda em Desktop) */}
                                <div className="flex-1 text-center md:text-left p-2">
                                    <p className={`hero-brand text-xl font-medium tracking-wide mb-2 ${slide.brandColor}`}>
                                        {slide.brand}
                                    </p>
                                    <h2 className="hero-title text-5xl md:text-6xl font-extrabold leading-tight mb-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        {slide.title}
                                    </h2>
                                    <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto md:mx-0">
                                        {slide.subtitle}
                                    </p>
                                    <button 
                                        onClick={() => router.push(slide.targetPath)} 
                                        // Cor de destaque Verde Neon (#22c55e)
                                        className="hero-button inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#1da851] text-[#0a0b10] px-8 py-3.5 rounded-full text-lg font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
                                    >
                                        {slide.buttonText}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Placeholder para Elemento Visual (Direita em Desktop) */}
                                {/* Em vez de imagens genéricas, usaremos divs técnicas que simulam código/dashboards */}
                                <div className="flex-1 w-full justify-center items-center p-2 hidden md:flex">
                                    {index === 0 && <TerminalDashboard />}
                                    {index === 1 && <DataSchema />}
                                    {index === 2 && <CodeSnippetValue />}
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                 </Swiper>
            </div>
        </section>
    )
}