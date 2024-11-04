import "../app/styles/globals.css";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Header() {
    return (
        <>
        <header className="absolute px-6 lg:px-12 xl:px-20 py-6 w-full z-10 top-0 flex items-center justify-between">
        <Image src="/logo.jpg" alt="Logo" width={150} height={100} />
        <Navbar />
        {/* <p>Contact</p> */}
        </header>
        </>
    );
}