import React, { useState, useEffect } from 'react';
import './CheckoutForm.css';

const Checkout = () => {
    const [cartData, setCartData] = useState(null);
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact_number: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        physicalAddress: '',
    });

    const widgetBaseUrl = 'https://pg.web-payments.paygreencard.com/pg-login';
    const returnUrl = 'https://google.com';

    // Extract cartData from URL
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const cartDataEncoded = queryParams.get('cartData');
        if (cartDataEncoded) {
            const parsedCartData = JSON.parse(decodeURIComponent(cartDataEncoded));
            setCartData(parsedCartData);
        }
    }, []);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartData) {
            // Calculate the total amount (using cartData.total_price)
            const totalAmount = cartData.total_price / 100;

            const queryString = new URLSearchParams({
                ...userData,
                return_url: returnUrl,
                amount: totalAmount,
                order_id: 'ABC1234',
                api_key: 'mdDUBcJHxI4euOdTXjzr8gB6Xoee4RqN',
                currency: cartData.currency || 'USD'
            }).toString();

            window.location.href = `${widgetBaseUrl}?${queryString}`;
        }
    };

    return (
        <div className="checkout-container">
            {/* Left Side: Checkout Form */}
            <div className="checkout-form">
                <h1>Checkout</h1>
                {cartData ? (
                    <>
                        <h2>User Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={userData.firstname}
                                    onChange={handleUserChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={userData.lastname}
                                    onChange={handleUserChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleUserChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Contact Number:</label>
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={userData.contact_number}
                                    onChange={handleUserChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={userData.city}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div>
                                <label>Zip:</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={userData.zip}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div>
                                <label>State:</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={userData.state}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div>
                                <label>Country:</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={userData.country}
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div>
                                <label>Address:</label>
                                <textarea
                                    name="physicalAddress"
                                    value={userData.physicalAddress}
                                    onChange={handleUserChange}
                                    required
                                />
                            </div>
                            <button type="submit">Proceed to Payment</button>
                        </form>
                    </>
                ) : (
                    <p className="loading-message">Loading cart data...</p>
                )}
            </div>

            {/* Right Side: Cart Items */}
            <div className="cart-details">
                <h2>Cart Details</h2>
                {cartData ? (
                    <>
                        <p>
                            <strong>Total Price:</strong> {cartData.total_price / 100}{' '}
                            {cartData.currency || 'USD'}
                        </p>
                        <p>
                            <strong>Total Items:</strong> {cartData.item_count}
                        </p>
                        <ul>
                            {cartData.items.length > 0 ? (
                                cartData.items.map((item, index) => (
                                    <li key={index}>
                                        <img
                                            src={item.featured_image.url}
                                            alt={item.featured_image.alt}
                                        />
                                        <span>
                                            <strong>{item.title}</strong> - Quantity: {item.quantity}{' '}
                                            - Price: {item.price / 100}{' '}
                                            {cartData.currency || 'USD'}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p>No items in the cart.</p>
                            )}
                        </ul>
                    </>
                ) : (
                    <p className="loading-message">Loading cart data...</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
