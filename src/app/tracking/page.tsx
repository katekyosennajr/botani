'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function TrackingSearchPage() {
    const router = useRouter();
    const [orderId, setOrderId] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            router.push(`/tracking/${orderId.trim()}`);
        }
    };

    return (
        <div className="page-container tracking-search-container">
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="tracking-card">
                    <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Track Your Order</h1>
                    <p className="text-muted">
                        Enter your Order ID (e.g., ORD-2025-0001) to check the current status of your shipment.
                    </p>

                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="ORD-2025-XXXX"
                            className="search-input"
                        />
                        <button
                            type="submit"
                            className="search-btn"
                        >
                            <Search size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
