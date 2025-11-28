import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // Update order status to PAID
        const order = await prisma.order.update({
            where: { publicId: orderId },
            data: {
                status: 'PAID',
                paymentStatus: 'PAID',
            },
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Simulation error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
