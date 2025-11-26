'use client';

import Link from 'next/link';
import { ShoppingBag, Search, X, Loader2, Truck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
    id: string;
    name: string;
    slug: string;
    category: string;
}

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen) {
            setSearchQuery('');
            setSuggestions([]);
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSearchOpen]);

    // Debounced search for suggestions
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
                    if (res.ok) {
                        const data = await res.json();
                        setSuggestions(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch suggestions', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
        router.push(`/product/${suggestion.slug}`);
        setIsSearchOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-glass">
                    {/* Logo */}
                    <Link href="/" className="nav-logo">
                        Botani<span style={{ color: 'var(--color-secondary)' }}>.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="nav-links">
                        <Link href="/">Home</Link>
                        <Link href="/catalog">Shop Plants</Link>
                        <Link href="/catalog?type=wholesale">Wholesale</Link>
                        <Link href="/tracking">Track Order</Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button
                            className="nav-icon-btn"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={20} />
                        </button>

                        {/* Mobile Track Order Icon */}
                        <Link href="/tracking" className="nav-icon-btn md:hidden">
                            <Truck size={20} />
                        </Link>

                        <Link href="/cart" className="relative nav-icon-btn">
                            <ShoppingBag size={20} />
                            <span style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                fontSize: '10px',
                                width: '16px',
                                height: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%'
                            }}>0</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Premium Search Modal Overlay */}
            {isSearchOpen && (
                <div className="search-modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) setIsSearchOpen(false);
                }}>
                    <div className="search-modal-content">
                        <form onSubmit={handleSearch}>
                            <div className="search-modal-header">
                                <Search size={24} className="text-primary" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for plants..."
                                    className="search-modal-input"
                                />
                                {isLoading ? (
                                    <Loader2 size={20} className="animate-spin text-gray-400" />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsSearchOpen(false)}
                                        className="nav-icon-btn hover:bg-gray-100"
                                    >
                                        <X size={24} />
                                    </button>
                                )}
                            </div>

                            {/* Suggestions List */}
                            {suggestions.length > 0 && (
                                <div className="search-suggestions-list">
                                    <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Suggested Plants
                                    </div>
                                    {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.id}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="search-suggestion-item group"
                                        >
                                            <div className="suggestion-content">
                                                <Search size={16} className="suggestion-icon" />
                                                <span className="suggestion-name">
                                                    {suggestion.name}
                                                </span>
                                            </div>
                                            <span className="suggestion-category">
                                                {suggestion.category}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="search-modal-footer">
                                <span>Press <strong>Enter</strong> to search all</span>
                                <span><strong>Esc</strong> to close</span>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
