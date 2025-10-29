import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpForm, setHelpForm] = useState({ name: '', email: '', phone: '', issue: '', message: '' });
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const cancelOrder = () => {
    if (!cancelReason) {
      alert('Please select a reason for cancellation');
      return;
    }
    
    const updatedOrders = orders.map(order => 
      order.id === selectedOrderId ? { 
        ...order, 
        status: 'Cancelled',
        cancelReason: cancelReason,
        cancelDate: new Date().toLocaleDateString('en-IN')
      } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    setShowCancelModal(false);
    setSelectedOrderId(null);
    setCancelReason('');
  };

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const submitHelpRequest = () => {
    if (!helpForm.name || !helpForm.email || !helpForm.issue || !helpForm.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Store help request
    const helpRequest = {
      ...helpForm,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN'),
      status: 'Submitted'
    };
    
    const existingRequests = JSON.parse(localStorage.getItem('helpRequests') || '[]');
    existingRequests.push(helpRequest);
    localStorage.setItem('helpRequests', JSON.stringify(existingRequests));
    
    alert('Help request submitted! Our team will contact you within 24 hours.');
    setShowHelpModal(false);
    setHelpForm({ name: '', email: '', phone: '', issue: '', message: '' });
  };

  const openTrackModal = (order) => {
    setTrackingOrder(order);
    setShowTrackModal(true);
  };

  const getTrackingSteps = (order) => {
    const steps = [
      { status: 'Order Placed', completed: true, date: order.date },
      { status: 'Order Confirmed', completed: true, date: order.date },
      { status: 'Preparing for Shipment', completed: order.status !== 'Confirmed', date: order.status !== 'Confirmed' ? order.date : null },
      { status: 'Shipped', completed: ['Shipped', 'Delivered'].includes(order.status), date: ['Shipped', 'Delivered'].includes(order.status) ? order.date : null },
      { status: 'Out for Delivery', completed: order.status === 'Delivered', date: order.status === 'Delivered' ? order.date : null },
      { status: 'Delivered', completed: order.status === 'Delivered', date: order.status === 'Delivered' ? order.date : null }
    ];
    return steps;
  };

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Sort orders by date/id in descending order (newest first)
    const sortedOrders = savedOrders.sort((a, b) => b.id - a.id);
    setOrders(sortedOrders);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#28a745';
      case 'shipped': return '#007bff';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getDeliveryDate = (orderDate, status) => {
    let date;
    
    // Handle different date formats
    if (typeof orderDate === 'string') {
      // Try parsing DD/MM/YYYY format first
      const parts = orderDate.split('/');
      if (parts.length === 3) {
        date = new Date(parts[2], parts[1] - 1, parts[0]); // Year, Month-1, Day
      } else {
        date = new Date(orderDate);
      }
    } else {
      date = new Date(orderDate);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      date = new Date(); // Fallback to current date
    }
    
    if (status && status.toLowerCase() === 'delivered') {
      return date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
    
    // Add 7-10 days (using 8 days as average)
    date.setDate(date.getDate() + 8);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const generateInvoice = (order) => {
    const invoiceWindow = window.open('', '_blank');
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - Order #${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .invoice-header { text-align: center; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #333; }
          .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .invoice-table th { background-color: #f8f9fa; }
          .total-section { text-align: right; margin-top: 20px; }
          .total-row { margin: 5px 0; }
          .grand-total { font-weight: bold; font-size: 18px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="company-name">Fashion Shop Q</div>
          <p>Your Fashion Destination</p>
        </div>
        
        <div class="invoice-details">
          <div>
            <h3>Invoice Details</h3>
            <p><strong>Invoice #:</strong> INV-${order.id}</p>
            <p><strong>Order #:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          <div>
            <h3>Delivery Address</h3>
            <p>${order.address?.firstName || 'Customer'} ${order.address?.lastName || ''}</p>
            <p>${order.address?.address || 'Address not available'}</p>
            <p>${order.address?.city || ''}, ${order.address?.state || ''} ${order.address?.pincode || ''}</p>
            <p>Phone: ${order.address?.phone || 'N/A'}</p>
          </div>
        </div>
        
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>1</td>
                <td>${item.price}</td>
                <td>${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="total-section">
          <div class="total-row">Subtotal: ₹${order.subtotal || 0}</div>
          <div class="total-row">GST (18%): ₹${order.tax || 0}</div>
          <div class="total-row">Shipping: ${order.shipping === 0 ? 'FREE' : '₹' + (order.shipping || 0)}</div>
          <div class="total-row grand-total">Total: ₹${order.total || 0}</div>
          <div class="total-row">Payment Method: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p>Thank you for shopping with Fashion Shop Q!</p>
          <p>Expected Delivery: ${getDeliveryDate(order.date, order.status)}</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase() === activeTab;
  });

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track, return, or buy things again</p>
        </div>
        <div className="empty-orders">
          <div className="empty-orders-icon">📦</div>
          <h2>No orders yet</h2>
          <p>Looks like you haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button className="start-shopping-btn" onClick={() => window.location.href = '/'}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>{orders.length} order{orders.length > 1 ? 's' : ''} placed</p>
      </div>

      <div className="orders-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders ({orders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'confirmed' ? 'active' : ''}`}
          onClick={() => setActiveTab('confirmed')}
        >
          Confirmed ({orders.filter(o => o.status.toLowerCase() === 'confirmed').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipped')}
        >
          Shipped ({orders.filter(o => o.status.toLowerCase() === 'shipped').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered ({orders.filter(o => o.status.toLowerCase() === 'delivered').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled ({orders.filter(o => o.status.toLowerCase() === 'cancelled').length})
        </button>
      </div>

      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <div className="order-number">Order #{order.id}</div>
                <div className="order-date">Placed on {order.date}</div>
              </div>
              <div className="order-status-container">
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {order.status.toLowerCase() !== 'cancelled' && (
              <div className="order-progress">
                <div className="progress-bar">
                  <div className="progress-step completed">
                    <div className="step-icon">✓</div>
                    <span>Confirmed</span>
                  </div>
                  <div className={`progress-step ${order.status.toLowerCase() !== 'confirmed' ? 'completed' : ''}`}>
                    <div className="step-icon">📦</div>
                    <span>Shipped</span>
                  </div>
                  <div className={`progress-step ${order.status.toLowerCase() === 'delivered' ? 'completed' : ''}`}>
                    <div className="step-icon">🚚</div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            )}
            {order.status.toLowerCase() === 'cancelled' && (
              <div className="order-progress">
                <div className="progress-bar">
                  <div className="progress-step" style={{color: '#dc3545'}}>
                    <div className="step-icon">❌</div>
                    <span>Order Cancelled</span>
                  </div>
                </div>
              </div>
            )}

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <div className="item-meta">
                      <span>Size: M</span>
                      <span>Qty: 1</span>
                    </div>
                    <div className="item-price">{item.price}</div>
                    <div className="delivery-info">
                      {order.status.toLowerCase() === 'delivered' ? 
                        `✅ Delivered on ${getDeliveryDate(order.date, 'delivered')}` : 
                        `📅 Expected by ${getDeliveryDate(order.date, order.status)} (7-10 days)`
                      }
                    </div>
                  </div>
                  <div className="item-actions">
                    {order.status.toLowerCase() === 'delivered' ? (
                      <>
                        <button className="action-btn primary">Rate & Review</button>
                        <button className="action-btn secondary">Return</button>
                        <button className="action-btn secondary">Exchange</button>
                      </>
                    ) : order.status.toLowerCase() === 'cancelled' ? (
                      <>
                        <button className="action-btn secondary" disabled>Cancelled</button>
                        <button className="action-btn secondary">Reorder</button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="action-btn primary"
                          onClick={() => openTrackModal(order)}
                        >
                          Track Order
                        </button>
                        <button 
                          className="action-btn secondary"
                          onClick={() => openCancelModal(order.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              {(() => {
                const getItemPrice = (item) => {
                  if (!item.price) return 0;
                  
                  // Handle different price formats
                  let priceStr = item.price.toString();
                  
                  // Remove currency symbols and commas
                  priceStr = priceStr.replace(/[₹$€£¥]/g, '').replace(/[,\s]/g, '').trim();
                  
                  const price = parseFloat(priceStr);
                  return isNaN(price) ? 0 : price;
                };
                
                // Calculate subtotal from items or use stored subtotal
                let subtotal = 0;
                if (order.items && order.items.length > 0) {
                  subtotal = order.items.reduce((total, item) => {
                    const itemPrice = getItemPrice(item);
                    console.log(`Item: ${item.name}, Price String: ${item.price}, Parsed Price: ${itemPrice}`);
                    return total + itemPrice;
                  }, 0);
                }
                
                // Fallback to stored values if calculation fails
                if (subtotal === 0) {
                  subtotal = order.subtotal || order.total || 0;
                }
                
                const gst = Math.round(subtotal * 0.18);
                const shipping = subtotal >= 400 ? 0 : 99;
                const totalAmount = subtotal + gst + shipping;
                
                console.log('Order Summary Calculation:', { subtotal, gst, shipping, totalAmount });
                
                return (
                  <>
                    <div className="product-prices">
                      {order.items && order.items.map((item, index) => {
                        const itemPrice = getItemPrice(item);
                        return (
                          <div key={index} className="summary-row product-row">
                            <span>{item.name}</span>
                            <span>₹{itemPrice > 0 ? itemPrice.toLocaleString('en-IN') : 'N/A'}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="summary-calculations">
                      <div className="summary-row">
                        <span>Subtotal ({order.items ? order.items.length : 0} item{order.items && order.items.length > 1 ? 's' : ''})</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="summary-row">
                        <span>GST (18%)</span>
                        <span>₹{gst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="summary-row">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                      </div>
                      <div className="summary-total">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </>
                );
              })()}
              <div className="payment-info">
                <span>💳 {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</span>
              </div>
            </div>

            <div className="order-actions">
              <button 
                className="order-action-btn"
                onClick={() => generateInvoice(order)}
              >
                📄 Download Invoice
              </button>
              <button 
                className="order-action-btn"
                onClick={openHelpModal}
              >
                📞 Need Help?
              </button>
              <button className="order-action-btn">🔄 Reorder</button>
              {order.status.toLowerCase() !== 'cancelled' && order.status.toLowerCase() !== 'delivered' && (
                <button 
                  className="order-action-btn" 
                  style={{color: '#dc3545'}}
                  onClick={() => openCancelModal(order.id)}
                >
                  ❌ Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && activeTab !== 'all' && (
        <div className="no-orders-tab">
          <div className="no-orders-icon">📋</div>
          <h3>No {activeTab} orders</h3>
          <p>You don't have any {activeTab} orders at the moment.</p>
        </div>
      )}
      
      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="cancel-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cancel Order</h3>
              <button 
                className="close-modal"
                onClick={() => setShowCancelModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <p>Please select a reason for cancelling your order:</p>
              
              <div className="cancel-reasons">
                <label className="reason-option">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value="Changed my mind"
                    checked={cancelReason === 'Changed my mind'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Changed my mind</span>
                </label>
                
                <label className="reason-option">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value="Found better price elsewhere"
                    checked={cancelReason === 'Found better price elsewhere'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Found better price elsewhere</span>
                </label>
                
                <label className="reason-option">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value="Delivery taking too long"
                    checked={cancelReason === 'Delivery taking too long'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Delivery taking too long</span>
                </label>
                
                <label className="reason-option">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value="Ordered by mistake"
                    checked={cancelReason === 'Ordered by mistake'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Ordered by mistake</span>
                </label>
                
                <label className="reason-option">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value="Financial constraints"
                    checked={cancelReason === 'Financial constraints'}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <span>Financial constraints</span>
                </label>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Order
              </button>
              <button 
                className="confirm-cancel-btn"
                onClick={cancelOrder}
                disabled={!cancelReason}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Help Modal */}
      {showHelpModal && (
        <div className="modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Need Help?</h3>
              <button 
                className="close-modal"
                onClick={() => setShowHelpModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <p>Fill out the form below and our team will contact you soon!</p>
              
              <div className="help-form">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={helpForm.name}
                  onChange={(e) => setHelpForm({...helpForm, name: e.target.value})}
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={helpForm.email}
                  onChange={(e) => setHelpForm({...helpForm, email: e.target.value})}
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={helpForm.phone}
                  onChange={(e) => setHelpForm({...helpForm, phone: e.target.value})}
                />
                
                <select
                  value={helpForm.issue}
                  onChange={(e) => setHelpForm({...helpForm, issue: e.target.value})}
                  required
                >
                  <option value="">Select Issue Type *</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Delivery Problem">Delivery Problem</option>
                  <option value="Product Quality">Product Quality</option>
                  <option value="Return/Exchange">Return/Exchange</option>
                  <option value="Other">Other</option>
                </select>
                
                <textarea
                  placeholder="Describe your issue in detail *"
                  value={helpForm.message}
                  onChange={(e) => setHelpForm({...helpForm, message: e.target.value})}
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowHelpModal(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-help-btn"
                onClick={submitHelpRequest}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Track Order Modal */}
      {showTrackModal && trackingOrder && (
        <div className="modal-overlay" onClick={() => setShowTrackModal(false)}>
          <div className="track-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Track Order #{trackingOrder.id}</h3>
              <button 
                className="close-modal"
                onClick={() => setShowTrackModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="order-info">
                <p><strong>Order Date:</strong> {trackingOrder.date}</p>
                <p><strong>Expected Delivery:</strong> {getDeliveryDate(trackingOrder.date, trackingOrder.status)}</p>
                <p><strong>Status:</strong> <span style={{color: getStatusColor(trackingOrder.status)}}>{trackingOrder.status}</span></p>
              </div>
              
              <div className="tracking-steps">
                {getTrackingSteps(trackingOrder).map((step, index) => (
                  <div key={index} className={`tracking-step ${step.completed ? 'completed' : ''}`}>
                    <div className="step-indicator">
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <div className="step-content">
                      <h4>{step.status}</h4>
                      {step.date && <p>{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="delivery-info">
                <h4>Delivery Information</h4>
                <p>📦 Your order will be delivered to:</p>
                <p>{trackingOrder.address?.address || 'Address on file'}</p>
                <p>{trackingOrder.address?.city}, {trackingOrder.address?.state} {trackingOrder.address?.pincode}</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="close-track-btn"
                onClick={() => setShowTrackModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;