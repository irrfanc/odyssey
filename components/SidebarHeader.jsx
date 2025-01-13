import { SiOpenaigym } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-base-300">
      <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center shadow-md">
        <SiOpenaigym className="text-primary-content text-xl" />
      </div>
      <h1 className="text-2xl font-bold text-base-content tracking-tight">
        Odyssey
      </h1>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
