// All site copy. Empty strings = not provided yet → item is hidden (spec §4 hide-empty rule).
export type Card = { title: string; body: string }
export type ScheduleItem = { title: string; body: string }
export type FaqItem = { question: string; answer: string }
export type NavLink = { label: string; href: string }

export const SIGNUP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScZSl2-FxtG2NfeamI6Y66CkE2i5l2mK9HaxBdjVd57IjkAag/viewform?usp=dialog'
export const DEVPOST_URL = 'https://pumpkin-playground.devpost.com'
export const ACM_URL = ''
export const CONTACT_EMAIL = ''

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

export const legal = {
  link: 'Privacy, Terms & Disclaimers',
  title: 'Legal & Information',
  owner: 'ACM at CSULB',
  year: new Date().getFullYear(),
  sections: [
    {
      title: 'Privacy Policy',
      body: 'This website does not collect, track, or store any personal data, and it does not use cookies. Our hosting provider (Vercel) may automatically log standard technical access data, such as IP addresses and timestamps, for security and abuse prevention only.',
    },
    {
      title: 'Terms of Service',
      body: 'This website and its schedule are provided “as is,” without warranties of any kind, express or implied. To the fullest extent permitted by law, we are not liable for any damages, losses, or inaccuracies arising from your use of this site or reliance on its content.',
    },
    {
      title: 'Schedule & Event Disclaimer',
      body: 'All dates, times, locations, and events listed on this site are subject to change without notice. We are not liable for any changes, cancellations, or missed events. Please check back for the latest information.',
    },
    {
      title: 'CCPA / COPPA & Minor Notice',
      body: 'Because this site collects no personal information, there is no personal data to access, sell, or delete, consistent with data minimization standards under laws such as the CCPA. This site is not directed at children under 13, and we do not knowingly collect information from them.',
    },
  ] satisfies Card[],
  contactTitle: 'Contact & Copyright',
  contactBody: 'Questions about the schedule or site content?',
}
