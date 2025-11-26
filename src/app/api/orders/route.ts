import { prisma } from '@/lib/db';
import { generateOrderId } from '@/lib/order-generator';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { customerName, customerPhone, productId, quantity } = body;

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const publicId = await generateOrderId();
        const totalAmount = product.price * quantity;

        // Simulate QRIS Data (In real app, call Payment Gateway)
        const qrisString = `00020101021126570011ID.CO.QRIS.WWW011893600520000000000051440014ID.CO.QRIS.WWW0215ID10200200000000303UMI5204541153033605802ID5913BOTANI STORE6007JAKARTA61051234562070703A016304${Math.floor(Math.random() * 10000)}`;

        const order = await prisma.order.create({
            data: {
                publicId,
                customerName,
                customerPhone,
                totalAmount,
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                qrisString,
                items: {
                    create: {
                        productId,
                        quantity,
                        price: product.price
                    }
                }
            }
        });

        // SIMULATION: Send WhatsApp Notification
        console.log(`[WA-BOT] Sending message to ${customerPhone}: "Halo ${customerName}, pesanan Anda #${order.publicId} telah diterima. Silakan lakukan pembayaran via QRIS di link berikut: /tracking/${order.publicId}"`);

        return NextResponse.json({ orderId: order.publicId });
    } catch (error) {
        console.error('Order creation failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
