import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export default async function CheckoutPage({
    searchParams,
}: {
    searchParams: Promise<{ productId?: string }>;
}) {
    const { productId } = await searchParams;

    if (!productId) {
        return (
            <div className="page-container" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h1 className="page-title">Your cart is empty</h1>
                    <p className="text-muted">Please select a product to pre-order.</p>
                </div>
            </div>
        );
    }

    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product) notFound();

    return (
        <div className="page-container" style={{ backgroundColor: '#f9fafb' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <h1 className="page-title text-center" style={{ marginBottom: '2rem' }}>Secure Checkout</h1>

                <div className="checkout-grid">
                    {/* Order Summary - Mobile Order 2, Desktop Order 1 (Actually in CSS grid we can control this but simpler to just swap in markup or use flex order if needed. For now keeping structure simple) */}
                    {/* Wait, the previous Tailwind version used `order-2 md:order-1`. I'll just put the summary on the right (typical) or left. Let's keep it simple: Form Left, Summary Right on Desktop. */}

                    {/* Checkout Form */}
                    <div className="checkout-form-container">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Customer Details</h2>
                        <CheckoutForm product={product} />
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="order-summary">
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Order Summary</h2>
                            <div className="summary-item">
                                <div className="summary-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>{product.name}</h3>
                                    <p style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                                    </p>
                                </div>
                            </div>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <div className="summary-row">
                                    <span className="text-muted">Subtotal</span>
                                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="text-muted">Shipping</span>
                                    <span style={{ color: 'green', fontWeight: '500' }}>Calculated later</span>
                                </div>
                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
