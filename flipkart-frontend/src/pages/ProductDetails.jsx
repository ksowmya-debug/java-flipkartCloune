import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const passedProduct = location.state?.product;
  const [product, setProduct] = useState(passedProduct);
  const [loading, setLoading] = useState(!passedProduct);

  useEffect(() => {
    if (!passedProduct) {
      const fetchProduct = async () => {
        try {
          const response = await axiosClient.get(`/products/${id}`);
          const p = response.data;
          setProduct({
            ...p,
            title: p.name,
            image: p.imageUrl,
          });
        } catch (error) {
          console.error("Failed to fetch product:", error);
          setProduct({
            id,
            title: `Product ${id} not found`,
            price: 0,
            originalPrice: 0,
            image: `https://placehold.co/400x500/eee/999?text=Not+Found`
          });
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, passedProduct]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-48 mt-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row bg-white mt-4 shadow-sm min-h-[60vh] rounded-sm">
      <div className="w-full md:w-2/5 p-4 flex flex-col items-center border-r border-gray-100">
        <div className="border border-gray-200 p-4 mb-4 w-full flex justify-center">
          <img src={product.image} alt={product.title} className="max-h-[400px] object-contain" />
        </div>
        <div className="flex w-full gap-2">
          <button 
            onClick={() => {
              dispatch(addToCart(product));
              navigate('/cart');
            }}
            className="flex-1 bg-[#ff9f00] text-white py-3 font-bold text-lg rounded-sm shadow hover:bg-orange-500 transition"
          >
            ADD TO CART
          </button>
          <button 
            onClick={() => {
              dispatch(addToCart(product));
              navigate('/payment', {
                state: {
                  totalAmount: product.price,
                  itemCount: 1,
                  cartItems: [{ ...product, quantity: 1 }]
                }
              });
            }}
            className="flex-1 bg-[#fb641b] text-white py-3 font-bold text-lg rounded-sm shadow hover:bg-orange-600 transition"
          >
            BUY NOW
          </button>
        </div>
      </div>
      <div className="w-full md:w-3/5 p-4 md:pl-8">
        <h1 className="text-xl md:text-2xl font-normal mb-2 text-gray-800">{product.title} (Product ID: {id})</h1>
        <div className="text-green-600 font-bold text-sm mb-4">Special price</div>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold">₹{product.price}</span>
          {product.originalPrice && <span className="text-gray-500 line-through font-semibold">₹{product.originalPrice}</span>}
          {discountPercent > 0 && <span className="text-green-600 font-bold">{discountPercent}% off</span>}
        </div>
        <h3 className="font-semibold mb-3 text-gray-800">Available offers</h3>
        <ul className="text-sm space-y-3 mb-8">
          <li className="flex items-start"><span className="text-green-500 mr-2 text-lg leading-none">🏷️</span> <span className="font-semibold mr-1">Bank Offer</span> 5% Cashback on Flipkart Axis Bank Card</li>
          <li className="flex items-start"><span className="text-green-500 mr-2 text-lg leading-none">🏷️</span> <span className="font-semibold mr-1">Special Price</span> Get extra 10% off (price inclusive of cashback/coupon)</li>
        </ul>
      </div>
    </div>
  );
}
export default ProductDetails;
