import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white p-4 flex items-center justify-center">
      <Image src="/logo.svg" alt="Logo" className="h-12"   width={167} 
              height={44}  />
    </nav>
  );
}