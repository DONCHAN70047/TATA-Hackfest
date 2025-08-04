import React, { useState, useCallback } from 'react';
import { InsuranceType } from '../types';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface InsuranceCardProps {
  insurance: InsuranceType;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ insurance }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {/* Header */}
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
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={`Toggle details for ${insurance.name}`}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 space-y-6">
          <DetailSection title="Key Features">
            {insurance.features.map((feature, index) => (
              <DetailItem
                key={index}
                icon={<CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                text={feature}
              />
            ))}
          </DetailSection>

          <DetailSection title="Coverage Options">
            {insurance.coverage.map((coverage, index) => (
              <DetailItem
                key={index}
                icon={<Dot color="primary" />}
                text={coverage}
              />
            ))}
          </DetailSection>

          <DetailSection title="Benefits">
            {insurance.benefits.map((benefit, index) => (
              <DetailItem
                key={index}
                icon={<Dot color="green" />}
                text={benefit}
              />
            ))}
          </DetailSection>

          {/* CTA */}
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


const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="text-lg font-medium text-gray-900 mb-3">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">{children}</div>
  </div>
);

const DetailItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-sm text-gray-700">{text}</span>
  </div>
);

const Dot: React.FC<{ color: 'primary' | 'green' }> = ({ color }) => {
  const bgColor = color === 'primary' ? 'bg-primary-500' : 'bg-green-500';
  return <div className={`w-2 h-2 ${bgColor} rounded-full flex-shrink-0`} />;
};