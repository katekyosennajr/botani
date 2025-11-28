import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const products = [
        {
            name: 'Monstera Deliciosa Variegata',
            slug: 'monstera-deliciosa-variegata',
            description: 'A stunning variegated version of the classic Swiss Cheese Plant. Features large, fenestrated leaves with splashes of creamy white.',
            price: 1500000,
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
            category: 'Retail',
            stock: 10,
        },
        {
            name: 'Philodendron Pink Princess',
            slug: 'philodendron-pink-princess',
            description: 'Known for its dark green to black leaves with bright pink variegation. A must-have for any collector.',
            price: 450000,
            image: 'https://images.unsplash.com/photo-1616690248297-1746441364b1?auto=format&fit=crop&q=80&w=800',
            category: 'Retail',
            stock: 25,
        },
        {
            name: 'Anthurium Crystallinum',
            slug: 'anthurium-crystallinum',
            description: 'Velvety dark green leaves with prominent silvery-white veins. A jewel of the rainforest.',
            price: 350000,
            image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800',
            category: 'Retail',
            stock: 15,
        },
        {
            name: 'Alocasia Frydek',
            slug: 'alocasia-frydek',
            description: 'Also known as the Green Velvet Alocasia. Features soft, velvety leaves with glowing white veins.',
            price: 250000,
            image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800',
            category: 'Retail',
            stock: 20,
        },
        {
            name: 'Ficus Lyrata (Fiddle Leaf Fig)',
            slug: 'ficus-lyrata',
            description: 'The popular Fiddle Leaf Fig, perfect for adding a vertical statement to any room.',
            price: 180000,
            image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800',
            category: 'Wholesale',
            stock: 100,
        },
        {
            name: 'Sansevieria Trifasciata',
            slug: 'sansevieria-trifasciata',
            description: 'Snake Plant. Extremely hardy and excellent for air purification. Ideal for bulk landscaping.',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1599598425947-732d00d72855?auto=format&fit=crop&q=80&w=800',
            category: 'Wholesale',
            stock: 500,
        },
        {
            name: 'Aglaonema Pictum Tricolor',
            slug: 'aglaonema-pictum-tricolor',
            description: 'Famous for its camouflage pattern leaves in three shades of green. A rare collector\'s item.',
            price: 2500000,
            image: 'https://images.unsplash.com/photo-1612361652362-332616896229?auto=format&fit=crop&q=80&w=800',
            category: 'Retail',
            stock: 5,
        },
        {
            name: 'Calathea Orbifolia',
            slug: 'calathea-orbifolia',
            description: 'Large, round leaves with subtle silver stripes. Adds a tropical feel to any space.',
            price: 120000,
            image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&q=80&w=800',
            category: 'Retail',
            stock: 30,
        },
        {
            name: 'Monstera Adansonii',
            slug: 'monstera-adansonii',
            description: 'Swiss Cheese Vine. Fast-growing vining plant with characteristic holes in the leaves.',
            price: 35000,
            image: 'https://images.unsplash.com/photo-1598517525682-12563d414c0c?auto=format&fit=crop&q=80&w=800',
            category: 'Wholesale',
            stock: 200,
        }
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
