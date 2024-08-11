import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-red-700 to-black text-white p-4 fixed w-full top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-3xl font-bold">
                    <Link to="/" className="hover:text-gray-200 transition-colors duration-300">EfodMagen</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu" className="p-2">
                        {isOpen ? <Menu size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Menu Items */}
                <ul
                    className={`fixed inset-0 bg-red-900 bg-opacity-90 md:static md:flex md:space-x-8 space-y-6 md:space-y-0 md:bg-transparent p-6 md:p-0 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}
                >
                    <div className="absolute top-4 right-4 p-4 md:hidden ">
                        <button onClick={closeMenu} aria-label="Close menu" className="text-white text-4xl p-2">
                            <X />
                        </button>
                    </div>
                    <li><Link to="/auth/register" className="block text-lg hover:text-gray-200 transition-colors duration-300 text-center" onClick={closeMenu}>Register</Link></li>
                    <li><Link to="/auth/login" className="block text-lg hover:text-gray-200 transition-colors duration-300 text-center" onClick={closeMenu}>Login</Link></li>
                    <li><Link to="/shelters" className="block text-lg hover:text-gray-200 transition-colors duration-300 text-center" onClick={closeMenu}>Find a Shelter</Link></li>
                    <li><Link to="/profile" className="block text-lg hover:text-gray-200 transition-colors duration-300 text-center" onClick={closeMenu}>Profile</Link></li>
                    <li><Link to="/shelters/saved" className="block text-lg hover:text-gray-200 transition-colors duration-300 text-center" onClick={closeMenu}>Saved Shelters</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
