export function LabelComponent({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex w-full items-center gap-32">
      <p className="w-1/3 font-roboto text-primary-900">{label}</p>
      <p className="w-2/3">{value}</p>
    </div>
  )
}
