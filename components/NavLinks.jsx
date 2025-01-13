import Link from "next/link";
import { FiMessageCircle, FiMap, FiUser, FiPlusSquare } from "react-icons/fi";

const links = [
  { href: "/chat", label: "Chat", icon: FiMessageCircle },
  { href: "/tours", label: "Tours", icon: FiMap },
  { href: "/tours/new-tour", label: "New Tour", icon: FiPlusSquare },
  { href: "/profile", label: "Profile", icon: FiUser },
];

const NavLinks = () => {
  return (
    <ul className="px-4 space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex items-center gap-4 px-4 py-3 rounded-lg text-base-content font-medium hover:bg-primary hover:text-primary-content transition-all"
          >
            <link.icon className="text-lg text-base-400 group-hover:text-primary-content" />
            <span className="capitalize">{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
