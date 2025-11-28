import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string }>;
}) {
    const { category, search } = await searchParams;

    // If category is specified (from dropdown), show filtered view
    if (category) {
        const products = await prisma.product.findMany({
            where: {
                category: category,
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
                                {category === 'Wholesale' ? 'Wholesale Collection' : 'Retail Collection'}
                            </h1>
                            <p className="text-muted" style={{ maxWidth: '600px' }}>
                                {category === 'Wholesale'
                                    ? 'Bulk options for nurseries, landscapers, and resellers. Minimum order quantities apply.'
                                    : 'Hand-picked specimens for your personal collection. Nurtured with care.'}
                            </p>
                        </div>

                        <div className="filter-bar">
                            <Link
                                href="/catalog?category=Retail"
                                className={`filter-btn ${category === 'Retail' ? 'active' : ''}`}
                            >
                                Retail
                            </Link>
                            <Link
                                href="/catalog?category=Wholesale"
                                className={`filter-btn ${category === 'Wholesale' ? 'active' : ''}`}
                            >
                                Wholesale
                            </Link>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="empty-state">
                            <p>No plants found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default: Show all products (Shop view)
    const allProducts = await prisma.product.findMany({
        where: {
            name: search ? { contains: search } : undefined
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="page-container">
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Our Shop</h1>
                        <p className="text-muted" style={{ maxWidth: '600px' }}>
                            Explore our complete collection of premium ornamental plants. Available for both retail and wholesale.
                        </p>
                    </div>
                </div>

                {allProducts.length === 0 ? (
                    <div className="empty-state">
                        <p>No plants found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {allProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}                {products.length === 0 ? (
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
