import ResponsiveCatImage from "@/components/ResponsiveCatImage";

export default function TopCatBar(): React.ReactElement {
  return (
    <div className="flex w-full items-center justify-center space-y-2 p-2">
      <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-2">
        <ResponsiveCatImage />
        <h1 className="text-md flex items-center justify-center font-bold text-blue-900 md:text-lg lg:text-xl">
          CATMASH
        </h1>
      </div>
    </div>
  );
}
