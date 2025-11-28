'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounce search - start from 1 character
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length > 0) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
                    if (!res.ok) {
                        console.error('Search failed:', res.status);
                        setSuggestions([]);
                        return;
                    }
                    const data = await res.json();
                    setSuggestions(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error('Search error:', error);
                    setSuggestions([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            setSearchQuery('');
            router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleSuggestionClick = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleDropdownItemClick = () => {
        setIsDropdownOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-container">
                    <Link href="/" className="logo">
                        Botani
                    </Link>

                    {/* Desktop Menu - Hidden, only shows in dropdown */}
                    <div className="nav-links hidden md:flex" style={{ display: 'none' }}>
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
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Dropdown Menu - Only one */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="nav-icon-btn"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-label="Menu"
                            >
                                <Menu size={20} />
                            </button>

                            {isDropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    marginTop: '0.5rem',
                                    backgroundColor: 'white',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    zIndex: 50,
                                    border: '1px solid #e5e7eb',
                                    overflow: 'hidden'
                                }}>
                                    <Link
                                        href="/shop"
                                        style={{
                                            display: 'block',
                                            padding: '0.75rem 1.25rem',
                                            fontSize: '0.95rem',
                                            color: '#374151',
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            e.currentTarget.style.color = '#2d4a3e';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white';
                                            e.currentTarget.style.color = '#374151';
                                        }}
                                        onClick={handleDropdownItemClick}
                                    >
                                        Shop
                                    </Link>
                                    <Link
                                        href="/catalog?category=Retail"
                                        style={{
                                            display: 'block',
                                            padding: '0.75rem 1.25rem',
                                            fontSize: '0.95rem',
                                            color: '#374151',
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            e.currentTarget.style.color = '#2d4a3e';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white';
                                            e.currentTarget.style.color = '#374151';
                                        }}
                                        onClick={handleDropdownItemClick}
                                    >
                                        Retail
                                    </Link>
                                    <Link
                                        href="/catalog?category=Wholesale"
                                        style={{
                                            display: 'block',
                                            padding: '0.75rem 1.25rem',
                                            fontSize: '0.95rem',
                                            color: '#374151',
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            e.currentTarget.style.color = '#2d4a3e';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white';
                                            e.currentTarget.style.color = '#374151';
                                        }}
                                        onClick={handleDropdownItemClick}
                                    >
                                        Wholesale
                                    </Link>
                                    <Link
                                        href="/about"
                                        style={{
                                            display: 'block',
                                            padding: '0.75rem 1.25rem',
                                            fontSize: '0.95rem',
                                            color: '#374151',
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            e.currentTarget.style.color = '#2d4a3e';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white';
                                            e.currentTarget.style.color = '#374151';
                                        }}
                                        onClick={handleDropdownItemClick}
                                    >
                                        Our Story
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu md:hidden">
                        <Link href="/shop" className="mobile-nav-link">Shop</Link>
                        <Link href="/catalog?category=Retail" className="mobile-nav-link">Retail</Link>
                        <Link href="/catalog?category=Wholesale" className="mobile-nav-link">Wholesale</Link>
                        <Link href="/about" className="mobile-nav-link">Our Story</Link>
                        <Link href="/login" className="mobile-nav-link text-primary">Login</Link>
                    </div>
                )}
            </nav>

            {/* Search Modal - Elegant Design */}
            {isSearchOpen && (
                <div
                    className="search-modal-overlay"
                    onClick={() => setIsSearchOpen(false)}
                >
                    <div
                        className="search-modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '500px', marginTop: '60px' }}
                    >
                        <div className="search-modal-header" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                <Search size={16} className="text-muted" style={{ flexShrink: 0 }} />
                                <form onSubmit={handleSearchSubmit} className="flex-1">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Find your perfect plant..."
                                        className="search-modal-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoComplete="off"
                                        style={{ width: '100%', outline: 'none', border: 'none', fontSize: '1rem' }}
                                    />
                                </form>
                            </div>
                            <button
                                onClick={handleCloseSearch}
                                className="text-muted hover:text-primary"
                                style={{ padding: '0.25rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '1rem' }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Suggestions List */}
                        {suggestions.length > 0 && (
                            <div className="search-suggestions-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {suggestions.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        onClick={handleSuggestionClick}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1rem',
                                            borderBottom: '1px solid #f3f4f6',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f9fafb';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                width: '56px',
                                                height: '56px',
                                                objectFit: 'cover',
                                                borderRadius: '0.375rem',
                                                flexShrink: 0
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.25rem', color: '#1f2937' }}>
                                                {product.name}
                                            </p>
                                            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                {product.category} • {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                }).format(product.price)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Loading State */}
                        {isSearching && (
                            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                                Searching...
                            </div>
                        )}

                        {/* No Results */}
                        {searchQuery.length > 0 && !isSearching && suggestions.length === 0 && (
                            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                                No plants found matching "{searchQuery}"
                            </div>
                        )}

                        {/* Help Text */}
                        {searchQuery.length === 0 && (
                            <div style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#d1d5db', backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
                                Type to search by plant name
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
