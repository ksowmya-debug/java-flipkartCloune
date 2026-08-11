import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';

const Payment = () => {
  // useState stores variables that, when changed, automatically update the screen.
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Read state passed from the Cart page
  const { totalAmount, itemCount, cartItems } = location.state || {};
  
  // If user refreshes the page or comes directly here without a cart, state will be missing
  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

  // Safety fallback while redirecting
  if (!location.state) return null;
  
  // Calculate the total amount using the quantity and price of each item
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const finalAmount = totalAmount + deliveryFee;

  const paymentMethods = [
    { id: 'UPI', label: 'UPI (PhonePe, GPay)' },
    { id: 'CARD', label: 'Credit / Debit / ATM Card' },
    { id: 'NET_BANKING', label: 'Net Banking' },
    { id: 'COD', label: 'Cash on Delivery' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.productId || item.id,
        productName: item.title || item.name,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.image || item.imageUrl
      }));

      const response = await axiosClient.post('/orders', { items: orderItems });
      
      // Clear redux cart
      dispatch(clearCart());

      navigate('/payment-success', { 
        state: { 
          amount: finalAmount, 
          method: selectedMethod,
          orderId: response.data.id
        } 
      });
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Payment Methods */}
        <div className="md:col-span-2">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-6 uppercase">Payment Options</h2>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className={`border rounded flex items-center p-4 cursor-pointer transition-colors ${selectedMethod === method.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-4 font-medium text-gray-700">{method.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`px-8 py-3 rounded text-white font-medium shadow-sm transition-all ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                {isProcessing ? 'Processing Payment...' : `PAY $${finalAmount.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded shadow sticky top-4">
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-500 uppercase">Price Details</h3>
            </div>
            
            <div className="p-4 space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Price ({itemCount} items)</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold mb-2">Selected Products:</h4>
                <ul className="text-sm space-y-2">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between text-gray-600">
                      <span className="truncate w-3/4">{item.quantity}x {item.title || item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-4 border-t border-dashed">
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total Payable</span>
                <span>${finalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            {deliveryFee === 0 && (
              <div className="p-4 border-t bg-green-50 rounded-b">
                <p className="text-green-600 font-medium text-sm">
                  Your total savings on this order is $40.00
                </p>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Payment;
