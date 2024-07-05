import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';
import './dashboard.css';

function Assign() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  const [activeTab, setActiveTab] = useState('transactions');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.post('store-user/payment/list', {
        page: 1,
        limit: 5,
        status: 3
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchSettlements = async () => {
    try {
      const response = await axiosInstance.post('store-user/settlements/list', {
        page: 1,
        limit: 5
      });
      setSettlements(response.data);
    } catch (error) {
      console.error('Error fetching settlements:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'transactions') {
      fetchTransactions();
    } else if (activeTab === 'settlements') {
      fetchSettlements();
    }
  }, [activeTab]);





  const handleViewDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const [activeOrderStatus, setActiveOrderStatus] = useState('confirmation');
  const [orders, setOrders] = useState([
    {
      id: 12345,
      customerName: 'Rajesh Kannan',
      phone: '+918526547512',
      address: 'R S Puram, Coimbatore',
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'confirmation',
      date: 'Apr 10, 2024',
      paymentMethod: 'PAID - UPI'
    },
    {
      id: 12346,
      customerName: 'Rajesh Kannan',
      phone: '+918526547512',
      address: 'R S Puram, Coimbatore',
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'confirmation',
      date: 'Apr 10, 2024',
      paymentMethod: 'PAID - CASH'
    },
    {
      id: 12345,
      customerName: 'Rajesh Kannan',
      phone: '+918526547512',
      address: 'R S Puram, Coimbatore',
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'preparing',
      date: 'Apr 10, 2024',
      paymentMethod: 'PAID - UPI'
    },
    {
      id: 12346,
      customerName: 'Rajesh Kannan',
      phone: '+918526547512',
      address: 'R S Puram, Coimbatore',
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'preparing',
      date: 'Apr 10, 2024',
      paymentMethod: 'PAID - CASH'
    },
    {
      id: 12347,
      customerName: 'Rajesh Kannan',
      phone: '+918526547512',
      address: 'R S Puram, Coimbatore',
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'preparing',
      date: 'Apr 11, 2024',
      paymentMethod: 'PAID - CARD'
    },
    {
      id: 12348,
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'completed',
      date: 'Apr 12, 2024',
      paymentMethod: 'PAID - CASH'
    },
    {
      id: 12349,
      customerName: 'Rajesh Kannan',
      phone: '+918526547512',
      address: 'R S Puram, Coimbatore',
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'preparing',
      date: 'Apr 11, 2024',
      paymentMethod: 'PAID - PAYPAL'
    },
    {
      id: 12345,
      items: [{ name: 'Ooty apple', quantity: "1", price: 100 }, { name: 'White Egg', quantity: "5", price: 50 }],
      total: 150,
      status: 'packed',
      date: 'Apr 10, 2024',
      paymentMethod: 'PAID - PAYPAL'
    }
  ]);

  const orderCounts = {
    confirmation: 6,
    preparing: 4,
    packed: 1,
    completed: 1
  };

  const fetchOrders = async (status) => {
    try {
      const response = await axiosInstance.post('store-user/order/list', {
        page: 1,
        limit: 10,
        status: getNumericStatus(status)
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getNumericStatus = (textStatus) => {
    switch (textStatus) {
      case 'confirmation': return 1;
      case 'preparing': return 2;
      case 'completed': return 3;
      default: return 1; // Default to confirmation if status is unknown
    }
  };


  const handleStatusFilter = (status) => {
    setActiveOrderStatus(status);
    fetchOrders(status);
  };


  const handleReject = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
  };

  const handleConfirm = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'preparing' } : order
    ));
  };



  const [currentIndex, setCurrentIndex] = useState(1); // State to track the current index
  const [animationClass, setAnimationClass] = useState('');

  // Function to handle clicking the left/right arrows or toggling between sets
  const toggleIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === 3 ? 1 : currentIndex + 1;
      setAnimationClass(nextIndex > currentIndex ? 'slide-right' : 'slide-left');
      setTimeout(() => {
        toggleIndex(nextIndex);
      }, 500); // Match the animation duration
    }, 3000); // Change page every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleLeftClick = () => {
    setAnimationClass('slide-left');
    setTimeout(() => {
      toggleIndex(currentIndex === 1 ? 3 : currentIndex - 1);
    }, 500); // Match the animation duration
  };

  const handleRightClick = () => {
    setAnimationClass('slide-right');
    setTimeout(() => {
      toggleIndex(currentIndex === 3 ? 1 : currentIndex + 1);
    }, 500); // Match the animation duration
  };


  // Function to scroll left
  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft -= 100; // Scroll left by 100px
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    // Implement scrolling logic if needed
    // Example: Scroll by adjusting scrollLeft property of scrollContainerRef.current
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += 100; // Example: Scroll right by 100px
    }
  };

  // Dummy state to toggle quick actions visibility
  // const [showQuickActions, setShowQuickActions] = useState(false);

  // Ref for the scroll container
  const scrollContainerRef = React.useRef(null);


  const filteredOrders = orders.filter(order => order.status === activeOrderStatus);
  const OrderDetails = ({ order }) => {
    if (!order) return null;

    return (
      <div className="order-details">
        <h3>Order Details</h3>
        <p>Order ID: {order.id}</p>
        <p>Date: {order.date}</p>
        <p>Status: {order.status}</p>
        <h4>Items:</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.quantity} x {item.name} - ₹{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: ₹{order.total.toFixed(2)}</p>
        <p>Payment Method: {order.paymentMethod}</p>
      </div>
    );
  };

  const PrepareOrder = ({ order }) => (
    <div className="prepare-order">
      <div className="order-header">
        <span className="order-id">Order Id: {order.id}</span>
        <span className="order-date">Date: {order.date}</span>
      </div>
      <div className="order-for">
        <h4>Order for:</h4>
        <p>{order.customerName}</p>
        <div className="contact-info">
          <span><img src='/phone.svg' alt='' /> {order.phone}</span>
          <span><img src='/location.svg' alt='' /> {order.address}</span>
        </div>
      </div>
      <div className="order-items">
        <h4>Order Items:</h4>
        {order.items.map((item, index) => (
          <div key={index} className="item">
            <span>{item.quantity} x {item.name}</span>
            <span>₹{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="total-bill">
        <span>Total Bill Amount <span className="payment-method">{order.paymentMethod}</span></span>
        <span>₹{order.total.toFixed(2)}</span>
      </div>
      <button className="verify-pack-btn">Verify & Pack Items</button>
    </div>
  );

  const ConfirmOrder = ({ order }) => (
    <div className="confirm-order">
      <div className="order-header">
        <span className="order-id">Order Id: {order.id}</span>
        <span className="order-date">Date: {order.date}</span>
      </div>
      <div className="order-for">
        <h4>Order for:</h4>
        <p>{order.customerName}</p>
        <div className="contact-info">
          <span><img src='/phone.svg' alt='' /> {order.phone}</span>
          <span><img src='/location.svg' alt='' /> {order.address}</span>
        </div>
      </div>
      <div className="order-items">
        <h4>Order Items:</h4>
        {order.items.map((item, index) => (
          <div key={index} className="item">
            <span>{item.quantity} x {item.name}</span>
            <span>₹{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="total-bill">
        <span>Total Bill Amount <span className="payment-method">{order.paymentMethod}</span></span>
        <span>₹{order.total.toFixed(2)}</span>
      </div>
      <div className="p5actions">
        <button className="p6reject" onClick={() => handleReject(order.id)}>Reject</button>
        <button className="p6confirm" onClick={() => handleConfirm(order.id)}>Confirm</button>
      </div>
      <div className="p5details" onClick={() => handleViewDetails(order.id)}>
        <span>{selectedOrderId === order.id ? 'Hide Details' : 'View Full Order Details'}</span>
        <img src='/side.svg' alt='' className='img' />
      </div>
      {selectedOrderId === order.id && <OrderDetails order={order} />}
    </div>
  );




  return (
    <div className="p1app">


      <div className="p1main">

        <main className="p2dash">
          <div className="p3content">
            <div className="p3quick-container">
              <section className="p3quick">
                <h2>Quick Actions</h2>
                <div className="p4actions" ref={scrollContainerRef}>
                  {/* Left arrow for toggling between sets */}
                  <img
                    src='/left.svg'
                    alt=''
                    onClick={() => {
                      setAnimationClass('slide-left');
                      setTimeout(() => {
                        toggleIndex(currentIndex === 1 ? 3 : currentIndex - 1);
                      }, 500);
                    }}
                    className={animationClass}
                  />
                  {/* Conditionally render icons based on currentIndex */}
                  {currentIndex === 1 && (
                    <>
                      <button className="p5action">
                        <Link to="/makepayment" className="no-underline">
                          <img src="/payment.svg" alt="" />
                          <span className='text'>Make Payment</span>
                        </Link>
                      </button>
                      <button className="p5action">
                        <img src="/statements.svg" alt="" />
                        <span className='text'>Settlements</span>
                      </button>
                      <button className="p5action">
                        <img src="/transactions.svg" alt="" />
                        <span className='text'>Transaction History</span>
                      </button>
                      <button className="p5action">
                        <Link to="/packed" className="no-underline">
                          <img src="/payment.svg" alt="" />
                          <span className='text'>Packed</span>
                        </Link>
                      </button>
                    </>
                  )}
                  {currentIndex === 2 && (
                    <>
                      <button className="p5action">
                        <img src="/cards.svg" alt="" />
                        <span className='text'>Gift Cards</span>
                      </button>
                      <button className="p5action">
                        <Link to="/banner" className="no-underline">
                          <img src="/cards.svg" alt="" />
                          <span className='text'>Banner</span>
                        </Link>
                      </button>
                      <button className="p5action">
                        <Link to="/popup" className="no-underline">
                          <img src="/cards.svg" alt="" />
                          <span className='text'>Popup</span>
                        </Link>
                      </button>
                      <button className="p5action">
                        <Link to="/referandearn" className="no-underline">
                          <img src="/payment.svg" alt="" />
                          <span className='text'>Refer and Earn</span>
                        </Link>
                      </button>
                    </>
                  )}
                  {currentIndex === 3 && (
                    <>
                      <button className="p5action">
                        <Link to="/rewards" className="no-underline">
                          <img src="/cards.svg" alt="" />
                          <span className='text'>Rewards</span>
                        </Link>
                      </button>
                      <button className="p5action">
                        <Link to="/empty" className="no-underline">
                          <img src="/payment.svg" alt="" />
                          <span className='text'>Empty</span>
                        </Link>
                      </button>
                      <button className="p5action">
                        <Link to="/product" className="no-underline">
                          <img src="/payment.svg" alt="" />
                          <span className='text'>Product</span>
                        </Link>
                      </button>
                    </>
                  )}
                  {/* Right arrow for toggling between sets */}
                  <img
                    src='/right.svg'
                    alt=''
                    onClick={() => {
                      setAnimationClass('slide-right');
                      setTimeout(() => {
                        toggleIndex(currentIndex === 3 ? 1 : currentIndex + 1);
                      }, 500);
                    }}
                    className={animationClass}
                  />
                  {/* Additional image */}
                  <img src='/A.svg' alt='' className='a' />


                </div>
              </section>
            </div>

            <section className="p3recent">
              <div className="header">
                <h2>Recent Transactions</h2>
                <img src="/return.svg" alt="" className="icon" />
              </div>
              <div className="p4tabs">
                <span
                  className={activeTab === 'transactions' ? 'p5active' : ''}
                  onClick={() => setActiveTab('transactions')}
                >
                  All Transactions
                </span>
                <span
                  className={activeTab === 'settlements' ? 'p5active' : ''}
                  onClick={() => setActiveTab('settlements')}
                >
                  Settlements
                </span>
              </div>
              {activeTab === 'transactions' && (
                <div className="p4list">
                  {[
                    { phoneNumber: "+918956598562", subtext: "Paid via QR Scan", amount: "+₹500.00", time: "2h ago", date: "Paid on Apr 11, 2024 at 4:30PM" },
                    { phoneNumber: "+919956598562", subtext: "Paid via Online Payment(UPI)", amount: "+₹800.00", time: "2h ago", date: "Paid on Apr 11, 2024 at 4:30PM" },
                    { phoneNumber: "+919956598562", subtext: "Paid via Online Payment(UPI)", amount: "+₹100.00", time: "2h ago", date: "Paid on Apr 11, 2024 at 4:30PM" },
                    { phoneNumber: "+918956598562", subtext: "Paid via QR Scan", amount: "+₹500.00", time: "2h ago", date: "Paid on Apr 11, 2024 at 4:30PM" }
                  ].map((payment, index) => (
                    <div key={index} className="p5item">
                      <div className="p6user">
                        <span className="p7icon">
                          <img src="/profile1.svg" alt="" />
                        </span>
                        <div className="p7details">
                          <span className="p7phone">{payment.phoneNumber} Sent a Payment</span>
                          <span className="p8subtext">{payment.subtext}</span>
                        </div>
                      </div>
                      <div className="p6amount">
                        <span className="p7amount">{payment.amount}</span>
                        <div className="payment-details">
                          <span className="p8time">{payment.time}</span>
                          <span className="p9date">{payment.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'settlements' && (
                <div className="p4list settlements">
                  {/* Dummy settlement items */}
                  {[
                    { phoneNumber: "+918956598562", subtext: "Settlement via Bank Transfer", amount: "-₹700.00", time: "3h ago", date: "Settled on Apr 11, 2024 at 5:30PM" },
                    { phoneNumber: "+919956598562", subtext: "Settlement via Online Payment(UPI)", amount: "-₹1200.00", time: "4h ago", date: "Settled on Apr 11, 2024 at 6:30PM" },
                    { phoneNumber: "+919956598562", subtext: "Settlement via QR Scan", amount: "-₹150.00", time: "5h ago", date: "Settled on Apr 11, 2024 at 7:30PM" },
                    { phoneNumber: "+918956598562", subtext: "Settlement via Bank Transfer", amount: "-₹1000.00", time: "3h ago", date: "Settled on Apr 11, 2024 at 5:30PM" },
                  ].map((settlement, index) => (
                    <div key={index} className="p5item">
                      <div className="p6user">
                        <span className="p7icon">
                          <img src="/profile2.svg" alt="" />
                        </span>
                        <div className="p7details">
                          <span className="p7phone">{settlement.phoneNumber} Received a Settlement</span>
                          <span className="p8subtext">{settlement.subtext}</span>
                        </div>
                      </div>
                      <div className="p6amount">
                        <span className="p7amount">{settlement.amount}</span>
                        <div className="payment-details">
                          <span className="p8time">{settlement.time}</span>
                          <span className="p9date">{settlement.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className="p3orders">
            <h2>My Orders</h2>
            <img src="/return.svg" alt="" className="icon" />
            <div className='new'>
              <h3>Last Update at: June 02, 2024 | 11:25 PM</h3>
            </div>
            <div class='search-container'>
              <div class='search'>
                <img src="/search.svg" alt="" class="i" />
                <input type="text" placeholder="Search for order id or Customer Name" />
              </div>
            </div>
            <div className="p4status">
              <span className={`p5status ${activeOrderStatus === 'confirmation' ? 'p5active' : ''}`}
                onClick={() => handleStatusFilter('confirmation')}>
                Confirmation ({orderCounts.confirmation})
              </span>
              <span className={`p5status ${activeOrderStatus === 'preparing' ? 'p5active' : ''}`}
                onClick={() => handleStatusFilter('preparing')}>
                Preparing ({orderCounts.preparing})
              </span>
              <span className={`p5status ${activeOrderStatus === 'packed' ? 'p5active' : ''}`}
                onClick={() => handleStatusFilter('packed')}>
                Packed Orders ({orderCounts.packed})
              </span>
              <span className={`p5status ${activeOrderStatus === 'completed' ? 'p5active' : ''}`}
                onClick={() => handleStatusFilter('completed')}>
                Completed ({orderCounts.completed})
              </span>
            </div>

            {activeOrderStatus === 'preparing' ? (
              <div className="preparing-orders">
                {filteredOrders.map(order => (
                  <PrepareOrder key={order.id} order={order} />
                ))}
              </div>
            ) : activeOrderStatus === 'confirmation' ? (
              <div className="confirmation-orders">
                {filteredOrders.map(order => (
                  <ConfirmOrder key={order.id} order={order} />
                ))}
              </div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id}>
                  {order.status === 'packed' ? (
                    <div className="container" key={`delivery-status-${order.id}`}>
                      <div className="header">Ready for delivery:</div>
                      <div className="order-id">Order Id: <span className='id'>{order.id}</span></div>
                      <div className="info">
                        <p>Rajesh Kannan</p>
                        <div class="contact">
                          <div class="text3">
                            <img src="/phone.svg" alt="Phone" />
                            <span>+918526547512</span>
                          </div>
                          <div class="text4">
                            <img src="/location.svg" alt=" " />
                            <span>R S Puram, Coimbatore</span>
                          </div>
                        </div>
                      </div>
                      <ul class="timeline">
                        <li>
                          <div class="icon2"></div>
                          <div class="line"></div>
                          <div class="status">Store Confirmation</div>
                          <div class="date">Apr 09, 2024 | 02:00PM</div>
                        </li>
                        <li>
                          <div class="icon2"></div>
                          <div class="line"></div>
                          <div class="status">Delivery Accepted</div>
                          <div class="date">Apr 10, 2024 | 03:00PM</div>
                        </li>
                        <li>
                          <div class="icon2"></div>
                          <div class="status">Delivery Pickup</div>
                          <div class="date">Apr 10, 2024 | 03:30PM</div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className={`p4order ${order.status === 'preparing' ? 'no-border' : ''}`}>
                      <div className="p5header">
                        <span className="p6id">Order ID: {order.id}</span>
                        <span className="p6date">Date: {order.date}</span>
                      </div>
                      <div className="p5items">
                        <span>
                          Order Items
                          <img src='/up.svg' alt='' />
                        </span>
                        {order.items.map((item, index) => (
                          <div key={index} className="p6item">
                            <span>{item.quantity} x {item.name}</span>
                            <span>₹{(item.price * item.quantity).toFixed()}</span>
                          </div>
                        ))}
                      </div>
                      {order.status !== 'preparing' && (
                        <>
                          <div className="p5total">
                            <span>
                              Total Bill Amount: <span className="payment-method">{order.paymentMethod}</span>
                            </span>
                            <span>₹{order.total.toFixed(2)}</span>
                          </div>
                          <span className="p5details" onClick={() => handleViewDetails(order.id)}>
                            {selectedOrderId === order.id ? 'Hide details' : 'View full order details'}
                            <img src='/side.svg' alt='' />
                          </span>
                        </>
                      )}
                      <div className="p5actions">
                        {order.status === 'confirmation' && (
                          <>
                            <button className="p6reject" onClick={() => handleReject(order.id)}>
                              Reject Order
                            </button>
                            <button className="p6confirm" onClick={() => handleConfirm(order.id)}>
                              Confirm Order
                            </button>
                          </>
                        )}
                      </div>
                      {selectedOrderId === order.id && <OrderDetails order={order} />}
                    </div>
                  )}
                </div>
              ))
            )}

          </section>

        </main>


      </div>
      <div className="floating-chat-icon">
        <img src='/wtsapp.svg' alt='' />
      </div>

    </div>
  );
}

export default Assign;