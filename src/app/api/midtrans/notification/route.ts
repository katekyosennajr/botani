import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

// Initialize Snap client for verification
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

export async function POST(req: Request) {
    try {
        const notification = await req.json();

        // Get transaction status from Midtrans
        const orderId = notification.order_id;
        const transactionId = notification.transaction_id;
        const status = notification.transaction_status;
        const fraudStatus = notification.fraud_status;

        console.log(`[Midtrans Notification] Order: ${orderId}, Status: ${status}, Fraud: ${fraudStatus}`);

        // Find order by publicId
        const order = await prisma.order.findUnique({
            where: { publicId: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Update order status based on transaction status
        if (status === 'capture') {
            if (fraudStatus === 'challenge') {
                // Fraud challenge, keep as PENDING
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        paymentStatus: 'PENDING',
                        status: 'PENDING'
                    }
                });
            } else if (fraudStatus === 'accept') {
                // Payment accepted
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        paymentStatus: 'PAID',
                        status: 'PAID'
                    }
                });
            }
        } else if (status === 'settlement') {
            // Payment settled
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    paymentStatus: 'PAID',
                    status: 'PAID'
                }
            });
        } else if (status === 'pending') {
            // Payment pending
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    paymentStatus: 'UNPAID',
                    status: 'PENDING'
                }
            });
        } else if (status === 'deny') {
            // Payment denied
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    paymentStatus: 'FAILED',
                    status: 'CANCELLED'
                }
            });
        } else if (status === 'cancel' || status === 'expire') {
            // Payment cancelled or expired
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    paymentStatus: 'FAILED',
                    status: 'EXPIRED'
                }
            });
        } else if (status === 'refund') {
            // Payment refunded
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    paymentStatus: 'REFUNDED',
                    status: 'REFUNDED'
                }
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Midtrans Notification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
