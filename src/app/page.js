import Banner from "@/components/Banner/Banner";
import FriendsData from "@/components/FriendsData/FriendsData";

export default function Home() {
  return (
    <div className="w-full">
      <Banner></Banner>
      <FriendsData></FriendsData>

      {/* The rest of your dashboard content will go below here later */}
    </div>
  );
}
