import React from 'react';
import { Leaf, Award, Globe, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section - Parallax-like effect */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1466781783310-a2ac7d6f6028?auto=format&fit=crop&q=80&w=2000"
                        alt="Botani Greenhouse"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs font-medium tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                        Est. 2023 • West Java, Indonesia
                    </span>
                    <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">
                        Cultivating <br />
                        <span className="italic font-light text-accent">Living Art</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        We bridge the gap between the lush rainforests of Indonesia and the curated spaces of collectors worldwide.
                    </p>
                </div>
            </div>

            {/* Narrative Section - Split Layout */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
                            Rooted in Passion, <br />Growing with Purpose.
                        </h2>
                        <div className="w-20 h-1 bg-secondary"></div>
                        <p className="text-lg text-text-muted leading-relaxed">
                            Botani was born from a deep reverence for the unique biodiversity of the Indonesian archipelago. What began as a humble family nursery in the misty highlands of West Java has blossomed into a premier botanical atelier.
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                            We don't just sell plants; we curate living sculptures. Each specimen is hand-selected for its vigor, variegation, and architectural form, ensuring that it transforms from a plant into a centerpiece of your space.
                        </p>

                        <div className="pt-8 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-4xl font-heading font-bold text-primary mb-2">500+</h4>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Rare Species</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-heading font-bold text-primary mb-2">15+</h4>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Global Destinations</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-full h-full border-2 border-primary/10 rounded-2xl z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"
                            alt="Rare Monstera"
                            className="relative z-10 w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl z-20 max-w-xs hidden md:block">
                            <p className="font-heading text-xl text-primary italic">"Nature is not a place to visit. It is home."</p>
                            <p className="text-sm text-text-muted mt-4">— Gary Snyder</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="bg-primary text-white py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">The Botani Standard</h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg">
                            We adhere to the strictest standards of cultivation and export, ensuring that your plant arrives not just alive, but thriving.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-accent">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-4">Ethical Sourcing</h3>
                            <p className="text-white/70 leading-relaxed">
                                We partner exclusively with sustainable farms and local growers, ensuring fair trade practices and environmental stewardship in every harvest.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-accent">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-4">Premium Genetics</h3>
                            <p className="text-white/70 leading-relaxed">
                                Our collection focuses on high-quality genetics. From stable variegation to perfect fenestrations, we prioritize the traits that collectors desire.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-accent">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-4">Expert Logistics</h3>
                            <p className="text-white/70 leading-relaxed">
                                Shipping live plants globally requires expertise. Our specialized packaging and phytosanitary process guarantees safe arrival to over 15 countries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Gallery / Commitment */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="rounded-3xl overflow-hidden relative h-[500px] md:h-[600px]">
                    <img
                        src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1600"
                        alt="Sustainable Nursery"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-8">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">
                            Sustainability at Heart
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl leading-relaxed mb-10">
                            For every plant that leaves our nursery, we plant a tree in the local rainforests of Java. We are committed to a net-positive impact on our environment.
                        </p>
                        <button className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-accent transition-colors duration-300">
                            Read Our Sustainability Report
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
