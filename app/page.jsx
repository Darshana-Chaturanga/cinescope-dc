import HeaderNav from "@/components/header-nav";
import Image from "next/image";

//SSR - Server Side Rendered - Server Component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="bg-primary h-screen">Main Section</main>
      <footer className="bg-blue-400 h-72">Footer Section</footer>
    </div>
  );
}
