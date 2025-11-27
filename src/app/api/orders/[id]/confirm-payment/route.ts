import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const order = await prisma.order.findUnique({
            where: { publicId: params.id }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Update order payment status to PAID
        const updatedOrder = await prisma.order.update({
            where: { publicId: params.id },
            data: {
                paymentStatus: 'PAID',
                status: 'PAID'
            }
        });

        console.log(`[Payment] Order ${params.id} payment confirmed`);

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Failed to confirm payment:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
