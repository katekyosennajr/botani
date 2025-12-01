import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, ArrowLeft, Search } from 'lucide-react';

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/login');
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'SHIPPED': return 'bg-blue-100 text-blue-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/dashboard" className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-gray-900">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-heading font-bold text-gray-900">Order History</h1>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {orders.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <Package size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                                <Link href="/shop" className="btn btn-primary">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-bold text-gray-900">#{order.publicId}</span>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}
                                                </p>
                                                <p className="text-sm text-gray-500">{order.items.length} items</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-4 overflow-x-auto pb-2">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="shrink-0 relative group" title={item.product.name}>
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                                    />
                                                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end">
                                            <Link
                                                href={`/dashboard/orders/${order.id}`}
                                                className="btn btn-outline text-sm py-2"
                                            >
                                                View Order Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
