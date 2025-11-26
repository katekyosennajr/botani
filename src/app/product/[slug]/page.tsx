import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Check, Truck } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
        where: { slug }
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="page-container">
            <div className="container">
                <Link href="/catalog" className="flex items-center gap-2 text-muted" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
                    <ArrowLeft size={18} /> Back to Catalog
                </Link>

                <div className="product-detail-grid">
                    {/* Image */}
                    <div className="product-detail-image">
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <span className="product-category-badge">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="page-title" style={{ fontSize: '2.5rem' }}>{product.name}</h1>
                        <p className="product-detail-price">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                        </p>

                        <div style={{ marginBottom: '2.5rem', lineHeight: '1.7', color: 'var(--color-text-muted)' }}>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-features">
                            <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Why Pre-order?</h3>
                            <ul style={{ listStyle: 'none' }}>
                                <li className="feature-item">
                                    <Check size={18} className="text-primary" style={{ marginTop: '2px' }} />
                                    <span>Guaranteed fresh selection from our nursery.</span>
                                </li>
                                <li className="feature-item">
                                    <Check size={18} className="text-primary" style={{ marginTop: '2px' }} />
                                    <span>Exclusive export-quality specimens.</span>
                                </li>
                                <li className="feature-item">
                                    <Truck size={18} className="text-primary" style={{ marginTop: '2px' }} />
                                    <span>Secure packaging and tracked shipping.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href={`/checkout?productId=${product.id}`}
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '1rem' }}
                            >
                                Pre-order Now
                            </Link>
                            <button className="btn btn-secondary">
                                Ask via WhatsApp
                            </button>
                        </div>
                        <p className="text-muted text-center" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
                            *Estimated processing time: 3-5 days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
