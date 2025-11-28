'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AddToCartProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        slug: string;
    };
}

export default function AddToCart({ product }: AddToCartProps) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const router = useRouter();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            slug: product.slug,
        }, quantity);

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    return (
        <div className="atc-container">
            <div className="atc-quantity-row">
                <span className="atc-label">Quantity</span>
                <div className="atc-quantity-selector">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="atc-qty-btn"
                        disabled={quantity <= 1}
                    >
                        <Minus size={18} />
                    </button>
                    <span className="atc-qty-value">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="atc-qty-btn"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            <div className="atc-actions">
                <button
                    onClick={handleAddToCart}
                    className="atc-btn-add"
                >
                    <ShoppingBag size={22} />
                    {isAdded ? 'Added' : 'Add to Cart'}
                </button>
                <button
                    onClick={handleBuyNow}
                    className="atc-btn-buy"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}
