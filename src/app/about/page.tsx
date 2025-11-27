import React from 'react';

export default function AboutPage() {
    return (
        <div className="page-container">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="page-title mb-6">Cultivating Nature's Masterpieces</h1>
                    <p className="text-xl text-muted leading-relaxed">
                        Botani was founded on a simple yet profound passion: to bring the world's most exquisite ornamental plants from the rich soils of Indonesia to collectors and enthusiasts globally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1000"
                            alt="Our Nursery"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Roots</h2>
                        <p className="text-muted mb-6 leading-relaxed">
                            Established in 2023, Botani began as a small family nursery in the highlands of West Java. We recognized that the unique biodiversity of our region produced aroids and ornamental plants of unmatched vigor and beauty.
                        </p>
                        <p className="text-muted mb-6 leading-relaxed">
                            Today, we partner with local farmers and expert botanists to curate a collection that meets the highest international standards. Every plant is hand-selected, acclimatized, and inspected to ensure it thrives in its new home, whether that's a retail living room or a wholesale greenhouse.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-2">500+</h3>
                                <p className="text-sm text-muted uppercase tracking-wide">Species Cultivated</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-2">15+</h3>
                                <p className="text-sm text-muted uppercase tracking-wide">Countries Served</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-primary text-white rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-6">Our Commitment</h2>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                        We believe in sustainable horticulture. For every plant we export, we invest in local conservation efforts to preserve the natural habitats that inspire us. Quality, integrity, and sustainability are the roots of our business.
                    </p>
                </div>
            </div>
        </div>
    );
}
