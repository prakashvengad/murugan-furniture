// File: components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
              <h3 className="text-xl font-bold ml-3">Murugan Furniture</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Premium furniture and home appliances in Chennai since 1995
            </p>
            <div className="flex flex-wrap gap-4">
              {[/* Social icons */].map((_, i) => (
                <div key={i} className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-amber-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Categories', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-500 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-amber-700 pb-2">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">123 Furniture Street, T. Nagar</p>
              <p className="mb-2">Chennai, Tamil Nadu 600017</p>
              <p className="mb-2">Phone: +91 98765 43210</p>
              <p className="mb-2">Email: info@muruganfurniture.com</p>
              <p>Open: Mon-Sat 10AM-8PM</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-amber-700 pb-2">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for exclusive offers and new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full sm:flex-1 rounded-lg sm:rounded-r-none text-gray-800 focus:outline-none"
              />
              <button className="bg-amber-700 px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-amber-800 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Murugan Furniture & Home Appliances. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}