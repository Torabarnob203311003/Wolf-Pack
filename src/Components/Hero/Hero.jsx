import React, { useState, useEffect } from 'react';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample slide data - replace with your actual images and content
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Win Big Today",
      subtitle: "Join our exciting competitions",
      alt: "First slide"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Amazing Prizes",
      subtitle: "Compete with the best",
      alt: "Second slide"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Champion's Glory",
      subtitle: "Become the ultimate winner",
      alt: "Third slide"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden bg-gray-900">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        <div 
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                    background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-2xl">
                  {slide.subtitle}
                </p>
                
                {/* CTA Button */}
                <button 
                  className="mt-4 sm:mt-6 lg:mt-8 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold text-white rounded-full hover:opacity-90 transition-opacity uppercase tracking-wide"
                  style={{background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)'}}
                >
                  Join Competition
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 sm:p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 sm:p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Hero;