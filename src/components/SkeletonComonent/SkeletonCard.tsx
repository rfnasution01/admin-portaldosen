interface SkeletonProps {
  size?: string
  color?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  size = 'h-24 w-3/4',
  color = 'bg-gray-300',
}) => {
  return <div className={`animate-pulse ${color} ${size} rounded`}></div>
}

const SkeletonCard: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
      <div className="p-16">
        <Skeleton size="h-128 w-full" />
        <div className="mt-16 space-y-2">
          <Skeleton />
          <Skeleton size="h-16 w-5/6" />
          <Skeleton size="h-16 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
