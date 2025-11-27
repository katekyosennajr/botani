import { prisma } from '@/lib/db';
import { generateOrderId } from '@/lib/order-generator';
import { NextResponse } from 'next/server';
import { createTransaction } from '@/lib/midtrans';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { customerName, customerPhone, shippingAddress, items, totalAmount } = body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'No items in order' }, { status: 400 });
        }

        const publicId = await generateOrderId();

        // Create Order in DB first (PENDING)
        const order = await prisma.order.create({
            data: {
                publicId,
                customerName,
                customerPhone,
                // Note: shippingAddress is collected but not stored in DB yet as schema update is needed.
                totalAmount,
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // Generate Midtrans Snap Token
        let snapToken = '';
        let snapRedirectUrl = '';

        try {
            const transaction = await createTransaction({
                orderId: publicId,
                grossAmount: totalAmount,
                customerName: customerName,
                customerPhone: customerPhone
            });
            snapToken = transaction.token;
            snapRedirectUrl = transaction.redirect_url;

            // Update Order with Snap Token
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    snapToken,
                    snapRedirectUrl
                }
            });

        } catch (midtransError) {
            console.error('Midtrans Token Generation Failed:', midtransError);
            // We still return the orderId, but maybe with a warning or handle it gracefully.
            // For now, let's log it. The user might need to retry payment later.
        }

        // SIMULATION: Send WhatsApp Notification
        console.log(`[WA-BOT] Sending message to ${customerPhone}: "Halo ${customerName}, pesanan Anda #${order.publicId} telah diterima. Silakan lakukan pembayaran."`);

        return NextResponse.json({
            orderId: order.publicId,
            snapToken
        });
    } catch (error) {
        console.error('Order creation failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
