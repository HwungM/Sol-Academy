# Editorial image system

Sol Academy uses a commissioned set of 32 conceptual editorial images: 12 module illustrations, 6 decision-drill illustrations, 9 history-case illustrations, and 5 section anchors. They turn abstract market mechanics into physical systems without pretending to be screenshots or market evidence.

The assets were generated with built-in ChatGPT image generation, then normalized for the product. UI text is never baked into images: titles, labels, numbers, legends, and controls remain live HTML/CSS. The canonical asset paths and accessibility descriptions live in `app/data/art.ts`; non-decorative `ArtFrame` instances expose the registered alt text as their accessible name.

## Shared visual grammar

- Treat each image as a tabletop forensic model or precision instrument photographed as a premium editorial still life.
- Express one lesson idea through a physical cause-and-effect metaphor: nodes, beads, paths, gates, filters, lenses, apertures, chambers, lattices, planes, or measured particles.
- Use a low-key, near-black studio environment with directional rim light, controlled reflections, deep shadows, and enough tonal separation to read black-on-black forms.
- Favor an elevated three-quarter or restrained orthographic view, a single dominant apparatus, clear visual hierarchy, and generous negative space. Detail should reward a closer look without turning into decoration.
- Make direction and state legible spatially. Inputs should visibly enter, transformations should happen at a focal mechanism, and outputs or resolved states should visibly depart, rise, lock, split, or collapse.
- Keep the important mechanism inside the crop-safe center. The product renders art with `background-size: cover`, so no essential evidence may depend on a corner or outer edge.
- Aim for physically plausible construction and lighting rather than fantasy spectacle. The metaphor may be impossible as an engineered object, but it should feel buildable and internally coherent.

## Materials and semantic color

The base material family is matte black anodized metal, graphite, dark stone, brushed gunmetal, blackened cable, and restrained smoked or clear glass. Fine machining, engraved terrain, mesh, wire, and particulate matter carry information. Glass is reserved for containment, uncertainty, fragility, or failure; luminous threads and particles show state or movement. Surfaces should remain tactile and mostly desaturated.

Color is an information layer, not ambient decoration. Use one dominant accent and, only when the concept needs a contrast, one secondary accent.

| Accent | Product token | Meaning in the image system |
| --- | --- | --- |
| Lime | `#b9f45f` | Disciplined route, viable action, selected path, confirmed or constructive resolution |
| Cyan | `#70c7d8` | Data, measurement, transfer, normalized evidence, transaction or signal flow |
| Violet | `#9b8cff` | Analysis, inference, attention, orchestration, replay, or automation |
| Amber | `#e9ad68` | Caution, exposure, provenance friction, pressure, or a condition needing scrutiny |
| Red | `#ee737d` | Invalidation, loss, rupture, or collapse; use sparingly and locally |
| Neutral white/graphite | `#f1f3ef` over the dark base | Raw, unresolved, inactive, locked, or contextual structure |

Do not color an object merely to make it attractive, and do not assign a token or project an identity through color. Dark neutral structure should always dominate the frame.

## Prohibited motifs

- No literal cryptocurrency coins, Solana or token logos, ticker symbols, meme characters, branded marks, or watermarks.
- No candlestick charts, price-chart screenshots, exchange terminals, dashboards, phone or laptop screens, holographic HUDs, or other fake interfaces.
- No embedded words, letters, numerals, captions, legends, callouts, or UI chrome. UI text is never baked into images.
- No traders, faces, hands, crowds, mascots, or lifestyle stock-photo scenes.
- No rockets, moons, sports cars, casinos, slot machines, piles of cash, bull-versus-bear imagery, or other speculative-finance clichés.
- No rainbow neon, full-frame violet/blue cyberpunk wash, excessive bloom, glossy toy-plastic treatment, or ornamental complexity that does not explain the lesson.
- No visual claim that looks like documentary proof. These images communicate concepts; they are not records of a token, wallet, transaction, or historical event.

## Delivery specification

| Group | Count | Shipping dimensions | Ratio | Format and location |
| --- | ---: | ---: | ---: | --- |
| Modules | 12 | 960 × 600 px | 8:5 | Opaque RGB WebP in `public/art/modules/` |
| Drills | 6 | 960 × 600 px | 8:5 | Opaque RGB WebP in `public/art/drills/` |
| History cases | 9 | 960 × 600 px | 8:5 | Opaque RGB WebP in `public/art/history/` |
| Section anchors | 5 | 1200 × 600 px | 2:1 | Opaque RGB WebP in `public/art/sections/` |

Every filename is `{id}.webp`. Generated source images are center-fitted with Lanczos resampling, converted to RGB, and exported as WebP at quality 84 with method 6. Preserve the shipping dimensions and filenames when replacing an asset; code resolves each source as `/art/{group}/{id}.webp`.

## Prompt concepts and canonical alt text

The concept column is a compact regeneration brief. The alt column is the exact copy registered in `app/data/art.ts` and must remain synchronized with that registry.

### Modules (12)

| ID | Prompt concept | Canonical alt text |
| --- | --- | --- |
| `game-map` | A contour-map board with many false branches and one lime route climbing to a summit marker. | A physical market survival atlas with one disciplined route reaching the summit |
| `money-math` | A precision liquidity instrument separating an expected reading from the value that can actually pass through. | A precision liquidity chamber separating expected and executed value |
| `lifecycle` | Interlocked turbine stages carrying one cyan signal through an end-to-end token process. | A connected turbine carrying one signal through the token lifecycle |
| `terminal` | Stacked evidence planes brought into alignment by one central violet decoder beam. | Layered market evidence aligning through a central signal decoder |
| `wallets` | Apparently separate wallet nodes whose routes reveal one concealed common funding point. | A funding graph revealing a concealed common root beneath separate wallets |
| `narrative` | One anchored amber source waveform surrounded by weaker, delayed echoes. | An anchored origin signal surrounded by weaker delayed echoes |
| `tape` | Incoming flow entering a dense mesh, being absorbed, and reappearing as an orderly rising profile. | Incoming order flow absorbed by a dense lattice and redistributed higher |
| `risk` | A mechanical aperture that meters position size before energy enters a volatile chamber. | A mechanical sizing aperture controlling exposure before a volatile chamber |
| `setups` | Four distinct strategy channels crossing a dark plate and converging on one selector hub. | Four strategy tracks converging on one precision selector |
| `execution` | A cyan transaction capsule moving through successive finality gates into a locked confirmation ring. | A transaction capsule passing through finality gates into a confirmed chamber |
| `automation` | Modular observers feed an automation core while a visibly separate loop reconciles the result. | An observer-first automation engine with a separate reconciliation loop |
| `vod-capstone` | A replay lens reconstructs a past decision from stacked terrain, signals, and evidence traces. | A replay lens reconstructing a historical decision from stacked evidence |

### Drills (6)

| ID | Prompt concept | Canonical alt text |
| --- | --- | --- |
| `ready-screen` | A dark unresolved core surrounded and measured by nine mechanically independent probes. | An unresolved core measured by nine independent probes |
| `hidden-cluster` | Separate wallet pins above a plate converge below the surface on one warm funding hub. | Separate wallet nodes converging on one hidden funding root |
| `absorbed-sell` | A heavy sell sphere caught by a tension lattice, with five receivers independently registering the load. | A heavy sell absorbed by a tension lattice and five independent receivers |
| `og-race` | Four competing origin monoliths differ in age, connection, control, and provenance clues. | Four competing origin candidates with different provenance and control clues |
| `signature-limbo` | A transaction capsule hangs between two gates, visibly submitted but not yet confirmed. | A transaction capsule suspended between submission and confirmation |
| `field-note-a` | A volatile path spikes while a disciplined exit plane remains fixed below the unstable extreme. | A disciplined exit plane below an unstable final price spike |

### History cases (9)

| ID | Prompt concept | Canonical alt text |
| --- | --- | --- |
| `cycle-map` | One attention monolith sends a trace into a later, densely networked launch landscape. | A single attention signal evolving from a monolith into a dense launch network |
| `industrial-farming` | A forensic cutaway exposes one central hub repeatedly feeding a grid of similar launches. | A forensic cutaway of one hub feeding a repeated launch network |
| `graduation-base-rate` | A vast field of launch particles enters a funnel and only a tiny output reaches graduation. | A launch funnel where only a tiny number of particles graduate |
| `bome-acceleration` | Compressed cyan time gates rapidly amplify one small launch signal into a broad output chamber. | Compressed time gates expanding one launch signal into a broad chamber |
| `goat-fartcoin` | A violet attention signal rotates from a complex source mechanism to a simpler adjacent object. | Attention rotating from a complex source to a simpler adjacent object |
| `pnut-dev-sold` | A cracked, abandoned creator shell sits apart while an independent support network continues growing. | An abandoned creator shell beside an independently growing support network |
| `trump-float` | A segmented sphere exposes one small illuminated float while four heavy shell segments remain locked. | One floating supply segment exposed while four segments remain locked |
| `libra-collapse` | A brittle glass pressure tower shatters at the center of a minute-scale timing ring. | A glass pressure tower collapsed inside a minute-scale ring |
| `2026-denominators` | Two measuring vessels sample different populations and therefore produce visibly different base rates. | Two instruments measuring different populations and producing different base rates |

### Section anchors (5)

| ID | Prompt concept | Canonical alt text |
| --- | --- | --- |
| `dashboard` | A noisy particle stream passes through successive evidence filters and resolves into clean violet signals. | Noisy signals resolving through successive evidence filters |
| `path` | Eight essential gates form a clear core route while four specialist branches remain optional. | Eight essential modules leading into four optional specialist branches |
| `drills` | Evidence travels through a guarded route network whose branches force explicit decisions. | Evidence passing through guarded decision routes |
| `lab` | A compact research bench transforms raw observations through instruments into one validated rule. | A research bench turning raw observations into a validated rule |
| `sources` | Translucent evidence layers are stacked, aligned, and held inside a rigid verification frame. | Evidence layers anchored inside a verification frame |
