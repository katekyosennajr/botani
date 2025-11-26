'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, newStatus: string) {
    await prisma.order.update({
        where: { id: orderId },
        data: {
            status: newStatus,
            paymentStatus: newStatus === 'PAID' || newStatus === 'SHIPPED' || newStatus === 'COMPLETED' ? 'PAID' : 'UNPAID'
        }
    });

    // SIMULATION: Send WhatsApp Notification
    console.log(`[WA-BOT] Sending status update for Order ${orderId}: "Status pesanan Anda telah berubah menjadi ${newStatus}."`);

    revalidatePath('/admin');
    revalidatePath(`/tracking`);
}
