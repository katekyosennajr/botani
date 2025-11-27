'use client';

import { useEffect } from 'react';

export default function MidtransScript() {
    useEffect(() => {
        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

        if (!clientKey) {
            console.error('NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not set');
            return;
        }

        // Check if snap already loaded
        if ((window as any).snap) {
            console.log('Midtrans Snap already loaded');
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', clientKey);
        script.onload = () => {
            console.log('Midtrans Snap loaded successfully');
        };
        script.onerror = () => {
            console.error('Failed to load Midtrans Snap script');
        };
        document.head.appendChild(script);

        return () => {
            // Don't remove script to avoid issues
        };
    }, []);

    return null;
}
