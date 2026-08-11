import { Heart, Shirt, Smartphone, Monitor, Sparkles, Home, Tv, ToyBrick, Utensils, Car, Dumbbell, Sofa, BookOpen, Bike } from 'lucide-react';

const categories = [
  { label: "For You", icon: <Heart size={24} />, active: true },
  { label: "Fashion", icon: <Shirt size={24} /> },
  { label: "Mobiles", icon: <Smartphone size={24} /> },
  { label: "Electronics", icon: <Monitor size={24} /> },
  { label: "Beauty", icon: <Sparkles size={24} /> },
  { label: "Home", icon: <Home size={24} /> },
  { label: "Appliances", icon: <Tv size={24} /> },
  { label: "Toys, ba...", icon: <ToyBrick size={24} /> },
  { label: "Food & H...", icon: <Utensils size={24} /> },
  { label: "Auto Acc...", icon: <Car size={24} /> },
  { label: "Sports & ...", icon: <Dumbbell size={24} /> },
  { label: "Furniture", icon: <Sofa size={24} /> },
  { label: "Books & ...", icon: <BookOpen size={24} /> },
  { label: "2 Wheele...", icon: <Bike size={24} /> },
];

function CategoryIconsRow() {
  return (
    <section className="bg-white shadow-sm border-b overflow-x-auto no-scrollbar w-full">
      <div className="w-full">
        <div className="flex items-center space-x-8 sm:space-x-12 py-3">
          {categories.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center min-w-fit cursor-pointer group pb-2 border-b-2 transition-colors
                \${item.active ? 'border-blue-600' : 'border-transparent hover:border-blue-600'}`}
            >
              <div className={`mb-1 \${item.active ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                {item.icon}
              </div>
              <span className={`text-[13px] font-semibold whitespace-nowrap \${item.active ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default CategoryIconsRow;
