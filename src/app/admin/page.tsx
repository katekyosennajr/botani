import { prisma } from '@/lib/db';
import { updateOrderStatus } from './actions';

export default async function AdminPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: true } } }
    });

    return (
        <div className="page-container" style={{ backgroundColor: '#f9fafb' }}>
            <div className="container">
                <h1 className="page-title">Admin Dashboard</h1>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td style={{ fontWeight: '500' }}>{order.publicId}</td>
                                    <td>
                                        <div style={{ fontWeight: '500' }}>{order.customerName}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{order.customerPhone}</div>
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}
                                    </td>
                                    <td>
                                        <span className={`status-pill ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <form action={async () => {
                                            'use server';
                                            let nextStatus = 'PENDING';
                                            if (order.status === 'PENDING') nextStatus = 'PAID';
                                            else if (order.status === 'PAID') nextStatus = 'SHIPPED';
                                            else if (order.status === 'SHIPPED') nextStatus = 'COMPLETED';

                                            await updateOrderStatus(order.id, nextStatus);
                                        }}>
                                            <button style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                                                Next Status &rarr;
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
