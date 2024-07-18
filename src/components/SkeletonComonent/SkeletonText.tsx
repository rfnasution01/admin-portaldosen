import React from 'react'

interface SkeletonTextProps {
  lines?: number
  className?: string
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="rounded h-24 w-full animate-pulse bg-gray-300"
        ></div>
      ))}
    </div>
  )
}

export default SkeletonText
