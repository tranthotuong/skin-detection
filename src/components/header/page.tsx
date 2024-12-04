const Header: React.FC = () => {
    return (
        <div className="flex items-center justify-between px-6 py-3 gap-6">
            <ul role="list" className="mt-1">
                <li>
                    <div className="flex items-center gap-x-2">
                        <img className="w-12 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="" />
                        <div className="">
                            <p className="text-sm/2 font-semibold tracking-tight text-gray-600">Good morning,</p>
                            <p className="text-lg font-bold text-black">Tường</p>
                        </div>
                    </div>
                </li>
            </ul>
            <button type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu" aria-expanded="false">
                <svg className="bi bi-bell-fill" fill="currentColor" viewBox="0 0 16 16" width="18"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>

            </button>
        </div>
    );
};

export default Header;