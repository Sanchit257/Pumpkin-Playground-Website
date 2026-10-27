import { useState } from 'react'
import { navLinks, visibleFaq } from '../content'
import NumberBadge from './NumberBadge'

export default function Faq() {
  const [open, setOpen] = useState<Set<number>>(new Set())
  if (visibleFaq.length === 0) return null
  const title = navLinks.find((l) => l.href === '#faq')!.label
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-32 px-4 py-16 lg:grid lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16 lg:px-[62px] lg:py-24">
      <h2 id="faq-title" className="font-display text-5xl leading-none text-rust lg:text-[110px]">{title}</h2>
      <ul className="mt-8 max-w-[1000px] space-y-[17px] lg:mt-0">
        {visibleFaq.map((item, i) => (
          <li key={item.question} className="rounded-[10px] bg-card">
            <h3>
              <button
                type="button"
                aria-expanded={open.has(i)}
                aria-controls={`faq-a-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-6 p-5 text-left font-body text-2xl text-brown-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-dark lg:text-[40px]"
              >
                <NumberBadge n={i + 1} />
                <span>{item.question}</span>
              </button>
            </h3>
            <div id={`faq-a-${i}`} hidden={!open.has(i)} className="px-5 pb-5 font-body text-lg text-brown-dark lg:pl-[150px] lg:text-2xl">
              {item.answer}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
