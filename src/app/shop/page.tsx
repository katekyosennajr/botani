import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

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
