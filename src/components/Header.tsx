import "../app/styles/globals.css";
import Image from "next/image";

export default function Header() {
    return (
        <>
        <header className="absolute px-20 py-6 w-full z-10 top-0 flex items-center justify-between">
        <p>Navbar</p>
        <Image src="/logo.jpg" alt="Logo" width={150} height={100} />
        <p>Contact</p>
        </header>
        </>
    );
}