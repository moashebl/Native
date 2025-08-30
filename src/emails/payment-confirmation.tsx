import React from 'react'
import { IOrder } from '@/lib/db/models/order.model'

interface PaymentConfirmationEmailProps {
  order: IOrder
  siteName: string
  egpRate?: number
}

export default function PaymentConfirmationEmail({
  order,
  siteName,
  egpRate = 48.0, // Default fallback rate
}: PaymentConfirmationEmailProps) {
  const formatPrice = (price: number) => {
    // Convert USD to EGP using current API rate
    const egpPrice = price * egpRate
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP',
    }).format(egpPrice)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div style={{ 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#7c3aed', 
        padding: '30px 20px', 
        textAlign: 'center',
        borderBottom: '3px solid #8b5cf6'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '20px' }}>
          <img 
            src="https://native-house.com/icons/logo.svg" 
            alt="Native House Logo"
            style={{ 
              width: '80px', 
              height: '80px',
              margin: '0 auto 15px auto',
              display: 'block'
            }}
          />
        </div>
        <h1 style={{ 
          color: '#ffffff', 
          margin: '0',
          fontSize: '28px',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          {siteName}
        </h1>
        <p style={{ 
          color: '#e9d5ff', 
          margin: '8px 0 0 0',
          fontSize: '14px',
          fontWeight: '400'
        }}>
          Premium Clothing & Accessories
        </p>
      </div>
      
      {/* Main Content */}
      <div style={{ padding: '40px 30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            fontSize: '32px'
          }}>
            💳
          </div>
          <h2 style={{ 
            color: '#1f2937', 
            marginBottom: '15px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Payment Confirmed
          </h2>
          <p style={{ 
            color: '#6b7280', 
            margin: '0',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            Great news! Your payment has been successfully processed.
          </p>
        </div>
        
        {/* Payment Details */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '25px', 
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            color: '#1f2937', 
            marginTop: '0', 
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            💰 Payment Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                <strong>Order ID:</strong>
              </p>
              <p style={{ margin: '5px 0', color: '#374151', fontSize: '16px', fontWeight: '500' }}>
                #{order._id}
              </p>
            </div>
            <div>
              <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                <strong>Payment Date:</strong>
              </p>
              <p style={{ margin: '5px 0', color: '#374151', fontSize: '16px', fontWeight: '500' }}>
                {formatDate(new Date())}
              </p>
            </div>
            <div>
              <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                <strong>Payment Method:</strong>
              </p>
              <p style={{ margin: '5px 0', color: '#374151', fontSize: '16px', fontWeight: '500' }}>
                {order.paymentMethod}
              </p>
            </div>
            <div>
              <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                <strong>Total Amount:</strong>
              </p>
              <p style={{ margin: '5px 0', color: '#7c3aed', fontSize: '18px', fontWeight: '600' }}>
                {formatPrice(order.totalPrice)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <h3 style={{ 
          color: '#1f2937', 
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          🛍️ Order Items
        </h3>
        {order.items.map((item, index) => (
          <div key={index} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ marginRight: '20px' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  objectFit: 'cover', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: '0 0 10px 0', 
                color: '#1f2937',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                {item.name}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                  <strong>Category:</strong> {item.category}
                </p>
                {item.size && (
                  <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                    <strong>Size:</strong> {item.size}
                  </p>
                )}
                {item.color && (
                  <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                    <strong>Color:</strong> {item.color}
                  </p>
                )}
                <p style={{ margin: '5px 0', color: '#6b7280', fontSize: '14px' }}>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
              <p style={{ 
                margin: '0', 
                color: '#7c3aed', 
                fontSize: '18px',
                fontWeight: '600'
              }}>
                <strong>Price:</strong> {formatPrice(item.price)}
              </p>
            </div>
          </div>
        ))}
        
        {/* Order Summary */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '25px', 
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            color: '#1f2937', 
            marginTop: '0', 
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            📊 Order Summary
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>Items Total:</span>
            <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>{formatPrice(order.itemsPrice)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>Shipping:</span>
            <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>
              {order.shippingPrice === 0 ? 'FREE' : formatPrice(order.shippingPrice)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#6b7280', fontSize: '16px' }}>Tax:</span>
            <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>{formatPrice(order.taxPrice)}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '0', 
            borderTop: '2px solid #e2e8f0', 
            paddingTop: '15px', 
            fontWeight: 'bold' 
          }}>
            <span style={{ color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>Total Paid:</span>
            <span style={{ color: '#7c3aed', fontSize: '20px', fontWeight: '700' }}>{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
        
        {/* Next Steps */}
        <div style={{ 
          backgroundColor: '#f0f9ff', 
          padding: '25px', 
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #bae6fd'
        }}>
          <h3 style={{ 
            color: '#0369a1', 
            marginTop: '0', 
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            🚀 What&apos;s Next?
          </h3>
          <p style={{ 
            color: '#0369a1', 
            lineHeight: '1.6', 
            margin: '0',
            fontSize: '16px'
          }}>
            Your order is now confirmed and being processed! We&apos;ll send you updates about your order status, including when it ships and when it&apos;s delivered.
          </p>
        </div>
        
        <p style={{ 
          color: '#374151', 
          lineHeight: '1.6', 
          marginBottom: '20px',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          Best regards,<br />
          <strong>The {siteName} Team</strong>
        </p>
      </div>
      
      {/* Footer */}
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '30px 20px', 
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <img
              src="https://native-house.com/icons/logo.svg"
              alt="Native House Logo"
              style={{
                width: '60px',
                height: '60px',
                margin: '0 auto',
                display: 'block'
              }}
            />
          </div>
          <h3 style={{ 
            color: '#1f2937', 
            margin: '0 0 5px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Native
          </h3>
          <p style={{ 
            color: '#6b7280', 
            margin: '0',
            fontSize: '14px'
          }}>
            Premium Clothing & Accessories
          </p>
        </div>
        
        <div style={{ 
          fontSize: '12px', 
          color: '#9ca3af',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            This is an automated email. Please do not reply to this message.
          </p>
          <p style={{ margin: '0' }}>
            © 2025 Native, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
