"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (imageElement) {
        if (scrollPosition > scrollThreshold) {
          imageElement.classList.add("scrolled");
        } else {
          imageElement.classList.remove("scrolled");
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="bg-[radial-gradient(circle,_#FFD77A_0%,_#FFF8E7_40%,_#E6A520_80%,_#7A4A00_100%)] font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2 text-4xl md:text-6xl">
            Your AI-Powered Personal Assistant for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[1000px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.
            <br />
            Your ultimate career companion, anytime, anywhere.
          </p>
        </div>
        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image 
               src="/banner1.png" 
               alt="banner skillnova" 
               width={1280} 
               height={720} 
               className="rounded-lg shadow-2xl border mx-auto" 
               priority 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;