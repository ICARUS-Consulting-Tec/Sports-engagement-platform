// Mock data based on real Tennessee Titans / Houston Oilers franchise history.

export interface HistoryStat {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  fullStory: string;
  significance: string;
  image: string;
  imageReferenceUrl?: string;
  alt: string;
  linkLabel: string;
  externalUrl: string;
  sourceLabel?: string;
  facts?: string[];
  quote?: string;
  sourceNote?: string;
}

export interface LegendaryPlayerStat {
  label: string;
  value: string;
}

export interface LegendaryPlayer {
  id: string;
  name: string;
  position: string;
  era: string;
  subtitle: string;
  shortDescription: string;
  bio: string;
  stats: LegendaryPlayerStat[];
  achievements: string[];
  imageUrl?: string;
  cardImagePositionClass?: string;
}

export interface ClassicMatch {
  id: string;
  title: string;
  season: string;
  opponent: string;
  score: string;
  description: string;
  youtubeUrl: string;
  imageUrl?: string;
  buttonLabel: string;
}

export const historyStats: HistoryStat[] = [
  {
    id: "stat-afl-championships",
    value: "2",
    label: "AFL Championships",
    sublabel: "1960, 1961",
  },
  {
    id: "stat-afc-championships",
    value: "1",
    label: "AFC Championship",
    sublabel: "1999 Season",
  },
  {
    id: "stat-playoff-appearances",
    value: "25",
    label: "Playoff Appearances",
    sublabel: "Franchise History",
  },
  {
    id: "stat-super-bowl",
    value: "1",
    label: "Super Bowl Appearance",
    sublabel: "Super Bowl XXXIV",
  },
  {
    id: "stat-tennessee-era",
    value: "1997",
    label: "Tennessee Era Begins",
    sublabel: "Move from Houston",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "oilers-founded-1960",
    year: "1960",
    title: "Houston Oilers Begin Play",
    description:
      "The franchise debuts as one of the original American Football League teams.",
    fullStory:
      "The Houston Oilers entered the AFL in 1960 as one of the league's original charter franchises. Founded by Bud Adams, the team quickly became one of the early pillars of the new league.\n\nThat first season began the story of the franchise that would later move to Tennessee and become the Titans.",
    significance:
      "The founding season established the franchise that would later become the Tennessee Titans.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl:
      "https://s.hdnux.com/photos/01/35/07/01/24408138/3/rawImage.jpg",
    alt: "Houston Oilers early franchise history",
    linkLabel: "View Full Story",
    externalUrl:
      "https://s.hdnux.com/photos/01/35/07/01/24408138/3/rawImage.jpg",
    sourceLabel: "Hall of Fame History",
    facts: [
      "Founded by Bud Adams",
      "Began play in 1960",
      "One of the AFL's original charter teams",
    ],
    quote: "The Tennessee Titans story begins with the Houston Oilers.",
    sourceNote: "Pro Football Hall of Fame",
  },
  {
    id: "afl-title-1960",
    year: "1960",
    title: "First AFL Championship",
    description:
      "Led by George Blanda, the Oilers win the inaugural AFL title.",
    fullStory:
      "Houston won the AFL's first championship behind veteran quarterback George Blanda and an explosive offense. The title gave the franchise instant credibility in the new league.\n\nIt also established the Oilers as one of the AFL's first true powers.",
    significance:
      "Houston became the first championship team in franchise history during the AFL's opening era.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://bill37mccurdy.com/wp-content/uploads/2011/12/afl-1961-ch-game.jpg?w=584",
    alt: "Houston Oilers 1960 AFL champions",
    linkLabel: "View Full Story",
    externalUrl: "https://bill37mccurdy.com/wp-content/uploads/2011/12/afl-1961-ch-game.jpg?w=584",
    sourceLabel: "Britannica",
    facts: [
      "Won the inaugural AFL title",
      "George Blanda was the team's leading star",
      "Created the franchise's first championship legacy",
    ],
    quote: "The first title gave the Oilers instant standing in pro football.",
    sourceNote: "Britannica",
  },
  {
    id: "afl-title-1961",
    year: "1961",
    title: "Back-to-Back AFL Champions",
    description:
      "Houston repeats as AFL champion and confirms its early place in league history.",
    fullStory:
      "The Oilers followed their first title with another AFL championship, giving the franchise back-to-back crowns in the league's early years. That run remains one of the most important stretches in team history.\n\nEven after relocation and rebranding, those title teams still anchor the franchise legacy.",
    significance:
      "The second straight title cemented Houston as one of the AFL's first dominant teams.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://miro.medium.com/1*4-FNIijjS-ttsHcnu11NKg.jpeg",
    alt: "Houston Oilers 1961 AFL champions",
    linkLabel: "View Full Story",
    externalUrl: "https://miro.medium.com/1*4-FNIijjS-ttsHcnu11NKg.jpeg",
    sourceLabel: "Britannica",
    facts: [
      "Second consecutive AFL championship",
      "Confirmed Houston's early league dominance",
      "One of the franchise's defining title seasons",
    ],
    quote: "The Oilers were one of the AFL's original standard-bearers.",
    sourceNote: "Britannica",
  },
  {
    id: "move-to-tennessee-1997",
    year: "1997",
    title: "Move to Tennessee",
    description:
      "The franchise relocates from Houston and begins its Tennessee chapter as the Tennessee Oilers.",
    fullStory:
      "After the 1996 season, the franchise relocated from Houston and began play in Tennessee as the Tennessee Oilers. The move reshaped the future of the organization and its fan base.\n\nIt remains the turning point that connects the Oilers past to the modern Titans era.",
    significance:
      "The relocation created the bridge between the Oilers past and the Titans future.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl:
      "https://static.clubs.nfl.com/image/upload/f_auto/titans/ueddy6bw4kex3dxc7y1e",
    alt: "Franchise move to Tennessee",
    linkLabel: "View Full Story",
    externalUrl:
      "https://static.clubs.nfl.com/image/upload/f_auto/titans/ueddy6bw4kex3dxc7y1e",
    sourceLabel: "Hall of Fame Chronology",
    facts: [
      "Relocated after the 1996 season",
      "Initially played as the Tennessee Oilers",
      "Marked the beginning of the Tennessee chapter",
    ],
    quote: "1997 changed the geography and future of the franchise.",
    sourceNote: "Pro Football Hall of Fame",
  },
  {
    id: "titans-name-1999",
    year: "1999",
    title: "Tennessee Titans Identity",
    description:
      "The team adopts the Titans name and begins a memorable run in its new stadium era.",
    fullStory:
      "In 1999, the franchise officially became the Tennessee Titans. The new identity arrived just as the team was building one of the most memorable seasons in club history.\n\nThe Titans brand quickly became linked to playoff drama, physical football and a Super Bowl run.",
    significance:
      "The Titans identity launched alongside the season that defined the franchise's modern image.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl:
      "https://m.media-amazon.com/images/I/81NgetpuOVL.jpg",
    alt: "Tennessee Titans new identity in 1999",
    linkLabel: "View Full Story",
    externalUrl:
      "https://m.media-amazon.com/images/I/81NgetpuOVL.jpg",
    sourceLabel: "Hall of Fame Chronology",
    facts: [
      "Titans name adopted in 1999",
      "Defined the modern franchise brand",
      "Coincided with the team's signature season",
    ],
    quote: "A new name arrived just as the franchise was ready for its biggest stage.",
    sourceNote: "Pro Football Hall of Fame",
  },
  {
    id: "music-city-miracle-1999",
    year: "1999",
    title: "Music City Miracle",
    description:
      "One of the most famous plays in NFL history sends Tennessee past Buffalo in the postseason.",
    fullStory:
      "In the 1999 AFC Wild Card game, Tennessee produced one of the most unforgettable finishes in NFL history. Frank Wycheck's lateral to Kevin Dyson on the final kickoff return sent the Titans past Buffalo.\n\nThe play became the defining image of the franchise's early years in Tennessee.",
    significance:
      "A single play became the defining highlight of the Titans' early years.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/titans/vy3r0k86a2kdvf96uxhg",
    alt: "Music City Miracle",
    linkLabel: "View Full Story",
    externalUrl: "https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/titans/vy3r0k86a2kdvf96uxhg",
    sourceLabel: "NFL YouTube",
    facts: [
      "Occurred in the 1999 AFC Wild Card game",
      "Titans beat the Bills 22–16",
      "Kevin Dyson scored on the winning return",
    ],
    quote: "One of the most unforgettable finishes in NFL playoff history.",
    sourceNote: "NFL YouTube",
  },
  {
    id: "afc-championship-1999",
    year: "1999",
    title: "AFC Championship Victory",
    description:
      "Tennessee defeats Jacksonville 33–14 to reach the franchise’s first Super Bowl.",
    fullStory:
      "Tennessee beat Jacksonville 33-14 in the AFC Championship Game to claim the conference title. The win sent the franchise to its first Super Bowl.\n\nIt remains one of the clearest high points in Titans history.",
    significance:
      "The AFC title delivered the franchise's first Super Bowl trip.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_99,w_3000,h_1687/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/35/01je4wbkqqws969wwj65.jpg",
    alt: "Titans AFC Championship 1999",
    linkLabel: "View Full Story",
    externalUrl: "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_99,w_3000,h_1687/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/35/01je4wbkqqws969wwj65.jpg",
    sourceLabel: "NFL YouTube",
    facts: [
      "Won 33–14 over Jacksonville",
      "Captured the AFC Championship",
      "Advanced to Super Bowl XXXIV",
    ],
    quote: "The road to the Super Bowl ran through Jacksonville.",
    sourceNote: "NFL YouTube",
  },
  {
    id: "super-bowl-xxxiv-2000",
    year: "2000",
    title: "One Yard Short in Super Bowl XXXIV",
    description:
      "The Titans come within one yard of forcing overtime in a dramatic 23–16 finish against the Rams.",
    fullStory:
      "Super Bowl XXXIV ended with Kevin Dyson being tackled one yard short of the goal line as time expired in a 23-16 loss to the Rams. The finish remains one of the most memorable endings in Super Bowl history.\n\nEven in defeat, that team became one of the defining groups in franchise lore.",
    significance:
      "The one-yard finish remains one of the most emotional moments in team history.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://www.espn.com.mx/2003/photos2014/0128/a_dyson_576.jpg",
    alt: "Super Bowl XXXIV Titans vs Rams",
    linkLabel: "View Full Story",
    externalUrl: "https://www.espn.com.mx/2003/photos2014/0128/a_dyson_576.jpg",
    sourceLabel: "NFL YouTube",
    facts: [
      "Played in Super Bowl XXXIV",
      "Lost 23–16 to the Rams",
      "Kevin Dyson was stopped one yard short on the final play",
    ],
    quote: "One yard short became part of franchise history forever.",
    sourceNote: "NFL YouTube",
  },
  {
    id: "mcnair-mvp-2003",
    year: "2003",
    title: "Steve McNair Co-MVP Season",
    description:
      "McNair shares NFL MVP honors after one of the most iconic seasons in franchise history.",
    fullStory:
      "Steve McNair led Tennessee to a 12-4 finish in 2003 and shared NFL MVP honors after one of the best seasons of his career. His play and toughness defined the team that year.\n\nFor many fans, it remains the standard for leadership in the Tennessee era.",
    significance:
      "McNair's MVP season set the benchmark for quarterback leadership in Tennessee.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://andscape.com/wp-content/uploads/2017/12/gettyimages-56451445.jpg?w=800",
    alt: "Steve McNair 2003 MVP season",
    linkLabel: "View Full Story",
    externalUrl: "https://andscape.com/wp-content/uploads/2017/12/gettyimages-56451445.jpg?w=800",
    sourceLabel: "Wikipedia",
    facts: [
      "Shared NFL MVP honors in 2003",
      "Led Tennessee to a 12–4 finish",
      "One of the most important individual seasons in team history",
    ],
    quote: "Few seasons better captured the Titans' toughness than McNair's 2003 run.",
    sourceNote: "Wikipedia",
  },
  {
    id: "afc-top-seed-2021",
    year: "2021",
    title: "AFC No. 1 Seed",
    description:
      "Tennessee finishes atop the AFC and secures home-field advantage in the conference playoffs.",
    fullStory:
      "The 2021 Titans finished with the AFC's best record and secured the conference's No. 1 seed. The achievement stood out because the team endured major injuries and still finished on top.\n\nIt remains one of the franchise's strongest modern regular seasons.",
    significance:
      "A modern benchmark for resilience and regular-season excellence.",
    image: "/images/placeholders/titans-history-placeholder.jpg",
    imageReferenceUrl: "https://titanswire.usatoday.com/gcdn/authoring/images/smg/2025/02/27/STIT/80648834007-43-80637.png?crop=719,406,x0,y2&width=719&height=359&format=pjpg&auto=webp",
    alt: "Titans AFC number one seed 2021",
    linkLabel: "View Full Story",
    externalUrl: "https://titanswire.usatoday.com/gcdn/authoring/images/smg/2025/02/27/STIT/80648834007-43-80637.png?crop=719,406,x0,y2&width=719&height=359&format=pjpg&auto=webp",
    sourceLabel: "Titans Official",
    facts: [
      "Finished as the AFC's top seed",
      "Earned home-field advantage in the conference playoffs",
      "Did so despite major injuries across the roster",
    ],
    quote: "The 2021 team proved Tennessee could still reach the top of the AFC.",
    sourceNote: "Official Titans page",
  },
];

export const legendaryPlayers: LegendaryPlayer[] = [
  {
    id: "steve-mcnair",
    name: "Steve McNair",
    position: "QB",
    era: "1995–2005",
    subtitle: "MVP, 3x Pro Bowl",
    shortDescription: "Quarterback leader of the Titans' Super Bowl era.",
    bio: "Steve McNair led the franchise into its first Super Bowl and later shared NFL MVP honors in 2003, becoming one of the defining figures of the Tennessee era.",
    stats: [
      { label: "Passing Yards", value: "27,141" },
      { label: "Passing TDs", value: "156" },
      { label: "Pro Bowls", value: "3" },
      { label: "Games Played", value: "142" },
    ],
    achievements: [
      "2003 NFL co-MVP",
      "Led Tennessee to Super Bowl XXXIV",
      "No. 9 retired by the Titans",
    ],
    imageUrl:
      "https://msfame.liquidcreative.net/wp-content/uploads/2014/07/mcnair-and-mvp.jpg",
    cardImagePositionClass: "object-[center_18%]",
  },
  {
    id: "eddie-george",
    name: "Eddie George",
    position: "RB",
    era: "1996–2003",
    subtitle: "OROY, 4x Pro Bowl",
    shortDescription: "Power back who defined the early Titans identity.",
    bio: "Eddie George gave Tennessee a durable and physical offensive centerpiece, topping 10,000 rushing yards with the organization and starring in the 1999 title run.",
    stats: [
      { label: "Rushing Yards", value: "10,009" },
      { label: "Rushing TDs", value: "64" },
      { label: "Pro Bowls", value: "4" },
      { label: "Games Played", value: "128" },
    ],
    achievements: [
      "1996 NFL Offensive Rookie of the Year",
      "Four-time Pro Bowl selection",
      "No. 27 retired by the Titans",
    ],
    imageUrl: "https://cdn3.sbnation.com/assets/4062823/eddie1.jpg",
    cardImagePositionClass: "object-[center_22%]",
  },
  {
    id: "bruce-matthews",
    name: "Bruce Matthews",
    position: "OL",
    era: "1983–2001",
    subtitle: "Hall of Fame, 14x Pro Bowl",
    shortDescription: "Hall of Fame lineman and long-time franchise pillar.",
    bio: "Bruce Matthews anchored the franchise line for 19 seasons and built one of the most decorated careers ever by an NFL offensive lineman.",
    stats: [
      { label: "Games Played", value: "296" },
      { label: "Pro Bowls", value: "14" },
      { label: "First-Team All-Pro", value: "9" },
      { label: "Hall of Fame", value: "Yes" },
    ],
    achievements: [
      "Pro Football Hall of Fame inductee",
      "14 Pro Bowl selections",
      "Nine First-team All-Pro honors",
    ],
    imageUrl: "https://i.redd.it/a7lh9ommttf51.jpg",
    cardImagePositionClass: "object-[center_20%]",
  },
  {
    id: "warren-moon",
    name: "Warren Moon",
    position: "QB",
    era: "1984–1993",
    subtitle: "Hall of Fame, 6x Pro Bowl",
    shortDescription: "Hall of Fame quarterback of the Oilers' passing era.",
    bio: "Warren Moon transformed the Oilers into one of football's most dangerous passing teams and remains one of the franchise's most important quarterbacks.",
    stats: [
      { label: "Passing Yards", value: "33,685" },
      { label: "Passing TDs", value: "196" },
      { label: "Pro Bowls", value: "6" },
      { label: "Hall of Fame", value: "Yes" },
    ],
    achievements: [
      "Pro Football Hall of Fame inductee",
      "Six Pro Bowls with the franchise",
      "33,000+ passing yards with Houston",
    ],
    imageUrl: "https://thumbs.dreamstime.com/b/warren-moon-73875690.jpg",
    cardImagePositionClass: "object-[center_22%]",
  },
  {
    id: "earl-campbell",
    name: "Earl Campbell",
    position: "RB",
    era: "1978–1984",
    subtitle: "MVP, Hall of Fame",
    shortDescription: "Hall of Fame runner and Oilers power icon.",
    bio: "Earl Campbell brought a punishing running style to Houston and quickly became one of the most dominant backs of his era.",
    stats: [
      { label: "Rushing Yards", value: "8,574" },
      { label: "Rushing TDs", value: "73" },
      { label: "Pro Bowls", value: "5" },
      { label: "Hall of Fame", value: "Yes" },
    ],
    achievements: [
      "Pro Football Hall of Fame inductee",
      "1978 NFL MVP",
      "Five Pro Bowl selections",
    ],
    imageUrl:
      "https://www.giantbomb.com/a/uploads/scale_super/46/462814/3190342-7560018115-5eb39.png",
    cardImagePositionClass: "object-[center_18%]",
  },
  {
    id: "jevon-kearse",
    name: "Jevon Kearse",
    position: "DE",
    era: "1999–2003, 2008–2009",
    subtitle: "DROY, 3x Pro Bowl",
    shortDescription: "Explosive pass rusher and 1999 defensive star.",
    bio: "Jevon Kearse exploded onto the scene in 1999 and became one of the defining defenders of Tennessee's early peak years.",
    stats: [
      { label: "Sacks", value: "52" },
      { label: "Forced Fumbles", value: "22" },
      { label: "Pro Bowls", value: "3" },
      { label: "Games Played", value: "88" },
    ],
    achievements: [
      "1999 Defensive Rookie of the Year",
      "Three Pro Bowl selections",
      "Key defender on the 1999 AFC champions",
    ],
    imageUrl:
      "https://thumbs.dreamstime.com/b/jevon-kearse-tennessee-titans-final-defensivo-173656812.jpg",
    cardImagePositionClass: "object-[center_20%]",
  },
];

export const classicMatches: ClassicMatch[] = [
  {
    id: "music-city-miracle",
    title: "Music City Miracle",
    season: "1999 AFC Wild Card",
    opponent: "Buffalo Bills",
    score: "22–16",
    description: "One of the most iconic finishes in NFL postseason history.",
    youtubeUrl: "https://www.youtube.com/watch?v=ZJnwlt-SpQI",
    imageUrl: "data:image/jpeg;base64,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",
    buttonLabel: "Watch Highlights ",
  },
  {
    id: "afc-championship-vs-jaguars",
    title: "AFC Championship Game",
    season: "1999 AFC Championship",
    opponent: "Jacksonville Jaguars",
    score: "33–14",
    description: "Tennessee defeats Jacksonville to reach the Super Bowl.",
    youtubeUrl: "https://www.youtube.com/watch?v=a9oDc-z0Pds",
    imageUrl: "data:image/jpeg;base64,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",
    buttonLabel: "Watch Highlights ",
  },
  {
    id: "super-bowl-xxxiv",
    title: "Super Bowl XXXIV",
    season: "1999 Season",
    opponent: "St. Louis Rams",
    score: "16–23",
    description: "The Titans finish one yard short in a classic Super Bowl ending.",
    youtubeUrl: "https://www.youtube.com/watch?v=4mM4HjIpbZM",
    imageUrl: "data:image/jpeg;base64,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",
    buttonLabel: "Watch Highlights ",
  },
  {
    id: "wild-card-vs-patriots",
    title: "2019 Wild Card Upset",
    season: "2019 Wild Card",
    opponent: "New England Patriots",
    score: "20–13",
    description: "Tennessee knocks out New England on the road.",
    youtubeUrl: "https://www.youtube.com/watch?v=R9xKoauyyBc",
    imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMVFRUVGBcYFhgYFxcXHxcYGxUXFhsVGhgYHiggGBolHRoVITIhJSkrLi4uFx8zODMtNygtLysBCgoKDg0OGxAQGi0lICUtLy81LTMuLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLy8tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAMEBQcBAgj/xABOEAACAQIEBAQDBAUHCAgHAAABAgMAEQQFEiEGMUFREyJhcQcygRRCkaEjUmJysRUzgrPB0fAkQ1ODkqK04RY0NnN0k8LxJTVUY7LDxP/EABkBAAMBAQEAAAAAAAAAAAAAAAACAwEEBf/EAC4RAAICAQMCBQMEAgMAAAAAAAABAhEDEiExBEETIlFhcbHB4QUyodEUkSMkQv/aAAwDAQACEQMRAD8A2JGsb079oPpTNKgD3JKTzrxSpyOEn0FAEjDjyivbmwvSAprFHagCLSpU/hRzNADNq5arCmcSNvagCLUvDtce1RKfwp3IoAk1Bk5n3NTqgycz7mgDsPzCvWIHmrzD8wp3FjkaAI9P4Uc6YqVhhtQAMccH/IZv9V/Xx1mIQGtL49/6hN/qv6+OskXEkGnx7S1G3tRYSRCm0FMS4ramsLIWrsz5I6KQkG9VjONju1TMPhLWNeXhIa5qZIfLXAUvc5JOLWFekFxVcAb1Zw1RwSVi6rGYo7GvUmIINqcdgK8NDcVtJoNx6OYWrrYgUzFlU7EaYzY8ixVLjuC5Fx60/NlGIVWPgO2i+oI8LkAX30q5JFh260jdGESOYF1W9i5IBsTY2J3A9vQdyBuInEM2Lhi8SOSRLEagAosNwd++63A5be9PYPMhFiCgKqSjojMFPn5AgE2F7WFyOlXfEecYeEaZ4EHiRwgxq41MuhHV2Ki2pVsp2tcbbVRJVuFgfkHH7o+nGKJYzzZVVXT9oFR5vY3o1x67gqwdHUMjD7ynkayvPZIWkb7OCsZsQGtcEetvU0ccK58GTC4dCwZBKhN9yf5zykclsbfjU9CszjckTJ2rsUO1FuWw+KHM48SNdjsC5YjyqjGxDdedtt6psdAsUrRg6gD5T3FFNDXZSyx70tIqTOO1RWpXY1o3wilpHYV2lQKcArtVXFObNhcLLiFjEhiXVpLhARcXOog8hc2AJNrDnQieOsVII44MPD4xwxxUxkdhHDETdVJAuzlbHpa/vZ4wbVoVySNDpGgSDi/Gy4XDyR4NVln16jK5SOMKxCm1tbM9rhFBP5Xbw+c43MMMFw8+HgnWW0hBcakG14xIhcDVtcgX0mxHOjQ+5th9au1Gy6B0iRJJDK6qA0hAUuwG7WGwuelSaQ0VKlSoA5alau0qAFXLV2lQBy1dpUqAOWrtKlQAOfEFf8gm94v66OsXlwh51tXH/wD1Cb3i/ro6ykOLWrNTTAoCDexqyyuG1N4hBe4qbgBc083tuNGDrUTosCXOwqV/Ix2q3yp0UVYyY2PYC1eVl6ianUUcss0r2BeTILC9qpsQ+g2rQMTMpQ1nWeSjxK7OjzyyXGQY5tvcaeYk0S8I5QcTMEJ8i+aT92/yj1PL8aF8Ibmi3K8wOGQCP+dcq7Nb5UHyJ6lvMx9NPcV3yxxjCyyk26CLN8OZJ5vugG1/UKAP4UP5vE+hStgwIvpv68idxY9Rv78qIcu4ihlNpUVJWPc2Y+l+R9P40xnOKQCyAE+g99qnFqrQPbYxrjfBq0iTgOPE1+JcEXkDG979dLJy22p7ijCJPNFO0wU4uOAqqqzEPoWIxhbaQoKjm426GjfN01QlmUERuDY8jsyANfbTcqd9hselCOLxsYjjIhaNtckaIQBYtcs1gbBfYkDWO1zORqB9+FMT4iRqFYu2kMpaw9WBUMo2P3aNvh9wrJhcUJsVpaOMSbR62OpkK3sUG1r8t9hQ9BiZjMEVyiIQiKygm248QBt97k3HRgKKVz+WLDfajG+mMrdJCwJvIEC73sNwTYdbcqWLRtPgL8BmaBnLBtBNlFjsTsC1up2FvYUP5jGwJaQjW0jlgL2W+9hfftzoVwfGpLCw8MsdIsX3vbbYDb++rnMJyEBa5O5HTn/ZVseZWbPFKPJIedaiSYhb1RviWPWmjKe9GR6pWKtlR9PUqVKpmlDxjlBxcH2bSSjspe0gjGlWDWJ0sbEgbAX25jnVBi8lxwlY4WKCJpQoknJt5VGlQI1LM2kWABcqewqw4547iy5oo2ilnlnvojjAJIFhc/U7AA9aa4I+IUWYTS4fwJsPPEodo5QAStwLjrtqXYgfMOdG48Z6eEr9SqzTh7Mhi53gELrLAMPFK8hUwKUUO+gDdywLbenqKeybhWSOWMNESIpFcEMQo3OqTn5jZQLftdKfzb4m4eDMky1o3Ls0aGQFdKtJawI5/eX8an/EDjePK44pJInkErFQFIFiBe5vTOTqhU+b3+fsFdKs6z34t4fDnCjwZHOKhjmWzKNCyEgK1+ux/CpPF3xLTA4v7H9knnkKK48Kx2N/u89rUpgeUqoeDeIzj4WmOHlw+mQpolFmNlRtQ9PNb6Gr6gBUqVKgBUqVKgBUqVKgBUqVKgAf49F8DL7xf10dY1jH01r/AMSJ9GXTN2MX5zxj+2sOnxes0tXIB1ZSamYbE6feoELACjfgrIFeM4uW1r6YwTYXvp1XPrsOdVnFNjxyNQ0lMIsU9ii6V7sQv8d68zQYtPMRqUbkoVew7kKbgepFF3E+XYmNNUfhJa5uyki22xYnT33JHtQtk+aTa9MoCyKXLaFdNAGnQ12uGLXPIjYcjas8KNWRap0TRmBKD2oQxkt3Y+tGmdxq6eLGLAjzgcg3XYcge3vQXgsKZZkiBsZHVAe2pgL/AJ1HFDRJixVBnwRwa2IQYiZvDh3tb5nsSDz+VdjvUriaSNfOSEtt6WAso+gsK0Z8tC4YQR+UIgVeuy/32/Osn4/w7qkTutrlrXHoK7oKM8crYNtTQKZtm6EWUn8xU/JOLJHUKy6jHzc9R90n16etCeOFzXjCYpkYRobeJsfT9oev9/tXM8ahumVvVsHwzqDQY5mGk7OBvtY3BAv2Vfxobw+Khkb7JJeRNQGHmsUlBPy6jsQwO1/vbXFecTgUjT5gT2FifqelU+HxaxuSwuRy0ncEciD0IO/0qTmx9CDzLcO0YCmRZpAeZVTp3ve4Nrgfje59JPEZd8HLGSLsFAJGwJkViAB+yGt6gVGTGNE8kcqDWyhmA20ylVYlewuT9KFOJsdJLGkkzGNBqAQXJZjaw2sOQO5rYztUWz9M8Ti+z3IuWMkRdnYBVBXWQSTcrsqc+d/oKI8qz1NJiecTEr+j1KrANcLGmlorsxJJJuALdazOWYsd9gOQ6CrLInIniA6yR/8A5g0QVE55NTNK4pyiJGBguDoLunQBSAWXr1vb0Nu1DSmiLPcxWSYxjTqWO9ye55EE8gpJ/wDa1CqsarIgfVNKlSpRjIPi1jkw2b5ViZiViTWWaxNgGF9hubXHLvUP4V528+b4yVpo8REuHZjiBho4SfPDYMwQPsqsLE7+HfoK1DPcywIkiwuLMTPOR4Uciaw5vp2BBF7nrTWAzDL1lmwMPgq8aF5oUjCgJZblgFCkWde/zUAfNeZzz4pcXjxhJm8TEiZcSAdMKoXHhbKR/nEudW3hrWmfFPErmGEyd+mKmjDehdVVh7gkj6VomW5zlj4OSWJ8OMGpKyHSEjBOm4ZWAG+pem5IqJlPEmT4p48PBJhXZDeKPQF0t814wygatr+XegD5zMUkiq8vPCTYXCD0B+0sR67xn8aPfitMi58pfGS4Jfsy/pog5Zfn8oEZDWPKtbhmyyWeXCKmHaaM+NLH4S3DbfpWuti36Tnz8xqLNneUTwPj3OHliRhG8zxarN5bISyavvr/ALVAEf4TTo+Dcx4+bHgTsDLMJFZT4cZ8MCUk6RcHt5jRrUHJo8OIlfCpGsUgEi+GoQMGUEPYAcxp/Ko2X8TYSYTNFOhXDkicm6iO2q+osAABpbf0oAt6VDOC+IOWSyCGPGxF2OlRcjUSbABmABJPKx3q0bPsMMSMGZR9oK6xHY302Jve1uQPWgCypVRxcXYJlxDriFK4U2nNm/Rm5Fjt3U8u1QIfiTlTsqLjIyzEKoAfck2A+XvQAV0qo894wwODYJisTHE5FwpJLW6EqoJA2O57VOyfOIMVH4uGlSVL21Ib2Ox0nqDuNjvuKAJ1KlSoAEvisl8rnH7UH/ExVikGFFbl8SVvl0w9Yf6+OsdjTe1MvUwhnCUccK5gVw6xmzKhuAwBFw+pSOxUhSPpQ88YCljyUXY2JsLgXNum4ovnyqGKBCf0m4MbxC7NqIt5ATrJJNrXNlOwsTWqV7mzhR7xHELHysbg8xzuOux50NcT5guGhMrE6WP6Mc79Aosdrbm3Pc39YmcHCStG5k/SxOQtw0TgbMLh1uFNrfwO9QOKFWWMDTqtc3G4F7G4t12X6E0s5NKwxwtjOE4tIRlZQQ/lAtupC/Nv6HnXjhnOoocXDPITZHBsLWF7gsepte+3ahQWZlj3W92Gw3F9O3+8fxNMyx6GIAIBAZbm50nkffY/hWYZepXPFXsfVjZurKGUgqwBDA7G/W/as4+JefQuVwnzTA+ISLeUWIs3cm/5UCcG8cSYX9E95Ib/ACnmvcJt+R29qOM2wWGx8QxEDKXCkK42Yd42vuR0sdxVotJnMzNZ1uSb2qAAqnmbjrXcykeJ2R1YEdCDz7+3rVXrdj5VZvYE0k5bjrgsZ21ba236VbZZlUKMjszllYEg2tqFiARbcX/H2qiyvKpp5Uj+XUwAubXPMKCL2JtYVYTO8beHJcONmDCxHoex9etcuZtcI9DoYQk3rCTifHyKvizEl5EDRsQBqXUFPyi22obVA4hxazZeTYXUxtfsdQX+0/jUXDsZx9n1ixBCltwL9fcHeiabgMYXDs0spkjdLNbbc7gjmOYFj3tRi33RvX6k4pu9tjJge9S8uzHwZBIqhmAOnVewJFtVhz67VYZ7k8caK8bG7WGk77ncAH0FWEHCKmDzEiY+b0G2yEfhc1aKvg88qMBmjGbxJDqLHze3LYdNqMzgRzG4O4oFSLSdxuOdFOW54gjAbVcbfSqQj6itn1NSpUqQYxn4zyTLmuVthlV5wSYlbYM/iLYE3G1/UVX8BS4ls9zJsaiR4g4KTxEQgqDfDWsQzfd09TWs5zwph8TicPi5Q/i4Y3is1hfUG3HXcCvGH4PwyYyfHKH8bERmOQ6ttJ0DZeh8i0AYZl//AGUxH/jF/wD01b47DYeLMMnVcEsQY4YxzRSRoJXIgLmRBGS2lj3F7mtSwXw+wMeCky8IzYeRtbBnJOry2IYWItpWoGQ/CjLcLOmIjjkaSM6k1yFgrdGttcjpegDPMRicenEOYnLoYppTGA4kIAEemC7C7rvfT161UZJ/2Ux3/jV//krdcFwlhosZNjkD+NiF0SEtddPk5L0+Rfzquw3w4wSYGTL1EngSyCVxr82oaOTW2H6NfzoAncC4lDl+CUOpb7NBtqF9olvtWPZEf/h/EX/en+skrS8g+GWXYGdMVCJBJHq0lpLjzKVO1uxNLLuHsDCmKjiilmTGEmcHU4JOq9iouvzH8qAMjznDQRYHK3+wjS6xM2JikjidpiZP0Tjw2ZgAoa+3PnRLxpPjE4kVsvijlxH2YaVkICldL6jcsvT1qzwfw+ymGdHMEupWDKkkrgEg3HlZQWF7bfjRzhuHsNLjFzOzicIYx5vLpsVtp+poAzz4I4Xx2zaPFxoxeZPGjIDLq1TFltuCNV+9N8C8PYVs9zKJsPEUh0mJSi2jIZd0H3T7VpvDvCuHwT4iSAPqxL+JLqbV5rsdh0+ZqWV8K4eDFT4yPX4uI/nLtccwdh05UAZPxzlDtnc8uGGDxsvhxl8HODdVEcQJGuyHbSwIe/nOxoo+Bk+HfD4nwIHgYTWlRpBIurTzQ6RpHS3oNzV5xV8NsBj5vHnRxJYKWRyuoDlcciQNr1b8K8L4bL4jDhUKqW1MSSxZrAXJPoBtyoAuaVKlQBQ8cxasDKp6+H+UqGsVk2YqOlbL8Q8R4eXzP28L85ox/bWS5Fg/Gcu9/DQGSVh92NRc/U8h6kUy4MYR5FFowU7uVBxVsPBqtuxuC1zyUHcn9n2qtz9MZlcccL+FKl9UEhFzC4vqCg7nn1uPptRJwgv27EjEmPRhcKvh4ZCRs+12I6m25Pe3agT4mcQfasY2k3jhuietj5m+p/hTwW9FHVblFl2A+0SpELXYhbkXsOZPsBc0UZjFNKi4fBwOMLHe0jFx4gubsGBBKXvYLf26AEXHlCfmW4K3A6EWI26EXFQcTmFiSsjD1ViPptVpyVEVzuW3EODcSJbZ0Wyqt7WNl8rnduf3rG1+dN53lTQGMSPrldNT9ABeyqotsBY/8q8ZVjZ2SSwD6wF1ONTjcG4bmfrf++fjIZJm1yk6rAXt0HpXGssFIq1JoHZpCV02GxJv19R61JyjNZolkljk0eGEuOYk1MFCkegub9hUwZOxbSSAD1t/ZVnlfDSpc6ge+r09OXeic4t7GKL7j+UZnLiVMjootsCGO55kW6D3qpxWYl1DcgOQ9eV/U/3URRKqxiOKwMpsAu1gW3I7X3of40yj7JKApJjkGoX6NyZf7frTw23MarcIvhvmOFPjYbEKl5LFGba5X7oPQ33Ft6jYnJcRLJIMczkJtC4KMQCTYa7amUDo1Z48gNSP5exIXQJpNPbVf8CdxSSds1Sa4CfD4Z0T9Hpca2Qy6lIQjYjQACr2sbm/oaJ8y4jjmw4wCkuxADb7oFt5mPQ3tt61m/DuIxPiFYFMhbdh0/eLdPc1e5fgsTLiPsjQ+CGN5mjU30XuTr6g8rjv70qjT2CUnLlllgMuEzmQgGOI6Y+oLj5mt6ch63qXimIoikwMcEYjjUKqjYD8aFMTN5iPWrwjpEu+AfzvLzcyKNjz9D39qplg70cAgiqDG5a2s+HbT69PSnaTCz61pUqVQGFSpUqAFSpUqAFTc8oRSx2ApyqnOH1PFD0dwD6gBnI+qow+tAFLn+fJhzFJiY3cS6tCAoAgDRqCwkZQSfEBP6oHLYmoqccyRKkmKgVUnN4FjkUuqXjQeIJCqnzODdTtcix03LnxFXzQtpDFVcqptuftODBG/W1yD0IB6UO5dgog8cs9jH4kMVyI/MownjhRpQMLSaCLG24ta2++JjjSki2PpMuSDnFql277V7e5pMEiYiCOUoLMiyKGsdJK6hv3F+dN8PsTG3YOwX2AAP8Avah9KiYLE+HgMOALs0MSqvclFAH8B9atcuwvhxql7kDzHuxN2b6sSfrQyJJpUqVYAqVKlQAqVKlQAL/EyPVl0ylgt2gFzyH+Uxbn0oKxOAQacrwRST7QqtNiQ9/Kjs+khbgEC+3Yj3ou+LJtlWI/eg/4mGgbgP4g4eOE4aTRHIit4UukWJI+9a2+w97U62jqGjT+Qh+IPEUeX4VcHhtpGTSLW8ici5/aO/8AGsRaSlnmePiZ3mkIdmO7AaRYbA6b+UelVeIzCwsp+v8Ad2pozUV7mSTe3YssLAkjsHbZbbcr9+dV+bSxI48NVJHPe4/AVVtdj1J6W5mnjhTGt3FmbkDzA7+nb8a53FylqbNtLZFzguIgv3dFv1dx/wAqnHifVzI9qDSd6n4bBKfm3pfAT4N8RoKI89Q80JqThsW87CKIXuQW9Pc8hQwcGvYj2Jq64fxHgrIFv5l29Dyv+BP5Uy6eSfJniWF/C2HBlZ+axDSp7kk+b+P41B46zgFhhzhzPqFwBcEG9gysAbWoj4fhEWEDG138x+vIfhVNmOJbcrVXwJLmjPf+jmJ06vDt1tcE29hXTwrjf/ppLd7bUY4bN+Vx15evYUU5JmEo/nTrG5tpA32sN+lqVKzLIPBnDYhwS6haaQmR+/6qr7Ab/wBI1eZNhJGYXB0383W1uor1FjPEbfULnewHIfd3vtUjLs0AZ0HRmH5mta7ilfxOukGgI7kmtJz3C6kJI6VnDixIp4OzUcLWpomuvTRanA+pqVKlUBxUqVKgBUqVccXBFAFRPxPhl++7b28kUrjnbmqkW9ap8/xjs8U+HBfwplYixW66HRhuL8n7UL5rwljWk8SEtHpjQqPNviItQjLaRvEVdg37q15h4dxMbw+DH4ngNAwVi6FwmGngc6ih82qVT671oGiyz4fEKNYJsbi6srKbWurDcGxIuD1qoxGAw0Ku5WeZSb6LSON1VbFFGqYnSPNIHNttQAoVm4XxUmIkmbCxrJJNh5Fm8Ql4VjSEOi2S5vokGxAOvfmatuJchlmmjkbCpiY1jdfClYqFdmQiQAqyk2DLfmL+poAscBnsOrxZhNqGyIMNiNMY5f6Oxa21+QBsOZLXkOfQML6mH70cin8GUGgDHcMY5sRJiRp84eER2baAxFFGu+n57SW038xF6qH4AxKrpWGJ1K4bUip4Qdo51kkWQAMHuq2DftNcb1gGv4XMYpGKo4JAuRuDblfepVAnAOQzQSyM8QhQlykaklY1KxLoBsBuyM5AFrtR3QAqVKlQAqVKlQAE/Gi/8jYq3O8H/FQ18w6++r2BH59q+nPjZ/8AJcX/AKj/AImGvl2LU5sFLHsBeg1HppmItvbnyFSMsyx5ybGwHMn+Aqyh4e0jVL9FB/MnrVhFNFAtzpS/Ybn6Dc0+OCk9zJSO4XCR4dCx3IHmc8z6DsPShfMsX4jlv8Wp7OMz8U2W+kfme9VlNlkn5Y8GJd2KpmBxFjY8qbw+HLegqfFh1XkN+9JFPkGyaASNhvTmXSecLY7kD8dqheJ62/KrbhvEM86LZZN7ksASqje4bnVZSMijR811CNY1AIUAW+lUEkXkY8gASb9Nqex+ZhpfOGA/WAJt06b01nk4eMRAhgRuR1HY/wCOlS54Dnkp+DrM5Yjckm/b0o8RfLQhwbgyoYN3osxQIUBdj7XohsjB7BAhu9ulrEeo7174awoM0vX9I+/9I1GwuZKgPi+UgFhfcHSL+Vu/oa88GZmoW7Hckk+5N618AGOcYYaKyfOcPoc+9aXmOeppIuKznO8Urvt3rIcgUTOb15tU/FxgCoLU6ZhCzHCDaVBZhY3XY9wwI5Ed61P4f8dvjY/5PxWKkgnNhFiE0BpR/oyXVgJOxsC3vzAEy19IfDfpoW5C4Dp3U352qtxOUv8AdgnU9vDJH0IqqwzitEl8M7urzdP1L8fDJJv90Htv6rsHvHPwxxcKtiUnOOVASwlBeVV5kjUTr72Fj6GhrJs5xOF0SYWdo1b5RctC9uaNG3lDegsedj1qyy3j3OoYvCAeQAWDSwM7Afvbavdr0P8ADmKRdeFxIsj2I1XXS3/pvtv3HrVI4HLaWz7P+zjh13h7Vqj3T+z5T+AvwnD+X5y/6PTl+N5yRBA8cvUyRrdfW4B9weZmZz8L8vy+Hx8V9sxCC2toFhVUubAlSdQF+tyPahTG8LzAhoJr6SCmolWU8wVdevrtUvHYnOZ4jh5sSWiNgwZo/MAb2ZlXWR7net/xsy2Iz6jA23B7e/I1/JfD82yYnF4UnZTNEsiX9fDHL6iqziTgWbCxidfCxOFb5cRBZ0/p2+T33HS96MOGuFpVh8MRvMGJZvIStyALC4tbb+NTMJw1mOBcy4GIhHuJsPIC8UgIt8ovY/4vbY0licFtJfDIxzKTpp/Jj3hL2H4Ci/hDiXFYWBosPL4aGQuQFXdtCDmRcCyjkavsxfBElcxyh8Gf9NhDsv7TRWAA9wT6Vc8Lw5Jg4WMk0eN8RzJEfCYsIyqKI3XkjhlfZrHfkK5epb0U1R6n6U4x6hNx1qnslf8AAHfEPPMUMfOi4vEiMlHRRNIFCyRJKAFDWA89qEpsbK/zySN+87N/E1sPFXGeWosL/wAlRziWPyNIsS2EbtCIzZWOwQbdmWgDNuI8DMDbKYoT0aLEOlv6ITR+Ip8critjjzQcZyi3VPgGFkI5Ej6mpkOc4lPkxM6W5aZpF/g1Qm57cunX8+tcq1HPbQV5b8R8zhtpxbuB92ULLf3LDV+dES/EnCYuy5rlsMvTxYgNQ72DHUPo9ZlUzLcrmxBZYI2lZV1FVsW0jYkJ8zWuPlB50kscWPGcjQG+H+WY7zZVjUVzuMPPz9hcCQC9t7P71Q474WZnGbfZBIP1o2jYH6EhvxAqryvhXEzpiZBGVTCxvJKzqVsUQt4YBFy5ty6Dc9L8wPFmPhFo8ZiFHbxWYD2DEgfSlSfZ2M5LuiRi+AsdDE80+EaOJB5mYxi2o6F2Dajdio2HWo2XwWsFFrUS5bjMbi8Bj8TiMRNLHEMPGqs50l3xMLMdI2JVAOY/zlDM2aCBL2u7fKP7T6fxrmyvz7loLbY5nubiPyCxfr+z7+vpQpJIWN2JJ9aU0pdizG5Y3J9akYHL3l+UbDmTyFTlJcsrGDk6ityLTmi3OrbEZaYURzZg5YXtyKhTb02cf4FQZzqICi5PID+FYmmrQThKEtMluOYSYAGu/aCTZQSewq3y/hoAa53AHUXsB6FuvsK5mDLEzIihbWvb1APv1p90qJuiu+yH/OOsfpux/BeVE/CGHWPxXXcABQ3ckXNCEkt960DB+HFg42LAB/N6knoAN+VJaHTpNjkUxvemZ5NTXHU1XtmCyEKmqx57VMkdVXUxsq8z2ArYyvgQJeHcGL6j0NXMyBjYmgnh3jaIuY5BoBY6G6Htq/VP5UTnFgtzH+O9U1JikPiqfw4fCHNzc+ij+82/A0EpOwOxI9jV1xHidbk/4tVATvSyNRIE7E7sT9TUnDjU4FQY+dTssPnrU6QcsfzGKwFVznerXNG5VUSnetT2BrcPsZkuWyB8VlWZRYZrF2glYBDYE20PZ49+tmA6Cg3Ccavt4kSn90lT+BvVdLgUDlWUo6mzRyAgqexW4YfQ1Jhgw4/ncOSP1o5JDb10M3L2JrrwdRXl1V8lOp/Ss2nXGCkvWLT/AD/AT5ZxBBMQqsVc/dbYn2PI/Q1JzXLI500uN+jDmp9D/ZQ3iOF45E8XCSX6gE3B9A3NT7/lVpwtmbSI0ct/EiNmvzI3AJ9diD/zr0oyb8s1yeHKKXmg+CJk3BuMaZYop7KTtoZwbdyvyj3JP15UXZ9xRgssJijRcZi1+Yk/oom7H9Zh2G/cryrnG2eHLMIuHhOnF4tdUjjYww8gB2Y7gH0Y9BWNahXDKWptR/b9fwdcY0k5Lf6BjmHxEzTEE2xDRj9SECMAehHm/FjUX/pDmUZDJjMVe1zeZ2se1mJHahyCQBgb2selSsVmAdSOW9xvz9DXPOMlJKKVHqdN/jPBN5W9fbfmt/Tb0357BtlHxXxAtHj4o8ZF1uqpIPVWUaSfoPcUU5dwNhMxH2rAYjw4GNmQxksko3ZWGoWNinfvve5xLUO9aT8Ns5hXCS4ZszkwErTO6kIhQgxRICzshsQVO2taM2O40iHSdTkw5NcHTrnYPcZ8J8NJDFHNiJrQmQqy+Gm0mglTqVtgUJH7xoczL4eZHHs2aGNuzT4Y/wC7ovVJxR8Ps0cGVcR/KMR3DLKzEjv4bsR9FLVncsLIxR1KMuzKwKlT2KncGsxw2pSFzZXObnNW33CnPuE8PHdsJmeDxKi50mRYX9hqbS/+0PQUJ0qVXSa5OaTT4QqJvh3lGJnxsRwzeEYWEjzH5YlHMnodQuun71z0uRQQYKVxdIpHHdUZh+KivEmpQY21AXBKG436EqetD3VGrZ2z61fFYbExTRh45k0skyo4awZDdW0m4JX618x8Uvlpa+XjEqt9xNoK27obl+3zV3gvieTL8Ss0e6Hyyx9JI+o9GHMHofQkHvAWRfa8fh8Pa6a9Ulx/mk8zX7agAvu4qUIaLdlZT10g+zd/5NybCYPRqmxWueVOpCxmWxt1DeAvshrDp5i7Fm5mta4x4jSbPNbNaHDloFPMCyOrH/zGO/YCoeI4Mw8mIMwJEZ30C1mbncEcl9K5cuzt9yqe1gXw7wtNiiGA0Rb3kPobWUfeP5bUT4LKhHJ9nJAXYXYaeZ2bfl/DejSJAoCqAoHIAWA9gKayiEtj2ewIihaQ3vzVG0jb1IP0rmn56R09JlcZN+wA5mg80VtYYiwBFyfuspF7NuR9SKvcp4NSJQSbyEbk729F9PWoGWReNiVO67ljYkHYXG/0FF+Z47wk1XsSbLtffvb051mB1wdP6pPzxVb0rAPjAlJFgsdieYt5rW/tqrweGkx0mlBZwoEjH5SFAUP6OQACOpBO29QeI8eZpnckk3O55nc3J9Sb1pnB2UfZsOAR55PO59xsv0H5k1Zvuec3SB3DfD+3zyFj6DSP7TVovCgCCO7WBJA1E2vztflyor1V6F+1LqTF1gbi8pTDxtK2yqLnuegHuTYUB5jmskx8xsvRRyHa/c0WfEXO1e2GQ3CNeQjlqGwT6b39bUCtTIdb7noGtI4ey6SKIa9TOR1+6OiD0qv4G4VJK4mdfLzjQ9T0cjt2H1rQNI7UWkJKQHYzBOx+U1Xtlsl/lNaD4Y7VwxDtRqM1AEcGw6Gn4cKy72ozaBe1c8Be1M5qqDUBksbnmDUB4WvyrQvBXtTRwidhQpqg1A7Fx3HiVEWbYRcUALLPHaKdR+8LB/a6jverTD/D0YmE4nKMZ4yA2MU40OrDcqWAtqsRzUDresyrRvhBmcqDHxQH9O0AmgU7hnhJOi3XVrUe1dmSCUdvwLgzTjK06fqtmDmGxkuCxJSaNoje00bC1u0g/jccxfnsaOuHMlD5lHICNMgs6/rFSH1f7KkUIcfccDMxAxwywyRhgzh9WsG1lHlFlBBO9+Z+p18L2PiYTXz0Eb/904H5W/GurE34TT7Js5+oevMp+r39wC4t4hL5vLimGpYp9IXvHE2gqPRgG/2q17iHMcmwfheOP55PEQIrP5NrMdPIG+3ex7VgOcoRiJweYmlB9xIwP503isRJJpaRi2hUjUn7qKLKg9AL1zPGnRZTab2N3y3O8oxIf7NEzslrhlZLXvY3PPkeVEeS8P4aWIO0K3JblccmIFYR8NsXoxei+0iMv1FnH5BvxrdmzH7Plc0/+jjmYfvDVpH42rnyR0ypFYS1KwTn4xyFWZSHupINopCLg22PUUCfGCOAYyBsNbwpMJFIpHJg0s9m/C1AqLyHM09NO7BVdifDXQgP3V1s+kemp3P9KuiONRdpkZTuL2JeTZ5icI2vDTPEeuk7H95DdW+oNHuG4+wePUQ5zhVJ5LiYgQyepA8yjl8pIP6tqzKlTygmJGbQdcU/DeWGP7VgpBjMIRqDpYuq92C7MB+sv1AoJwgJdbJ4liDosTqANyCF3sfSrrhLi7E5fJrge6E3kibdJPcfdb9ob+42rSIsLFjVbMsl0xYob4rBtYCS+5FuSsSCQwsGPOxvSOUo8/7HSjLg5lXEAxWHYYQIk6C3hSbCM8r2A3UdLD0NqGMVwdmGIkT7VMjrqGpg1yqkjVpGgC9unKrlRFjSmLgUxYvDyL4qHyvYNZ4XG17gMASOlttwC6dyqsQpcgEhVtdrdBqIFz6mo6tPBWr5M+zLgJZsfBhMKVhEkTMS5d/kbzHnctYja4G3SrSLMcsyPxlwskmLxxRoi9gEia+47ABlF1BZvLYkU9w9nf2rNsGYYJwcO06z6kFkV4mTzFSQvmHW24oC+IWF8PM8Yn/3nb/zLS/+qqRTk9MvQSVRVorMlw4lxEaSEkMSWN9zZSxufW259TWmxsoAAIAGwHYVnHDJtior/t/1b0eGRex/GuXrHU18GQb00Tg9PZZmQwsxxDIZFMZjkVbEkEqRYHqD+RNVYl/xcV6Rvf8AEVy6ikZaXZHwmIwckzHDxrGVe6Jqdjp0G7Xc7bm1hsLCqnj+eyR7kfMRbuCu/wCdXEMUSMWWMKW5kAb+ntUTPsvjxUehiVIN1Yb2PLcdR6UKSK5cviT1fkz3hvAGbExrzGoM37o8xv78vrWyXoT4ayRMLdiS7ttqtaw7Af45VfCcetNKabJSdk2hfi3i77P+ig/ndiW2ITflb9b++ucVZsY0QDUA5Iup+8LeS45HcG3UEetZtiHLMT3O/v3N+tNFGxj3ZZ5iI8QfFgASRz+kgJ++Tu0JPzKT9zmPUUVcJ8HBLTYlbvzWM8l9W7n05D1p/hfh6PDgSkh5SPm6Lf8AVB/jzolE5olk9AlLsiX4tLxjUX7RSWek1EyWJ6RmqN449KRnHpRqAkievfj1D8Yeld8Uen41uoCW047VzxR2qIWryGo1AZLVhw/m8mExEWJi+eJr25BhyZD6MpI+tKlXssgnTDzNcHHHfM8GnjYDEHVKgAZsJKd2DL91bn2F+2m9pkmaIHjnjYMFYNsegO4PY2uLUqVV6Wbd43wJ1MEqmuQY+KGTHD5m0qWEWJtPG2wB1W8Qep1XNuzihzHeHoG9gSSNIHPka5SrhcLcXft9T2+m6nRgyw0p3G9/dxX3+hHyPFeFiIZOiyKT+7ex/Imtk+JuY+Hkqxg7zzBNuyu0pPt5AP6VcpU+ReeJ5sH5WYnh9N7sSAOwvUnNra9uoF/e5/stSpVrX/In7P7HVjyf9KcaX7o79/8A1/RCpUqVVPOFU/I84mwky4jDvokT8GHVGH3lPUfwIBrlKhqzU6NVxRXMYv5Xy1dGOhAGLww38Vbbiw+YkDytzYC3zKLONPHj8KJoxI4tfwllaIlxzRmS3m7X2Ox9aVKuWSq/Y6U7SZFmzSXBcPxTYNyjYrEOXa92i1GS6Avclh4aqWO/M9RWTTzs7F3ZnZjdmYliT3LHcmlSq2Nc/JLK+CZkB/yiPYn5thc/cbtRsl/1SPcH/HeuUq4usXnXx/Y2Pg4ri/X8DTh27j6GlSrkSGPJlXv/ALprglHf+NKlWGjhcc710uOer/3pUqYAVkxc0U7SIvixliTHKLeZG2cH5djuGB5HlQ66sX1GN1csWI0kg3a9hYetKlTqVqh0wuyjOnbRG0cl7hbqpJUcgzC17dzVw8zA20+m34V2lWOKMaPQlPY/nXRO36pNcpVjiKcbGHoG/Cufa27ED1BpUqXSFCbEn/ANL7Q3Y/UUqVCQUI4o9h+dI4k9v40qVZQUf//Z",
    buttonLabel: "Watch Highlights ",
  },
  {
    id: "ravens-wild-card-win",
    title: "Ravens Wild Card Win",
    season: "2003 AFC Wild Card",
    opponent: "Baltimore Ravens",
    score: "20–17",
    description: "A hard-fought playoff win in the Titans’ McNair era.",
    youtubeUrl: "https://www.youtube.com/watch?v=omslGsTsFD0",
    imageUrl: "data:image/jpeg;base64,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",
    buttonLabel: "Watch Highlights ",
  },
];
