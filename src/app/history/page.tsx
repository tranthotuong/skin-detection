"use client";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import Sidebar from "@/components/sidebar/page";
import { useAuth } from "@/context/AuthContext";
import { SIGN_IN_URL, DETECTION_URL } from "@/lib/constants";
import { datePipe } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const History: React.FC = () => {
    const { isAuthenticated, fetchHistories } = useAuth();
    const [histories, setHistories] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const [search, setSearch] = useState<any>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
    const router = useRouter();

    // Debounce Effect: Update `debouncedSearch` after 300ms of no changes in `search`
    useEffect(() => {
        if (!isFirstLoading) {
            setHistories([]);
        }
        const handler = setTimeout(() => {
            setDebouncedSearch(search); // Update debounced value
        }, 300);

        return () => {
            clearTimeout(handler); // Clear timeout if `search` changes within 300ms
        };
    }, [search]);

    useEffect(() => {
        const fetchAndSetHistories = async () => {
            try {
                const data = await fetchHistories({
                    diseaseName: search, // Filter by disease name
                    sortOrder: 'asc',        // Sort by ascending scan date
                });
                setHistories(data);
            } catch (err: any) {
                setError(err as string);
            } finally {
                setIsFirstLoading(false);
            }
        };
        if (isAuthenticated) {
            fetchAndSetHistories();
        }
    }, [debouncedSearch, isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(SIGN_IN_URL);
        }
    }, [isAuthenticated]);
    return (
        <div className="flex h-full w-full">
            <Sidebar/>
            <div className="w-full h-full">
                <div className="w-full flex flex-col h-full">
                    <div className="basis-full overflow-hidden">
                        <Header />
                        <div className="items-center px-6 py-3">
                            <form action="" className="relative w-auto">
                                <input type="text" name="q" className="text-slate-800   w-full border font-semibold h-10 shadow p-4 rounded-full bg-gray-200"
                                    placeholder="Search for medical record."
                                    value={search} // Bind `search` state
                                    onChange={(e) => setSearch(e.target.value)} />
                                <button type="submit" className="absolute top-0 right-0 mt-3 mr-4 text-black dark:text-gray-200">
                                    <span className="sr-only">Scan</span>
                                    <svg
                                        className="w-4 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 56.966 56.966"
                                    >
                                        <path
                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                                        />
                                    </svg>

                                </button>
                            </form>
                        </div>

                        <div className="flex items-center justify-between px-6 py-3 gap-6">
                            <p className="text-black font-bold sm:text-base text-sm">Scan history</p>
                            <button type="button"
                                className="flex-none rounded-full bg-black sm:px-6 px-5 py-1.5 sm:text-sm text-xs text-white">Sort</button>
                        </div>

                        <div className="px-6 gap-3 flex flex-col flow overflow-x-hidden overflow-y-auto"
                            style={{ maxHeight: 'calc(100vh - 126px)' }}>
                            {
                                histories.length > 0 ? histories.map((h) => (
                                    <Link href={`${DETECTION_URL}/${h.id}`} key={h.id} className="flex justify-between gap-x-6 rounded-3xl px-3 py-2.5 bg-gray-200">
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="sm:h-14 sm:w-14 h-11 w-11 flex-none rounded-full bg-gray-50"
                                                src={h.imageUrl}
                                                alt={h?.disease?.name || h.id} />
                                            <div className="min-w-0 flex items-center justify-center">
                                                <div>
                                                    <p className="sm:text-sm text-xs font-bold text-black">Scan on {datePipe(h.scanDate, 'MMM dd, yyyy')}</p>
                                                    <p className="truncate sm:text-xs text-[.7rem] text-black">Key Findings: {h?.disease?.name || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )) :
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} role="status" className="animate-pulse w-full">
                                            <div className="flex justify-between gap-x-6 rounded-3xl px-3 py-2.5 bg-gray-200 w-full">
                                                <div className="h-14 w-full"></div>
                                            </div>
                                        </div>
                                    ))
                            }

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default History;