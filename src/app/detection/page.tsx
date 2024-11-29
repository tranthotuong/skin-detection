"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MAINPAGE, SIGN_IN_URL } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";

const Detection: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalStep] = useState(2);
  const [sports, setSports] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [selectedSports, setSelectedSports] = useState<number[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const router = useRouter();
  const { isAuthenticated, fetchSports, dayOfWeeks, updateAccountInfo, fetchUserInfo } = useAuth();

  useEffect(() => {
    const fetchAndSetSports = async () => {
      try {
        const data = await fetchSports();
        setSports(data);
      } catch (err: any) {
        setError(err as string);
      }
    };

    const fetchUser = async () => {
      try {
        const data = await fetchUserInfo();
        setIsFirstLogin(data?.firstLogin || false);
      } catch (err: any) {
        setError(err as string);
      }
    }

    fetchUser();
    fetchAndSetSports();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(SIGN_IN_URL);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  const handleRefresh = () => {
    if (navigator.onLine) {
      // router.push("/");
    } else {
      setIsOnline(false);
    }
  };

  /**
   * Handle sport select
   */
  const handleSportSelect = (sportId: number) => {
    setSelectedSports((prev) => {
      if (prev.includes(sportId)) {
        return prev.filter((name) => name !== sportId); // Unselect if already selected
      } else {
        return [...prev, sportId]; // Add if not already selected
      }
    });
  };

  /**
   * Handle day select
   * @param day 
   */
  const handleDaySelect = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((selectedDay) => selectedDay !== day); // Unselect if already selected
      } else {
        return [...prev, day]; // Add if not already selected
      }
    });
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (currentStep === 1) {
      // Move to the next step
      setCurrentStep(2);
    } else if (currentStep > 1) {
      // Call API to save data
      try {
        await updateAccountInfo({
          name: name,
          dayOfBirth: new Date(dateOfBirth),
          gender: gender,
          sports: selectedSports,
          periodicitySport: selectedDays,
          firstLogin: false
        });

      } catch (error) {
        console.error("Error saving data:", error);
        setError("An error occurred while saving data.");
      }
    }
  };

  return (
    <div className="container mx-auto md:px-4 px-0 max-w-[1024px] h-full">
      <div className="lg:px-8 w-full h-full">
        {isFirstLogin ? (
          <div className="flex w-full h-full pt-20 md:pt-0 md:items-center">
            <div className="text-start w-full px-6">
              <div>
                <h2 className="sr-only">Steps</h2>
                <div>
                  <p className="text-center mt-5 text-sm font-semibold text-gray-400">
                    {currentStep}/{totalStep} steps
                  </p>

                  <div className="mt-2 overflow-hidden rounded-full border border-gray-200">
                    <div className={`h-2 rounded-full bg-[#2bafa2] transition-all delay-75 ${currentStep >= 2 ? "w-full" : "w-1/2"
                      }`}></div>
                  </div>
                </div>
              </div>

              <h1 className="mt-7 text-balance sm:text-3xl text-2xl font-bold tracking-tight text-gray-700">
                {currentStep == 1 ? MAINPAGE.steps.step_one.title : MAINPAGE.steps.step_two.title}
              </h1>
              {
                currentStep == 1 ? (
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 right-0 transition-right duration-300">
                    <h2 className="sr-only">{MAINPAGE.information.title}</h2>
                    <div className="col-span-full">
                      <label htmlFor="Name" className="block mb-1 text-sm/6 font-medium text-gray-400">{MAINPAGE.information.label_name}</label>
                      <div>
                        <input type="text" name="Name" id="Name"
                          className="block w-full py-3 rounded-2xl border border-gray-100 text-slate-600 
             ring-1 ring-inset ring-gray-300 px-2.5
             sm:text-sm/6 outline-0 outline-[#edebf7]"
                          value={name}
                          onChange={(e) => setName(e.target.value)} />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="dayOfBirth" className="block mb-1 text-sm/6 font-medium text-gray-400">{MAINPAGE.information.label_age}</label>
                      <div>
                        <input type="date" name="dayOfBirth" id="dayOfBirth"
                          className="block w-full py-3 rounded-2xl border border-gray-100 text-slate-600 
             ring-1 ring-inset ring-gray-300 px-2.5
             sm:text-sm/6 outline-0 outline-[#edebf7]"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)} />
                      </div>
                    </div>

                    <fieldset>
                      <label htmlFor="Gender" className="block text-sm/6 font-medium text-gray-400">{MAINPAGE.information.label_gender}</label>
                      <div className="mt-2 flex gap-x-6 ">
                        <div className="flex items-center gap-x-3">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-5 w-5 border-gray-300 accent-[#FF5962]"
                          />
                          <label htmlFor="male" className="block text-sm/6 font-medium text-gray-700">{MAINPAGE.information.gender.male}</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-5 w-5 border-gray-300 accent-[#FF5962]"
                          />
                          <label htmlFor="female" className="block text-sm/6 font-medium text-gray-900">{MAINPAGE.information.gender.female}</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            checked={gender === "other"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-5 w-5 border-gray-300 accent-[#FF5962]"
                          />
                          <label htmlFor="other" className="block text-sm/6 font-medium text-gray-900">{MAINPAGE.information.gender.other}</label>
                        </div>
                      </div>
                    </fieldset>

                  </div>
                ) : (
                  <div className="right-0 transition-right duration-300">
                    <div>
                      <p className="mt-3 tracking-tighter text-gray-600 font-semibold">
                        What sports do you do?
                      </p>

                      <div className="mt-3 tracking-tigh flex flex-wrap w-full gap-2">
                        {sports.map((sport) => (
                          <span
                            key={sport.id}
                            onClick={() => handleSportSelect(sport.id)}
                            className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-bold ${selectedSports.includes(sport.id)
                              ? "border-[#FF5962] text-[#FF5962]"
                              : "border-gray-200 text-gray-400"
                              } cursor-pointer`}>
                            {sport.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="tracking-tighter text-gray-600 font-semibold">
                        Select periodicity:
                      </p>

                      <div className="inline-grid grid-cols-7 gap-x-3">
                        {dayOfWeeks.map((dow) => (
                          <span
                            key={dow.name}
                            onClick={() => handleDaySelect(dow.name)}
                            className={`mt-2 inline-block items-center text-center rounded-lg border-2 px-3 py-2 text-sm font-bold ${selectedDays.includes(dow.name)
                              ? "border-[#FF5962] text-[#FF5962]"
                              : "border-gray-200 text-gray-400"
                              } cursor-pointer`}>
                            {dow.shortName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }


              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full h-12 rounded-full bg-[#2bafa2] px-3.5 py-2.5 text-center text-base 
                       font-semibold text-white shadow-sm hover:bg-[#44a6a3] focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleButtonClick}
                >
                  {currentStep == 1 ? MAINPAGE.action.next : MAINPAGE.action.finish}
                </button>
              </div>

              <button
                type="button"
                className="block mt-3 text-center text-[#2bafa2] font-normal w-full"
                onClick={() => setCurrentStep(currentStep === 1 ? 2 : 1)}
              >
                {currentStep == 1 ? MAINPAGE.action.skip : MAINPAGE.action.previous}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col h-full">
            <div className="basis-full">
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

              <div className="items-center px-6 py-3">
                <form action="" className="relative w-auto">
                  <input type="text" name="q" className="w-full border font-semibold h-10 shadow p-4 rounded-full bg-gray-200"
                    placeholder="Search for doctors, labs, etc." />
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

              <div className="flex items-center justify-between px-6 py-1 gap-6">
                <p className="text-black font-bold text-lg">Recent Searches</p>
                <p className="text-gray-400 font-semibold">see all</p>
              </div>

              <div className="px-6 py-1 flex space-x-2">
                <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-01.jpg" alt=""
                  className="aspect-square w-24 h-28 rounded-3xl object-cover" />
                <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-02.jpg" alt=""
                  className="aspect-square w-24 h-28 rounded-3xl object-cover" />
                <img src="https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-03.jpg" alt=""
                  className="aspect-square w-24 h-28 rounded-3xl object-cover" />
              </div>

              <div className="flex items-center justify-between px-6 py-3 gap-6">
                <p className="text-black font-bold text-lg">Latest News</p>
                <p className="text-gray-400 font-semibold">see all</p>
              </div>

              <div className="px-6">
                <ul role="list" className="mt-1 space-y-2">
                  <li>
                    <div className="flex items-center gap-x-2">
                      <img className="w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" />
                      <div className="">
                        <p className="text-sm/2 font-semibold tracking-tight text-gray-600">Alert: New Skin Disease
                          Discovered - Learn More Now!</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-x-2">
                      <img className="w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" />
                      <div className="">
                        <p className="text-sm/2 font-semibold tracking-tight text-gray-600">Conference Alert: Advanced AI
                          for skin analysis by Dr. Kureha</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-x-2">
                      <img className="w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" />
                      <div className="">
                        <p className="text-sm/2 font-semibold tracking-tight text-gray-600">Revealing the Surprising Facts
                          About Women's Skin - Research</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="transform justify-between bg-blue-300 w-full flex">

              <span className="sr-only">Menu</span>
              <a className="inline-flex flex-col items-center text-xs font-medium text-gray-800 py-3 px-4 flex-grow" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-9 h-9">
                  <path
                    d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm0 10h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm7.293-14.707-3.586-3.586a.999.999 0 0 0-1.414 0l-3.586 3.586a.999.999 0 0 0 0 1.414l3.586 3.586a.999.999 0 0 0 1.414 0l3.586-3.586a.999.999 0 0 0 0-1.414z" />
                </svg>
              </a>

              <span className="sr-only">Camera</span>
              <button
                className="relative inline-flex flex-col items-center text-xs font-medium text-gray-800 py-3 px-1 flex-grow">
                <div className="absolute bottom-5 p-4 rounded-full border-8 border-white bg-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                    <path fill-rule="evenodd"
                      d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </button>

              <span className="sr-only">undo</span>
              <a className="inline-flex flex-col items-center text-xs font-medium text-gray-800 py-3 px-4 flex-grow" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-9 h-9">
                  <path d="M0 0h48v48h-48z" fill="none" />
                  <path
                    d="M25.99 6c-9.95 0-17.99 8.06-17.99 18h-6l7.79 7.79.14.29 8.07-8.08h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83c3.25 3.26 7.74 5.28 12.71 5.28 9.95 0 18.01-8.06 18.01-18s-8.06-18-18.01-18zm-1.99 10v10l8.56 5.08 1.44-2.43-7-4.15v-8.5h-3z"
                    opacity=".9" />
                </svg>
              </a>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detection;
