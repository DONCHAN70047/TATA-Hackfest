import { InsuranceType } from '../types';

export const insuranceTypes: InsuranceType[] = [
  {
    id: 'life',
    name: 'Life Insurance',
    description: 'Comprehensive life insurance coverage to protect your family\'s financial future.',
    icon: '🛡️',
    features: [
      'Death benefit protection',
      'Cash value accumulation',
      'Flexible premium options',
      'Riders for additional coverage'
    ],
    coverage: [
      'Term Life Insurance',
      'Whole Life Insurance',
      'Universal Life Insurance',
      'Variable Life Insurance'
    ],
    benefits: [
      'Financial security for loved ones',
      'Tax-free death benefits',
      'Living benefits available',
      'Estate planning tool'
    ]
  },
  {
    id: 'car',
    name: 'Car Insurance',
    description: 'Complete auto insurance coverage for your vehicle and liability protection.',
    icon: '🚗',
    features: [
      'Liability coverage',
      'Collision protection',
      'Comprehensive coverage',
      'Uninsured motorist protection'
    ],
    coverage: [
      'Bodily Injury Liability',
      'Property Damage Liability',
      'Collision Coverage',
      'Comprehensive Coverage',
      'Personal Injury Protection'
    ],
    benefits: [
      'Legal protection',
      'Vehicle repair coverage',
      'Medical expense coverage',
      'Roadside assistance'
    ]
  },
  {
    id: 'travel',
    name: 'Travel Insurance',
    description: 'Protection for your trips with coverage for medical emergencies, trip cancellation, and more.',
    icon: '✈️',
    features: [
      'Trip cancellation coverage',
      'Medical emergency protection',
      'Baggage loss coverage',
      'Travel delay benefits'
    ],
    coverage: [
      'Trip Cancellation',
      'Emergency Medical',
      'Baggage Protection',
      'Travel Delay',
      'Accident Coverage'
    ],
    benefits: [
      'Peace of mind while traveling',
      'Emergency medical assistance',
      'Trip interruption protection',
      '24/7 travel support'
    ]
  },
  {
    id: 'disability',
    name: 'Disability Insurance',
    description: 'Income protection if you become unable to work due to illness or injury.',
    icon: '🦽',
    features: [
      'Income replacement',
      'Short-term disability',
      'Long-term disability',
      'Own occupation coverage'
    ],
    coverage: [
      'Short-term Disability',
      'Long-term Disability',
      'Own Occupation Coverage',
      'Partial Disability Benefits'
    ],
    benefits: [
      'Income protection',
      'Maintains lifestyle',
      'Covers medical expenses',
      'Peace of mind'
    ]
  },
  {
    id: 'health',
    name: 'Health Insurance',
    description: 'Comprehensive health coverage for medical expenses, prescriptions, and preventive care.',
    icon: '🏥',
    features: [
      'Medical expense coverage',
      'Prescription drug benefits',
      'Preventive care coverage',
      'Network provider access'
    ],
    coverage: [
      'Hospitalization',
      'Doctor Visits',
      'Prescription Drugs',
      'Preventive Care',
      'Mental Health Services'
    ],
    benefits: [
      'Affordable healthcare access',
      'Preventive care coverage',
      'Prescription drug savings',
      'Network discounts'
    ]
  },
  {
    id: 'property',
    name: 'Property Insurance',
    description: 'Protection for your home, belongings, and personal liability.',
    icon: '🏠',
    features: [
      'Home structure coverage',
      'Personal property protection',
      'Liability coverage',
      'Additional living expenses'
    ],
    coverage: [
      'Dwelling Coverage',
      'Personal Property',
      'Liability Protection',
      'Additional Living Expenses',
      'Other Structures'
    ],
    benefits: [
      'Home repair coverage',
      'Belongings protection',
      'Liability protection',
      'Temporary housing if needed'
    ]
  }
]; 