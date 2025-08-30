import React from 'react'
import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Conditions of Use | ${APP_NAME}`,
  description: 'Terms and conditions for using our website and services.',
}

export const dynamic = 'force-dynamic'

export default function ConditionsOfUsePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Conditions of Use</h1>
      
      <div className="space-y-6">
        <section>
          <p className="text-gray-700 mb-4">
            Last Updated: May 1, 2023
          </p>
          <p className="text-gray-700">
            Welcome to Aldora House. By accessing and using this website, you accept and agree to be bound by the
            terms and provisions of this agreement. If you do not agree to abide by the terms and conditions below,
            please do not use this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Use License</h2>
          <p className="text-gray-700" style={{ whiteSpace: 'pre-line' }}>
            Permission is granted to temporarily download one copy of the materials on Aldora  website for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license
            you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display;
            attempt to decompile or reverse engineer any software contained on Aldora Houses website; remove any copyright or
            other proprietary notations from the materials; or transfer the materials to another person or mirror the
            materials on any other server.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Disclaimer</h2>
          <p className="text-gray-700">
            The materials on Aldora  website are provided on an as is basis. Aldora House makes no warranties,
            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
            of intellectual property or other violation of rights. Further, Aldora House does not warrant or make any
            representations concerning the accuracy, likely results, or reliability of the use of the materials on its
            website or otherwise relating to such materials or on any sites linked to this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Limitations</h2>
          <p className="text-gray-700">
            In no event shall Aldora House or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use
            the materials on Aldora  website, even if Aldora House or a Aldora House authorized representative has
            been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow
            limitations on implied warranties, or limitations of liability for consequential or incidental damages, these
            limitations may not apply to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Accuracy of Materials</h2>
          <p className="text-gray-700">
            The materials appearing on Aldora website could include technical, typographical, or photographic errors.
            Aldora House does not warrant that any of the materials on its website are accurate, complete, or current.
            Aldora House may make changes to the materials contained on its website at any time without notice. However,
            Aldora House does not make any commitment to update the materials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Links</h2>
          <p className="text-gray-700">
            Aldora House has not reviewed all of the sites linked to its website and is not responsible for the contents of
            any such linked site. The inclusion of any link does not imply endorsement by Aldora House of the site.
            Use of any such linked website is at the  own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Modifications</h2>
          <p className="text-gray-700">
            Aldora House may revise these terms of service for its website at any time without notice. By using this website,
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
          <p className="text-gray-700">
            These terms and conditions are governed by and construed in accordance with the laws of the United States,
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Purchases</h2>
          <p className="text-gray-700">
            All purchases through our site are governed by our Terms of Sale, which are hereby incorporated into these
            Terms of Service. By placing an order, you agree to be bound by the Terms of Sale, which include policies
            regarding shipping, returns, refunds, and payment methods.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. User Accounts</h2>
          <p className="text-gray-700">
            When you create an account with us, you must provide accurate, complete, and current information at all times.
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            You are responsible for safeguarding the password that you use to access the service and for any activities or
            actions under your password. You agree not to disclose your password to any third party. You must notify us
            immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at:
            <a href="mailto:legal@aldorahouse.com" className="text-blue-600 hover:underline ml-1">legal@aldorahouse.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}