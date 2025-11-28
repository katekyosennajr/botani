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
                    if (!res.ok) throw new Error('Search failed');
                    const data = await res.json();
                    setSuggestions(data);
                } catch (error) {
                    console.error('Search failed:', error);
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
            router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
        }
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
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
                                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 min-w-max">
                                    <Link 
                                        href="/catalog" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-nowrap"
                                        onClick={handleDropdownItemClick}
                                    >
                                        Shop
                                    </Link>
                                    <Link 
                                        href="/catalog?category=Retail" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-nowrap"
                                        onClick={handleDropdownItemClick}
                                    >
                                        Retail
                                    </Link>
                                    <Link 
                                        href="/catalog?category=Wholesale" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-nowrap"
                                        onClick={handleDropdownItemClick}
                                    >
                                        Wholesale
                                    </Link>
                                    <Link 
                                        href="/about" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-nowrap"
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
                        <Link href="/catalog" className="mobile-nav-link">Shop</Link>
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
                        <div className="search-modal-header" style={{ padding: '1.25rem' }}>
                            <Search size={18} className="text-muted" />
                            <form onSubmit={handleSearchSubmit} className="flex-1 ml-3">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Find your perfect plant..."
                                    className="search-modal-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoComplete="off"
                                />
                            </form>
                            <button 
                                onClick={() => setIsSearchOpen(false)} 
                                className="text-muted hover:text-primary"
                                style={{ padding: '0.25rem' }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Suggestions List */}
                        {suggestions.length > 0 && (
                            <div className="search-suggestions-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {suggestions.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        onClick={() => setIsSearchOpen(false)}
                                        className="search-suggestion-item"
                                    >
                                        <div className="suggestion-content">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                            <div>
                                                <p className="suggestion-name">{product.name}</p>
                                                <p className="text-xs text-muted">
                                                    {product.category} • {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR'
                                                    }).format(product.price)}
                                                </p>
                                            </div>
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
