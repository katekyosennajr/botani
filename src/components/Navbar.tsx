'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Truck, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

interface Suggestion {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    image: string;
}

export default function Navbar() {
    const router = useRouter();
    const { totalItems } = useCart();
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length > 2) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
                    const data = await res.json();
                    setSuggestions(data);
                } catch (error) {
                    console.error('Search failed:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-container">
                    <Link href="/" className="logo">
                        Botani
                    </Link>

                    {/* Desktop Menu */}
                    <div className="nav-links hidden md:flex">
                        <Link href="/catalog" className="nav-link">Shop</Link>
                        <Link href="/catalog?category=Retail" className="nav-link">Retail</Link>
                        <Link href="/catalog?category=Wholesale" className="nav-link">Wholesale</Link>
                        <Link href="/about" className="nav-link">Our Story</Link>
                    </div>

                    <div className="nav-actions">
                        <button
                            className="nav-icon-btn"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        <Link href="/cart" className="nav-icon-btn relative">
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {session ? (
                            <div className="relative group">
                                <button className="nav-icon-btn">
                                    <User size={20} />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                    </div>
                                    {session.user?.role === 'ADMIN' && (
                                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="btn btn-white text-sm px-4 py-2 hidden md:inline-flex">
                                Login
                            </Link>
                        )}

                        <button
                            className="nav-icon-btn md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu md:hidden">
                        <Link href="/catalog" className="mobile-nav-link">Shop Collection</Link>
                        <Link href="/catalog?category=Retail" className="mobile-nav-link">Retail</Link>
                        <Link href="/catalog?category=Wholesale" className="mobile-nav-link">Wholesale</Link>
                        <Link href="/about" className="mobile-nav-link">Our Story</Link>
                        {!session && (
                            <Link href="/login" className="mobile-nav-link text-primary">Login / Register</Link>
                        )}
                        {session && (
                            <button onClick={() => signOut()} className="mobile-nav-link text-red-600 w-full text-left">
                                Sign Out
                            </button>
                        )}
                        <Link href="/tracking" className="mobile-nav-link flex items-center gap-2">
                            <Truck size={18} /> Track Order
                        </Link>
                    </div>
                )}
            </nav>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4">
                    <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">
                        <div className="p-4 border-b flex items-center gap-4">
                            <Search className="text-muted" />
                            <form onSubmit={handleSearchSubmit} className="flex-1">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search plants..."
                                    className="w-full outline-none text-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                            <button onClick={() => setIsSearchOpen(false)}>
                                <X className="text-muted hover:text-foreground" />
                            </button>
                        </div>

                        {/* Suggestions */}
                        {(suggestions.length > 0 || isSearching) && (
                            <div className="p-4 bg-gray-50 max-h-[60vh] overflow-y-auto">
                                {isSearching ? (
                                    <div className="text-center py-4 text-muted">Searching...</div>
                                ) : (
                                    <div className="grid gap-2">
                                        {suggestions.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.slug}`}
                                                onClick={() => setIsSearchOpen(false)}
                                                className="flex items-center gap-4 p-2 hover:bg-white rounded-md transition-colors group"
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h4 className="font-medium group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-sm text-muted">
                                                        {new Intl.NumberFormat('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR'
                                                        }).format(product.price)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
