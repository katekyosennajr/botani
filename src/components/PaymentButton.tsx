'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentButtonProps {
    snapToken: string;
    orderId: string;
}

export default function PaymentButton({ snapToken, orderId }: PaymentButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [snapReady, setSnapReady] = useState(false);

    useEffect(() => {
        // Check if snap script is loaded
        const checkSnap = setInterval(() => {
            if (typeof (window as any).snap !== 'undefined') {
                setSnapReady(true);
                clearInterval(checkSnap);
            }
        }, 100);

        return () => clearInterval(checkSnap);
    }, []);

    const handlePayment = () => {
        if (!snapReady) {
            alert('Payment gateway is loading. Please try again.');
            return;
        }

        setIsLoading(true);

        (window as any).snap.pay(snapToken, {
            onSuccess: (result: any) => {
                console.log('Payment success:', result);
                router.refresh();
            },
            onPending: (result: any) => {
                console.log('Payment pending:', result);
                router.refresh();
            },
            onError: (result: any) => {
                console.error('Payment error:', result);
                alert('Payment failed. Please try again.');
                setIsLoading(false);
            },
            onClose: () => {
                console.log('Payment popup closed by user');
                setIsLoading(false);
            }
        });
    };

    return (
        <button
            onClick={handlePayment}
            disabled={isLoading || !snapReady}
            className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
            ) : (
                <CreditCard size={20} />
            )}
            {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
    );
}
