import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, User, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/login');
    }

    const recentOrders = await prisma.order.findMany({
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
        },
        take: 5
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAID': return <CheckCircle size={16} />;
            case 'PENDING': return <Clock size={16} />;
            case 'SHIPPED': return <Truck size={16} />;
            case 'CANCELLED': return <XCircle size={16} />;
            default: return <Package size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">My Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User size={32} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-gray-900">{session.user.name}</h2>
                                        <p className="text-sm text-gray-500">{session.user.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Member Since</p>
                                        <p className="text-sm font-medium">
                                            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Account Type</p>
                                        <p className="text-sm font-medium capitalize">{session.user.role.toLowerCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="font-bold text-gray-900 text-lg">Recent Orders</h2>
                                    <Link href="/dashboard/orders" className="text-sm text-primary hover:underline font-medium">
                                        View All
                                    </Link>
                                </div>

                                {recentOrders.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                            <Package size={32} />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-6">Start your collection today with our premium plants.</p>
                                        <Link href="/shop" className="btn btn-primary">
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Order #{order.publicId}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 mb-4 overflow-x-auto pb-2">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="shrink-0 relative group">
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

                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}
                                                    </p>
                                                    <Link
                                                        href={`/dashboard/orders/${order.id}`}
                                                        className="text-sm font-medium text-primary hover:text-primary-dark"
                                                    >
                                                        View Details
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
            </div>
        </div>
    );
}
