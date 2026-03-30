"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type SupportedArtist = {
  artist: string;
  supportLane: string;
  note: string;
  caseStudyHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageScale?: number;
};

type Partner = {
  name: string;
  src?: string;
  href?: string;
  invert?: boolean;
  imagePosition?: string;
  imageScale?: number;
  regionLabel?: string;
};

const RESOURCE_SUPPORTED_ARTISTS: SupportedArtist[] = [
  {
    artist: "Yanchan Produced",
    supportLane: "Partner",
    note: "Successfully launched Yanchan Produced.",
    caseStudyHref: "/artist-affiliations/case-studies-2?example=yanchan-business",
    imageSrc: "/case-studies/yanchan-opt.jpg",
    imageAlt: "Yanchan Produced artwork",
    imagePosition: "center 22%",
  },
  {
    artist: "Mike Cannz",
    supportLane: "Partner",
    note: "Currently developing Ten Ten Entertainment together.",
    caseStudyHref: "/artist-affiliations/case-studies-2?example=mike-ar-sales",
    imageSrc: "/case-studies/mikecannz-opt.jpg",
    imageAlt: "Mike Cannz artwork",
    imagePosition: "center 8%",
  },
  {
    artist: "Kym Tea",
    supportLane: "Partner",
    note: "Currently developing Steeped Dreams Studio together.",
    imageSrc: "/rooms/kymtea4.jpg",
    imageAlt: "Kym Tea portrait",
    imagePosition: "center 38%",
  },
  {
    artist: "Soji",
    supportLane: "Marketing",
    note: "Live performance planning.",
  },
  {
    artist: "Ary Roberto",
    supportLane: "Business",
    note: "Management assistance.",
    imageSrc: "/artist-affiliations/ary-roberto-opt.jpg",
    imageAlt: "Ary Roberto portrait",
    imagePosition: "center 24%",
  },
  {
    artist: "KISAKI",
    supportLane: "Marketing",
    note: "Management and live tour assistance.",
    caseStudyHref: "/artist-affiliations/case-studies-2?example=kisaki-marketing",
    imageSrc: "/case-studies/kisaki-opt.jpg",
    imageAlt: "KISAKI artwork",
  },
  {
    artist: "Dillon Antony",
    supportLane: "Business",
    note: "Management assistance.",
    imageSrc: "/artist-affiliations/dillon-antony-opt.jpg",
    imageAlt: "Dillon Antony portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Lil Durk",
    supportLane: "Music",
    note: "Co-production on the song \"Think You Glowed\" from his ninth studio album, \"Deep Thoughts.\"",
    imageSrc: "/news/thinkyouglowed-opt.jpg",
    imageAlt: "Lil Durk - Think You Glowed artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "50 Cent",
    supportLane: "Marketing",
    note: "Opening performance in Mumbai, India during his \"Final Lap\" tour.",
    imageSrc: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/07/10141737/50-Cent-Final-Lap-tour-1600x900.jpg?tr=w-1600",
    imageAlt: "50 Cent Final Lap tour artwork",
    imagePosition: "center 22%",
  },
  {
    artist: "Russ",
    supportLane: "Music",
    note: "Co-production on the song \"The Wind\" from the album \"Santiago.\"",
    imageSrc: "https://yt3.googleusercontent.com/f16R_n3YKPthxphDOdHNX9qE1c8-1gN67Ax4uARDL_n0K0nCqMTdNroE-fBhbuA_ouU48wE9yBY=s900-c-k-c0x00ffffff-no-rj",
    imageAlt: "Russ artwork",
    imagePosition: "center 20%",
  },
  {
    artist: "Shruti Haasan",
    supportLane: "Music",
    note: "Co-production and writing on her single \"Inimel.\"",
    imageSrc: "https://i.ytimg.com/vi/IIat8oxEIbE/maxresdefault.jpg",
    imageAlt: "Shruti Haasan artwork",
    imagePosition: "center 24%",
  },
  {
    artist: "Kamal Haasan",
    supportLane: "Music",
    note: "Production, writing and vocal collaboration for Shruti Haasan's single \"Inimel.\"",
    imageSrc: "/artist-affiliations/kamal-haasan-opt.jpg",
    imageAlt: "Kamal Haasan portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Hanumankind",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/rooms/hk.jpg",
    imageAlt: "Hanumankind portrait",
    imagePosition: "center top",
  },
  {
    artist: "Killy",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/killy-opt.jpg",
    imageAlt: "Killy portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Yung Tory",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "https://hiphopcanada.com/wp-content/uploads/2021/07/yung-tory-1200x675-1.jpg",
    imageAlt: "Yung Tory portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Pressa",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "https://shiftermagazine.com/wp-content/uploads/2022/09/Pressa-featured.jpg",
    imageAlt: "Pressa portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Why G",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/why-g-opt.jpg",
    imageAlt: "Why G portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Alx Veliz",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/alx-veliz-opt.jpg",
    imageAlt: "Alx Veliz portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Charlie B",
    supportLane: "Music",
    note: "Co-production of the children's album \"Ajay's Dreams.\"",
    imageSrc: "/artist-affiliations/charlie-b-opt.jpg",
    imageAlt: "Charlie B portrait",
    imagePosition: "center 22%",
  },
  {
    artist: "Bugus",
    supportLane: "Marketing",
    note: "Opening support for Canadian tour.",
    imageSrc: "https://www.melodicmag.com/wp-content/uploads/2019/05/Bugus-Diemon-Color-hires-web-2-683x1024.jpg.webp",
    imageAlt: "Bugus portrait",
    imagePosition: "center 16%",
  },
  {
    artist: "Karl Wolf",
    supportLane: "Marketing",
    note: "Opening act support for \"The DIY Tour.\"",
    imageSrc: "/artist-affiliations/karl-wolf-opt.jpg",
    imageAlt: "Karl Wolf portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Kristina Maria",
    supportLane: "Business",
    note: "6-Month developmental strategy rollout with Vito Luprano (Celine Dion) and Cash Money Records.",
    imageSrc: "/artist-affiliations/kristina-maria-opt.jpg",
    imageAlt: "Kristina Maria portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Birdman",
    supportLane: "A&R/Sales",
    note: "New artist signings.",
    imageSrc: "https://preview.redd.it/jokes-aside-how-good-a-rapper-would-you-say-baby-birdman-is-v0-i8yuz03q2mn81.jpg?auto=webp&s=14e3bafe57ef32c64edb8e831bf23a91b0d875e1",
    imageAlt: "Birdman portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Leo Lotus",
    supportLane: "Business",
    note: "Management assistance.",
  },
  {
    artist: "Caskey",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "https://s1.ticketm.net/dam/a/8de/c4a53e1e-6eec-497e-a203-b1b2c05908de_RETINA_PORTRAIT_3_2.jpg",
    imageAlt: "Caskey portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Jacquees",
    supportLane: "Marketing",
    note: "Club campaign support.",
    imageSrc: "https://theshaderoom.com/wp-content/uploads/2025/05/Jacquees-Baby-Snow-Twin-It-Up-In-Icy-Chains-For-His-9-Month-Milestone-Flicks-e1746844020106.jpg",
    imageAlt: "Jacquees portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Austin Mahone",
    supportLane: "A&R/Sales",
    note: "A&R support.",
    imageSrc: "https://m.media-amazon.com/images/M/MV5BNjg4NTUwNDgtNWY2Mi00ZTIzLThiZDEtYWI3NDY0NjY2MDU3XkEyXkFqcGc@._V1_.jpg",
    imageAlt: "Austin Mahone portrait",
    imagePosition: "center 14%",
  },
  {
    artist: "London On Da Track",
    supportLane: "Business",
    note: "Management support.",
    imageSrc: "https://m.media-amazon.com/images/M/MV5BMjlkMWZhYzktOWEwOS00YTEzLTgxOGItYzZkZDNhNmJjN2Y1XkEyXkFqcGc@._V1_.jpg",
    imageAlt: "London On Da Track portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Charle$ (WolfieRaps)",
    supportLane: "Music",
    note: "Co-production, engineering and writing on single titled \"Personal.\"",
    imageSrc: "https://i.ytimg.com/vi/XdJRxrdB66o/maxresdefault.jpg",
    imageAlt: "Charle$ artwork",
    imagePosition: "center 22%",
  },
  {
    artist: "Dom Vallie",
    supportLane: "Marketing",
    note: "Appearance on the Orange Room Sessions.",
    imageSrc: "https://images.genius.com/b5bebe5fb2a22e2dbe6937168283cd6c.1000x1000x1.jpg",
    imageAlt: "Dom Vallie artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "Omega Mighty",
    supportLane: "Marketing",
    note: "Appearance on the Orange Room Sessions.",
    imageSrc: "/artist-affiliations/omega-mighty-opt.jpg",
    imageAlt: "Omega Mighty portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Kwazii",
    supportLane: "Music",
    note: "Collaboration on single \"Stay Familiar.\"",
    imageSrc: "https://www.socanmagazine.ca/wp-content/uploads/2025/03/Kwazii_2025_Banner.jpg",
    imageAlt: "Kwazii artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "Tome",
    supportLane: "Music",
    note: "Executive production on single \"Fun\" from the children's album \"Ajay's Dreams.\"",
    imageSrc: "https://www.shedoesthecity.com/wp-content/uploads/files/2021/09/Tome-copy.jpg",
    imageAlt: "Tome portrait",
    imagePosition: "center 40%",
  },
  {
    artist: "Aquila",
    supportLane: "Music",
    note: "Executive production on single \"Believe\" from \"Ajay's Dreams.\"",
    imageSrc: "https://static.wixstatic.com/media/ec807a_21e69783cd104aed8e2c05bfd9e9a2d0~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ec807a_21e69783cd104aed8e2c05bfd9e9a2d0~mv2.jpg",
    imageAlt: "Aquila portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Trey Joshua",
    supportLane: "Music",
    note: "Executive production on single \"Need A Friend\" from \"Ajay's Dreams.\"",
  },
  {
    artist: "Saukrates",
    supportLane: "Music",
    note: "Executive production on single \"Shine On\" from \"Ajay's Dreams.\"",
    imageSrc: "https://welcometothemusic.com/wp-content/uploads/2025/01/Saukrates-Toronto-vs-Everybody-promo-pic.jpg",
    imageAlt: "Saukrates portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Pilla B",
    supportLane: "Music",
    note: "Production on single \"I Seen It.\"",
    imageSrc: "https://hiphopcanada.com/wp-content/uploads/2018/10/pilla-b-1200w-1.jpg",
    imageAlt: "Pilla B portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Jonita Gandhi",
    supportLane: "Music",
    note: "Production on single \"Beparwai.\"",
    imageSrc: "/news/jonitabeparwai-opt.jpg",
    imageAlt: "Jonita Gandhi - Beparwai artwork",
  },
  {
    artist: "Anjulie",
    supportLane: "Music",
    note: "Production on \"Chai & Sunshine.\"",
    imageSrc: "/artist-affiliations/anjulie-opt.jpg",
    imageAlt: "Anjulie portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Zach Zoya",
    supportLane: "Music",
    note: "Production on single \"Hard To Love.\"",
    imageSrc: "https://readrange.com/wp-content/uploads/elementor/thumbs/ZZ-hero-2-1-rgg6zplx91a7gfdyzq0hcilhpf4n1dkato0i15bnyo.jpg",
    imageAlt: "Zach Zoya portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "SVDP",
    supportLane: "Music",
    note: "Production on various music including the viral series \"Mridangam Raps.\"",
    imageSrc: "https://g5afoundation.org/culture/wp-content/uploads/2023/08/SVDP-by-Gajan-Balan-1-1-474x324.jpg",
    imageAlt: "SVDP portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Fame Holiday",
    supportLane: "Music",
    note: "Production and writing on various songs including \"Letter To My Dad,\" Mississauga Music Awards' \"Song of the Year.\"",
    caseStudyHref: "/case-studies/fame-holiday",
    imageSrc: "/case-studies/fh-opt.jpg",
    imageAlt: "Fame Holiday artwork",
  },
  {
    artist: "J Soul",
    supportLane: "Business",
    note: "A&R assistance for signing to Cash Money Records.",
    imageSrc: "/artist-affiliations/j-soul-opt.jpg",
    imageAlt: "J Soul portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "KSHMR",
    supportLane: "Business",
    note: "Artist signing to Dharma Records.",
    imageSrc: "/artist-affiliations/kshmr-opt.jpg",
    imageAlt: "KSHMR portrait",
    imagePosition: "center 8%",
  },
  {
    artist: "Kardinal Offishall",
    supportLane: "Marketing",
    note: "Concert and event planning.",
    imageSrc: "/artist-affiliations/kardinal-offishall-opt.jpg",
    imageAlt: "Kardinal Offishall portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Arkells",
    supportLane: "Marketing",
    note: "Concert and event planning.",
    imageSrc: "/artist-affiliations/arkells-opt.jpg",
    imageAlt: "Arkells portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Dallas Green",
    supportLane: "Marketing",
    note: "Concert and event planning.",
    imageSrc: "/artist-affiliations/dallas-green-opt.jpg",
    imageAlt: "Dallas Green portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "DVBBS",
    supportLane: "Marketing",
    note: "Concert and event planning.",
    imageSrc: "/artist-affiliations/dvbbs-opt.jpg",
    imageAlt: "DVBBS portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Acejax",
    supportLane: "Music",
    note: "Executive production on hit single \"By My Side.\"",
  },
  {
    artist: "4KORNERS",
    supportLane: "Marketing",
    note: "Appearance on the Orange Room Sessions and studio collaborations.",
    imageSrc: "/artist-affiliations/4korners-opt.jpg",
    imageAlt: "4KORNERS portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Professor Griff of Public Enemy",
    supportLane: "Marketing",
    note: "Social media campaign.",
  },
  {
    artist: "AR Paisley",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/ar-paisley-opt.jpg",
    imageAlt: "AR Paisley portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Burna Bandz",
    supportLane: "Music",
    note: "Studio engineer assistance.",
  },
  {
    artist: "LB Spliffy",
    supportLane: "Music",
    note: "Music collaborations.",
    imageSrc: "/artist-affiliations/lb-spliffy-opt.jpg",
    imageAlt: "LB Spliffy portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "RealestK",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/realestk-opt.jpg",
    imageAlt: "RealestK portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Yoko Gold",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/yoko-gold-opt.jpg",
    imageAlt: "Yoko Gold portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Nadia Stone",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/nadia-stone-opt.jpg",
    imageAlt: "Nadia Stone portrait",
    imagePosition: "center 32%",
  },
  {
    artist: "Kofi",
    supportLane: "Music",
    note: "Studio collaborations.",
  },
  {
    artist: "Rochester",
    supportLane: "Marketing",
    note: "Festival performance collaborations.",
  },
  {
    artist: "King Cruff",
    supportLane: "Marketing",
    note: "Various music collaborations and Orange Room Session appearance.",
    imageSrc: "https://www.socanmagazine.ca/wp-content/uploads/2025/01/KingCruff_CourtesyUMC_Banner_Scaled.jpg",
    imageAlt: "King Cruff portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Bolu",
    supportLane: "Music",
    note: "Studio collaborations.",
  },
  {
    artist: "Yung Raja",
    supportLane: "Marketing",
    note: "Tour collaborations.",
    imageSrc: "/artist-affiliations/yung-raja-opt.jpg",
    imageAlt: "Yung Raja portrait",
    imagePosition: "center 36%",
  },
  {
    artist: "Asal Kolar",
    supportLane: "Music",
    note: "Studio collaborations with Coke Studios.",
    imageSrc: "/artist-affiliations/asal-kolar-opt.jpg",
    imageAlt: "Asal Kolar portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Preston Pablo",
    supportLane: "Music",
    note: "Studio collaborations.",
    imageSrc: "/artist-affiliations/preston-pablo-opt.jpg",
    imageAlt: "Preston Pablo portrait",
    imagePosition: "center 20%",
  },
];

const RESOURCE_SUPPORTED_ARTIST_ORDER = [
  "Yanchan Produced",
  "Mike Cannz",
  "Kym Tea",
  "Soji",
  "Ary Roberto",
  "Lil Durk",
  "KISAKI",
  "Dillon Antony",
  "Russ",
  "50 Cent",
  "Kristina Maria",
  "Shruti Haasan",
  "Bugus",
  "Leo Lotus",
  "Kamal Haasan",
  "Karl Wolf",
  "Birdman",
  "Hanumankind",
  "Jacquees",
  "Austin Mahone",
  "Killy",
  "London On Da Track",
  "Yung Tory",
  "Pressa",
  "Dom Vallie",
  "Why G",
  "Alx Veliz",
  "Omega Mighty",
  "Charlie B",
  "Caskey",
  "J Soul",
  "Charle$ (WolfieRaps)",
  "Kwazii",
  "Kardinal Offishall",
  "Tome",
  "Aquila",
  "Arkells",
  "Trey Joshua",
  "Saukrates",
  "Dallas Green",
  "Pilla B",
  "Jonita Gandhi",
  "DVBBS",
  "Anjulie",
  "Zach Zoya",
  "4KORNERS",
  "SVDP",
  "Fame Holiday",
  "Professor Griff of Public Enemy",
  "Acejax",
  "AR Paisley",
  "Rochester",
  "Burna Bandz",
  "LB Spliffy",
  "King Cruff",
  "RealestK",
  "Yoko Gold",
  "Yung Raja",
  "Nadia Stone",
  "Kofi",
  "KSHMR",
  "Bolu",
  "Asal Kolar",
  "Preston Pablo",
] as const;

const RESOURCE_SUPPORTED_ARTIST_ORDER_LOOKUP = new Set<string>(RESOURCE_SUPPORTED_ARTIST_ORDER);

const ORDERED_RESOURCE_SUPPORTED_ARTISTS: SupportedArtist[] = [
  ...RESOURCE_SUPPORTED_ARTIST_ORDER
    .map((artist) => RESOURCE_SUPPORTED_ARTISTS.find((item) => item.artist === artist))
    .filter((item): item is SupportedArtist => Boolean(item)),
  ...RESOURCE_SUPPORTED_ARTISTS.filter((item) => !RESOURCE_SUPPORTED_ARTIST_ORDER_LOOKUP.has(item.artist)),
];

const PARTNERS: Partner[] = [
  { name: "Dirty Elephant Studios" },
  { name: "Ten Ten Entertainment", src: "/rooms/TenTenlogo.png", href: "https://www.mikecannzentertainment.com/" },
  { name: "Steeped Dreams Studio" },
  { name: "Universal Canada", src: "/partners/umusic.png", href: "https://www.universalmusic.com", invert: true },
  { name: "Republic", src: "/partners/republic.png", href: "https://www.republicrecords.com", invert: true },
  { name: "Sony France", src: "/partners/sony.png", href: "https://www.sonymusic.fr", invert: true, regionLabel: "France" },
  { name: "Cadence Music Group", src: "/partners/cadence.png", href: "https://cadencemusicgroup.com/" },
  { name: "Dharma Records", src: "/partners/dharmastudio.png", href: "https://www.dharmaworldwide.com/", invert: true },
  { name: "Bon Fire Records", src: "/partners/bonfire.png", href: "https://www.bonfiremusicgroup.com/about/", invert: true },
  { name: "Spinnin' Records", src: "/partners/spinnin2.svg", href: "https://www.spinninrecords.com", invert: true },
  { name: "Warner Canada", src: "/partners/warner-canada-20260329.png", href: "https://www.warnermusic.ca/" },
  { name: "Sony Canada", src: "/partners/sony.png", href: "https://www.sonymusic.ca", invert: true, regionLabel: "Canada" },
  { name: "Art Haus", href: "https://www.arthausmusic.com/" },
  { name: "Rockstar", href: "https://www.rockstarenergy.com/" },
  { name: "Prime Video", src: "/partners/prime-video-20260329.png", href: "https://www.primevideo.com/" },
  { name: "Desifest", src: "/partners/desifest-logo.svg", href: "https://www.desifest.ca/" },
  { name: "Cash Money Records", src: "/partners/cash-money-records-20260329.png", href: "https://www.cashmoney-records.com/" },
  {
    name: "Coke Studios Tamil",
    src: "/partners/coke-studio-tamil-opt.jpg",
    href: "https://www.coca-cola.com/ca/en/offerings/coke-studio",
  },
  { name: "The Junos", src: "/partners/the-junos.png", href: "https://junoawards.ca/" },
  { name: "MLSE", src: "/partners/mlse.png", href: "https://www.mlse.com/" },
  { name: "Toronto Raptors", src: "/partners/toronto-raptors.png", href: "https://www.nba.com/raptors/" },
  { name: "Expo Latino Festival", src: "/partners/expo-latino-festival.png", href: "https://expolatino.com/" },
  { name: "NBA2K", src: "/partners/nba2k.png", href: "https://nba.2k.com/" },
  { name: "Red Lotus Films", src: "/partners/red-lotus-films.png" },
  { name: "Netflix", src: "/partners/netflix.png", href: "https://www.netflix.com/" },
  { name: "Love Island UK", src: "/partners/love-island-uk.png" },
  { name: "arrambam", src: "/partners/arrambam.png" },
  { name: "Power Staffing", href: "https://www.powerstaffing.com/" },
  { name: "Arrow Group of Companies", href: "https://www.arrowgroup.com/" },
  { name: "Velour Beauty", src: "/partners/velour-beauty.png", href: "https://www.velourbeauty.com/", invert: true },
];

export default function ArtistRosterReleasesPage() {
  const [activeView, setActiveView] = useState<"artists" | "partners">("artists");

  useEffect(() => {
    function syncViewFromHash() {
      setActiveView(window.location.hash === "#partners" ? "partners" : "artists");
    }

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  function switchView(nextView: "artists" | "partners") {
    setActiveView(nextView);
    const nextHash = nextView === "partners" ? "#partners" : "#artists";
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
  }

  if (activeView === "partners") {
    return (
      <main className="relative min-h-[100svh] w-full overflow-hidden bg-white text-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.18),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
          <div className="accent-card min-h-[204px] rounded-2xl border border-[#d6ae66]/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_75px_rgba(0,0,0,0.14)] sm:min-h-[216px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
              Label & Partner Affiliations
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  Labels & Partners We&apos;ve Worked/Collaborated With
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700 sm:text-base">
                  A selection of labels, partners and corporations EMTEE has worked with and/or collaborated with.
                </p>
                <div className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
                  Trusted by industry leaders
                </div>
                <div className="mt-2 h-px w-24 bg-gradient-to-r from-[#d6ae66]/80 via-black/20 to-transparent" />
              </div>
              <Image
                src="/Logo2.png"
                alt="EMTEE logo"
                width={52}
                height={52}
                className="h-10 w-10 rounded-md object-contain opacity-80 sm:h-[52px] sm:w-[52px]"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchView("artists")}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/70 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                >
                  Artists
                </button>
                <button
                  type="button"
                  onClick={() => switchView("partners")}
                  className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/12 px-5 py-2 text-sm font-semibold text-[#6f511a] transition"
                >
                  Labels & Partners
                </button>
              </div>
              <Link
                href="/rooms/lobby"
                className="inline-flex items-center justify-center self-start rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03] sm:self-auto"
              >
                Back to Lobby
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="group relative flex items-center justify-center rounded-3xl border border-black/10 bg-white px-8 py-10 shadow-[0_0_0_1px_rgba(214,174,102,0.05),0_25px_80px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d6ae66]/45 hover:bg-[#fffdf8] hover:shadow-[0_0_0_1px_rgba(214,174,102,0.14),0_30px_90px_rgba(0,0,0,0.14)] hover:after:absolute hover:after:bottom-6 hover:after:h-px hover:after:w-12 hover:after:bg-gradient-to-r hover:after:from-[#d6ae66]/85 hover:after:via-black/20 hover:after:to-transparent hover:after:content-[''] sm:px-12 sm:py-16"
                >
                  {partner.src ? (
                    <div className="relative h-16 w-full overflow-hidden sm:h-24">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        fill
                        draggable={false}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                        className={[
                          "object-contain opacity-90 transition group-hover:opacity-100 group-hover:drop-shadow-[0_0_18px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_0_24px_rgba(214,174,102,0.16)]",
                          partner.invert ? "invert" : "",
                        ].join(" ")}
                        style={{
                          ...(partner.imagePosition ? { objectPosition: partner.imagePosition } : {}),
                          ...(partner.imageScale ? { transform: `scale(${partner.imageScale})` } : {}),
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                      {partner.name}
                    </div>
                  )}
                  {partner.regionLabel ? (
                    <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-black/10 bg-white/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                      {partner.regionLabel}
                    </div>
                  ) : null}
                  {partner.href ? (
                    <Link
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 rounded-3xl"
                      aria-label={partner.name}
                    >
                      <span className="sr-only">{partner.name}</span>
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-12 text-xs text-zinc-500">
              Want to be listed as a partner?{" "}
              <Link href="https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900">
                Apply For A Consultation
              </Link>
              .
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.18),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="accent-card min-h-[204px] rounded-2xl border border-[#d6ae66]/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_75px_rgba(0,0,0,0.14)] sm:min-h-[216px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
            Artist Affiliations
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                Artists We&apos;ve Worked And/Or Collaborated With
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700 sm:text-base">
                A selection of artists EMTEE has worked with and/or collaborated with in a number of different capacities that span the 5 different department resources.
              </p>
            </div>
            <Image
              src="/Logo2.png"
              alt="EMTEE logo"
              width={52}
              height={52}
              className="h-10 w-10 rounded-md object-contain opacity-80 sm:h-[52px] sm:w-[52px]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => switchView("artists")}
              className={[
                "inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition",
                activeView === "artists"
                  ? "border-[#d6ae66]/55 bg-[#d6ae66]/12 text-[#6f511a]"
                  : "border-black/15 bg-white text-black/70 hover:border-[#d6ae66]/45 hover:bg-black/[0.03]",
              ].join(" ")}
            >
              Artists
            </button>
            <button
              type="button"
              onClick={() => switchView("partners")}
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/70 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              Labels & Partners
            </button>
          </div>
          <Link
            href="/rooms/lobby"
            className="inline-flex items-center justify-center self-start rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03] sm:self-auto"
          >
            Back to Lobby
          </Link>
        </div>

        <section className="mt-8">
          <div className="animate-[fadeIn_220ms_ease-out]">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {ORDERED_RESOURCE_SUPPORTED_ARTISTS.map((item, index) => (
                <article
                  key={`${item.artist}-${item.supportLane}-${index}`}
                  className="flex h-full flex-col rounded-xl border border-black/10 bg-white p-4 shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
                >
                  <div className="overflow-hidden rounded-lg border border-black/8 bg-black/[0.02]">
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? `${item.artist} image`}
                        width={1200}
                        height={720}
                        className={[
                          "aspect-[16/9]",
                          "w-full",
                          item.imageFit === "contain" ? "object-contain bg-black/[0.03]" : "object-cover",
                        ].join(" ")}
                        sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        style={{
                          ...(item.imagePosition ? { objectPosition: item.imagePosition } : {}),
                          ...(item.imageScale
                            ? { transform: `scale(${item.imageScale})`, transformOrigin: "top center" }
                            : {}),
                        }}
                        draggable={false}
                      />
                    ) : (
                      <div className="flex aspect-[16/9] w-full items-end bg-[linear-gradient(135deg,rgba(214,174,102,0.12),rgba(0,0,0,0.03))] p-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
                          {item.artist}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 inline-flex w-fit self-start rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/14 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7c5b20]">
                    {item.supportLane}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-zinc-900">{item.artist}</h2>
                  <p className="mt-1 text-sm text-zinc-700">{item.note}</p>
                  {item.caseStudyHref ? (
                    <Link
                      href={item.caseStudyHref}
                      className="mt-auto pt-4 inline-flex items-center text-sm font-semibold text-[#7c5b20] transition hover:text-[#5b4217]"
                    >
                      View Case Study →
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
