import Link from "next/link";
import { HISTORY_URL, DETECTION_URL } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Sidebar: React.FC = () => {
    const { openCamera } = useAuth();
    const [open, setOpen] = useState(true);
    const menuItems = [
        {
            icons: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path
                    d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm0 10h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm7.293-14.707-3.586-3.586a.999.999 0 0 0-1.414 0l-3.586 3.586a.999.999 0 0 0 0 1.414l3.586 3.586a.999.999 0 0 0 1.414 0l3.586-3.586a.999.999 0 0 0 0-1.414z" />
            </svg>,
            label: 'Home',
            link: true,
            url: DETECTION_URL
        },
        {
            icons: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                <path fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd" />
            </svg>,
            label: 'Camera',
            link: false,
            action: openCamera,
        },
        {
            icons: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6" fill="currentColor">
                <path d="M0 0h48v48h-48z" fill="none" />
                <path
                    d="M25.99 6c-9.95 0-17.99 8.06-17.99 18h-6l7.79 7.79.14.29 8.07-8.08h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83c3.25 3.26 7.74 5.28 12.71 5.28 9.95 0 18.01-8.06 18.01-18s-8.06-18-18.01-18zm-1.99 10v10l8.56 5.08 1.44-2.43-7-4.15v-8.5h-3z"
                    opacity=".9" />
            </svg>,
            label: 'History',
            link: true,
            url: HISTORY_URL
        },
    ]

    return (
        <div
            className={`md:flex hidden flex-col items-center h-full duration-500 overflow-hidden text-gray-700 bg-gray-100 rounded ${open ? 'w-52 xl:w-64' : 'w-16'}`}>
            <a className="flex items-center w-full px-3 mt-3" href="#">
                <img src="/icon512_rounded.png" alt="Logo" className={`w-9 h-9 fill-current ${open ? '' : 'hidden'}`} />
                <span className={`ml-2 text-sm font-bold ${open ? '' : 'hidden'}`}>Skin detection</span>
                <div className={`flex-1 flex items-center ${open ? 'justify-end' : 'justify-center'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`duration-500 w-5 h-5 cursor-pointer ${!open && ' rotate-180'}`}
                        viewBox="0 0 20 20" fill="currentColor" onClick={() => setOpen(!open)}>
                        <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </a>
            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
                    {
                        menuItems.map((item, index) => {
                            return item.link == true ? (<Link key={index} className="group flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300  
                                duration-300 cursor-pointer" href={item?.url || ''}>
                                {item.icons}
                                <span className={`${!open ? 'w-0 translate-x-24' : 'ms-2'} duration-500 overflow-hidden text-sm font-medium`}>{item.label}</span>
                                <span className={`${open && 'hidden'} absolute left-32 z-50 shadow-md rounded-md w-0 p-0 text-black bg-violet-200 overflow-hidden 
                                group-hover:w-fit group-hover:p-2 group-hover:left-16 text-sm font-medium`}>{item.label}</span>
                            </Link>) : (
                                <button key={index} className="group flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300  duration-300 cursor-pointer"
                                onClick={item?.action}>
                                    {item.icons}
                                    <span className={`${!open ? 'w-0 translate-x-24' : 'ms-2'} duration-500 overflow-hidden text-sm font-medium`}>{item.label}</span>
                                    <span className={`${open && 'hidden'} absolute left-32 z-50 shadow-md rounded-md w-0 p-0 text-black bg-violet-200 overflow-hidden 
                                 group-hover:w-fit group-hover:p-2 group-hover:left-16 text-sm font-medium`}>{item.label}</span>
                                </button>
                            )
                        })
                    }
                </div>
                {/* <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
				<a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Products</span>
				</a>
				<a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
					<span className="ml-2 text-sm font-medium">Settings</span>
				</a>
				<a className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Messages</span>
					<span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
				</a>
			</div> */}
            </div>
            <a className={`flex items-center w-full p-2 mt-auto group ${!open && 'justify-center'}`} href="#">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div
                    className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden truncate text-[10px] font-semibold tracking-wide focus:outline-none`}>
                    <span className="rounded-lg bg-violet-100 px-2 font-semibold text-primary">v0.0.1</span>
                </div>
                <span className={`${open && 'hidden'} absolute left-32 z-50 shadow-md rounded-md w-0 p-0 text-black bg-violet-200 overflow-hidden 
                                    group-hover:w-fit group-hover:p-2 group-hover:left-16 text-sm font-medium`}>v0.0.1</span>
            </a>
        </div>
    );
};

export default Sidebar;