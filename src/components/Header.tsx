import React from 'react';
import { Heart, Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cuidador Digital</h1>
              <p className="text-sm text-gray-600">Cuidado inteligente 24/7</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre
              </a>
              <a href="#como-funciona" className="text-gray-600 hover:text-blue-600 transition-colors">
                Como Funciona
              </a>
              <a href="#cadastro" className="text-gray-600 hover:text-blue-600 transition-colors">
                Cadastro
              </a>
            </nav>
            
            <div className="flex items-center space-x-2 text-blue-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">(11) 99999-9999</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;