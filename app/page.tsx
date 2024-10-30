import { CatVotingInterface } from "./CatVotingInterface";
import { fetchAndStoreCats } from "./lib/api";

export default async function Home() {
  await fetchAndStoreCats();
  return (
    <div className="px-6 pb-12 sm:px-12 md:px-20 lg:px-28 xl:px-64">
      <CatVotingInterface />
    </div>
  );
}
