import ReactDOMServer from 'react-dom/server'
import { createElement } from 'react'

// Function to render React components to HTML string
export function renderEmailToHtml(Component: React.ComponentType<Record<string, unknown>>, props: Record<string, unknown>): string {
  try {
    const element = createElement(Component, props)
    return ReactDOMServer.renderToString(element)
  } catch (error) {
    console.error('Error rendering email component:', error)
    // Fallback to a simple HTML structure
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Content</h2>
        <p>There was an error rendering the email template.</p>
      </div>
    `
  }
}

// Function to create a complete HTML document
export function createEmailHtml(content: string, subject: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        /* Reset styles for email clients */
        body, table, td, p, a, li, blockquote {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
        /* Responsive design */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
          }
          .email-content {
            padding: 20px 10px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
      <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        ${content}
      </div>
    </body>
    </html>
  `
}
