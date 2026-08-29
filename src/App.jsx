import React, { useState } from 'react';
import './App.css';
import { FiShoppingCart, FiLogOut, FiArrowLeft, FiHome } from 'react-icons/fi';

const MENU_DATA = [
  { id: 1, name: "Paneer Tikka Wrap", desc: "Grilled paneer with cucumber, tomato & mint chutney", price: 120, cal: 450, protein: 18, img: "🌯", category: "Vegetarian" },
  { id: 2, name: "Butter Chicken Rice", desc: "Creamy butter chicken curry with steamed rice", price: 150, cal: 650, protein: 25, img: "🍚", category: "Non-Vegetarian" },
  { id: 3, name: "Quinoa Buddha Bowl", desc: "Quinoa, roasted veggies, chickpeas & tahini dressing", price: 140, cal: 420, protein: 16, img: "🥗", category: "Vegan" },
  { id: 4, name: "Grilled Fish Fillet", desc: "Herb-grilled salmon with roasted broccoli & sweet potato", price: 180, cal: 520, protein: 32, img: "🐟", category: "Non-Vegetarian" },
  { id: 5, name: "Masala Dosa", desc: "Crispy dosa with potato & onion filling, sambar & chutney", price: 100, cal: 380, protein: 10, img: "🥞", category: "Vegetarian" },
  { id: 6, name: "Protein Smoothie Bowl", desc: "Greek yogurt base, berries, granola & honey", price: 110, cal: 320, protein: 20, img: "🥣", category: "Vegetarian" },
  { id: 7, name: "Vegan Thai Curry", desc: "Coconut curry with vegetables, tofu & jasmine rice", price: 130, cal: 480, protein: 14, img: "🍛", category: "Vegan" },
  { id: 8, name: "Green Salad with Hummus", desc: "Mixed greens, cherry tomatoes, cucumber & hummus dressing", price: 90, cal: 250, protein: 8, img: "🥬", category: "Vegan" }
];
function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userProfile, setUserProfile] = useState({
  name: '',
  email: '',
  phone: '',
  dietaryPreferences: []
});
const [pastOrders, setPastOrders] = useState([]);
const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [pickupTime, setPickupTime] = useState('ASAP');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Login Page
  const LoginPage = () => (
    <div className="container">
      <div className="header">
        <h1>🍕 QuickBite Campus</h1>
        <p>Fresh Meals. 5-Minute Pickup. Zero Wait.</p>
      </div>

      <div className="auth-grid">
        <div className="auth-box">
          <h2>📱 Login</h2>
          <div className="demo-box">
            <strong>Demo Account:</strong><br />
            Email: student@weschool.com<br />
            Password: test123
          </div>
          <input type="email" placeholder="Email" id="login-email" />
          <input type="password" placeholder="Password" id="login-pwd" />
          <button className="btn-primary" onClick={() => {
            const email = document.getElementById('login-email').value;
            if (email) {
              setUser({ email, name: email.split('@')[0].toUpperCase() });
              setPage('menu');
            }
          }}>🔓 Login</button>
        </div>

        <div className="auth-box">
          <h2>📝 Sign Up</h2>
          <input type="text" placeholder="Full Name" id="signup-name" />
          <input type="email" placeholder="Email" id="signup-email" />
          <input type="tel" placeholder="Phone" id="signup-phone" />
          <input type="password" placeholder="Password" id="signup-pwd" />
          <button className="btn-primary" onClick={() => {
            const email = document.getElementById('signup-email').value;
            const name = document.getElementById('signup-name').value;
            if (email && name) {
              setUser({ email, name: name.toUpperCase() });
              setPage('menu');
            }
          }}>✅ Create Account</button>
        </div>
      </div>
    </div>
  );

  // Menu Page
  const MenuPage = () => (
    <div className="container">
      <div className="header">
        <h1>🍕 Menu</h1>
        <p>Welcome, <strong>{user.name}</strong> | 🛒 {cart.length} items</p>
      </div>

      <div className="nav-bar">
<div className="category-filters">
  {['All', 'Vegetarian', 'Non-Vegetarian', 'Vegan'].map(cat => (
    <button
      key={cat}
      className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
      onClick={() => setSelectedCategory(cat)}
    >
      {cat}
    </button>
  ))}
</div>
        <input 
          type="text" 
          placeholder="🔍 Search items..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <button className="nav-btn" onClick={() => setPage('cart')}><FiShoppingCart /> Cart</button>
<button className="nav-btn" onClick={() => setPage('profile')}>👤 Profile</button>
        <button className="nav-btn logout" onClick={() => {
          setUser(null);
          setCart([]);
          setPage('login');
        }}><FiLogOut /> Logout</button>
      </div>

      <div className="menu-grid">
        {MENU_DATA.filter(item => 
  (selectedCategory === 'All' || item.category === selectedCategory) &&
  item.name.toLowerCase().includes(search.toLowerCase())
).map(item => (
          <div key={item.id} className="menu-card">
            <div className="item-emoji">{item.img}</div>
            <h3>{item.name}</h3>
            <p className="desc">{item.desc}</p>
            <div className="badges">
              <span className="badge">{item.cal} cal</span>
              <span className="badge">Protein: {item.protein}g</span>
            </div>
            <div className="card-footer">
              <span className="price">₹{item.price}</span>
              <button className="btn-add" onClick={() => {
                setCart([...cart, { ...item, qty: 1 }]);
              }}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Cart Page
  const CartPage = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalCal = cart.reduce((sum, item) => sum + (item.cal * item.qty), 0);

    return (
      <div className="container">
        <div className="header">
          <h1>🛒 Your Cart</h1>
        </div>

        <button className="back-btn" onClick={() => setPage('menu')}><FiArrowLeft /> Back to Menu</button>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Cart is empty!</p>
            <button className="btn-primary" onClick={() => setPage('menu')}>Go to Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.cal} cal</p>
                  </div>
                  <div className="item-qty">
                    <span>Qty: {item.qty}</span>
                  </div>
                  <div className="item-price">
                    <span>₹{item.price * item.qty}</span>
                  </div>
                  <button className="btn-delete" onClick={() => setCart(cart.filter((_, i) => i !== idx))}>🗑️</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-box">
                <h3 className="total-price">₹{total}</h3>
                <p>Total Calories: {totalCal} kcal</p>
              </div>

              <div className="pickup-box">
                <div className="guarantee">🟢 5-Minute Pickup Guarantee</div>
                <label>When to pickup?</label>
                <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="pickup-select">
                  <option>ASAP (12:05 PM)</option>
                  <option>12:30 PM</option>
                  <option>1:00 PM</option>
                </select>
              </div>
            </div>

            <button className="btn-checkout" onClick={() => {
              setOrderTotal(total);
              setPage('payment');
            }}>💳 Proceed to Payment</button>
          </>
        )}
      </div>
    );
  };

  // Payment Page
  const PaymentPage = () => (
    <div className="container">
      <div className="header">
        <h1>💳 Payment</h1>
      </div>

      <button className="back-btn" onClick={() => setPage('cart')}><FiArrowLeft /> Back to Cart</button>

      <div className="payment-box">
        <h3>Total: ₹{orderTotal}</h3>
        <div className="divider"></div>

        <div className="payment-methods">
          <label className="payment-option">
            <input type="radio" name="payment" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} />
            <span>UPI 📱</span>
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" value="Card" onChange={(e) => setPaymentMethod(e.target.value)} />
            <span>Card 💳</span>
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" value="Cash" onChange={(e) => setPaymentMethod(e.target.value)} />
            <span>Cash 💵</span>
          </label>
        </div>

        <button className="btn-primary" onClick={() => {
          if (paymentMethod) setPage('confirmation');
        }}>✅ Complete Payment</button>
      </div>
    </div>
  );

  // Confirmation Page
  const ConfirmationPage = () => {
    const orderId = `QB${Math.floor(Math.random() * 90000) + 10000}`;
const ProfilePage = () => (
  <div className="container">
    <div className="header">
      <h1>👤 My Profile</h1>
      <p>Welcome, <strong>{user.name}</strong></p>
    </div>

    <button className="back-btn" onClick={() => setPage('menu')}><FiArrowLeft /> Back to Menu</button>

    <div className="profile-grid">
      <div className="profile-box">
        <h3>📋 Profile Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || '+91 XXXXXXXXXX'}</p>
        <button className="btn-primary" onClick={() => alert('Edit profile coming soon!')}>✏️ Edit Profile</button>
      </div>

      <div className="profile-box">
        <h3>🥗 Dietary Preferences</h3>
        <label><input type="checkbox" /> Vegetarian</label><br/>
        <label><input type="checkbox" /> Non-Vegetarian</label><br/>
        <label><input type="checkbox" /> Vegan</label><br/>
        <label><input type="checkbox" /> Gluten-free</label><br/>
        <button className="btn-primary" onClick={() => alert('Preferences saved!')}>Save</button>
      </div>
    </div>

    <div className="profile-section">
      <h3>📜 Past Orders</h3>
      <div className="order-card">
        <p><strong>Order ID:</strong> QB12345</p>
        <p><strong>Amount:</strong> ₹284</p>
        <p><strong>Date:</strong> Today</p>
        <p><strong>Status:</strong> ✅ Completed</p>
      </div>
    </div>

    <button className="btn-logout" onClick={() => {
      setUser(null);
      setCart([]);
      setPage('login');
    }}>👤 Logout</button>
  </div>
);

    <button className="back-btn" onClick={() => setPage('menu')}><FiArrowLeft /> Back to Menu</button>

    <div className="profile-grid">
      <div className="profile-box">
        <h3>📋 Profile Information</h3>
        {!isEditingProfile ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not added'}</p>
            <button className="btn-primary" onClick={() => setIsEditingProfile(true)}>✏️ Edit Profile</button>
          </>
        ) : (
          <>
            <input type="text" placeholder="Name" defaultValue={user.name} id="edit-name" />
            <input type="email" placeholder="Email" defaultValue={user.email} id="edit-email" />
            <input type="tel" placeholder="Phone" defaultValue={user.phone} id="edit-phone" />
            <button className="btn-primary" onClick={() => {
              setUser({
                ...user,
                name: document.getElementById('edit-name').value,
                email: document.getElementById('edit-email').value,
                phone: document.getElementById('edit-phone').value
              });
              setIsEditingProfile(false);
            }}>Save Changes</button>
          </>
        )}
      </div>

      <div className="profile-box">
        <h3>🥗 Dietary Preferences</h3>
        {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Gluten-free'].map(pref => (
          <label key={pref} className="pref-checkbox">
            <input type="checkbox" defaultChecked={userProfile.dietaryPreferences.includes(pref)} />
            <span>{pref}</span>
          </label>
        ))}
        <button className="btn-primary" onClick={() => {
          const checked = Array.from(document.querySelectorAll('.pref-checkbox input:checked')).map(el => el.nextElementSibling.textContent);
          setUserProfile({ ...userProfile, dietaryPreferences: checked });
        }}>Save Preferences</button>
      </div>
    </div>

    <div className="profile-section">
      <h3>📜 Past Orders</h3>
      {pastOrders.length === 0 ? (
        <p>No past orders yet. Start ordering!</p>
      ) : (
        <div className="orders-list">
          {pastOrders.slice(0, 5).map((order, idx) => (
            <div key={idx} className="order-card">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Amount:</strong> ₹{order.amount}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    <button className="btn-logout" onClick={() => {
      setUser(null);
      setCart([]);
      setPage('login');
    }}>👤 Logout</button>
  </div>
);
    return (
      <div className="container">
        <div className="header">
          <h1>✅ Order Confirmed!</h1>
        </div>

        <div className="confirmation-grid">
          <div className="success-box">
            <h3>🎉 Your Order is Confirmed!</h3>
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Pickup:</strong> {pickupTime}</p>
            <p><strong>Amount:</strong> ₹{orderTotal}</p>
            <p><strong>Payment:</strong> {paymentMethod}</p>
            <p className="highlight">⏱️ Ready in 5 minutes!</p>
          </div>

          <div className="info-box">
            <h3>Next Steps:</h3>
            <p>1. We're preparing your meal</p>
            <p>2. You'll get notified when ready</p>
            <p>3. Pick up at Campus Cafeteria</p>
            <p>4. Show Order ID to staff</p>
          </div>
        </div>

        <div className="confirmation-buttons">
          <button className="btn-primary" onClick={() => {
            setCart([]);
            setPage('menu');
          }}>🔄 New Order</button>
          <button className="btn-logout" onClick={() => {
            setUser(null);
            setCart([]);
            setPage('login');
          }}>👤 Logout</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {!user && page === 'login' && <LoginPage />}
      {user && page === 'menu' && <MenuPage />}
      {user && page === 'cart' && <CartPage />}
      {user && page === 'payment' && <PaymentPage />}
      {user && page === 'confirmation' && <ConfirmationPage />}
{user && page === 'profile' && <ProfilePage />}
    </div>
  );
}

export default App;