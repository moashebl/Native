import React from 'react'
import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Privacy Policy | ${APP_NAME}`,
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export const dynamic = 'force-dynamic'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <p className="text-gray-700 mb-4">
            Last Updated: May 1, 2023
          </p>
          <p className="text-gray-700">
            At Aldora House, we respect your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
            or make a purchase from us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-gray-700 mb-3">
            We collect information that you provide directly to us, such as when you create an account, make a purchase,
            sign up for our newsletter, contact customer service, or interact with our website. This information may include:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Personal identifiers (name, email address, phone number)</li>
            <li>Billing and shipping address</li>
            <li>Payment information (credit card details, though we do not store complete credit card information)</li>
            <li>Account credentials</li>
            <li>Order history and preferences</li>
            <li>Communications with our customer service team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-gray-700 mb-3">
            We use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Create and manage your account</li>
            <li>Provide customer service and respond to inquiries</li>
            <li>Send transactional emails (order confirmations, shipping updates)</li>
            <li>Send marketing communications (if you have opted in)</li>
            <li>Improve our website and product offerings</li>
            <li>Detect and prevent fraud or unauthorized access</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Cookies and Tracking Technologies</h2>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
            Cookies are files with a small amount of data that may include an anonymous unique identifier.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Sharing Your Information</h2>
          <p className="text-gray-700 mb-3">
            We may share your personal information with:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Service providers who perform services on our behalf (payment processors, shipping companies)</li>
            <li>Business partners with your consent</li>
            <li>Law enforcement or other parties when required by law or to protect our rights</li>
          </ul>
          <p className="text-gray-700 mt-3">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect the security of your personal information.
            However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
            While we strive to use commercially acceptable means to protect your personal information,
            we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
          <p className="text-gray-700 mb-3">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p className="text-gray-700 mt-3">
            To exercise these rights, please contact us using the information provided in the Contact Us section below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the Last Updated date. You are advised to review this
            Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
            <a href="mailto:n8v.store@gmail.com" className="text-blue-600 hover:underline ml-1">n8v.store@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}