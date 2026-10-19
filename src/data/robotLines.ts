/* ═══════════════════════════════════════════════════
   robotLines.ts — Speech-bubble text for each section
   and random quips when the robot is clicked.
═══════════════════════════════════════════════════ */

/** One line per section id, shown when the robot reaches that section. */
export const sectionLines: Record<string, string> = {
  hero:       '> hi, I\'m Mohamed. I build backends.',
  summary:    '> reliable, scalable, maintainable.',
  education:  '> CS degree, done. learning, never.',
  experience: '> banking systems taught me to respect data integrity.',
  skills:     '> C#, Node, Python... and a few more.',
  projects:   '> three things I shipped. go on, click.',
  courses:    '> .NET training, completed.',
  contact:    '> say hello, I reply fast.',
};

/** Random quips when the user clicks the robot. */
export const clickLines: string[] = [
  '> compiling charm...',
  '> 40% smaller, 100% intact.',
  '> have you tried turning it off and on?',
  '> sudo hire --me',
  '> git commit -m "fixed everything"',
  '> // TODO: take a break',
  '> coffee.init(); // essential',
  '> assert(talent > 0); // passes',
];
