import "@/app/styles/globals.css";
import Image from "next/image";
import Link from "next/link";

import { FaInstagram, FaFacebookF } from 'react-icons/fa';

function DiamondIcon() {
    return (
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#dcbc7f">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <path d="M12.8001 21.5382C12.5087 21.7065 12.3629 21.7906 12.208 21.8235C12.0709 21.8527 11.9293 21.8527 11.7922 21.8235C11.6373 21.7906 11.4915 21.7065 11.2001 21.5382L4.13984 17.462C3.8484 17.2937 3.70268 17.2096 3.5967 17.0919C3.50293 16.9877 3.43209 16.865 3.38879 16.7318C3.33984 16.5811 3.33984 16.4129 3.33984 16.0763V7.92385C3.33984 7.58732 3.33984 7.41905 3.38879 7.26842C3.43209 7.13514 3.50293 7.01245 3.5967 6.9083C3.70268 6.7906 3.8484 6.70647 4.13984 6.5382L11.2001 2.46196C11.4915 2.2937 11.6373 2.20957 11.7922 2.17664C11.9293 2.1475 12.0709 2.1475 12.208 2.17664C12.3629 2.20957 12.5087 2.2937 12.8001 2.46196L19.8604 6.5382C20.1518 6.70647 20.2975 6.7906 20.4035 6.9083C20.4973 7.01245 20.5681 7.13514 20.6114 7.26842C20.6604 7.41905 20.6604 7.58732 20.6604 7.92384V16.0763C20.6604 16.4129 20.6604 16.5811 20.6114 16.7318C20.5681 16.865 20.4973 16.9877 20.4035 17.0919C20.2975 17.2096 20.1518 17.2937 19.8604 17.462L12.8001 21.5382Z" strokeWidth="2" strokeLinejoin="round" />
            </g>
        </svg>
    );
}

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="relative w-full h-screen">
                <div className="absolute w-full h-[80vh]">
                    <Image
                        src="/outdoor_decor.jpg"
                        alt="Outdoor decor"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="z-0"
                    />
                    <div className="absolute w-full top-0 bg-black/75 z-10 h-[80vh] flex flex-col items-center justify-center text-white">
                        <h2 className="text-5xl uppercase font-bold mb-6">Ready to Make Memories?</h2>
                        <h4 className="text-lg mb-8">Reach out to us anytime by phone or email</h4>
                        <div className="flex space-x-16 font-bold">
                            <Link href="mailto:prithviresorts@gmail.com" className="bg-primary px-12 py-4 rounded transition-all duration-300 hover:bg-amber-200/80">
                                Contact us
                            </Link>
                            <div className="flex space-x-4 font-bold text-lg text-white cursor-pointer">
                                <p className="flex items-center hover:text-primary transition-all duration-300">+91 98140 42455</p>
                                <p className="flex items-center hover:text-primary transition-all duration-300">+91 98143 13055</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-full bottom-0 bg-gradient-to-t from-black via-black to-transparent h-[40vh] z-10 text-white">
                    <div className="container max-w-4xl bg-gray-500/0 mx-auto pt-8 flex gap-8 justify-between w-full mt-4">
                        <div className="">
                            <DiamondIcon />
                            <h6 className="font-bold text-xl mt-2">Here's where to find us</h6>
                            <div className="mt-5 mb-12 text-gray-300">
                                <p>Grand Trunk Road, Village Bhattian</p>
                                <p>Phillaur, Dist. Jalandhar</p>
                                <p>Punjab, India</p>
                            </div>

                            {/* <DiamondIcon /> */}
                            {/* <h6 className="font-bold text-xl mt-2">Follow us on Social Media</h6> */}
                            <div className="flex space-x-2 mt-4">
                                <Link href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="text-gray-400 hover:text-pink-500 transition-all duration-300" size={24} />
                                </Link>
                                <Link href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF className="text-gray-400 hover:text-blue-500 transition-all duration-300" size={24} />
                                </Link>
                            </div>
                        </div>
                        <div className="">
                            <DiamondIcon />
                            <h6 className="font-bold text-xl mt-2">Find us on the map</h6>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3092.606938819987!2d75.78140301060664!3d31.069632469167054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a8918a6a3b3cf%3A0xdd024175ba9e9475!2sPrithvi%20Resorts!5e1!3m2!1sen!2sin!4v1731154860138!5m2!1sen!2sin"
                                width="350"
                                height="150"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="mt-4"
                            ></iframe>
                        </div>
                        <div className="">
                            <DiamondIcon />
                            <h6 className="font-bold text-xl mt-2">Navigation</h6>
                            <p className="text-gray-400 hover:text-primary transition-all duration-300 mt-4">
                                <Link href="/">Home</Link>
                            </p>
                            <p className="text-gray-400 hover:text-primary transition-all duration-300 mt-4">
                                <Link href="/about">About</Link>
                            </p>
                            <p className="text-gray-400 hover:text-primary transition-all duration-300 mt-4">
                                <Link href="/services">Services</Link>
                            </p>
                            <p className="text-gray-400 hover:text-primary transition-all duration-300 mt-4">
                                <Link href="/gallery">Gallery</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
