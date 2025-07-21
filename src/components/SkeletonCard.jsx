import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <div className="flex flex-col w-40 bg-white rounded-md shadow-sm overflow-hidden mx-auto">
      <Skeleton height={192} className="w-full" /> {/* معادل h-48 */}
      <div className="p-3 text-center space-y-2">
        <Skeleton height={16} width={`80%`} className="mx-auto" />
        <Skeleton height={12} width={`60%`} className="mx-auto" />

        <div className="space-y-1 pt-2">
          <Skeleton height={16} width={`70%`} className="mx-auto" />
          <Skeleton height={12} width={`50%`} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
