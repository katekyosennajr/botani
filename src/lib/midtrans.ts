import midtransClient from 'midtrans-client';

// Initialize Snap client
export const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

// Check if credentials are valid (not placeholder)
const isCredentialsValid = 
    process.env.MIDTRANS_SERVER_KEY && 
    !process.env.MIDTRANS_SERVER_KEY.includes('xxx') &&
    process.env.MIDTRANS_SERVER_KEY.length > 20;

// Helper to create a transaction
export async function createTransaction(params: {
    orderId: string;
    grossAmount: number;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
}) {
    // If credentials not valid, return mock token for development
    if (!isCredentialsValid) {
        console.warn('Using mock Midtrans token (credentials not configured)');
        return {
            token: 'mock_' + Math.random().toString(36).substring(7),
            redirect_url: `https://app.sandbox.midtrans.com/snap/v2/redirection/${params.orderId}`
        };
    }

    const parameter = {
        transaction_details: {
            order_id: params.orderId,
            gross_amount: params.grossAmount
        },
        credit_card: {
            secure: true
        },
        customer_details: {
            first_name: params.customerName,
            email: params.customerEmail,
            phone: params.customerPhone
        }
    };

    try {
        const transaction = await snap.createTransaction(parameter);
        return transaction;
    } catch (error) {
        console.error('Midtrans Error:', error);
        throw error;
    }
}
