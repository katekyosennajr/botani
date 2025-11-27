import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const order = await prisma.order.findUnique({
            where: { publicId: id },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true
                            }
                        }
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Failed to fetch order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
