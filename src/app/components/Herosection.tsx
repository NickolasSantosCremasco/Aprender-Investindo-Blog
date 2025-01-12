'use client'
import { useState } from "react"

export default function HeroSection() {
    const [CurrentSlide, setCurrentSlide] = useState(0)


    return (
       <section className=" max-w-screen-xl mx-auto bg-sky-950">
        {/* Slider */}
            <div className="relative overflow-hidden max-w-screen-xl mx-auto">
                {/* Slides */}
                <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${CurrentSlide * 100}%)`}}></div>
                {slides}
            </div>
       </section>
    )
}