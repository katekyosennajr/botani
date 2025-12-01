import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, CreditCard, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import PaymentButton from '@/components/PaymentButton';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session || !session.user) {
        redirect('/login');
    }

    const order = await prisma.order.findUnique({
        where: {
            id: id
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                    <Link href="/dashboard/orders" className="text-primary hover:underline">
                        Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    // Security check: Ensure order belongs to user
    if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
        redirect('/dashboard');
    }

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
                        <Link href="/dashboard/orders" className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-gray-900">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-gray-900">Order #{order.publicId}</h1>
                            <p className="text-gray-500 text-sm">
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Order Items */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Package size={20} className="text-gray-400" /> Order Items
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="p-6 flex items-center gap-4">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                                <p className="text-sm text-gray-500">{item.product.category}</p>
                                                <div className="mt-1 flex items-center justify-between">
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    <p className="font-medium text-gray-900">
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-gray-50 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                        <span className="font-bold text-lg text-gray-900">Total</span>
                                        <span className="font-bold text-lg text-primary">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Status Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="font-bold text-gray-900 mb-4">Order Status</h2>
                                <div className={`p-4 rounded-xl mb-4 ${getStatusColor(order.status)}`}>
                                    <p className="font-bold text-center uppercase tracking-wider text-sm">{order.status}</p>
                                </div>

                                {order.status === 'PENDING' && order.snapToken && (
                                    <div className="mt-4">
                                        <PaymentButton
                                            snapToken={order.snapToken}
                                            orderId={order.id}
                                        />
                                        <p className="text-xs text-center text-gray-500 mt-2">
                                            Complete your payment to process this order.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Customer Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="font-bold text-gray-900 mb-4">Customer Details</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 text-gray-400"><MapPin size={18} /></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {order.customerName}<br />
                                                {order.customerPhone}<br />
                                                (Address implementation pending)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
