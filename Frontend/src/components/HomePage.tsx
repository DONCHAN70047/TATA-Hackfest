import React, { useState } from 'react';
import Header from './Header';
import InsuranceCard from './InsuranceCard';
import PdfUpload from './PdfUpload';
import ContactForm from './ContactForm';
import AiChatInterface from './AiChatInterface';
import { insuranceTypes } from '../data/insuranceTypes';
import { Shield, Users, Award, Clock, MessageCircle } from 'lucide-react';


const HomePage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Comprehensive Insurance Solutions
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Protect what matters most with our complete range of insurance services.
            Upload documents and get instant coverage verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="btn-secondary bg-white text-black hover:bg-gray-300">
              Explore Services
            </a>
            <a href="#upload" className="btn-secondary bg-white text-black hover:bg-gray-300">
              Upload Documents
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose InsurancePro?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive insurance solutions with cutting-edge technology and exceptional customer service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[Shield, Users, Award, Clock].map((Icon, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Feature {idx + 1}</h3>
                <p className="text-gray-400">Description for feature {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Services */}
      <section id="services" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Insurance Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Explore our comprehensive range of insurance products.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {insuranceTypes.map((insurance) => (
              <div
                key={insurance.id}
                className="group bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-primary-500 transition-all duration-300"
              >
                <InsuranceCard insurance={insurance} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Upload */}
      <section id="upload" className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <PdfUpload />
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section id="ai-chat" className="py-16 bg-black text-white text-center">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-300 transition"
          >
            <MessageCircle className="mr-2" />
            Need Help? Chat with us
          </button>
        ) : (
          <div className="max-w-4xl mx-auto">
            <AiChatInterface />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>&copy; 2025 InsurancePro. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;