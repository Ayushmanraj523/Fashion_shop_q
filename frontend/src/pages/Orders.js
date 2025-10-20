import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
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

  const getDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
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
                        '✅ Delivered' : 
                        `📅 Expected by ${getDeliveryDate(order.date)}`
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
                        <button className="action-btn primary">Track Order</button>
                        <button 
                          className="action-btn secondary"
                          onClick={() => cancelOrder(order.id)}
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
              <button className="order-action-btn">📄 Invoice</button>
              <button className="order-action-btn">📞 Need Help?</button>
              <button className="order-action-btn">🔄 Reorder</button>
              {order.status.toLowerCase() !== 'cancelled' && order.status.toLowerCase() !== 'delivered' && (
                <button 
                  className="order-action-btn" 
                  style={{color: '#dc3545'}}
                  onClick={() => cancelOrder(order.id)}
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
    </div>
  );
};

export default Orders;