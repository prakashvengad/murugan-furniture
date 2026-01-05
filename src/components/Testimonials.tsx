"use client";
// File: components/Testimonials.js
export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Home Owner",
      content: "Bought a complete living room set. The quality exceeded my expectations and the installation team was professional. 5-year warranty gives me peace of mind!",
      rating: 5
    },
    {
      name: "Priya Venkat",
      role: "Interior Designer",
      content: "My go-to place for client projects. Their custom furniture service helped me create unique pieces that perfectly matched my design vision.",
      rating: 5
    },
    {
      name: "Arun Mehta",
      role: "Office Manager",
      content: "Furnished our entire startup office with Murugan's ergonomic furniture. The EMI option made it budget-friendly without compromising quality.",
      rating: 4
    }
  ];

  // Generate star rating
  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join 5,000+ satisfied customers who transformed their homes with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-amber-500 text-2xl mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-amber-700">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex space-x-2">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-amber-700' : 'bg-amber-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}