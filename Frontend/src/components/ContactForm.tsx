import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        insuranceType: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get in touch with our insurance experts for personalized quotes, claims assistance, or any questions about our services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">1-800-INSURANCE</p>
                  <p className="text-sm text-gray-500">24/7 Customer Support</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">support@insurancepro.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">123 Insurance Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="text-gray-600">Monday - Friday: 8AM - 8PM</p>
                  <p className="text-gray-600">Saturday: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 24/7 Customer Support</li>
              <li>• Fast Claims Processing</li>
              <li>• Competitive Premiums</li>
              <li>• Comprehensive Coverage Options</li>
              <li>• Expert Insurance Advisors</li>
              <li>• Online Document Management</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Type
                  </label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select insurance type</option>
                    <option value="life">Life Insurance</option>
                    <option value="car">Car Insurance</option>
                    <option value="travel">Travel Insurance</option>
                    <option value="disability">Disability Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="property">Property Insurance</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell us about your insurance needs or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 