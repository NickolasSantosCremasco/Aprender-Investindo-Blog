import Navbar from "./components/Navbar";
import HeroSection from "./components/Herosection";
import NewsSection from  "./components/NewsSection";
import Features from "./components/FeaturesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <header className="w-full bg-slate-50 text-white">
        <Navbar />
      </header>
      <div className='h-[1px] max-w-screen mx-auto bg-sky-800 '></div>
      <HeroSection />
      <NewsSection/>
      <Features />
      <Footer />
    
    </>
    
  );
}
