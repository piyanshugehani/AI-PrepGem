"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Header from '../dashboard/_components/Header'

function Page() {
  // Refs for elements to animate
  const questionRefs = useRef([]);
  questionRefs.current = [];

  // Add refs to each question div dynamically
  const addToRefs = (el) => {
    if (el && !questionRefs.current.includes(el)) {
      questionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP animation for all question items
    questionRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 }, // Starting position
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power3.out' } // Ending position
      );
    });
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className='bg-gray-50'>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-10">
            <h1 className="text-4xl font-bold">Explore Mock Interview Questions</h1>
            <p className="mt-4 text-lg">Prepare for your next job interview with a wide range of mock questions covering all aspects of interviews.</p>
          </section>

          <div className='mx-5 md:mx-20 lg:mx-36'>
            {/* Featured Questions */}
          <section className="py-16 px-8">
            <h2 className="text-3xl font-semibold text-indigo-700 text-center">Featured Questions</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  ref={addToRefs} // Attach ref to each question item
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-indigo-800">Question #{item}</h3>
                  <p className="mt-2 text-gray-600">This question tests your knowledge in algorithms and problem-solving skills. Can you solve it within 15 minutes?</p>
                  <button className="mt-4 text-white bg-indigo-600 py-2 px-4 rounded-full hover:bg-indigo-700 transition-all">Start</button>
                </div>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-16 bg-gray-100">
            <h2 className="text-3xl font-semibold text-indigo-700 text-center">Categories</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Technical', 'Behavioral', 'Aptitude', 'System Design', 'HR'].map((category) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all text-center">
                  <h3 className="text-2xl font-semibold text-indigo-800">{category}</h3>
                  <p className="mt-4 text-gray-600">Explore questions related to {category} interviews and sharpen your skills.</p>
                  <button className="mt-6 text-white bg-indigo-600 py-2 px-4 rounded-full hover:bg-indigo-700 transition-all">Explore</button>
                </div>
              ))}
            </div>
          </section>

          {/* Progress Section */}
          <section className="py-16 px-8 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center">
            <h2 className="text-3xl font-semibold">Track Your Progress</h2>
            <p className="mt-4 text-lg">Keep an eye on your learning journey. Know how well you're doing with your practice sessions and areas to improve.</p>
            <div className="mt-8 flex justify-center space-x-16">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold">Completed Questions</h3>
                <div className="mt-2 text-3xl font-bold">45</div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold">Questions Left</h3>
                <div className="mt-2 text-3xl font-bold">25</div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold">Avg. Time per Question</h3>
                <div className="mt-2 text-3xl font-bold">7 mins</div>
              </div>
            </div>
          </section>

          {/* Recommendations Section */}
          <section className="py-16 px-8">
            <h2 className="text-3xl font-semibold text-indigo-700 text-center">Recommended Questions</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  ref={addToRefs} // Attach ref to each recommended question item
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-indigo-800">Recommended Question #{item}</h3>
                  <p className="mt-2 text-gray-600">A must-try question to help you sharpen your skills in problem-solving and algorithms.</p>
                  <button className="mt-4 text-white bg-indigo-600 py-2 px-4 rounded-full hover:bg-indigo-700 transition-all">Start</button>
                </div>
              ))}
            </div>
          </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
