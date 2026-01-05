// File: components/FeaturedProducts.js
export default function FeaturedProducts() {
  const products = [
    { name: 'Royal Sofa Set', price: '₹42,999', category: 'Living Room' },
    { name: 'King Size Bed', price: '₹35,500', category: 'Bedroom' },
    { name: 'Dining Table Set', price: '₹28,750', category: 'Dining' },
    { name: 'Smart TV Unit', price: '₹18,999', category: 'Living Room' },
  ];

  return (
    <section id="products" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our handpicked selection of premium furniture and appliances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
              <div className="p-6">
                <span className="text-sm text-amber-700 font-medium">{product.category}</span>
                <h3 className="text-xl font-bold mt-1 mb-2 text-gray-800">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <button className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-amber-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-800 transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}