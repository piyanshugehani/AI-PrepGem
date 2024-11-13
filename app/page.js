"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useRouter } from "next/navigation"; // For routing to /signin

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // GSAP Animations for a smooth entry and continuous effects
    gsap.to(".circle", {
      scale: 1.2,
      rotation: 180,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to(".bg-circle", {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  const handleStartClick = () => {
    router.push('/sign-in/'); // Redirect to /signin page
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-black text-white overflow-hidden">
      <div className="relative w-full h-full">
        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-5xl font-bold">AI PrepGem</h1>
          <p className="text-xl mt-4 max-w-lg mx-auto">
            Get ready for your next interview with an AI that mimics real-world scenarios and adapts to your skill level. Let's start practicing now!
          </p>
        </motion.div>

        {/* Acertinity-inspired button */}
        <motion.div
          className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <button
            onClick={handleStartClick}
            className="relative inline-flex items-center justify-center p-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-black opacity-0.9 hover:opacity-40 transition duration-300 ease-in-out rounded-lg border-2 border-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            Start Interview
            <span className="absolute top-0 left-0 w-full h-full "></span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
