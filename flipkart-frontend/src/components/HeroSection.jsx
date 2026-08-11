import { useEffect, useRef, useState } from 'react';

function HeroSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    { id: 1, image: '/motorola_ad.jpg', alt: 'Motorola' },
    { id: 2, image: '/hmd_ad.jpg', alt: 'HMD' },
    { id: 3, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600&h=300', alt: 'POCO' },
    { id: 4, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600&h=300', alt: 'Phone 4' },
    { id: 5, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600&h=300', alt: 'Phone 5' },
    { id: 6, image: '/gaming_laptop_ad.jpg', alt: 'Gaming Laptop' },
    { id: 7, image: '/earbuds_ad.jpg', alt: 'Wireless Earbuds' },
  ];

  // Auto scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        let nextScroll = scrollLeft + clientWidth / 3; // scroll by one banner width
        if (nextScroll >= maxScroll - 10) {
          nextScroll = 0; // reset to beginning
        }
        
        scrollRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' });
        
        // Update dots (approximate based on scroll position)
        const newIndex = Math.round((nextScroll / maxScroll) * (banners.length - 1)) || 0;
        setActiveIndex(newIndex > banners.length - 1 ? 0 : newIndex);
      }
    }, 3000); // Auto scroll every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="bg-white py-4 shadow-sm w-full relative">
      <div className="w-full relative">
        <div 
          ref={scrollRef}
          className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4"
        >
          {banners.map((banner) => (
            <div key={banner.id} className="snap-center min-w-[280px] w-[280px] sm:min-w-[380px] sm:w-[380px] md:min-w-[400px] md:w-[400px] h-[180px] sm:h-[220px] relative rounded-lg overflow-hidden cursor-pointer group flex-shrink-0 bg-gray-100">
              <img src={banner.image} alt={banner.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute bottom-2 right-2 bg-black/40 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">AD</div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {banners.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-4 bg-[#2874f0]' : 'w-1.5 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
