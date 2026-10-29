import { useRef } from 'react'
import { CONTACT_EMAIL, DEVPOST_URL, legal } from '../content'

export default function LegalDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const close = () => dialogRef.current?.close()

  const contact = CONTACT_EMAIL ? (
    <>
      Email us at{' '}
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-rust underline hover:text-orange-burnt">
        {CONTACT_EMAIL}
      </a>
      .
    </>
  ) : (
    <>
      Reach out to the organizers on{' '}
      <a href={DEVPOST_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-rust underline hover:text-orange-burnt">
        Devpost
      </a>
      .
    </>
  )

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="font-body text-base text-peach underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
      >
        {legal.link}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="legal-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[min(85dvh,800px)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-[20px] bg-cream p-0 text-brown-dark shadow-[0_10px_8px_0_rgba(0,0,0,0.25)] backdrop:bg-black/60"
      >
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b-[3px] border-card bg-cream px-6 py-5 sm:px-8">
          <h2 id="legal-title" className="font-display text-3xl leading-none text-rust sm:text-4xl">
            {legal.title}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-full text-2xl hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-dark"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="space-y-6 px-6 py-6 font-body text-base leading-relaxed sm:px-8 sm:text-lg">
          {legal.sections.map((s) => (
            <section key={s.title}>
              <h3 className="text-lg font-bold text-rust sm:text-xl">{s.title}</h3>
              <p className="mt-1">{s.body}</p>
            </section>
          ))}
          <section>
            <h3 className="text-lg font-bold text-rust sm:text-xl">{legal.contactTitle}</h3>
            <p className="mt-1">
              {legal.contactBody} {contact}
            </p>
            <p className="mt-2">
              © {legal.year} {legal.owner}. All rights reserved.
            </p>
          </section>
        </div>
      </dialog>
    </>
  )
}
