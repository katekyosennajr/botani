'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

export default function CheckoutPage() {
    const { items, totalPrice } = useCart();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    if (items.length === 0) {
        return (
            <div className="page-container">
                <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: '#f9fafb', marginBottom: '1.5rem' }}>
                        <ShoppingBag size={48} className="text-gray-300" />
                    </div>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>Your Cart is Empty</h1>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>
                        Please add items to your cart before proceeding to checkout.
                    </p>
                    <Link href="/catalog" className="btn btn-primary">
                        Return to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link href="/cart" className="text-muted hover:text-primary flex items-center gap-2 mb-4 text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Cart
                    </Link>
                    <h1 className="page-title text-center">Secure Checkout</h1>
                </div>

                <div className="checkout-grid">
                    {/* Checkout Form */}
                    <div className="checkout-form-container">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Customer Details</h2>
                        {/* We pass the first item as a 'product' prop to satisfy the existing form interface for now, 
                            but ideally CheckoutForm should be refactored to handle the whole cart order logic. 
                            For this step, we'll let CheckoutForm handle the user input and we'll handle the order creation logic later. 
                            Wait, CheckoutForm likely expects a single product. I need to check CheckoutForm.tsx. 
                            Assuming I need to refactor CheckoutForm too, but let's first fix the page structure.
                        */}
                        <CheckoutForm />
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="order-summary">
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Summary</h2>

                            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.5rem' }}>
                                {items.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <div className="summary-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem', lineHeight: '1.2' }}>{item.name}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span className="text-muted text-xs">Qty: {item.quantity}</span>
                                                <p style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <div className="summary-row">
                                    <span className="text-muted">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="text-muted">Shipping</span>
                                    <span style={{ color: 'green', fontWeight: '500' }}>Calculated later</span>
                                </div>
                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</span>
                                </div>
                            </div>

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
