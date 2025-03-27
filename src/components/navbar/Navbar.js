import Link from 'next/link';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="bg-orange-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">LATENCE GAMING</Link>
        <div>
          <Link href="/games">GAMES</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;