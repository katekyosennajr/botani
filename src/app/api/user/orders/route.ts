import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('[USER_ORDERS_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
