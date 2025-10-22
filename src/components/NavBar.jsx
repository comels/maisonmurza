import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="absolute top-3 left-4 right-4 z-20 tracking-wide flex items-center justify-between">
      <div className="space-x-4">
        <Link to="/contact" className="hover:opacity-70">
          Contact
        </Link>
        <Link to="/about" className="hover:opacity-70">
          À propos
        </Link>
      </div>
      <a
        href="https://www.instagram.com/agathe_soudan/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70"
      >
        IG
      </a>
    </div>
  );
}
