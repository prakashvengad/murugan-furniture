// File: components/Services.js
export default function Services() {
  const services = [
    {
      title: "Free Home Consultation",
      description: "Our experts visit your home to suggest perfect furniture solutions",
      icon: "📐"
    },
    {
      title: "Installation Service",
      description: "Professional assembly and installation by our trained team",
      icon: "🔧"
    },
    {
      title: "5-Year Warranty",
      description: "Comprehensive warranty on all our premium products",
      icon: "🛡️"
    },
    {
      title: "EMI Options",
      description: "Easy financing options with 0% interest EMI",
      icon: "💳"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Premium Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beyond furniture - we provide complete home solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-amber-50 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Book a Free Home Consultation</h3>
          <p className="max-w-2xl mx-auto mb-6 text-amber-100">
            Our interior expert will visit your home, understand your requirements, and suggest the perfect furniture solutions
          </p>
          <button className="bg-white text-amber-800 px-8 py-3 rounded-lg font-bold hover:bg-amber-100 transition">
            Schedule Now
          </button>
        </div>
      </div>
    </section>
  );
}