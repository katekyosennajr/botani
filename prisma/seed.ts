import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: 'Monstera Deliciosa Variegata',
            slug: 'monstera-deliciosa-variegata',
            description: 'A stunning variegated version of the classic Swiss Cheese Plant. Highly sought after for its unique white and green patterns.',
            price: 1500000,
            category: 'Retail',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
            stock: 5,
        },
        {
            name: 'Philodendron Pink Princess',
            slug: 'philodendron-pink-princess',
            description: 'Known for its deep green leaves with splashes of bright pink. A true collector\'s item.',
            price: 750000,
            category: 'Retail',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800', // Placeholder, using same for now
            stock: 10,
        },
        {
            name: 'Anthurium Clarinervium',
            slug: 'anthurium-clarinervium',
            description: 'Velvety heart-shaped leaves with striking white veins. Perfect for indoor elegance.',
            price: 450000,
            category: 'Retail',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
            stock: 8,
        },
        {
            name: 'Syngonium Albo (Wholesale Batch)',
            slug: 'syngonium-albo-wholesale',
            description: 'Batch of 50 Syngonium Albo cuttings. Ideal for nurseries and resellers.',
            price: 2500000,
            category: 'Wholesale',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
            stock: 20,
        },
        {
            name: 'Ficus Elastica Ruby (Wholesale Batch)',
            slug: 'ficus-elastica-ruby-wholesale',
            description: 'Batch of 20 Ficus Elastica Ruby plants. Hardy and colorful.',
            price: 1800000,
            category: 'Wholesale',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
            stock: 15,
        },
    ];

    console.log('Start seeding...');
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
        console.log(`Created product with id: ${product.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
