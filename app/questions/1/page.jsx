"use client"
import { useEffect } from 'react';
import Header from '@/app/dashboard/_components/Header'
import React from 'react'
import {motion} from 'framer-motion'
import gsap from 'gsap';
import Visualizer from './_components/Visualizer';

function page() {
    useEffect(() => {
        gsap.fromTo(
            '.roadmap-timeline',
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.3, ease: 'power3.inOut' }
        );
    }, []);

    const benefitVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

  return (
    <div>
            <Header />
            <div>
                {/* Introduction Section */}
                <section className="text-center py-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-md text-white">
                    <h1 className="text-4xl font-bold">AI Mock Interview Platform</h1>
                    <p className="mt-2 text-lg">Revolutionizing interview prep with intelligent feedback and real-time analysis.</p>
                </section>
                <Visualizer/>
            
                
            </div>
        </div>
  )
}

export default page