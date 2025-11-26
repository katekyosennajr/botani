import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=2000"
            alt="Botani Hero"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <span className="hero-subtitle">Export Quality Plants</span>
          <h1 className="hero-title">
            Bring Nature's <br /> Masterpiece Home
          </h1>
          <p className="hero-desc">
            Curated ornamental plants for collectors and businesses.
            Direct from our nursery to your space.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/catalog" className="btn btn-white">
              Shop Collection
            </Link>
            <Link href="/catalog?type=wholesale" className="btn btn-white">
              Wholesale Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section bg-background">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="text-muted">Fresh from our nursery.</p>
            </div>
            <Link href="/catalog" className="flex items-center gap-2 text-primary" style={{ fontWeight: 500 }}>
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
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

          <div className="text-center" style={{ marginTop: '3rem', display: 'none' }}>
            <Link href="/catalog" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
        <div className="container">
          <div className="values-grid">
            <div>
              <div className="value-icon">🌱</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'white' }}>Premium Quality</h3>
              <p style={{ opacity: 0.8 }}>Healthy, pest-free plants nurtured by experts for export standards.</p>
            </div>
            <div>
              <div className="value-icon">📦</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'white' }}>Secure Shipping</h3>
              <p style={{ opacity: 0.8 }}>Specialized packaging ensures your plants arrive fresh and undamaged.</p>
            </div>
            <div>
              <div className="value-icon">🌍</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'white' }}>Global Export</h3>
              <p style={{ opacity: 0.8 }}>Trusted by collectors and nurseries worldwide. Phytosanitary certified.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
