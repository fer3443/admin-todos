import { TabBar } from "@/components";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "Developing cookies",
};
export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';//!Nota: transforme el string a number con el signo +, puedo hacer la transf de la manera en que se me cante
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="flex flex-col">
        <h2 className="text-3xl">Cookies tabs</h2>
        <TabBar currentTab={+cookieTab}/>
      </div>
    </div>
  );
}
