import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CheckCircle, Clock, Package, Truck } from 'lucide-react';

// Mock Timeline based on status
const getTimeline = (status: string) => {
    const steps = [
        { status: 'PENDING', label: 'Order Placed', icon: Clock },
        { status: 'PAID', label: 'Payment Confirmed', icon: CheckCircle },
        { status: 'PROCESSED', label: 'Processing', icon: Package },
        { status: 'SHIPPED', label: 'Shipped', icon: Truck },
        { status: 'COMPLETED', label: 'Delivered', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(s => s.status === status);
    return steps.map((step, index) => ({
        ...step,
        completed: index <= currentIndex,
        current: index === currentIndex
    }));
};

export default async function OrderStatusPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { publicId: id },
        include: { items: { include: { product: true } } }
    });

    if (!order) notFound();

    const timeline = getTimeline(order.status);

    return (
        <div className="page-container" style={{ backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', marginBottom: '2rem' }}>
                    <div style={{ backgroundColor: 'var(--color-primary)', padding: '1.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Order #{order.publicId}</h1>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Placed on {order.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div style={{ padding: '0.25rem 1rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '500', backdropFilter: 'blur(4px)' }}>
                            {order.status}
                        </div>
                    </div>

                    <div style={{ padding: '2rem' }}>
                        {/* Timeline */}
                        <div className="timeline-container">
                            <div className="timeline-line" />
                            {timeline.map((step) => (
                                <div key={step.status} className="timeline-step">
                                    <div className={`timeline-icon ${step.completed ? 'active' : 'inactive'}`}>
                                        <step.icon size={20} />
                                    </div>
                                    <span className={`timeline-label ${step.completed ? 'active' : 'inactive'}`}>{step.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-grid">
                            {/* Order Details */}
                            <div>
                                <h2 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>Items</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {order.items.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                                            <img src={item.product.image} alt={item.product.name} style={{ width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '4px' }} />
                                            <div>
                                                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item.product.name}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity}</p>
                                                <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        <span>Total</span>
                                        <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment / QRIS */}
                            <div>
                                <h2 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>Payment</h2>
                                {order.paymentStatus === 'UNPAID' && order.qrisString ? (
                                    <div className="text-center">
                                        <div style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1rem' }}>
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(order.qrisString)}`}
                                                alt="QRIS Code"
                                                style={{ width: '12rem', height: '12rem' }}
                                            />
                                        </div>
                                        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Scan with any banking app</p>
                                        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Expires in 24 hours</p>
                                    </div>
                                ) : (
                                    <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <CheckCircle style={{ margin: '0 auto 0.5rem auto' }} />
                                        <p style={{ fontWeight: 'bold' }}>Payment Successful</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
