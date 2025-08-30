import React from 'react'
import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Customer Service | ${APP_NAME}`,
  description: 'Get help with your orders, returns, and other inquiries.',
}

export const dynamic = 'force-dynamic'

export default function CustomerServicePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Customer Service</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">How Can We Help You?</h2>
          <p className="text-gray-700 mb-4">
            Our dedicated customer service team is here to assist you with any questions or concerns you may have.
            Below are some common topics that might help you find the information you need quickly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Shipping & Delivery</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>How long will it take to receive my order?</li>
                <li>Do you ship internationally?</li>
                <li>How can I track my package?</li>
                <li>What shipping methods do you offer?</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Returns & Exchanges</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>What is your return policy?</li>
                <li>How do I initiate a return?</li>
                <li>How long does the refund process take?</li>
                <li>Can I exchange an item for a different size or color?</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Orders & Payments</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>How can I check the status of my order?</li>
                <li>What payment methods do you accept?</li>
                <li>Can I modify or cancel my order after it is placed?</li>
                <li>Is it safe to use my credit card on your website?</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Product Information</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>How do I find my size?</li>
                <li>Are your products true to size?</li>
                <li>What materials are used in your products?</li>
                <li>How do I care for my purchase?</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Could not find what you were looking for? Our customer service team is available to assist you:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Email Support</h3>
              <p className="text-gray-700 mb-2">For general inquiries and non-urgent matters:</p>
              <a href="mailto:support@aldorahouse.com" className="text-blue-600 hover:underline">support@aldorahouse.com</a>
              <p className="text-gray-500 text-sm mt-2">We typically respond within 24 hours.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Phone Support</h3>
              <p className="text-gray-700 mb-2">For immediate assistance:</p>
              <p className="font-medium">1-800-ALDORA-H (1-800-253-6724)</p>
              <p className="text-gray-500 text-sm mt-2">Available Monday-Friday, 9am-6pm EST</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
          <p className="text-gray-700">
            At Aldora House, customer satisfaction is our top priority. We strive to provide exceptional service 
            and are committed to resolving any issues you may encounter. Your feedback helps us improve, 
            and we appreciate your trust in our brand.
          </p>
        </section>
      </div>
    </div>
  )
}