import Navbar from "./components/Navbar";
import HeroSection from "./components/Herosection";
import NewsSection from  "./components/NewsSection";
import Features from "./components/FeaturesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    
    <header className="w-full bg-slate-50 text-white px-4 pt-5 pb-5">
      <Navbar />
      <div className='h-[1px] max-w-screen-xl mx-auto bg-sky-800 '></div>
      <HeroSection />
      <NewsSection/>
      <Features />
      <Footer />
    </header>
    
  );
}
