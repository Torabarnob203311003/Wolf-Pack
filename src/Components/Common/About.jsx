import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Star rating component to render the stars
const StarRating = ({ rating }) => {
  const fullStar = '⭐';
  const halfStar = '½';
  let stars = '';

  for (let i = 0; i < Math.floor(rating); i++) {
    stars += fullStar;
  }
  if (rating % 1 !== 0) {
    stars += halfStar;
  }
  return <span className="text-yellow-400">{stars}</span>;
};

// Testimonial Card Component
const TestimonialCard = ({ review, rating, verified }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl flex flex-col justify-between h-full"
    // Animation properties for blur-to-clear effect
    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: "easeOut" }} // Increased duration for a smoother transition
  >
    <p className="text-gray-300 text-sm italic">"{review}"</p>
    <div className="mt-4 flex items-center justify-between">
      <StarRating rating={rating} />
      {verified && (
        <div className="flex items-center text-green-500 text-xs font-semibold">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </div>
      )}
    </div>
  </motion.div>
);

// Main About component
const About = () => {
  const testimonials = [
    { id: 1, review: "Exciting real chance of winning, fun and trustworthy too. Local company people you know and can relate to, local winners showing how real it is, normal people", rating: 5, verified: true },
    { id: 2, review: "North Star is a fabulous site that helps each other and the community. We're paid out to your account in seconds. They also do an awful lot for charity, which I also love. Keep your Eyes On The Prize", rating: 4.5, verified: true },
    { id: 3, review: "Mint people do life changing things for people who can only dream of winning money and do for special places like food bank, sponsor and much more", rating: 5, verified: true },
    { id: 4, review: "They are a fabulous group so generous to charities. They are like one huge family. Even though I don't win very much every win is treated the same they pay out immediately with grace. I absolutely love them and love watching the videos on Facebook.", rating: 5, verified: true },
    { id: 5, review: "great competitions and helping the community out, and I always recommend North Star over other ppl who've been on other sites and they don't do all they do.", rating: 5, verified: true },
    { id: 6, review: "North Star are so easy to use, any wins payed into your bank within hours, usually minutes, lots of fun opportunities to win prizes", rating: 5, verified: true },
    { id: 7, review: "Mint people do life changing things for people who can only dream of winning money and do for special places like food bank, sponsor and much more", rating: 5, verified: true },
    { id: 8, review: "Love playing North Star... It's Class. Love playing North Star... It's Class", rating: 4.5, verified: true },
  ];

  return (
    <div className="text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          What people say about us
        </h2>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto custom-scrollbar-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard 
            key={testimonial.id}
            review={testimonial.review}
            rating={testimonial.rating}
            verified={testimonial.verified}
          />
        ))}
      </motion.div>
      
      <div className="mt-12 text-center text-gray-400">
        <p className="text-sm">
          Rated 4.7 / 5 based on 2,006 Reviews. Showing our 4 & 5 star reviews.
        </p>
        <div className="mt-4 flex justify-center items-center space-x-2">
          <span className="text-2xl">⭐</span>
          <span className="font-bold text-lg text-white">Trustpilot</span>
        </div>
      </div>
    </div>
  );
};

export default About;