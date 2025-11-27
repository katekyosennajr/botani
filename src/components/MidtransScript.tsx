'use client';

import { useEffect } from 'react';

export default function MidtransScript() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '');
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup if needed
        };
    }, []);

    return null;
}
