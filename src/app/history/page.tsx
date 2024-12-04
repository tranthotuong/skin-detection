"use client";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";

const History: React.FC = () => {
    return (
        <div className="container mx-auto md:px-4 px-0 max-w-[1024px] h-full">
            <div className="lg:px-8 w-full h-full">
                <div className="w-full flex flex-col h-full">
                    <div className="basis-full overflow-hidden">
                        <Header />
                        <div className="items-center px-6 py-3">
                            <form action="" className="relative w-auto">
                            <input type="text" name="q" className="w-full border font-semibold h-10 shadow p-4 rounded-full bg-gray-200"
                                placeholder="Search for medical record." />
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
                                Array.from({ length: 100 }).map((_, i) => (
                                    <div key={i} className="flex justify-between gap-x-6 rounded-3xl px-3 py-2.5 bg-gray-200">
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="sm:h-14 sm:w-14 h-11 w-11 flex-none rounded-full bg-gray-50"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt="" />
                                            <div className="min-w-0 flex items-center justify-center">
                                                <div>
                                                    <p className="sm:text-sm text-xs font-bold text-black">Scan on 2023-10-01</p>
                                                    <p className="truncate sm:text-xs text-[.7rem] text-black">Key Findings: Mild risk of melanoma</p>
                                                </div>
                                            </div>
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