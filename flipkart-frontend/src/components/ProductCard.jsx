import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

function ProductCard({ id, image, title, brand, price, originalPrice, discount, subtitle, rating, reviews, offerText, tag }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-3 flex flex-col h-full rounded-md cursor-pointer group border border-transparent hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <Link 
        to={`/product/${id}`} 
        state={{ product: { id, image, title, brand, price, originalPrice, discount, subtitle, rating, reviews, offerText, tag } }} 
        className="w-full flex flex-col flex-grow"
      >
        <div className="h-48 sm:h-56 w-full flex items-center justify-center mb-3 overflow-hidden relative rounded-md bg-[#f5f5f5]">
          <img src={image} alt={title} className="max-h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
          
          {/* Top Left Tag */}
          {tag && (
            <div className="absolute top-2 left-2 bg-[#d7195c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm z-10">
              {tag}
            </div>
          )}

          {/* Bottom Left Rating Badge */}
          {rating && (
            <div className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 rounded-sm shadow-sm border border-gray-100 flex items-center gap-1 text-[11px] font-semibold z-10">
              <span>{rating}</span>
              <span className="text-green-600">★</span>
              {reviews && <span className="text-gray-500 font-normal">({reviews.toLocaleString()})</span>}
            </div>
          )}
        </div>

        <div className="w-full text-left flex flex-col flex-grow">
          {/* Brand + Title */}
          {brand || title ? (
            <h4 className="text-[14px] text-gray-700 truncate group-hover:text-blue-600 mb-1">
              {brand && <span className="font-bold text-gray-900 mr-1">{brand}</span>}
              {title}
            </h4>
          ) : null}

          {/* Subtitle (for Promo cards) */}
          {subtitle && (
            <p className="text-[15px] font-semibold text-gray-900 mt-0.5">{subtitle}</p>
          )}

          {/* Pricing Row */}
          {!subtitle && price && (
            <div className="mt-auto pt-1 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                {originalPrice && <span className="text-[13px] text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>}
                <span className="font-bold text-white bg-[#d7195c] px-1.5 py-0.5 rounded-sm text-[13px]">₹{price.toLocaleString()}</span>
              </div>
              {/* Offers */}
              {offerText && (
                <div className="text-[12px] text-blue-600 font-medium">
                  {offerText}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
