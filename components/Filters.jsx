'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FiFilter } from "react-icons/fi";
import Button from "./Button";

const FilterComponent = () => {
    const ref = useRef();
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);


    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        replace(`${pathname}?page=0&${params.toString()}`);
    };



    return (
        <div className="relative text-sm">
            {/* Filter Icon for Small Screens */}
            <div className="flex items-center justify-end gap-4 px-8 lg:mt-0 mt-10">
                <button
                    className="lg:hidden flex items-center px-4 py-2 border rounded-full text-gray-700 border-gray-300"
                    onClick={toggleFilter}
                >
                    <FiFilter size={20} />
                    <span className="ml-2">Filters</span>
                </button>
                {/* <div className="lg:hidden">
                    <select
                        className="border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                        name="sort"
                        onChange={handleFilterChange}
                    >
                        <option>Sort By</option>
                        <option value="asc lastUpdated">Latest</option>
                        <option value="desc lastUpdated">Oldest</option>
                        <option value="asc price">Price (Low to High)</option>
                        <option value="desc price">Price (High to Low)</option>
                    </select>
                </div> */}
            </div>

            {/* Filter Sidebar */}
            <div className="flex items-center pt-10 justify-between">
                <div className={`fixed z-[9] top-0 left-0 w-[100vw] h-[100dvh] bg-[#000000a1] lg:hidden ${isOpen ? "block opacity-1" : "hidden opacity-0"}`}></div>
                <div
                    ref={ref}
                    className={`z-10 fixed pt-20 rounded-2xl border lg:border-none lg:pt-0 inset-y-0 left-0 bg-white w-72 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:relative h-[100dvh] lg:h-auto lg:transform-none lg:w-auto lg:bg-transparent lg:flex lg:items-center lg:space-x-4`}
                >
                    <h1 className="lg:hidden text-black text-lg font-semibold px-4 pt-2">Filters</h1>
                    <hr className="w-[60%] text-black h-2 mx-4 border-gray-800" />
                    <div className="flex flex-col space-y-4 p-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:p-0">
                        <select
                            name="type"
                            className="border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                            onChange={handleFilterChange}
                        >
                            <option>All Products</option>
                            <option value="laptopSkins">Laptop Skins</option>
                            <option value="mobileSkins">Mobile Skins</option>
                        </select>
                        <input
                            type="text"
                            name="min"
                            placeholder="Min price"
                            className="md:w-[120px] border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                            onChange={handleFilterChange}
                        />
                        <input
                            type="text"
                            name="max"
                            placeholder="Max price"
                            className="md:w-[120px] border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                            onChange={handleFilterChange}
                        />
                       <button onClick={()=>setIsOpen(false)} className="lg:hidden border md:w-[120px] border-black  bg-black text-white mt-4 rounded-full py-2" >Apply Filters</button>

                    </div>
                </div>

                {/* Sort By Dropdown - Always Visible */}
                {/* <div className="hidden lg:block ml-auto">
                    <select
                        className="border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                        name="sort"
                        onChange={handleFilterChange}
                    >
                        <option value="asc lastUpdated">Latest</option>
                        <option value="desc lastUpdated">Oldest</option>
                        <option value="asc price">Price (Low to High)</option>
                        <option value="desc price">Price (High to Low)</option>
                    </select>
                </div> */}
            </div>
        </div>
    );
};

export default FilterComponent;
