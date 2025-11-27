'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

declare global {
    interface Window {
        snap: {
            pay: (token: string, callbacks?: SnapCallback) => void;
            embed: (token: string, options?: any) => void;
            redirectUrl: (url: string) => void;
        };
    }
}

interface SnapCallback {
    onSuccess?: (result: any) => void;
    onPending?: (result: any) => void;
    onError?: (result: any) => void;
    onClose?: () => void;
}

export default function CheckoutForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [snapReady, setSnapReady] = useState(false);
    const { items, totalPrice, clearCart } = useCart();

    // Check if snap script is loaded
    useEffect(() => {
        const checkSnap = setInterval(() => {
            if (typeof (window as any).snap !== 'undefined') {
                console.log('✓ Midtrans Snap is ready');
                setSnapReady(true);
                clearInterval(checkSnap);
            }
        }, 100);

        // Cleanup
        return () => clearInterval(checkSnap);
    }, []);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!snapReady) {
            alert('Payment gateway is loading. Please try again.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        // Prepare order data with multiple items
        const data = {
            customerName: formData.get('name'),
            customerPhone: formData.get('phone'),
            shippingAddress: formData.get('address'),
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: totalPrice
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Failed to create order');

            const { orderId, snapToken } = await res.json();

            if (!snapToken) {
                alert('Failed to generate payment token. Please try again.');
                setIsLoading(false);
                return;
            }

            // Check if this is a mock token (for development)
            const isMockToken = snapToken.startsWith('mock_');

            if (isMockToken) {
                // Development mode: redirect to payment simulator instead of tracking
                console.log('Using mock token for development');
                clearCart();
                router.push(`/payment/${orderId}`);
                return;
            }

            // Trigger Midtrans Snap payment (real token)
            (window as any).snap.pay(snapToken, {
                onSuccess: (result: any) => {
                    console.log('Payment success:', result);
                    clearCart();
                    router.push(`/tracking/${orderId}`);
                },
                onPending: (result: any) => {
                    console.log('Payment pending:', result);
                    clearCart();
                    router.push(`/tracking/${orderId}`);
                },
                onError: (result: any) => {
                    console.error('Payment error:', result);
                    alert('Payment failed. Please try again.');
                    setIsLoading(false);
                },
                onClose: () => {
                    console.log('Payment popup closed by user');
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. Budi Santoso"
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="form-label">WhatsApp Number</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="form-input"
                    placeholder="e.g. 08123456789"
                />
            </div>

            <div className="form-group">
                <label htmlFor="address" className="form-label">Shipping Address</label>
                <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    className="form-textarea"
                    placeholder="Street, City, Province, Zip Code"
                />
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button
                    type="submit"
                    disabled={isLoading || items.length === 0 || !snapReady}
                    className="btn btn-primary w-full"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={20} /> Processing...
                        </span>
                    ) : !snapReady ? (
                        'Loading payment gateway...'
                    ) : (
                        'Place Order'
                    )}
                </button>
                <p className="text-muted text-center" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
                    By placing this order, you agree to our Terms of Service.
                </p>
            </div>
        </form>
    );
}
