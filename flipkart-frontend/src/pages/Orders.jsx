import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosClient.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 mt-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#f1f3f6] min-h-[calc(100vh-40px)] w-full flex flex-col pt-8">
        <div className="w-full max-w-[1248px] mx-auto bg-white shadow-sm rounded-sm flex flex-col items-center justify-center py-16 mb-8">
          <img 
            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
            alt="No Orders" 
            className="w-[200px] mb-6" 
          />
          <h2 className="text-[18px] font-medium text-gray-800 mb-2">No orders found</h2>
          <p className="text-[12px] text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
          <Link 
            to="/" 
            className="bg-[#2874f0] text-white px-16 py-2.5 shadow-sm text-[14px] font-medium rounded-sm hover:bg-blue-600 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 mt-2 bg-[#f1f3f6] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 shadow-sm rounded-sm">
            <div className="flex justify-between border-b pb-4 mb-4">
              <span className="font-semibold text-gray-700">Order ID: {order.id}</span>
              <span className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-6 mb-4">
                <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-contain" />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 hover:text-[#2874f0] cursor-pointer">{item.productName}</h3>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  <div className="font-bold mt-1 text-gray-800">₹{item.price}</div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between border-t pt-4 mt-2 font-bold text-gray-800">
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>
            <div className="text-green-600 font-semibold mt-2">
              Status: {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
