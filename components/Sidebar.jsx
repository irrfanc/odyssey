import MemberProfile from "./MemberProfile";
import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-gradient-to-b from-base-200 to-base-300 shadow-lg border-r border-base-300 flex flex-col">
      <SidebarHeader />

      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      <div className="border-t border-base-300 p-4">
        <MemberProfile />
      </div>
    </div>
  );
};

export default Sidebar;


