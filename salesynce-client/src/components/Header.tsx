import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">Salesync</Link>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className="hidden md:flex items-center gap-4">
                    <Link to="/" className="px-4 py-2 rounded-lg font-semibold transition bg-blue-100 text-blue-700 hover:bg-blue-200">Home</Link>
                    <Link to="/sign-in" className="px-4 py-2 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700">Sign In</Link>
                </nav>
            </div>

            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <Link to="/" className="block px-4 py-2 rounded-lg font-semibold transition bg-blue-100 text-blue-700 hover:bg-blue-200" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/sign-in" className="block px-4 py-2 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700" onClick={() => setMenuOpen(false)}>Sign In</Link>
                </div>
            )}
        </header>
    );
}

export default Header;
