// All site copy. Empty strings = not provided yet → item is hidden (spec §4 hide-empty rule).
export type Card = { title: string; body: string }
export type ScheduleItem = { title: string; body: string }
export type FaqItem = { question: string; answer: string }
export type NavLink = { label: string; href: string }

export const SIGNUP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScZSl2-FxtG2NfeamI6Y66CkE2i5l2mK9HaxBdjVd57IjkAag/viewform?usp=dialog'
export const DEVPOST_URL = 'https://pumpkin-playground.devpost.com'
export const ACM_URL = ''

export const hero = {
  titleTop: 'Pumpkin',
  titleBottom: 'Playground',
  subtitle: 'Join the Playground!',
  cta: 'Join the Playground',
}

export const about = {
  intro:
    'Pumpkin Playground is a month-long, open-ended project sprint hosted by CSULB ACM, encouraging members to build projects of their choice, share their work, and vote on submissions.',
  cards: [
    { title: 'General', body: '' },
    { title: 'Most Useful', body: '' },
    { title: 'Fall Theme', body: '' },
  ] satisfies Card[],
}
export const visibleCards = about.cards.filter((c) => c.body)

export const inspiration =
  'Pumpkin Playground was created with the intention of creating an environment where the creativity of anyone inexperienced within the field of Computer Science could allow their creativity to run wild. This project encourages newer programmers to explore their interests, experiment with new technologies, and share what they build without the pressure of a short time frame that a traditional hackathon creates. By encouraging collaboration, creativity, and learning through their own hands on project, we hope to help more inexperienced students discover what they’re capable of creating.'

export const schedule: ScheduleItem[] = [
  { title: 'First Day', body: 'Pumpkin Playground begins on October 10th.' },
  { title: 'Final Day of Submission', body: 'Submissions due Thursday, Nov. 5th at 11:59 PM on Devpost.' },
  { title: 'Voting Period', body: 'Community Vote takes place from Nov 6th-8th' },
  { title: 'Award Ceremony', body: 'Prizes will be handed out - Location TBD' },
]

export const faq: FaqItem[] = [
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
]
export const visibleFaq = faq.filter((f) => f.question && f.answer)

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Project Inspiration', href: '#inspiration' },
  { label: 'Schedule', href: '#schedule' },
  ...(visibleFaq.length ? [{ label: 'FAQ', href: '#faq' }] : []),
]

export const footerBy = 'by'

export const footerLinks: NavLink[] = [
  { label: 'Devpost', href: DEVPOST_URL },
  { label: 'Instagram', href: '' },
  { label: 'Discord', href: '' },
  { label: 'LinkedIn', href: '' },
]
export const visibleFooterLinks = footerLinks.filter((l) => l.href)
