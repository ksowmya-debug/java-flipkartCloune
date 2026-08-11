import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart, addToCart, decreaseQuantity, clearCart } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const finalTotal = totalAmount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#f1f3f6] min-h-[calc(100vh-40px)] w-full flex flex-col pt-8">
        <div className="w-full max-w-[1248px] mx-auto bg-white shadow-sm rounded-sm flex flex-col items-center justify-center py-16 mb-8">
          <img 
            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
            alt="Empty Cart" 
            className="w-[200px] mb-6" 
          />
          <h2 className="text-[18px] font-medium text-gray-800 mb-2">Missing Cart items?</h2>
          <p className="text-[12px] text-gray-500 mb-6">Login to see the items you added previously</p>
          <Link 
            to="/login" 
            className="bg-[#fb641b] text-white px-16 py-2.5 shadow-sm text-[14px] font-medium rounded-sm hover:bg-orange-600 transition"
          >
            Login
          </Link>
        </div>
        
        {/* Simplified Footer for Empty Cart */}
        <div className="mt-auto pb-8 w-full max-w-[1248px] mx-auto px-4 flex justify-between items-center text-[13px] text-gray-600">
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Policies: Returns Policy</a>
            <a href="#" className="hover:underline border-l border-gray-300 pl-4">Terms of use</a>
            <a href="#" className="hover:underline border-l border-gray-300 pl-4">Security</a>
            <a href="#" className="hover:underline border-l border-gray-300 pl-4">Privacy</a>
          </div>
          <div>
            © 2007-2026 Flipkart.com
          </div>
          <div>
            Need help? Visit the <a href="#" className="text-[#2874f0] hover:underline">Help Center</a> or <a href="#" className="text-[#2874f0] hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    );
  }

  // Full Cart State (Unchanged for when items are actually added)
  return (
    <div className="container mx-auto p-2 sm:p-4 flex flex-col lg:flex-row gap-4 mt-2">
      <div className="w-full lg:w-2/3 bg-white shadow-sm rounded-sm">
        <div className="p-4 border-b flex justify-between items-center bg-white sticky top-[60px] z-10">
          <h2 className="font-bold text-lg">My Cart ({cartItems.length})</h2>
          <button onClick={() => dispatch(clearCart())} className="text-red-500 text-sm font-semibold hover:underline">Clear Cart</button>
        </div>
        {cartItems.map(item => (
          <div key={item.id} className="p-4 border-b flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors">
            <div className="w-full sm:w-32 flex flex-col items-center">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mb-4" />
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch(decreaseQuantity(item.id))} className="w-7 h-7 border border-gray-300 rounded-full font-bold bg-white hover:bg-gray-100">-</button>
                <span className="border border-gray-300 px-4 py-1 text-sm bg-white rounded-sm font-semibold">{item.quantity}</span>
                <button onClick={() => dispatch(addToCart({ id: item.productId, title: item.title, image: item.image, price: item.price, originalPrice: item.originalPrice }))} className="w-7 h-7 border border-gray-300 rounded-full font-bold bg-white hover:bg-gray-100">+</button>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-800 hover:text-[#2874f0] cursor-pointer">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3 mt-1">Seller: RetailNet</p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gray-500 line-through text-sm">₹{item.price + 1000}</span>
                <span className="font-bold text-lg text-gray-900">₹{item.price * item.quantity}</span>
                <span className="text-green-600 text-sm font-bold">Offer Applied</span>
              </div>
              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="font-semibold hover:text-[#2874f0] uppercase text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 flex justify-end shadow-[0_-2px_10px_rgba(0,0,0,0.05)] bg-white sticky bottom-0">
          <button 
            onClick={() => navigate('/payment', {
              state: {
                totalAmount: finalTotal,
                itemCount: totalItems,
                cartItems: cartItems
              }
            })}
            disabled={cartItems.length === 0}
            className={`px-10 py-3 font-bold rounded-sm shadow-md transition ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#fb641b] hover:bg-orange-600 text-white'}`}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
      
      <div className="w-full lg:w-1/3">
        <div className="bg-white shadow-sm p-4 sticky top-[80px] rounded-sm">
          <h3 className="text-gray-500 font-semibold border-b border-gray-200 pb-4 mb-4 uppercase text-sm">Price Details</h3>
          <div className="flex justify-between mb-4 text-gray-800">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-800">
            <span>Delivery Charges</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-dashed border-gray-300 pt-4 mb-4 text-gray-900">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="text-green-600 font-semibold text-sm">
            You will save ₹{(cartItems.length * 1000)} on this order
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
