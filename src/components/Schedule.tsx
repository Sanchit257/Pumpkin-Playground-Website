import { navLinks, schedule } from '../content'
import NumberBadge from './NumberBadge'

const title = navLinks.find((l) => l.href === '#schedule')!.label

export default function Schedule() {
  return (
    <section id="schedule" aria-labelledby="schedule-title" className="relative scroll-mt-32 overflow-hidden px-4 py-16 lg:px-[62px] lg:py-24">
      <h2 id="schedule-title" className="font-display text-5xl leading-none text-rust lg:text-[110px]">{title}</h2>
      <ol className="mt-8 max-w-[950px] space-y-[30px] lg:mt-12">
        {schedule.map((item, i) => (
          <li key={item.title} className="flex items-start gap-6 rounded-[10px] bg-card p-5 shadow-[9px_13px_10px_0_rgba(0,0,0,0.25)]">
            <NumberBadge n={i + 1} />
            <div>
              <h3 className="font-body text-2xl font-bold leading-normal text-brown-dark lg:text-[40px]">{item.title}</h3>
              <p className="mt-1 font-body text-xl leading-normal text-brown-dark lg:text-[32px]">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <img src="/images/pumpkin.webp" alt="" aria-hidden="true" loading="lazy" width={217} height={217} className="pointer-events-none absolute right-0 bottom-0 hidden w-[217px] lg:block" />
      <img src="/images/leaves.webp" alt="" aria-hidden="true" loading="lazy" width={130} height={130} className="pointer-events-none absolute right-24 bottom-8 hidden w-[130px] lg:block" />
    </section>
  )
}
