import { useEffect, useState } from 'react';
import CategoryIconsRow from '../components/CategoryIconsRow';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import axiosClient from '../api/axiosClient';

const generateGridProducts = () => [
  {
    id: 'g-1',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'selloria',
    title: 'DIGITAL KIDS-BOYS-G-SPO...',
    rating: 4.1,
    reviews: 97499,
    originalPrice: 999,
    price: 147,
    offerText: '+126 with Bank offer + more'
  },
  {
    id: 'g-2',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'Freqcty',
    title: 'Plastic Bread Container - 150...',
    rating: 4.2,
    reviews: 3642,
    originalPrice: 1599,
    price: 262,
    offerText: '+162 with UPI offer + more',
    tag: 'Value 365'
  },
  {
    id: 'g-3',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'SNWARIYAENT',
    title: 'Men Regular Fit Solid ...',
    rating: 4.1,
    reviews: 135,
    originalPrice: 999,
    price: 260,
    offerText: '+160 with UPI offer + more',
    tag: 'Value 365'
  },
  {
    id: 'g-4',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'Ai+',
    title: 'Pulse 2 (Blue, 64 GB)',
    rating: 4.2,
    reviews: 7797,
    originalPrice: 10999,
    price: 9499,
    offerText: '+8,572 with Bank offer',
    tag: 'Value 365'
  },
  {
    id: 'g-5',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'Titan',
    title: 'Analog Watch - For Men',
    rating: 4.4,
    reviews: 1250,
    originalPrice: 3499,
    price: 1299,
    tag: 'Value 365'
  },
  {
    id: 'g-6',
    image: '/camping_tent.jpg',
    brand: 'Wildcraft',
    title: 'Camping Tent 2 Person',
    rating: 4.0,
    reviews: 890,
    originalPrice: 2999,
    price: 1499,
    tag: 'Value 365'
  },
  {
    id: 'g-7',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'HomeTown',
    title: 'Engineered Wood Coffee Table',
    rating: 4.3,
    reviews: 450,
    originalPrice: 5999,
    price: 2499,
    tag: 'Value 365'
  },
  {
    id: 'g-8',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300',
    brand: 'NIKE',
    title: 'Revolution 5 Running Shoes',
    rating: 4.5,
    reviews: 12000,
    originalPrice: 3695,
    price: 2195,
  }
];

const topSectionProducts = [
  { image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300&h=300', title: 'New Range', subtitle: 'Special offer' },
  { image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=300&h=300', title: 'Watches', subtitle: 'Upto 70% off' },
  { image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=300&h=300', title: 'Grab Big Discounts!', subtitle: 'Min.40% Off' },
  { image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=300&h=300', title: 'Cello, Milton & more', subtitle: 'From ₹99' }
];

const bottomSectionProducts = [
  { image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=300&h=300', title: 'Best Selling', subtitle: 'Up to 50% Off' },
  { image: '/oneplus_ad.jpg', title: 'OnePlus', subtitle: 'Special Offers' },
  { image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=300&h=300', title: 'Storage Devices', subtitle: 'From ₹499' },
  { image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=300&h=300', title: 'Smart Watches', subtitle: 'Min 30% Off' }
];

function Home() {
  const [gridProducts, setGridProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get('/products');
        const mappedProducts = response.data.map(p => ({
          ...p,
          title: p.name,
          image: p.imageUrl,
        }));
        setGridProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setGridProducts(generateGridProducts());
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pb-8 w-full max-w-[1248px] mx-auto px-2 sm:px-4 bg-transparent">
      <CategoryIconsRow />
      
      {/* Auto-Scrolling Hero Section */}
      <HeroSection />

      {/* Top Element: Add to your wishlist (In Demand) */}
      <ProductSection 
        title="Add to your wishlist" 
        products={topSectionProducts} 
        bgClass="bg-[#ff9f43]"
      />

      {/* Modern Product Grid Layout */}
      {loading ? (
        <div className="flex justify-center items-center h-48 mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2874f0]"></div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {gridProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      {/* Bottom Element: Trending Gadgets & Appliances */}
      <ProductSection 
        title="Trending Gadgets & Appliances" 
        products={bottomSectionProducts} 
        bgClass="bg-[#82b1ff]"
      />
    </div>
  );
}
export default Home;
