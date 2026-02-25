# EMTEE Studio Site

Interactive room-based website built with Next.js 16, React 19, and Tailwind CSS.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Core Architecture

- `app/rooms/[slug]/page.tsx`: room route entry.
- `components/RoomScene.tsx`: room interaction system (hotspots, cards, overlays, mobile pan).
- `data/rooms.ts`: room definitions, hotspot coordinates, room-to-room links.
- `components/ConditionalExploreBar.tsx`: non-room explore launcher.
- `components/Footer.tsx`: shared site footer.

## Room Card System

Current interaction tiers to keep consistent across rooms:

- `compact`: minimized icon state.
- `expanded`: in-room content card state.
- `modal`: full overlay detail state.

When adding/changing cards, keep these stable:

- Use one minimized pattern (`w-12` compact control) unless intentionally overridden.
- Keep CTA order consistent: primary action first, secondary next.
- Keep text overflow in long cards scrollable inside card body.

## QA Matrix (Required Before Publish)

Test each room on:

- Desktop (>=1280px)
- Mobile portrait (<=767px)
- Mobile landscape

Checklist for each:

- Title + pins do not overlap.
- Next-room and back-room pins are both tappable/clickable.
- Content cards do not clash with explore bar/footer.
- Minimize/expand controls remain visible.
- Long text areas are scrollable and do not clip CTA rows.
- Explore drawer opens/closes reliably and does not overlap bottom browser chrome.

## Performance Budget

Targets:

- Hero/room background assets: prefer <= 700KB optimized source.
- Critical above-the-fold LCP image request: <= 450KB whenever possible.
- Avoid raw multi-MB PNG/JPG in active routes; use optimized `-opt` assets.

Current rule of thumb:

- Room and booking backgrounds should reference optimized files in `public/rooms/*-opt.jpg` or equivalent compressed assets.
- Avoid eager preloading too many room images at once.

## Accessibility Baseline

Required checks:

- Keyboard `Tab` navigation reaches all actionable elements.
- Visible focus ring on links/buttons.
- Overlay close controls reachable with keyboard.
- Hover-only affordances should have tap/keyboard equivalents.
- Respect reduced motion:
  - marquee/pulse/shimmer should disable when `prefers-reduced-motion` is enabled.

## Useful Commands

```bash
# lint full project
npm run lint

# lint a specific file
npm run lint -- components/RoomScene.tsx

# find room hotspots
rg "slug:|id: \"next-room\"|x:|y:" data/rooms.ts
```

