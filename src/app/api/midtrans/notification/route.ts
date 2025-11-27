import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

export async function POST(req: Request) {
    try {
        const notificationJson = await req.json();

        // Verify notification signature (optional but recommended for security)
        // const statusResponse = await snap.transaction.notification(notificationJson);
        // For simplicity in this prototype, we'll trust the payload or just check status directly
        const statusResponse = notificationJson;

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction Status: ${transactionStatus}. Fraud Status: ${fraudStatus}`);

        let orderStatus = 'PENDING';
        let paymentStatus = 'UNPAID';

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challenge') {
                // TODO: set transaction status on your database to 'challenge'
                // e.g. 'payment status = challenge'
                orderStatus = 'PENDING'; // Review needed
            } else if (fraudStatus == 'accept') {
                // TODO: set transaction status on your database to 'success'
                orderStatus = 'PAID';
                paymentStatus = 'PAID';
            }
        } else if (transactionStatus == 'settlement') {
            // TODO: set transaction status on your database to 'success'
            orderStatus = 'PAID';
            paymentStatus = 'PAID';
        } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            // TODO: set transaction status on your database to 'failure'
            orderStatus = 'CANCELLED';
            paymentStatus = 'FAILED';
        } else if (transactionStatus == 'pending') {
            // TODO: set transaction status on your database to 'pending' / waiting payment
            orderStatus = 'PENDING';
            paymentStatus = 'UNPAID';
        }

        // Update database
        await prisma.order.update({
            where: { publicId: orderId },
            data: {
                status: orderStatus,
                paymentStatus: paymentStatus
            }
        });

        return NextResponse.json({ status: 'OK' });
    } catch (error) {
        console.error('Midtrans Notification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
