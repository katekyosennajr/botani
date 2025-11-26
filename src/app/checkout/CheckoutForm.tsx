'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function CheckoutForm({ product }: { product: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            customerName: formData.get('name'),
            customerPhone: formData.get('phone'),
            productId: product.id,
            quantity: 1, // Default to 1 for prototype
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Failed to create order');

            const { orderId } = await res.json();
            router.push(`/tracking/${orderId}`);
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
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
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={20} /> Processing...
                        </span>
                    ) : (
                        'Place Pre-order'
                    )}
                </button>
                <p className="text-muted text-center" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
                    By placing this order, you agree to our Terms of Service.
                </p>
            </div>
        </form>
    );
}
