import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen text-gray-800">
            {/* Main Container with extra top/bottom spacing */}
            <div className="container mx-auto px-6 max-w-5xl" style={{ paddingTop: '120px', paddingBottom: '120px' }}>

                {/* Header - Added extra margin bottom */}
                <div className="text-center" style={{ marginBottom: '100px' }}>
                    <span className="text-primary font-medium tracking-widest uppercase text-sm mb-6 block">Est. 2023</span>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-10">Our Story</h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
                        Cultivating a connection between nature and your home through exceptional botanical curation.
                    </p>
                </div>

                {/* Section 1: The Beginning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center" style={{ marginBottom: '120px' }}>
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-heading font-semibold text-primary mb-8">From the Highlands</h2>
                        <div className="w-16 h-1 bg-primary/20 mb-10"></div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Botani started in 2023 in the cool, misty highlands of West Java. Surrounded by the rich biodiversity of the Indonesian archipelago, we discovered a passion for rare aroids and tropical plants that are as unique as they are beautiful.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            What began as a small collection has grown into a dedicated nursery, where we combine traditional farming wisdom with modern horticultural science to produce plants of outstanding health and vigor.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative w-full max-w-md h-96 rounded-2xl shadow-lg overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1466781783310-a2ac7d6f6028?auto=format&fit=crop&q=80&w=800"
                                alt="Botani Nursery"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Our Philosophy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center" style={{ marginBottom: '120px' }}>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md h-96 rounded-2xl shadow-lg overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"
                                alt="Plant Care"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-heading font-semibold text-primary mb-8">Living Art</h2>
                        <div className="w-16 h-1 bg-primary/20 mb-10"></div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            We believe plants are more than just decoration; they are living sculptures that breathe life into a space. Our curation process is rigorous—we look for perfect form, unique variegation, and robust health.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Every plant you receive from Botani is a testament to our commitment to quality. We don't just sell plants; we share a piece of nature's artistry.
                        </p>
                    </div>
                </div>

                {/* Values - Simple Grid */}
                <div className="bg-gray-50 rounded-3xl px-12 md:px-24 text-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                    <h2 className="text-3xl font-heading font-semibold text-primary mb-20">Why Choose Botani?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div className="group">
                            <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Guarantee</h3>
                            <p className="text-gray-500 leading-relaxed">Healthy arrival guaranteed or your money back.</p>
                        </div>
                        <div className="group">
                            <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Shipping</h3>
                            <p className="text-gray-500 leading-relaxed">Expert packaging for safe international delivery.</p>
                        </div>
                        <div className="group">
                            <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainable</h3>
                            <p className="text-gray-500 leading-relaxed">Eco-friendly practices from farm to doorstep.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
