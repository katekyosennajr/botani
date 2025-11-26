import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    slug: string;
}

export default function ProductCard({ name, price, image, category, slug }: ProductCardProps) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={image}
                    alt={name}
                />
                <div className="product-badge">
                    {category}
                </div>
            </div>

            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <div className="product-footer">
                    <span className="product-price">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}
                    </span>
                    <Link
                        href={`/product/${slug}`}
                        className="product-btn"
                    >
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
