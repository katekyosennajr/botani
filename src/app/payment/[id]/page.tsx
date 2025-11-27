'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, QrCode, Clock, AlertCircle } from 'lucide-react';

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [order, setOrder] = useState<any>(null);
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [showQRCode, setShowQRCode] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order details
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                    setPaymentStatus(data.paymentStatus?.toLowerCase() || 'pending');
                }
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const handleConfirmPayment = async () => {
        setShowQRCode(false);
        setPaymentStatus('processing');

        try {
            const res = await fetch(`/api/orders/${id}/confirm-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setPaymentStatus('paid');
                // Redirect to tracking after 2 seconds
                setTimeout(() => {
                    router.push(`/tracking/${id}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Failed to confirm payment:', error);
            setPaymentStatus('pending');
            setShowQRCode(true);
        }
    };

    if (loading) {
        return (
            <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>Loading payment...</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>Order not found</div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2d4a3e' }}>
                            Scan to Pay
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                            Order #{order.publicId}
                        </p>
                    </div>

                    {/* Amount */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Amount</p>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d4a3e' }}>
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}
                        </p>
                    </div>

                    {/* QRIS Section */}
                    {showQRCode ? (
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '250px',
                                    height: '250px',
                                    margin: '0 auto',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed #ddd'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <QrCode size={80} style={{ margin: '0 auto', color: '#ccc' }} />
                                        <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '1rem' }}>QRIS Code</p>
                                        <p style={{ fontSize: '0.75rem', color: '#999' }}>Mock QRIS for testing</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <Clock size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
                                    <div>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '500', color: '#166534' }}>Waiting for payment</p>
                                        <p style={{ fontSize: '0.8rem', color: '#16a34a', marginTop: '0.25rem' }}>
                                            Scan QR code with any payment app to pay
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmPayment}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: '#2d4a3e',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a7c69'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d4a3e'}
                            >
                                ✓ Confirm Payment (Simulate)
                            </button>

                            <p style={{ fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center', marginTop: '1rem' }}>
                                Click the button above to simulate payment completion
                            </p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            {paymentStatus === 'paid' ? (
                                <div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <CheckCircle size={64} style={{ margin: '0 auto', color: '#16a34a' }} />
                                    </div>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#166534', marginBottom: '0.5rem' }}>
                                        Payment Successful!
                                    </p>
                                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                        Redirecting to order tracking...
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ color: '#6b7280' }}>Processing payment...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Order Summary */}
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b7280', marginBottom: '1rem' }}>ORDER SUMMARY</p>
                        {order.items?.map((item: any) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                <span>{item.product?.name} (x{item.quantity})</span>
                                <span style={{ fontWeight: '600' }}>
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
