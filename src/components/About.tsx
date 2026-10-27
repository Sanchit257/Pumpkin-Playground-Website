import { about, navLinks, visibleCards } from '../content'
import NumberBadge from './NumberBadge'

const title = navLinks.find((l) => l.href === '#about')!.label

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-32 overflow-hidden px-4 py-16 lg:px-[62px] lg:py-24">
      <h2 id="about-title" className="font-display text-5xl leading-none text-rust lg:text-[110px]">{title}</h2>
      <p className="mt-6 max-w-[752px] font-body text-xl leading-normal text-brown-dark lg:mt-8 lg:text-[40px]">{about.intro}</p>
      {visibleCards.length > 0 && (
        <ul className="mt-10 grid gap-8 lg:grid-cols-3">
          {visibleCards.map((card, i) => (
            <li key={card.title} className="rounded-[10px] bg-card p-6 lg:min-h-[359px]">
              <NumberBadge n={i + 1} />
              <h3 className="mt-6 font-body text-2xl leading-normal text-brown-dark lg:text-[40px]">{card.title}</h3>
              <p className="mt-3 max-w-[371px] font-body text-lg leading-normal text-brown-dark lg:text-2xl">{card.body}</p>
            </li>
          ))}
        </ul>
      )}
      <img src="/images/pumpkin.webp" alt="" aria-hidden="true" width={186} height={186} className="pointer-events-none absolute top-8 right-0 hidden w-[186px] -rotate-[14deg] lg:block" />
      <img src="/images/leaves.webp" alt="" aria-hidden="true" width={110} height={110} className="pointer-events-none absolute top-40 left-0 hidden w-[110px] lg:block" />
    </section>
  )
}
