"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link (you can replace this with a proper form submission handler)
    const mailtoLink = `mailto:padhaai2012@gmail.com?subject=Contact Form Submission&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-6 md:px-8 py-12 md:py-20">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 relative inline-block">
          Contact Us
          <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-red-600 mt-2"></span>
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">
              Get in touch with us
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-neutral-900">
                For donation, participation, or volunteering
              </h3>
              <p className="text-neutral-600">
                Contact Madhavi at{" "}
                <a
                  href="mailto:padhaai2012@gmail.com"
                  className="text-neutral-900 hover:text-neutral-600 underline transition-colors"
                >
                  padhaai2012@gmail.com
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-neutral-900">
                For student internship at Padhaai
              </h3>
              <p className="text-neutral-600">
                Send an email to{" "}
                <a
                  href="mailto:padhaai2012@gmail.com"
                  className="text-neutral-900 hover:text-neutral-600 underline transition-colors"
                >
                  padhaai2012@gmail.com
                </a>
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900">E-mail</h3>
              <a
                href="mailto:padhaai2012@gmail.com"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                padhaai2012@gmail.com
              </a>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900">Address</h3>
              <div className="text-neutral-600 leading-relaxed">
                <div className="font-medium text-neutral-900 mb-1">Padhaai</div>
                <div>
                  202, Hara Homes Apartments,<br />
                  Bhuvaneshwari Nagar,<br />
                  Banashankari 3rd Stage,<br />
                  Bangalore – 560085
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
                Your Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 mb-2">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="Your Phone Number"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-900 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

