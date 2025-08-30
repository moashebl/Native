import React from 'react'
import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Help Center | ${APP_NAME}`,
  description: 'Find answers to common questions and get support.',
}

export const dynamic = 'force-dynamic'

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Creating an Account</h3>
              <p className="text-gray-700">
               To create an account, click on the account icon in the top right corner of the page and select Sign Up.
                Fill in your details and follow the instructions to complete the registration process.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Browsing Products</h3>
              <p className="text-gray-700">
                You can browse products by category using the navigation menu, or use the search bar to find specific items.
                Filter options are available to narrow down your search by price, color, size, and more.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Making a Purchase</h3>
              <p className="text-gray-700">
                Add items to your cart by clicking the Add to Cart button on product pages. When you are ready to checkout,
                click on the cart icon and follow the checkout process to complete your purchase.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Account Management</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Updating Your Profile</h3>
              <p className="text-gray-700">
                To update your profile information, go to your account settings by clicking on the account icon
                and selecting Account. From there, you can edit your personal details, change your password,
                and manage your addresses.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Viewing Order History</h3>
              <p className="text-gray-700">
                To view your order history, go to your account and select Orders. Here you can see details of all your
                past orders, track current orders, and request returns if needed.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Payment & Shipping</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Payment Methods</h3>
              <p className="text-gray-700">
                We accept various payment methods including credit/debit cards, PayPal, and cash on delivery (where available).
                All transactions are secure and your payment information is never stored on our servers.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Shipping Information</h3>
              <p className="text-gray-700">
                Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout.
                You can track your order using the tracking number provided in your shipping confirmation email.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Returns & Refunds</h3>
              <p className="text-gray-700">
                If you are not satisfied with your purchase, you can return it within 30 days for a full refund.
                Visit the Orders section in your account to initiate a return. Please note that items must be
                in their original condition with tags attached.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Technical Support</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Browser Compatibility</h3>
              <p className="text-gray-700">
                Our website works best with the latest versions of Chrome, Firefox, Safari, and Edge.
                If you are experiencing issues, try updating your browser or clearing your cache.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Mobile App</h3>
              <p className="text-gray-700">
                Our mobile app is available for download on iOS and Android devices. It offers a seamless shopping
                experience with additional features like push notifications for order updates and exclusive mobile-only deals.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Still Need Help?</h2>
          <p className="text-gray-700 mb-4">
            If you couldnt find the answer you were looking for, please contact our customer service team:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Email Us</h3>
              <a href="mailto:n8v.store@gmail.com" className="text-blue-600 hover:underline">n8v.store@gmail.com</a>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Call Us</h3>
              <p className="font-medium">1-800-ALDORA-H (1-800-253-6724)</p>
              <p className="text-gray-500 text-sm">Available Monday-Friday, 9am-6pm EST</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}