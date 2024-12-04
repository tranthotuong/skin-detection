import Link from "next/link";
import { HISTORY_URL, DETECTION_URL } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";

const Footer: React.FC = () => {
    const { openCamera } = useAuth();

    return (
        <div
            className="transform justify-between bg-blue-300 w-full flex">
            <span className="sr-only">Home</span>
            <Link href={DETECTION_URL} className="inline-flex flex-col items-center text-xs font-medium text-gray-800 py-3 px-4 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9">
                    <path
                        d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm0 10h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm7.293-14.707-3.586-3.586a.999.999 0 0 0-1.414 0l-3.586 3.586a.999.999 0 0 0 0 1.414l3.586 3.586a.999.999 0 0 0 1.414 0l3.586-3.586a.999.999 0 0 0 0-1.414z" />
                </svg>
            </Link>

            <span className="sr-only">Camera</span>
            <button
                className="relative inline-flex flex-col items-center text-xs font-medium text-gray-800 py-3 px-1 flex-grow"
                onClick={openCamera}>
                <div className="absolute bottom-5 p-4 rounded-full border-8 border-white bg-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                        <path fill-rule="evenodd"
                            d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd" />
                    </svg>
                </div>
            </button>

            <span className="sr-only">History</span>
            <Link href={HISTORY_URL} className="inline-flex flex-col items-center text-xs font-medium text-gray-800 py-3 px-4 flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-9 h-9">
                    <path d="M0 0h48v48h-48z" fill="none" />
                    <path
                        d="M25.99 6c-9.95 0-17.99 8.06-17.99 18h-6l7.79 7.79.14.29 8.07-8.08h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83c3.25 3.26 7.74 5.28 12.71 5.28 9.95 0 18.01-8.06 18.01-18s-8.06-18-18.01-18zm-1.99 10v10l8.56 5.08 1.44-2.43-7-4.15v-8.5h-3z"
                        opacity=".9" />
                </svg>
            </Link>
        </div>
    );
};

export default Footer;