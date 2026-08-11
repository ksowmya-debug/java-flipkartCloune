import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [orderId, setOrderId] = useState('');

  // Extract the state we passed from the Payment page via React Router
  const amount = location.state?.amount || 0;
  const method = location.state?.method || 'N/A';

  useEffect(() => {
    // Generate a random dummy order ID (e.g., ORD-1A2B3C)
    const randomId = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderId(randomId);

    // Clear the cart in Redux since the user just bought the items!
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-24 h-24" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-8">Your order has been placed successfully.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-semibold text-gray-800">{orderId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Amount Paid:</span>
            <span className="font-semibold text-gray-800">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method:</span>
            <span className="font-semibold text-gray-800">{method}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => navigate('/orders')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            View Orders
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 rounded-lg border border-blue-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
