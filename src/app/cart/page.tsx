'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="page-container">
                <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: '#f9fafb', marginBottom: '1.5rem' }}>
                        <ShoppingBag size={48} className="text-gray-300" />
                    </div>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>Your Cart is Empty</h1>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>
                        Looks like you haven't found the perfect plant yet.
                    </p>
                    <Link href="/catalog" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ background: '#f9fafb' }}>
            <div className="container">
                <h1 className="page-title" style={{ marginBottom: '2rem' }}>Shopping Cart ({items.length})</h1>

                <div className="cart-grid">
                    {/* Cart Items List */}
                    <div className="cart-items-container">
                        <div className="cart-card">
                            {items.map((item) => (
                                <div key={item.id} className="cart-item">
                                    {/* Image */}
                                    <div className="cart-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    {/* Content */}
                                    <div className="cart-item-content">
                                        <div className="cart-item-header">
                                            <div>
                                                <Link href={`/product/${item.slug}`} className="cart-item-title">
                                                    {item.name}
                                                </Link>
                                                <p className="cart-item-variant">Wholesale Batch</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="btn-icon text-gray-400 hover:text-red-500"
                                                title="Remove item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        <div className="cart-item-actions">
                                            {/* Quantity Control */}
                                            <div className="cart-quantity-wrapper">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="cart-qty-btn"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="cart-qty-display">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="cart-qty-btn"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <p className="cart-price-total">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="cart-price-unit">
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)} / pcs
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={clearCart} className="btn-text text-sm text-red-500 hover:text-red-700">
                                <Trash2 size={16} /> Clear Shopping Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="cart-summary-card">
                            <h2 className="cart-summary-title">Order Summary</h2>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div className="cart-summary-row">
                                    <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span style={{ fontWeight: 500 }}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Shipping</span>
                                    <span style={{ color: '#16a34a', fontWeight: 500 }}>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="cart-summary-total">
                                <span className="cart-total-label">Total</span>
                                <span className="cart-total-value">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</span>
                            </div>
                            <p className="text-xs text-muted mt-2 text-right">Including taxes</p>

                            <Link
                                href="/checkout"
                                className="btn btn-primary w-full flex justify-center items-center gap-2"
                                style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '2.5rem' }}
                            >
                                Proceed to Checkout <ArrowRight size={20} />
                            </Link>

                            <div className="cart-secure-badge">
                                <ShieldCheck size={16} />
                                <span>Secure checkout powered by Midtrans</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
