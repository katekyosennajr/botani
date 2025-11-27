import midtransClient from 'midtrans-client';

// Initialize Snap client
export const snap = new midtransClient.Snap({
    isProduction: false, // Set to true for production
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

// Helper to create a transaction
export async function createTransaction(params: {
    orderId: string;
    grossAmount: number;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
}) {
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
        return transaction; // Contains token and redirect_url
    } catch (error) {
        console.error('Midtrans Error:', error);
        throw error;
    }
}
