"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import React from "react";

// Sorting Visualizer Component
const SortingVisualizer = () => {
  const initialArray = [4, 3, 6, 1, 8, 2];
  const [array, setArray] = useState([...initialArray]);
  const [activeBars, setActiveBars] = useState([]);
  const [status, setStatus] = useState("");

  const animateSorting = () => {
    const animations = [];
    const arrayCopy = [...array];
  
    // Bubble Sort Logic with Animation Steps
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        animations.push({
          compare: [j, j + 1],
          swap: arrayCopy[j] > arrayCopy[j + 1] ? [j, j + 1] : null,
        });
  
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
        }
      }
    }
  
    // Animate the sorting process
    animations.forEach(({ compare, swap }, idx) => {
      setTimeout(() => {
        setActiveBars(compare); // Highlight bars being compared
        setStatus(`Comparing arr[${compare[0]}] and arr[${compare[1]}]`);
  
        // Animate comparison
        gsap.to(`#bar-${compare[0]}`, { y: -20, duration: 0.3, yoyo: true, repeat: 1 });
        gsap.to(`#bar-${compare[1]}`, { y: -20, duration: 0.3, yoyo: true, repeat: 1 });
  
        if (swap) {
          const [i, j] = swap;
  
          setTimeout(() => {
            setStatus(`Swapping arr[${i}] and arr[${j}]`);
            // Animate swap
            gsap.to(`#bar-${i}`, { x: 50, duration: 0.5 });
            gsap.to(`#bar-${j}`, { x: -50, duration: 0.5, onComplete: () => {
              // Update the array and state after swap
              setArray(prevArray => {
                const newArray = [...prevArray];
                const temp = newArray[i];
                newArray[i] = newArray[j];
                newArray[j] = temp;
                return newArray;
              });
  
              // Reset bar positions
              gsap.to(`#bar-${i}`, { x: 0, duration: 0 });
              gsap.to(`#bar-${j}`, { x: 0, duration: 0 });
            }});
          }, 500);
        }
      }, idx * 1000);
    });
  
    // Final update after all animations
    setTimeout(() => {
      setStatus("Sorting Complete!");
      setActiveBars([]);
    }, animations.length * 1000);
  };
  
  

  return (
    <div className="space-y-12 text-center">
      <h3 className="text-xl font-semibold text-indigo-700">Sorting Visualizer</h3>
      <div className="flex justify-center items-end gap-2 h-[250px] w-full relative">
        

        {/* Bars */}
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            id={`bar-${idx}`}
            className={`w-10 flex flex-col items-center ${
              activeBars.includes(idx) ? "bg-yellow-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
            style={{ height: `${value * 30}px` }}
          >
            <span className="text-sm text-gray-800">{value}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-lg font-semibold text-gray-700">{status}</p>

      <button
        onClick={animateSorting}
        className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700"
      >
        Start Sorting Animation
      </button>
    </div>
  );
};

// Questions Page
const Visualizer = () => {
  const [showVisualizer, setShowVisualizer] = useState(false);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700">Practice Problem Solving</h1>
      <div className="mt-8 space-y-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Question 1: Bubble Sort</h2>
          <p>
            Implement the Bubble Sort algorithm to sort the array: <b>[4, 3, 6, 1, 8, 2]</b>.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {!showVisualizer ? (
            <button
              onClick={() => setShowVisualizer(true)}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700"
            >
              Visualize Solution
            </button>
          ) : (
            <SortingVisualizer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
