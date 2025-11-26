import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string; search?: string }>;
}) {
    const { type, search } = await searchParams;
    const categoryFilter = type === 'wholesale' ? 'Wholesale' : 'Retail';

    const products = await prisma.product.findMany({
        where: {
            category: type ? categoryFilter : undefined,
            name: search ? { contains: search } : undefined
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">
                            {type === 'wholesale' ? 'Wholesale Collection' : 'Retail Collection'}
                        </h1>
                        <p className="text-muted" style={{ maxWidth: '600px' }}>
                            {type === 'wholesale'
                                ? 'Bulk options for nurseries, landscapers, and resellers. Minimum order quantities apply.'
                                : 'Hand-picked specimens for your personal collection. Nurtured with care.'}
                        </p>
                    </div>

                    <div className="filter-bar">
                        <Link
                            href="/catalog"
                            className={`filter-btn ${!type ? 'active' : ''}`}
                        >
                            Retail
                        </Link>
                        <Link
                            href="/catalog?type=wholesale"
                            className={`filter-btn ${type === 'wholesale' ? 'active' : ''}`}
                        >
                            Wholesale
                        </Link>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="empty-state">
                        <p>No products found in this category.</p>
                    </div>
                ) : (
                    <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                slug={product.slug}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
