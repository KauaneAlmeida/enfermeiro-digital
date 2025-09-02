import React from 'react';
import { Star, Heart } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Ana Carolina',
      role: 'Filha da Sra. Maria',
      content: 'Desde que começamos a usar o Cuidador Digital, minha mãe nunca mais esqueceu de tomar os remédios. A tranquilidade que isso me trouxe é impagável.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Roberto Silva',
      role: 'Filho do Sr. João',
      content: 'O sistema é muito simples de usar. Meu pai, que tem 78 anos, consegue responder facilmente pelo WhatsApp. Os relatórios nos ajudam muito.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Márcia Oliveira',
      role: 'Cuidadora Profissional',
      content: 'Uso o Cuidador Digital para 5 idosos diferentes. O painel administrativo é fantástico e me permite acompanhar todos eles facilmente.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Famílias que confiam em nós
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Milhares de famílias já usam o Cuidador Digital para cuidar de quem amam
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <Heart className="w-5 h-5 text-red-400 ml-auto" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Junte-se a mais de 10.000 famílias</h3>
            <p className="text-blue-100 mb-6">
              Que já confiam no Cuidador Digital para cuidar de seus entes queridos
            </p>
            <div className="flex justify-center space-x-8">
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-blue-200 text-sm">Satisfação</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Suporte</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-blue-200 text-sm">Famílias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;