function Footer() {
  return (
    <footer className="bg-[#172337] text-white pt-12 pb-6 text-xs mt-8">
      <div className="container mx-auto px-4 flex flex-wrap gap-8 justify-between border-b border-gray-600 pb-8">
        <div className="w-full sm:w-auto">
          <h4 className="text-gray-400 mb-3 font-semibold text-[11px] tracking-wider uppercase">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline hover:text-white font-medium">Contact Us</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">About Us</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">Careers</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto">
          <h4 className="text-gray-400 mb-3 font-semibold text-[11px] tracking-wider uppercase">Help</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline hover:text-white font-medium">Payments</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">Shipping</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">Cancellation & Returns</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto">
          <h4 className="text-gray-400 mb-3 font-semibold text-[11px] tracking-wider uppercase">Consumer Policy</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline hover:text-white font-medium">Return Policy</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">Terms Of Use</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">Security</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto">
          <h4 className="text-gray-400 mb-3 font-semibold text-[11px] tracking-wider uppercase">Social</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline hover:text-white font-medium">Facebook</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">Twitter</a></li>
            <li><a href="#" className="hover:underline hover:text-white font-medium">YouTube</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-600 sm:pl-8 pt-4 sm:pt-0">
          <h4 className="text-gray-400 mb-3 font-semibold text-[11px] tracking-wider uppercase">Mail Us:</h4>
          <p className="text-gray-300 leading-tight font-medium">Flipkart Internet Private Limited,<br/> Buildings Alyssa, Begonia &<br/> Clove Embassy Tech Village,<br/> Outer Ring Road, Devarabeesanahalli Village,<br/> Bengaluru, 560103,<br/> Karnataka, India</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-6 text-center text-gray-300 flex flex-wrap justify-center gap-6 font-medium">
        <span>© 2007-2024 Flipkart.com</span>
        <span className="hover:underline cursor-pointer">Need help? Visit the Help Center</span>
      </div>
    </footer>
  );
}
export default Footer;
