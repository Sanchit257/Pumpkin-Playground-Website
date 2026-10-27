import { inspiration, navLinks } from '../content'

const title = navLinks.find((l) => l.href === '#inspiration')!.label

export default function Inspiration() {
  return (
    <section id="inspiration" aria-labelledby="inspiration-title" className="relative scroll-mt-32 overflow-hidden px-4 py-16 lg:px-[62px] lg:pt-24 lg:pb-36">
      <h2 id="inspiration-title" className="font-display text-5xl leading-none text-rust lg:text-[110px]">{title}</h2>
      <p className="mt-6 max-w-[1246px] font-body text-xl leading-normal text-brown-dark lg:mt-8 lg:text-[40px]">{inspiration}</p>
      <img src="/images/leaves.webp" alt="" aria-hidden="true" loading="lazy" width={172} height={172} className="pointer-events-none absolute right-0 bottom-2 hidden w-24 lg:block" />
      <img src="/images/pumpkin.webp" alt="" aria-hidden="true" loading="lazy" width={240} height={240} className="pointer-events-none absolute bottom-2 left-0 hidden w-24 rotate-[10deg] lg:block" />
    </section>
  )
}
