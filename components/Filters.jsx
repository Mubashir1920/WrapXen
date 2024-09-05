'use client'
import React, { useState, useEffect, useRef } from "react";
import { FiFilter } from "react-icons/fi";

const FilterComponent = () => {
    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };
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

    return (
        <div className="relative text-sm">
            {/* Filter Icon for Small Screens */}
            <div className="flex items-center justify-end gap-4 px-8 lg:mt-0 mt-10 " >

                <button
                    className=" lg:hidden flex items-center  px-4 py-2  border rounded-full text-gray-700 border-gray-300"
                    onClick={toggleFilter}
                >
                    <FiFilter size={20} />
                    <span className="ml-2">Filters</span>
                </button>
                <div className="lg:hidden ">
                    <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-700">
                        <option>Sort By</option>
                    </select>
                </div>
            </div>
            {/* Filter Sidebar */}
            <div className="flex items-center pt-10 justify-between" >
                <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000a1] lg:hidden  ${isOpen ? " block opacity-1" : "hidden opacity-0"
                    } `} ></div>
                <div ref={ref}
                    className={`fixed pt-20 rounded-2xl border lg:border-none lg:pt-0 inset-y-0 left-0 bg-white w-72 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:w-auto lg:bg-transparent lg:flex lg:items-center lg:space-x-4 `}
                >
                    <div className="flex flex-col space-y-4 p-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:p-0">
                        <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-700">
                            <option  >Product Type</option>
                            <option>Laptop Skins</option>
                            <option>Mobile Skins</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Min price"
                            className="md:w-[120px]  border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                        />

                        <input
                            type="text"
                            placeholder="Max price"
                            className="md:w-[120px] border border-gray-300 rounded-full px-4 py-2 text-gray-700"
                        />

                        <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-700">
                            <option>Size</option>
                            <option>13"</option>
                            <option>14"-14.6"</option>
                            <option>15"-15.6"</option>
                            <option>17"-17.3"</option>
                        </select>

                        <button className="py-2 rounded-full px-4  bg-gray-950 text-white">
                            Apply Filter
                        </button>
                    </div>
                </div>

                {/* Sort By Dropdown - Always Visible */}
                <div className="hidden lg:block ml-auto">
                    <select className="border border-gray-300 rounded-full px-4 py-2 text-gray-700">
                        <option>Sort By</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;
