"use client";

const History: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex w-full">
                <div className="flex w-full items-center justify-between gap-4 px-5 py-3 bg-[#2bafa2] border-b">
                    <button type="button"
                        className="relative inline-flex items-center justify-center rounded-md p-2 text-black"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <svg className="block h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                    </button>

                    <div className="relative w-auto min-w-[30%]">
                        <input type="text" className="w-full border sm:h-10 h-8 p-4 rounded-full bg-gray-200 
                        sm:px-3.5 sm:py-2 py-1 px-3 text-black text-sm/6  
                                sm:text-base border border-[#edebf7] outline-0 outline-[#edebf7]"
                            placeholder="Skin Lesion Scan" />
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>

                        </button>
                    </div>

                    <div className="flex items-center">
                        <button type="button"
                            className="relative flex rounded-full bg-gray-800 text-sm">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <img className="sm:h-10 sm:w-10 h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="" />
                        </button>
                    </div>

                </div>

            </div>

            <div className="flex items-center justify-between px-6 py-3 gap-6">
                <p className="text-black font-bold sm:text-base text-sm">Scan history</p>
                <button type="button"
                    className="flex-none rounded-full bg-black sm:px-6 px-5 py-1.5 sm:text-sm text-xs text-white">Sort</button>
            </div>

            <div className="px-6 gap-3 flex flex-col flow overflow-x-hidden overflow-y-auto"
            style={{maxHeight: 'calc(100vh - 126px)'}}>
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
    )
}

export default History;