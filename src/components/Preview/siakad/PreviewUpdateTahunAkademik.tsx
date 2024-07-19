import { LabelComponent } from '@/components/LabelComponent/LabelComponent'

export function PreviewUpdateTA({
  tahun,
  tahapan,
  kode_prodi,
}: {
  tahun: string
  tahapan?: string
  kode_prodi?: string
}) {
  return (
    <div className="scrollbar flex h-full flex-col gap-12 overflow-y-auto phones:w-[40rem] phones:flex-col phones:items-start phones:gap-32">
      <LabelComponent label="Tahun" value={tahun} />
      <LabelComponent label="Tahapan" value={`Tahapan ${tahapan}`} />
      <LabelComponent label="Kode Prodi" value={kode_prodi} />
    </div>
  )
}
