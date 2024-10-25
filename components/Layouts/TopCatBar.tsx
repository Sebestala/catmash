import ResponsiveCatImage from "@/components/ResponsiveCatImage";

/**
 * TopCatBar component displays a top bar with the Catmash title and a responsive cat image.
 *
 * @returns {React.ReactElement} The rendered top bar component.
 *
 * Features:
 * - Centers the `CATMASH` title and an image using the `ResponsiveCatImage` component.
 */
export default function TopCatBar(): React.ReactElement {
  return (
    <header className="fixed left-1/2 top-0 z-50 -translate-x-1/2">
      <div className="flex w-full items-center justify-center space-y-2 p-2">
        <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-2">
          <ResponsiveCatImage />
          <h1 className="text-md flex items-center justify-center font-bold text-blue-900 md:text-lg lg:text-xl">
            CATMASH
          </h1>
        </div>
      </div>
    </header>
  );
}
