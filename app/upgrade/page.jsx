"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import gsap from 'gsap'

function Page() {
  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Animation for pricing tiers
  const pricingRef = React.useRef([]);

  const addToPricingRefs = (el) => {
    if (el && !pricingRef.current.includes(el)) {
      pricingRef.current.push(el);
    }
  };

  React.useEffect(() => {
    pricingRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 }, // Initial state
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power3.out' }
      );
    });
  }, []);

  return (
    <div>
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        <div className='bg-gray-50'>

          {/* Pricing Tiers */}
          <section className="py-20 px-8">
            <h2 className="text-3xl font-semibold text-indigo-700 text-center">Choose Your Plan</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
                <div
                  key={plan}
                  ref={addToPricingRefs}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <h3 className="text-2xl font-semibold text-indigo-800 text-center">{plan}</h3>
                  <p className="text-xl mt-4 text-indigo-600 text-center">{plan === 'Basic' ? '$19/month' : plan === 'Pro' ? '$49/month' : '$99/month'}</p>
                  <p className="mt-6 text-gray-600">
                    {plan === 'Basic'
                      ? 'Access to basic mock interview questions, limited categories.'
                      : plan === 'Pro'
                      ? 'Access to all categories, premium questions, and progress tracking.'
                      : 'Unlock everything! Includes priority support, custom questions, and more.'}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <button
                      className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition-all"
                      onClick={openModal} // Open modal on click
                    >
                      Choose {plan}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Comparison */}
          <section className="py-20 px-8 bg-gray-100">
            <h2 className="text-3xl font-semibold text-indigo-700 text-center">Compare Features</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Basic', 'Pro', 'Enterprise'].map((plan) => (
                <div key={plan} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                  <h3 className="text-2xl font-semibold text-indigo-800 text-center">{plan}</h3>
                  <ul className="mt-6 text-gray-600">
                    <li className="flex items-center">
                      <span className="mr-2 text-indigo-600">✔️</span> Mock Interviews
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-indigo-600">✔️</span> Access to Categories
                    </li>
                    {plan === 'Pro' || plan === 'Enterprise' ? (
                      <li className="flex items-center">
                        <span className="mr-2 text-indigo-600">✔️</span> Custom Question Packs
                      </li>
                    ) : null}
                    {plan === 'Enterprise' ? (
                      <li className="flex items-center">
                        <span className="mr-2 text-indigo-600">✔️</span> Priority Support
                      </li>
                    ) : null}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 px-8">
            <h2 className="text-3xl font-semibold text-indigo-700 text-center">What Our Users Say</h2>
            <div className="mt-8 flex justify-center space-x-8">
              {[
                { name: 'John Doe', feedback: 'This platform really helped me prepare for my job interviews and land the role I wanted!' },
                { name: 'Jane Smith', feedback: 'The Pro plan is amazing! The personalized feedback helped me improve rapidly.' },
                { name: 'Alex Johnson', feedback: 'A game changer! I loved the questions in the Enterprise plan, which gave me a deeper understanding.' }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  ref={addToPricingRefs}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
                  <h3 className="mt-4 text-xl font-semibold text-indigo-800">{testimonial.name}</h3>
                </div>
              ))}
            </div>
          </section>
          {/* Modal for Better User Experience */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h3 className="text-2xl font-semibold text-indigo-700 text-center">For Better Experience</h3>
                <p className="mt-4 text-lg text-gray-600">
                  To provide you with the best experience, we recommend choosing one of our premium plans for unlimited access to all features and mock questions.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={closeModal} // Optionally, this can be an action to go to checkout or choose a plan
                    className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition-all"
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
