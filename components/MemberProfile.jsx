import { UserButton, currentUser } from "@clerk/nextjs";

const MemberProfile = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center gap-3">
      <UserButton afterSignOutUrl="/" />
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-base-content">
          {user?.firstName || "Guest"}
        </p>
        <p className="text-xs text-base-400">{user?.emailAddresses[0]?.emailAddress}</p>
      </div>
    </div>
  );
};

export default MemberProfile;

