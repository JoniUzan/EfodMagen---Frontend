import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-3xl font-bold">
                    <a href="/">ShelterFinder</a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Menu Items */}
                <ul
                    className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'
                        } md:static absolute top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:space-x-8 space-y-6 pt-3 md:mt-0 p-6`}
                >
                    <li><a href="#" className="block text-center text-lg hover:text-gray-400">Register</a></li>
                    <li><a href="#" className="block text-center text-lg hover:text-gray-400">Login</a></li>
                    <li><a href="#" className="block text-center text-lg hover:text-gray-400">Find a Shelter</a></li>
                    <li><a href="#" className="block text-center text-lg hover:text-gray-400">Profile</a></li>
                    <li><a href="#" className="block text-center text-lg hover:text-gray-400">Saved Shelters</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
