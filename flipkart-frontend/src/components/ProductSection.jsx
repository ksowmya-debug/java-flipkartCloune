import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductSection({ title, products, bgClass = "bg-orange-400", decorationImage }) {
  return (
    <section className="w-full mt-4 rounded-xl overflow-hidden relative shadow-sm">
      <div className={`${bgClass} w-full p-4 relative`}>
        
        {/* Background decoration graphic (optional) */}
        {decorationImage && (
          <img src={decorationImage} className="absolute top-0 right-16 h-16 object-contain z-0 opacity-80" alt="" />
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-3 relative z-10">
          <h2 className="text-[22px] font-bold text-black">{title}</h2>
          <button className="bg-black text-white p-1.5 rounded-full hover:bg-gray-800 transition shadow-md">
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Content Box */}
        <div className="bg-white rounded-lg p-2 sm:p-4 flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar relative z-10">
          {products.map((prod, idx) => {
            const prodId = prod.id || `sec-${idx}`;
            const stateProduct = {
              id: prodId,
              title: prod.title,
              subtitle: prod.subtitle,
              image: prod.image,
              price: prod.price || 999,
              originalPrice: prod.originalPrice || 1499,
            };
            return (
              <Link 
                key={idx} 
                to={`/product/${prodId}`} 
                state={{ product: stateProduct }}
                className="min-w-[140px] w-1/4 flex-shrink-0 flex flex-col group cursor-pointer border border-transparent hover:border-gray-200 p-2 rounded-md transition-colors"
              >
                <div className="bg-white flex items-center justify-center mb-4 h-[150px] sm:h-[200px]">
                  <img src={prod.image} alt={prod.subtitle} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="px-1 text-left mt-auto">
                  <p className="text-[14px] text-gray-600 truncate">{prod.title}</p>
                  <p className="text-[15px] font-bold text-gray-900 mt-0.5 truncate">{prod.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default ProductSection;
