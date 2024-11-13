"use client"
import React, { useEffect } from 'react';
import Header from '../dashboard/_components/Header';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function Page() {
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
            <div className='mx-5 md:mx-20 lg:mx-36 mt-10 space-y-8 pb-10'>
                {/* Roadmap Timeline */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-semibold text-indigo-700">Platform Roadmap</h2>
                    <div className="roadmap-timeline space-y-4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={benefitVariants}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <h3 className="text-xl font-semibold">Phase 1: User Onboarding & Profile Setup</h3>
                            <p>
                                The first step is a seamless onboarding experience where users can set up their profiles, input career preferences, and indicate the type of interviews they want to practice. AI will analyze users’ profiles to suggest mock interviews that align with their career goals, job type, and industry.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={benefitVariants}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <h3 className="text-xl font-semibold">Phase 2: Personalized Mock Interview Sessions</h3>
                            <p>
                                Once the user’s profile is set up, they are ready for their first mock interview. The platform uses AI-driven interview simulations to simulate real-world job interviews tailored to the user’s skill level and job requirements. Real-time feedback is provided during and after each session to enhance user preparation.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={benefitVariants}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <h3 className="text-xl font-semibold">Phase 3: Feedback Analysis & Recommendations</h3>
                            <p>
                                After completing a mock interview, the AI system provides detailed feedback, including areas for improvement in communication, technical skills, and behavioral aspects. Personalized recommendations are given to help users improve their weak areas. This phase aims to provide actionable insights for continuous learning and growth.
                            </p>
                        </motion.div>
                    </div>
                </section>


                {/* How Users Benefit Section */}
                <section className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-lg shadow-md text-white">
                    <h2 className="text-3xl font-semibold">How Users Benefit</h2>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {['Personalized Feedback', 'Instant Analysis', '24/7 Access'].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 bg-violet-400 rounded-lg shadow-lg"
                                initial="hidden"
                                animate="visible"
                                variants={benefitVariants}
                            >
                                <h3 className="text-2xl font-semibold">{benefit}</h3>
                                <p>Details about {benefit} that improve user experience and success rate.</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
                
            </div>
        </div>
    );
}

export default Page;
