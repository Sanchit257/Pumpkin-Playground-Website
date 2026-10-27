import { hero, SIGNUP_URL } from '../content'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative scroll-mt-32 overflow-hidden px-4 pb-16 lg:px-[62px] lg:pb-24">
      <div className="relative z-10 lg:grid lg:grid-cols-[minmax(0,1fr)_611px] lg:items-center lg:gap-8">
        <div>
          <h1 id="hero-title" className="font-display text-[64px] leading-none lg:text-[110px]">
            <span className="block text-rust">{hero.titleTop}</span>
            <span className="block text-brown-dark">{hero.titleBottom}</span>
          </h1>
          <p className="mt-4 font-body text-2xl leading-normal text-brown-dark lg:mt-8 lg:text-[40px]">{hero.subtitle}</p>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-full bg-brown-dark px-8 font-body text-xl font-bold text-cream shadow-[4px_8px_4.9px_0_rgba(0,0,0,0.25)] hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-orange-bright lg:mt-8 lg:min-h-[94px] lg:w-[380px] lg:text-[32px]"
          >
            {hero.cta}
          </a>
        </div>
        <img
          src="/images/flyer-688.webp"
          srcSet="/images/flyer-688.webp 688w, /images/flyer.webp 944w"
          sizes="(min-width: 1024px) 611px, 380px"
          width={611}
          height={791}
          fetchPriority="high"
          alt="Pumpkin Playground flyer: a chance to create and showcase a project of your interest. Submissions due Thursday November 5th, 11:59 PM on Devpost."
          className="mt-8 h-auto w-full max-w-[611px] shadow-[7px_14px_8px_1px_rgba(0,0,0,0.25)] lg:mt-0"
        />
      </div>
      <img
        src="/images/pumpkin.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={229}
        height={229}
        className="pointer-events-none absolute bottom-0 left-[-43px] hidden w-[229px] rotate-[7.5deg] lg:block"
      />
      <img
        src="/images/leaves.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={167}
        height={167}
        className="pointer-events-none absolute top-8 right-0 hidden w-[167px] -rotate-90 lg:block"
      />
    </section>
  )
}
