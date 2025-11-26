export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'white' }}>Botani.</h3>
                        <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: '0.9rem' }}>
                            Bringing nature's finest masterpieces to your doorstep.
                            Export-quality ornamental plants for every space.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', opacity: 0.8, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/catalog" className="hover:text-white">Shop Retail</a></li>
                            <li><a href="/catalog?type=wholesale" className="hover:text-white">Wholesale</a></li>
                            <li><a href="/tracking" className="hover:text-white">Track Order</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Contact</h4>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.5rem' }}>WhatsApp: +62 812-3456-7890</p>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Email: hello@botani.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    © 2025 Botani. RIANT ANDRIANSYAH.
                </div>
            </div>
        </footer>
    );
}
