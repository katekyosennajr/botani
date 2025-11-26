import { prisma } from './db';

export async function generateOrderId(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();

    // Find the last order created in the current year
    const lastOrder = await prisma.order.findFirst({
        where: {
            publicId: {
                startsWith: `ORD-${year}-`
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    let nextSequence = 1;

    if (lastOrder) {
        const parts = lastOrder.publicId.split('-');
        const lastSequence = parseInt(parts[2], 10);
        if (!isNaN(lastSequence)) {
            nextSequence = lastSequence + 1;
        }
    }

    // Pad with zeros to 4 digits (e.g., 0001)
    const sequenceStr = nextSequence.toString().padStart(4, '0');

    return `ORD-${year}-${sequenceStr}`;
}
