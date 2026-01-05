// File: components/Categories.js
export default function Categories() {
  const categories = [
    { name: 'Living Room', count: 120 },
    { name: 'Bedroom', count: 95 },
    { name: 'Dining & Kitchen', count: 78 },
    { name: 'Home Appliances', count: 210 },
    { name: 'Office Furniture', count: 45 },
    { name: 'Outdoor', count: 32 },
  ];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium furniture categories for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-amber-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  <p className="text-amber-700">{category.count} products</p>
                </div>
                <button className="ml-auto text-amber-700 hover:text-amber-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}