export default function NumberBadge({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-brown-dark font-display text-lg md:size-[77px] md:text-2xl"
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
