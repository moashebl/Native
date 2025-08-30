import React from 'react'
import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `About Us | ${APP_NAME}`,
  description: 'Learn more about our company, mission, and values.',
}

export const dynamic = 'force-dynamic'

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2023, Aldora House started with a simple mission: to provide high-quality, stylish products at affordable prices. 
            What began as a small online store has grown into a trusted destination for fashion enthusiasts looking for the latest trends.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700">
            At Aldora , we believe that everyone deserves to look and feel their best without breaking the bank. 
            Our mission is to make fashion accessible to all by offering carefully curated collections that combine quality, 
            style, and affordability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Quality:</strong> We carefully select each product to ensure it meets our high standards.</li>
            <li><strong>Affordability:</strong> We believe great style shouldnt come with a hefty price tag.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our priority, and we strive to provide exceptional service.</li>
            <li><strong>Sustainability:</strong> We are committed to reducing our environmental impact through responsible practices.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
          <p className="text-gray-700">
            Behind Aldora House is a passionate team of fashion enthusiasts, tech experts, and customer service professionals 
            dedicated to bringing you the best shopping experience possible. We work tirelessly to stay ahead of trends, 
            improve our platform, and ensure your satisfaction with every purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700">
            Have questions or feedback? We would love to hear from you! Reach out to our customer service team at 
            <a href="mailto:support@aldorahouse.com" className="text-blue-600 hover:underline"> support@aldorahouse.com</a> or 
            call us at <span className="font-medium">1-800-ALDORA-H</span>.
          </p>
        </section>
      </div>
    </div>
  )
}