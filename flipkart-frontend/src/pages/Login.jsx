import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axiosClient from '../api/axiosClient';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axiosClient.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        name: response.data.name,
        email: response.data.email
      }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-[#f1f3f6] min-h-[calc(100vh-60px)] flex justify-center pt-8 sm:pt-12">
      <div className="bg-white flex w-full max-w-[850px] shadow-[0_2px_4px_0_rgba(0,0,0,.2)] min-h-[528px] h-[528px] rounded-sm overflow-hidden mx-4">
        
        {/* Left Side */}
        <div className="hidden md:flex w-[40%] bg-[#2874f0] text-white px-8 py-10 flex-col justify-between">
          <div>
            <h1 className="text-[28px] font-medium mb-4">Login</h1>
            <p className="text-[18px] text-[#dbdbdb] leading-relaxed pr-4">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
            alt="Login graphic" 
            className="w-full object-contain mt-auto" 
          />
        </div>
        
        {/* Right Side */}
        <div className="w-full md:w-[60%] px-10 py-14 flex flex-col relative">
          
          <form onSubmit={handleLogin} className="flex flex-col flex-grow">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {/* Floating Label Inputs */}
            <div className="flex flex-col mb-4 mt-2">
              <label htmlFor="email" className="text-[13px] text-gray-500 font-medium mb-1">Enter Email</label>
              <input 
                type="email" 
                id="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
                className="block w-full border-b border-gray-300 py-1.5 text-[15px] text-gray-900 focus:outline-none focus:border-[#2874f0] transition-colors bg-transparent" 
                placeholder="Email Address" 
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="text-[13px] text-gray-500 font-medium mb-1">Enter Password</label>
              <input 
                type="password" 
                id="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
                className="block w-full border-b border-gray-300 py-1.5 text-[15px] text-gray-900 focus:outline-none focus:border-[#2874f0] transition-colors bg-transparent" 
                placeholder="Password" 
              />
            </div>
            
            <p className="text-[12px] text-gray-500 font-medium mb-4 mt-2">
              By continuing, you agree to Flipkart's <a href="#" className="text-[#2874f0]">Terms of Use</a> and <a href="#" className="text-[#2874f0]">Privacy Policy</a>.
            </p>
            
            <button 
              type="submit" 
              className="w-full bg-[#fb641b] text-white py-3.5 font-medium text-[15px] rounded-sm shadow hover:bg-orange-600 transition"
            >
              Login
            </button>
            
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const response = await axiosClient.post('/auth/google', {
                      credential: credentialResponse.credential
                    });
                    
                    // Save the custom Spring Boot JWT token
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify({
                      name: response.data.name,
                      email: response.data.email
                    }));
                    
                    // Redirect to home page
                    navigate('/');
                  } catch (error) {
                    console.error('Google login failed in backend:', error);
                    alert('Login failed. Please try again.');
                  }
                }}
                onError={() => {
                  console.log('Google Login Popup Failed');
                }}
              />
            </div>
          </form>
          
          <div className="text-center absolute bottom-8 left-0 right-0">
            <Link to="/signup" className="text-[#2874f0] font-medium text-[14px] hover:underline">
              New to Flipkart? Create an account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Login;
