import { useEffect, useRef, useState } from 'react'
import { DEVPOST_URL, hero, navLinks } from '../content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const links = [...navLinks, { label: 'Devpost', href: DEVPOST_URL }]
  const external = (href: string) =>
    href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-9">
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-[100px] max-w-[1377px] items-center rounded-full bg-white px-6 shadow-[0_10px_8px_0_rgba(0,0,0,0.25)]"
      >
        <a href="#top" className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-dark">
          <img src="/images/pumpkin-icon.webp" alt="" width={47} height={47} className="size-[47px]" />
          <span className="leading-none">
            <span className="block font-display text-[32px] text-orange-bright">{hero.titleTop}</span>
            <span className="block font-body text-2xl text-brown-dark">{hero.titleBottom}</span>
          </span>
        </a>

        <ul className="ml-6 hidden h-[51px] flex-1 items-center gap-10 border-l-[3px] border-brown-dark pl-10 md:flex">
          {links.map((l) => (
            <li key={l.label} className={l.label === 'Devpost' ? 'ml-auto' : ''}>
              <a
                href={l.href}
                {...external(l.href)}
                className="font-body text-2xl font-bold text-brown-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={buttonRef}
          type="button"
          className="ml-auto grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-dark md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
        {open && (
          <ul
            id="mobile-menu"
            ref={menuRef}
            className="absolute inset-x-0 top-full mt-2 flex flex-col rounded-3xl bg-white p-4 shadow-[0_10px_8px_0_rgba(0,0,0,0.25)] md:hidden"
          >
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...external(l.href)}
                  className="block rounded-xl px-4 py-3 font-body text-2xl font-bold text-brown-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-dark"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
