export type Chord = { name: string; full: string; f: number[]; g: number[]; tip: string };

// f = fret per string (low E -> high e), -1 muted, 0 open. g = finger number.
export const CHORDS: Record<string, Chord> = {
  Em: { name: "Em", full: "E minor", f: [0, 2, 2, 0, 0, 0], g: [0, 2, 3, 0, 0, 0], tip: "The easiest chord. Two fingers, all six strings." },
  Em7: { name: "Em7", full: "E minor 7", f: [0, 2, 0, 0, 0, 0], g: [0, 2, 0, 0, 0, 0], tip: "Just one finger. A soft, open sound." },
  E: { name: "E", full: "E major", f: [0, 2, 2, 1, 0, 0], g: [0, 2, 3, 1, 0, 0], tip: "Em plus your index finger on the G string." },
  E7: { name: "E7", full: "E dominant 7", f: [0, 2, 0, 1, 0, 0], g: [0, 2, 0, 1, 0, 0], tip: "Lift the ring finger from E to get a bluesy E7." },
  Am: { name: "Am", full: "A minor", f: [-1, 0, 2, 2, 1, 0], g: [0, 0, 2, 3, 1, 0], tip: "Same shape as E major, moved one string over." },
  A: { name: "A", full: "A major", f: [-1, 0, 2, 2, 2, 0], g: [0, 0, 1, 2, 3, 0], tip: "Three fingers squeezed in a row on fret 2." },
  A7: { name: "A7", full: "A dominant 7", f: [-1, 0, 2, 0, 2, 0], g: [0, 0, 2, 0, 3, 0], tip: "Leave the G string open for a lively A7." },
  Asus2: { name: "Asus2", full: "A suspended 2", f: [-1, 0, 2, 2, 0, 0], g: [0, 0, 1, 2, 0, 0], tip: "A great filler chord that rings bright." },
  C: { name: "C", full: "C major", f: [-1, 3, 2, 0, 1, 0], g: [0, 3, 2, 0, 1, 0], tip: "Keep your ring finger arched so the G string rings." },
  Cadd9: { name: "Cadd9", full: "C add 9", f: [-1, 3, 2, 0, 3, 3], g: [0, 2, 1, 0, 3, 4], tip: "Pairs perfectly with the four-finger G." },
  D: { name: "D", full: "D major", f: [-1, -1, 0, 2, 3, 2], g: [0, 0, 0, 1, 3, 2], tip: "Strum only the top four strings." },
  D7: { name: "D7", full: "D dominant 7", f: [-1, -1, 0, 2, 1, 2], g: [0, 0, 0, 2, 1, 3], tip: "An upside-down D shape." },
  Dm: { name: "Dm", full: "D minor", f: [-1, -1, 0, 2, 3, 1], g: [0, 0, 0, 2, 3, 1], tip: "A sad, gentle chord. Top four strings only." },
  Dsus4: { name: "Dsus4", full: "D suspended 4", f: [-1, -1, 0, 2, 3, 3], g: [0, 0, 0, 1, 2, 3], tip: "Add your pinky to D, then lift it for movement." },
  G: { name: "G", full: "G major", f: [3, 2, 0, 0, 0, 3], g: [2, 1, 0, 0, 0, 3], tip: "Let the middle strings ring open." },
  G7: { name: "G7", full: "G dominant 7", f: [3, 2, 0, 0, 0, 1], g: [3, 2, 0, 0, 0, 1], tip: "Pulls nicely back to C." },
  Fmaj7: { name: "Fmaj7", full: "F major 7", f: [-1, -1, 3, 2, 1, 0], g: [0, 0, 3, 2, 1, 0], tip: "The friendly F. No barre needed." },
  F: { name: "F", full: "F major (barre)", f: [1, 3, 3, 2, 1, 1], g: [1, 3, 4, 2, 1, 1], tip: "Your first barre chord. Roll the index finger slightly." },
  Bm: { name: "Bm", full: "B minor (barre)", f: [-1, 2, 4, 4, 3, 2], g: [0, 1, 3, 4, 2, 1], tip: "Barre fret 2 from the A string down." },
};

export const CHORD_GROUPS: { title: string; chords: string[] }[] = [
  { title: "Start here: the open chords", chords: ["Em", "Am", "C", "G", "D", "E", "A", "Dm"] },
  { title: "Sevenths and colour chords", chords: ["Em7", "E7", "A7", "D7", "G7", "Cadd9", "Asus2", "Dsus4", "Fmaj7"] },
  { title: "Your first barre chords", chords: ["F", "Bm"] },
];

export type Pattern = { id: string; name: string; p: string; bpm: number; level: string; desc: string };

// 8 slots: 1 & 2 & 3 & 4 &. D down, U up, x muted slap, . rest
export const PATTERNS: Pattern[] = [
  { id: "quarters", name: "Four on the floor", p: "D.D.D.D.", bpm: 80, level: "Day 1", desc: "One down strum on every beat. Use it to practise clean chord changes before anything else." },
  { id: "eighths", name: "Steady eighths", p: "DUDUDUDU", bpm: 75, level: "Week 1", desc: "Your hand never stops moving: down on the numbers, up on the “and”. This motion is the base of every other pattern." },
  { id: "folk", name: "Folk pattern", p: "D.DU.UDU", bpm: 95, level: "Week 2", desc: "The most famous beginner pattern. Keep the hand moving and simply miss the strings on the gaps." },
  { id: "ballad", name: "Pop ballad", p: "D.D.DUDU", bpm: 90, level: "Week 2", desc: "Two calm down strums then a little burst. Great for slow songs." },
  { id: "chuck", name: "Rock chuck", p: "D.xUD.xU", bpm: 100, level: "Week 3", desc: "Slap the strings with your palm on beats 2 and 4 for a snare-drum sound." },
  { id: "reggae", name: "Off-beat skank", p: ".U.U.U.U", bpm: 85, level: "Week 3", desc: "Only hit the “and”. Short, choppy up strums give a reggae feel." },
  { id: "standby", name: "Soul groove", p: "D...DxDU", bpm: 118, level: "Week 4", desc: "Used in our Stand By Me lesson. One big strum, wait, then a funky ending." },
  { id: "zombie", name: "Driving rock", p: "D.D..UDU", bpm: 84, level: "Week 4", desc: "Used in our Zombie lesson. Strong down strums with an up-strum push into the next bar." },
];

export type Song = {
  slug: string; title: string; artist: string; bpm: number; chords: string[]; pattern: string;
  key: string; level: string; intro: string; progression: string; steps: string[]; tip: string;
};

export const SONGS: Song[] = [
  {
    slug: "riptide", title: "Riptide", artist: "Vance Joy", bpm: 102, chords: ["Am", "G", "C"], pattern: "folk",
    key: "C major", level: "Beginner", progression: "Am - G - C (repeat)",
    intro: "Riptide is one of the best first songs: three open chords that loop the whole way through, and a bouncy folk strum. It was written for ukulele, so on guitar it feels light and quick.",
    steps: [
      "Learn Am, G and C one at a time. Strum each four times and check that every string rings.",
      "Practise Am to C first. Use the pivot finger: keep your index and middle fingers down.",
      "Play the loop with one down strum per chord, slowly, at around 70 BPM.",
      "Add the folk pattern (D . D U . U D U) on a single chord until it feels automatic.",
      "Combine them: one bar of the pattern per chord, then raise the tempo towards 102 BPM.",
    ],
    tip: "The G to C change is the hardest. Move your ring finger first, it is the anchor of both shapes.",
  },
  {
    slug: "stand-by-me", title: "Stand By Me", artist: "Ben E. King", bpm: 118, chords: ["G", "Em", "C", "D"], pattern: "standby",
    key: "G major", level: "Beginner", progression: "G - Em - C - D - G",
    intro: "Stand By Me uses the classic four-chord progression heard in hundreds of songs. Learn it once and you can play a huge part of pop music history.",
    steps: [
      "Learn G, Em, C and D. G to Em is easy: lift everything and drop two fingers.",
      "Play two bars of each chord with simple down strums at 80 BPM.",
      "Learn the soul groove (D . . . D x D U) on G alone. The x is a palm slap.",
      "Put it together: G for two bars, Em for two, C for one, D for one, back to G.",
      "Speed up gradually towards the original 118 BPM.",
    ],
    tip: "Lead the change: start moving on the last up strum so your fingers land right on beat 1.",
  },
  {
    slug: "zombie", title: "Zombie", artist: "The Cranberries", bpm: 84, chords: ["Em", "C", "G", "D"], pattern: "zombie",
    key: "E minor", level: "Beginner", progression: "Em - C - G - D (some players use Dsus4 or D/F#)",
    intro: "Zombie is a slow, powerful rock song built on four open chords. The steady tempo gives you time to change chords, which makes it a great confidence builder.",
    steps: [
      "Learn Em, C, G and D. Notice Em and C share almost the same finger area.",
      "Practise Em to C by sliding your middle and ring fingers across together.",
      "Play the four-chord loop with one strum per beat at 70 BPM.",
      "Add the driving rock pattern (D . D . . U D U) and dig in on the down strums.",
      "Play along at 84 BPM. Try strumming harder in the chorus for drama.",
    ],
    tip: "Swap, don’t lift: from Em to C your fingers only move one string each.",
  },
];

export type Guide = { slug: string; title: string; desc: string; chords?: string[]; sections: { h: string; p: string[]; list?: string[] }[] };

export const GUIDES: Guide[] = [
  {
    slug: "how-to-switch-from-am-to-c", title: "How to switch from Am to C",
    desc: "Learn the fastest beginner chord change with the pivot finger trick: only one finger moves.",
    chords: ["Am", "C"],
    sections: [
      { h: "Why this change is easy", p: ["Am and C share two fingers in exactly the same place. Your index finger sits on the 1st fret of the B string and your middle finger on the 2nd fret of the D string in both chords. Only the ring finger moves."] },
      { h: "Step by step", p: ["Work through these steps slowly. Speed comes later."], list: [
        "Play Am: index on B string fret 1, middle on D string fret 2, ring on G string fret 2.",
        "Keep index and middle pressed down. Do not lift them.",
        "Move only your ring finger from the G string (fret 2) to the A string (fret 3).",
        "You are now playing C. Strum from the A string down; skip the low E.",
        "Move the ring finger back to return to Am. Repeat 20 times.",
      ] },
      { h: "Common mistakes", p: [], list: [
        "Lifting the whole hand. Keep the two shared fingers glued down.",
        "Strumming the low E string on C or Am. Start from the A string.",
        "Flat ring finger muting the G string in C. Arch it like a bridge.",
      ] },
      { h: "Practice drill", p: ["Set the metronome to 60 BPM. Play four down strums on Am, four on C. When it is clean for one minute, go to two strums each, then one. Songs that use this change: Riptide and countless pop songs."] },
    ],
  },
  {
    slug: "how-to-switch-from-g-to-c", title: "How to switch from G to C",
    desc: "A clear method for one of the trickiest beginner chord changes, with an anchor-finger drill.",
    chords: ["G", "C"],
    sections: [
      { h: "The challenge", p: ["G and C share no fingers, so every finger moves. The trick is to move them as one shape instead of one at a time."] },
      { h: "Step by step", p: [], list: [
        "Play G with middle on low E fret 3, index on A fret 2, ring on high e fret 3.",
        "Picture the C shape before moving: ring finger to A string fret 3, middle to D fret 2, index to B fret 1.",
        "Lead with the ring finger. It travels to the A string first and the others follow.",
        "Keep fingers close to the strings while moving (the hover rule).",
      ] },
      { h: "Practice drill", p: ["Do the 2-minute silent switch: change between G and C without strumming for two minutes. Then add one strum per chord at 60 BPM."] },
    ],
  },
  {
    slug: "how-to-switch-from-g-to-em", title: "How to switch from G to Em",
    desc: "Switch between G and E minor smoothly in seconds. Perfect for Stand By Me.",
    chords: ["G", "Em"],
    sections: [
      { h: "Why it works", p: ["Em uses the 2nd fret of the A and D strings. In G your index is already on the A string, fret 2. You only need to reshuffle."] },
      { h: "Step by step", p: [], list: [
        "From G, lift your fingers just a few millimetres.",
        "Place middle on the A string fret 2 and ring on the D string fret 2.",
        "Strum all six strings. That is Em.",
        "Try the alternative: play G with ring, middle and pinky; then Em is just middle and ring on the A and D strings.",
      ] },
    ],
  },
  {
    slug: "how-to-tune-a-guitar", title: "How to tune a guitar for beginners",
    desc: "Standard tuning explained simply, with the headstock layout and a free tuner on our home page.",
    sections: [
      { h: "Standard tuning", p: ["From the thickest string to the thinnest, standard tuning is E A D G B e. A popular way to remember it: Eddie Ate Dynamite, Good Bye Eddie."] },
      { h: "Which peg turns which string", p: ["On most acoustic guitars there are three pegs on each side. On the left (when the guitar faces you): low E at the bottom, then A, then D at the top. On the right: G at the top, then B, then high e at the bottom."] },
      { h: "How to tune", p: [], list: [
        "Open our tuner on the home page and press Start tuner. Allow the microphone.",
        "Pluck one string and let it ring.",
        "If the needle is left of centre the string is flat: tighten the peg slowly.",
        "If it is right of centre the string is sharp: loosen it a little, then tighten up to the note.",
        "Always finish by tuning up to the note. It helps the string stay in tune.",
      ] },
      { h: "Tips", p: ["New strings stretch and go flat quickly, so tune several times in the first days. Tune in a quiet room and mute the other strings with your hand."] },
    ],
  },
  {
    slug: "how-to-strum-a-guitar", title: "How to strum a guitar: a beginner's guide",
    desc: "Learn relaxed strumming, the down-up motion and your first patterns with a live metronome.",
    sections: [
      { h: "Hold the pick", p: ["Rest the pick on the side of your index finger and press it with your thumb. Only a few millimetres should stick out. Hold it firmly but not tightly."] },
      { h: "The golden rule: keep moving", p: ["Your strumming hand moves down on every number (1, 2, 3, 4) and up on every “and”, all the time, like a pendulum. Patterns are made by simply missing the strings on some of those motions."] },
      { h: "Your first four patterns", p: ["Start with four down strums per bar. Then try steady eighths, then the folk pattern, then the pop ballad. You can hear and see all of them on our strumming patterns page."] },
      { h: "Common mistakes", p: [], list: ["Strumming from the elbow: let the wrist do the work.", "Stopping the hand on the gaps: keep the pendulum going.", "Gripping the pick too hard: relax, it should almost slip."] },
    ],
  },
  {
    slug: "first-week-guitar-practice-plan", title: "Your first-week guitar practice plan",
    desc: "A simple 15-minute daily plan that takes you from zero to your first song in seven days.",
    chords: ["Em", "Am", "C", "G"],
    sections: [
      { h: "15 minutes a day", p: ["Short daily practice beats one long session a week. Split each day into tuning (2 min), chords (6 min), strumming (4 min) and a song (3 min)."] },
      { h: "Day by day", p: [], list: [
        "Day 1: Tune up. Learn Em. Four down strums per bar.",
        "Day 2: Learn Am. Switch Em to Am slowly.",
        "Day 3: Learn C. Practise Am to C with the pivot finger.",
        "Day 4: Learn G. Do the 2-minute silent switch with G and C.",
        "Day 5: Learn the steady eighths strum on one chord.",
        "Day 6: Play Am - G - C with down strums.",
        "Day 7: Play Riptide with the folk pattern, slowly. Celebrate!",
      ] },
    ],
  },
];

export const STRINGS = [
  { name: "E", label: "6th", hz: 82.41 },
  { name: "A", label: "5th", hz: 110 },
  { name: "D", label: "4th", hz: 146.83 },
  { name: "G", label: "3rd", hz: 196 },
  { name: "B", label: "2nd", hz: 246.94 },
  { name: "e", label: "1st", hz: 329.63 },
];
