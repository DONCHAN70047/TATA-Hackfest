# Insurance Customer Services Application

A comprehensive React TypeScript application for insurance customer services, featuring document upload functionality and coverage verification.

## Features

### Insurance Services
- **Life Insurance** - Comprehensive life coverage with death benefits and cash value accumulation
- **Car Insurance** - Auto insurance with liability, collision, and comprehensive coverage
- **Travel Insurance** - Trip protection with medical emergency and cancellation coverage
- **Disability Insurance** - Income protection for illness or injury
- **Health Insurance** - Medical coverage with prescription and preventive care benefits
- **Property Insurance** - Home and belongings protection with liability coverage

### Document Upload System
- Drag & drop PDF upload functionality
- Real-time document processing simulation
- Insurance type categorization
- Coverage availability verification
- File status tracking with visual indicators

### Customer Service Features
- Interactive contact form
- 24/7 support information
- Service comparison tools
- Responsive design for all devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **PDF Processing**: React PDF (for future enhancements)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd customer-services
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and branding
│   ├── InsuranceCard.tsx # Individual insurance service cards
│   ├── PdfUpload.tsx   # Document upload functionality
│   └── ContactForm.tsx # Customer contact form
├── data/               # Static data and configurations
│   └── insuranceTypes.ts # Insurance service definitions
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Components

### InsuranceCard
- Expandable cards showing insurance service details
- Features, coverage options, and benefits display
- Interactive elements with smooth animations

### PdfUpload
- Drag & drop file upload interface
- File type validation (PDF only)
- Real-time processing simulation
- Status tracking with visual feedback

### ContactForm
- Comprehensive contact form with validation
- Insurance type selection
- Form submission simulation
- Success/error state handling

## Customization

### Adding New Insurance Types
1. Edit `src/data/insuranceTypes.ts`
2. Add new insurance type object with required properties
3. Update the contact form options if needed

### Styling
- Uses Tailwind CSS for styling
- Custom color scheme defined in `tailwind.config.js`
- Responsive design with mobile-first approach

### Configuration
- Update contact information in `ContactForm.tsx`
- Modify company branding in `Header.tsx`
- Adjust upload settings in `PdfUpload.tsx`

## Future Enhancements

- Real PDF processing and text extraction
- User authentication and account management
- Quote generation system
- Claims filing functionality
- Payment processing integration
- Multi-language support
- Advanced analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@insurancepro.com
- Phone: 1-800-INSURANCE
- Business Hours: Monday - Friday 8AM - 8PM EST 