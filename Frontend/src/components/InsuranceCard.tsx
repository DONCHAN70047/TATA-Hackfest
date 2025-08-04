import React, { useState } from 'react';
import { InsuranceType } from '../types';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface InsuranceCardProps {
  insurance: InsuranceType;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ insurance }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{insurance.icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {insurance.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {insurance.description}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Features */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {insurance.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Coverage Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {insurance.coverage.map((coverage, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{coverage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {insurance.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-gray-200">
            <button className="btn-primary w-full">
              Get Quote for {insurance.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceCard; 