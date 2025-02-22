"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState, useEffect, useRef } from "react";
import { FaBookmark } from "react-icons/fa";
import ToggleMode from "./togglemode";
import { Button } from "./ui/button";

const Navbar = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogin = () => {
        router.push("/login");
    };

    const handleRegister = () => {
        router.push("/register");
    };

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/");
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="top-0 w-full pb-4 border-b md:z-50">
            <div className="px-3 xs:px-8 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left section with menu and logo */}
                    <div className="flex items-center gap-4">
                        {children}
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                            <FaBookmark size={28} />
                            <span>mARK.it</span>
                        </Link>
                    </div>

                    {/* Auth Buttons or Profile */}
                    <div className="flex items-center gap-4">
                        <ToggleMode />
                        {loading ? (
                            <p>Loading...</p>
                        ) : user ? (
                            // Profile Button when Signed In
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100 transition"
                                >
                                    <Image
                                        src={user.photoURL || "/profile.png"}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <span>{user.displayName || user.email}</span>
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                                        <div className="py-1">
                                            <Link
                                                href="/dashboard/overview"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Button onClick={handleLogin}>
                                    Login
                                </Button>
                                <Button onClick={handleRegister}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
