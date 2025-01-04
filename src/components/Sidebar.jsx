import {
    BadgeHelp,
    BadgePlus,
    ChevronsLeft,
    ChevronsRight,
    ChevronUp,
    ChevronDown,
    CircleDot,
    Codesandbox,
    House,
    LogOut
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all items from localStorage
        localStorage.clear();
        // Navigate to login page
        navigate('/login');
    };

    return (
        <div
            className={`h-screen bg-white text-gray-800 transition-all duration-300 flex flex-col ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
        >
            {/* Header Section */}
            <header className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                    <Codesandbox size={isSidebarOpen ? 40 : 32} />
                    {isSidebarOpen && (
                        <span className="font-bold text-xl">Digi-Tech</span>
                    )}
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-1 rounded-full hover:bg-gray-200"
                >
                    {isSidebarOpen ? (
                        <ChevronsLeft size={24} />
                    ) : (
                        <ChevronsRight size={24} />
                    )}
                </button>
            </header>

            {/* Navigation Section */}
            <nav className="mt-10 flex-grow">
                <ul className="flex flex-col gap-4 px-4">
                    {/* Home Item */}
                    <li>
                        <Link
                            to="/"
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                active === 0
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-100"
                            }`}
                            onClick={() => setActive(0)}
                        >
                            <House />
                            {isSidebarOpen && <span>Home</span>}
                        </Link>
                    </li>

                    {/* Masters Item */}
                    <li>
                        <button
                            onClick={() => {
                                setActive(1);
                                setIsOpen(!isOpen);
                            }}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                                active === 1
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-100"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <BadgePlus />
                                {isSidebarOpen && <span>Masters</span>}
                            </div>
                            {isSidebarOpen &&
                                (isOpen ? <ChevronUp /> : <ChevronDown />)}
                        </button>

                        {/* Sub-item (Branch) */}
                        {isOpen && (
                            <ul className="pl-8 mt-2">
                                <li>
                                    <Link
                                        to="/branch"
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            active === 2
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-blue-100"
                                        }`}
                                        onClick={() => setActive(2)}
                                    >
                                        <CircleDot />
                                        {isSidebarOpen && <span>Branch</span>}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Help Item */}
                    <li>
                        <a
                            href="https://digitracimages.s3.ap-south-1.amazonaws.com/Help/Fuel_Management_User_Manual_13042024.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250103T140546Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAQIFGXUJPYXZ3Q2VP%2F20250103%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=6773e0a010052c96284f5c0cd08722ea43c027f23c13b70a79b8736c8b97da75"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-blue-100"
                        >
                            <BadgeHelp />
                            {isSidebarOpen && <span>Help</span>}
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="px-4 mb-6">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors hover:bg-red-100 text-red-600"
                >
                    <LogOut />
                    {isSidebarOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;