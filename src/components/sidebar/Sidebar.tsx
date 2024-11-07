import Image from "next/image";
import { CiBookmarkCheck, CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { LogOutButton } from "./LogOutButton";

const navbarItem = [
  {icon:<IoCalendarOutline size={30} />,path:"/dashboard", title:"Dashboard"},
  {icon:<IoCheckboxOutline size={30} />,path:"/dashboard/rest-todos", title:"Rest Todos"},
  {icon:<CiBookmarkCheck size={30} />,path:"/dashboard/server-todos", title:"Server Todos"},
  {icon:<IoCodeWorkingOutline size={30} />,path:"/dashboard/cookies", title:"Cookies"},
  {icon:<IoBasketOutline size={30} />,path:"/dashboard/products", title:"Products"},
  {icon:<IoPersonOutline size={30} />,path:"/dashboard/profile", title:"Profile"},
]

export const Sidebar = async () => {

  const session = await auth()
  if(!session){
    redirect('/api/auth/signin')
  }
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              width={448}
              height={448}
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32 h-auto"
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            width={140}
            height={140}
            src={session.user?.image || "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"}
            alt=""
            className="w-10 h-auto m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
           {session.user?.name || " Cynthia J. Watts"}
          </h5>
          <span className="hidden text-gray-400 lg:block">{session.user?.roles?.join(', ')}</span>
        </div>
        <ul  className="space-y-2 tracking-wide mt-8">
				{
          navbarItem.map((item,indexItem) => (
            <SidebarItem {...item} key={indexItem}/>
          ))
        }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
       <LogOutButton/>
      </div>
    </aside>
  );
};
