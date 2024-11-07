"use client"

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
	currentTab?:number;
	tabsOptions?: number[]
}

export const TabBar = ({currentTab = 1 ,tabsOptions = [1,2,3,4]}:Props) => {
	const [select, setSelect] = useState(currentTab);
  const router = useRouter()
	const onTabSelected = (tab:number) => {
		setSelect(tab);
    setCookie('selectedTab', tab.toString())//TODO: la data siempre tiene que ser string
    router.refresh()
	}
  return (
    <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-${tabsOptions.length}`}>
      {tabsOptions.map((tab) => (
        <div key={tab}>
          <input type="radio" id={tab.toString()} className="peer hidden" checked={select === tab} onChange={()=>{}} />
          <label onClick={() => onTabSelected(tab)} className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
