import { ShoppingCart, Search, User, ChevronDown, MapPin } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCart } from '../store/cartSlice';

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  // If on the login, signup, or cart page, render the classic blue Flipkart header
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/cart';

  if (isAuthPage) {
    const classicCategories = [
      'Electronics', 'TVs & Appliances', 'Men', 'Women', 'Baby & Kids', 
      'Home & Furniture', 'Sports, Books & More', 'Flights', 'Offer Zone'
    ];

    return (
      <header className="w-full z-50 sticky top-0 shadow-sm">
        {/* Blue Main Nav */}
        <div className="bg-[#2874f0] w-full py-2.5">
          <div className="w-full max-w-[1248px] mx-auto px-4 flex items-center gap-6 justify-center">
            {/* Logo area */}
            <Link to="/" className="flex flex-col items-end mr-4">
              <span className="text-white font-bold text-[20px] italic tracking-tight leading-none">
                Flipkart
              </span>
              <div className="flex items-center hover:underline cursor-pointer">
                <span className="text-[#ffe500] text-[11px] font-medium italic">Explore</span>
                <span className="text-[#ffe500] text-[11px] font-bold italic ml-1">Plus</span>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="w-2.5 h-2.5 ml-0.5" />
              </div>
            </Link>

            {/* Search */}
            <div className="w-full max-w-[500px] relative shadow-sm">
              <input 
                type="text" 
                placeholder="Search for products, brands and more" 
                className="w-full bg-white outline-none pl-4 pr-10 py-2 rounded-sm text-[14px]"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-[#2874f0]">
                <Search size={18} className="font-bold" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 ml-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="bg-white text-[#2874f0] font-medium px-4 py-1.5 rounded-sm text-[15px] flex items-center gap-2 cursor-pointer">
                    <User size={16} />
                    <span>{user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={handleLogout} className="text-white font-medium text-[14px] hover:underline cursor-pointer">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-white text-[#2874f0] font-medium px-10 py-1.5 rounded-sm text-[15px]">
                  Login
                </Link>
              )}
              
              {/* Extra Actions (Hidden on Cart Page) */}
              {location.pathname !== '/cart' && (
                <>
                  <span className="text-white font-medium text-[15px] cursor-pointer">
                    Become a Seller
                  </span>
                  <Link to="/orders" className="text-white font-medium text-[15px] cursor-pointer">
                    Orders
                  </Link>
                  <Link to="/cart" className="flex items-center gap-2 text-white font-medium text-[15px]">
                    <div className="relative">
                      <ShoppingCart size={20} />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span>Cart</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* White Text Categories Row (Hidden on Cart Page) */}
        {location.pathname !== '/cart' && (
          <div className="bg-white w-full border-b shadow-[0_1px_1px_0_rgba(0,0,0,.16)]">
            <div className="w-full max-w-[1248px] mx-auto px-4 py-2.5 flex items-center justify-between text-[14px] font-medium text-gray-700">
              {classicCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-1 cursor-pointer hover:text-[#2874f0] transition">
                  <span>{cat}</span>
                  {idx !== classicCategories.length - 1 && idx !== classicCategories.length - 2 && (
                    <ChevronDown size={14} className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    );
  }

  // Modern White Header for other pages
  return (
    <header className="bg-white w-full z-50 sticky top-0 shadow-sm border-b pb-3">
      <div className="w-full max-w-[1248px] mx-auto px-2 sm:px-4">
        {/* Top Row: Tabs and Location */}
        <div className="flex items-center justify-between py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold text-gray-700">
          <div className="flex gap-2 sm:gap-4">
            <button className="flex items-center gap-1 bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded-sm">
              <span className="font-bold">Flipkart</span>
            </button>
            <button className="flex items-center gap-1 hover:bg-gray-100 px-2 sm:px-3 py-1 rounded-sm transition">
              <MapPin size={12} className="text-gray-500" />
              <span>Travel</span>
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span>Location not set</span>
            <button className="text-blue-600 hover:underline">Select delivery location</button>
            <ChevronDown size={12} className="text-blue-600" />
          </div>
        </div>

        {/* Bottom Row: Logo, Search, Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-6 mt-1 sm:mt-2">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center flex-shrink-0 cursor-pointer hidden sm:flex">
             <span className="text-blue-600 font-bold text-lg italic tracking-tight">Flipkart</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow w-full sm:w-auto relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search for Products, Brands and More" 
              className="w-full bg-white outline-none pl-9 pr-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-[12px] border border-red-500 focus:border-red-600 transition"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-1 hover:bg-blue-50 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition group cursor-pointer">
                  <User size={14} className="text-blue-600" />
                  <span className="font-medium text-blue-600 text-[11px] sm:text-[12px]">{user.name.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout} className="text-[11px] sm:text-[12px] font-medium text-red-500 hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-1 hover:bg-blue-50 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition group">
                <User size={14} className="text-gray-700 group-hover:text-blue-600" />
                <span className="font-medium text-gray-800 group-hover:text-blue-600 text-[11px] sm:text-[12px]">Login</span>
                <ChevronDown size={12} className="text-gray-500 group-hover:text-blue-600" />
              </Link>
            )}
            
            <Link to="/orders" className="hidden sm:flex items-center gap-1 hover:bg-blue-50 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg transition group cursor-pointer relative">
              <span className="font-medium text-gray-800 group-hover:text-blue-600 text-[11px] sm:text-[12px]">Orders</span>
            </Link>

            <Link to="/cart" className="flex items-center gap-1 hover:bg-blue-50 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition group">
              <div className="relative">
                <ShoppingCart size={14} className="text-gray-700 group-hover:text-blue-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full h-3 w-3 flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block font-medium text-gray-800 group-hover:text-blue-600 text-[11px] sm:text-[12px]">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
