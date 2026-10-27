import { ACM_URL, footerBy, hero, visibleFooterLinks } from '../content'

const external = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export default function Footer() {
  const logo = (
    <img src="/images/acm-logo.webp" alt="ACM at CSULB" width={93} height={93} loading="lazy" className="size-[93px]" />
  )
  return (
    <footer className="bg-brown-dark px-4 py-8 text-white lg:min-h-[193px] lg:px-8">
      <div className="mx-auto flex max-w-[1377px] flex-col items-center gap-6 text-center lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-10 lg:text-left">
        <div className="flex items-center gap-3">
          <img src="/images/pumpkin-icon-light.webp" alt="" width={47} height={47} loading="lazy" className="size-[47px]" />
          <span className="leading-none">
            <span className="block font-display text-[32px] text-peach">{hero.titleTop}</span>
            <span className="block font-body text-2xl">{hero.titleBottom}</span>
          </span>
        </div>
        <p className="font-body text-2xl">
          {footerBy}
        </p>
        {ACM_URL ? (
          <a href={ACM_URL} {...external(ACM_URL)}>{logo}</a>
        ) : (
          logo
        )}
        <ul className="flex flex-col items-center gap-3 lg:flex-row lg:gap-10">
          {visibleFooterLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...external(link.href)}
                className="font-body text-2xl hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
