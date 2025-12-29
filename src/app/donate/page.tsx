"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactElement;
  description: string;
  color: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "credit-card",
    name: "Credit/Debit Card",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    description: "Secure payment via Visa, Mastercard, or RuPay",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "upi",
    name: "UPI",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    description: "Pay using PhonePe, Google Pay, Paytm, or any UPI app",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "Transfer directly from your bank account",
    color: "from-green-500 to-green-600",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    description: "Direct bank transfer via NEFT/RTGS/IMPS",
    color: "from-orange-500 to-orange-600",
  },
];

const presetAmounts = [500, 1000, 2500, 5000, 10000];

export default function DonatePage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAmountClick = (value: number) => {
    setAmount(value.toString());
    setCustomAmount(false);
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setCustomAmount(true);
  };

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your payment gateway
    console.log("Donation details:", {
      amount,
      paymentMethod: selectedPayment,
      donorName,
      email,
      phone,
    });
    // Redirect to payment gateway or show success message
    alert(`Redirecting to ${selectedPayment} payment gateway...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 relative inline-block">
            Support Our Mission
            <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-red-600 mt-2 mx-auto right-0"></span>
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto mt-6">
            Your contribution helps us provide educational opportunities to children in need. Every donation makes a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Donation Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-neutral-200">
              <h2 className="text-2xl font-medium mb-6">Make a Donation</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-3">
                    Select Amount (₹)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {presetAmounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAmountClick(value)}
                        className={`
                          px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-200
                          ${
                            amount === value.toString() && !customAmount
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                          }
                        `}
                      >
                        ₹{value.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount ? amount : ""}
                      onChange={handleCustomAmount}
                      onFocus={() => setCustomAmount(true)}
                      className="w-full pl-8 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      min="1"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        placeholder="+91 1234567890"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handlePaymentSelection(option.id)}
                        className={`
                          p-4 rounded-lg border-2 transition-all duration-200 text-left
                          ${
                            selectedPayment === option.id
                              ? "border-red-500 bg-red-50 shadow-md"
                              : "border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
                          }
                        `}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} text-white flex items-center justify-center mb-2`}>
                          {option.icon}
                        </div>
                        <div className="font-medium text-neutral-900 text-sm mb-1">{option.name}</div>
                        <div className="text-xs text-neutral-500">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!amount || !selectedPayment || !donorName || !email || !phone}
                  className={`
                    w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200
                    ${
                      !amount || !selectedPayment || !donorName || !email || !phone
                        ? "bg-neutral-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    }
                  `}
                >
                  Donate ₹{amount ? parseInt(amount).toLocaleString() : "0"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Impact Section */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 md:p-8 border border-red-100">
              <h3 className="text-xl font-medium mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">₹500</div>
                    <div className="text-sm text-neutral-600">Provides school supplies for 2 children</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">₹2,500</div>
                    <div className="text-sm text-neutral-600">Sponsors one child's education for a month</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">₹10,000</div>
                    <div className="text-sm text-neutral-600">Establishes a library corner in a school</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-neutral-200">
              <h3 className="text-xl font-medium mb-4">Direct Bank Transfer</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Account Name</span>
                  <span className="font-medium text-neutral-900">Padhaai Trust</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Account Number</span>
                  <span className="font-medium text-neutral-900">1234567890</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Bank</span>
                  <span className="font-medium text-neutral-900">State Bank of India</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">IFSC Code</span>
                  <span className="font-medium text-neutral-900">SBIN0001234</span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("1234567890");
                      alert("Account number copied!");
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Copy Account Number →
                  </button>
                </div>
              </div>
            </div>

            {/* Tax Benefits */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Tax Benefits</h4>
                  <p className="text-sm text-blue-700">
                    Donations to Padhaai Trust are eligible for tax deduction under Section 80G of the Income Tax Act. You'll receive a receipt for your donation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
