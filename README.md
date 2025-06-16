# HexFac - Hexagon Factory Game

HexFac is a modular, extensible hexagon-based factory simulation game, with a focus on clean architecture, easy modding and separation of concerns.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
- [Modding & Extensibility](#modding--extensibility)
- [Development](#development)
- [Contributing](#contributing)
- [Continuous Integration & Deployment](#continuous-integration--deployment)
- [License](#license)

---

## Features

- **Hexagonal Grid World:** Procedurally generated using noise functions.
- **Buildings & Recipes:** Modular system for adding new building types and crafting recipes.
- **Resource Management:** Items, storage, and resource flow between buildings.
- **UI:** Modular UI for stats and resource changes.
- **Performance:** Game loop with separate FPS, UPS, and UI update intervals, memoization, caching, and other tricks to maximize efficiency and smoothness.
- **Modding Support:** Designed for easy extension and modding.

---

## Project Structure

- [`core/`](src/core/) — Core utilities, settings, persistence, and rendering logic.
- [`core/render/`](src/core/render/) — Canvas and HTML rendering helpers.
- [`core/utils/`](src/core/utils/) — Utility functions for arrays, numbers, and browser features.
- [`game/core/`](src/game/core/) — Main game loop, UI, layout, and event/event handling.
- [`game/models/`](src/game/models/) — All game data models (hexes, buildings, items, recipes, vectors).
- [`game/models/buildings/`](src/game/models/buildings/) — Individual building type implementations.
- [`game/models/items/`](src/game/models/items/) — Individual item type implementations.
- [`game/models/recipes/`](src/game/models/recipes/) — Individual crafting recipe implementations.
- [`assets/`](src/assets/) — Game assets such as images and fonts.
- Root files — Entry point ([`main.ts`](src/main.ts)), styles, config files, and [`index.html`](index.html).

---

## Implementation Details

### Hexagonal Map

- Implemented in [`HexagonMap`](src/game/models/hexagonMap.ts).
- Uses cube coordinates for hexagons ([`Hex`](src/game/models/hex.ts)).
- Procedural generation with noise for terrain variety.
- Caching for polygon corners and pixel positions for performance.

### Buildings & Items

- All buildings extend [`Building`](src/game/models/building.ts), which itself extends `Hex`.
- Items are defined in [`Item`](src/game/models/item.ts).
- Recipes are modular and defined in [`Recipe`](src/game/models/recipe.ts) and the `recipes/` folder.
- Each building can have its own recipe, storage, and update logic.

### Game Loop

- Main loop in [`Game`](src/game/core/game.ts).
- Separate intervals for rendering (FPS), updating game logic (UPS), and updating UI (UIPS).
- Uses `requestAnimationFrame` for smooth rendering.

### UI

- Modular UI system in [`ui.ts`](src/game/core/ui.ts).
- Displays resource stats, changes per second, and supports dynamic updates.

### Rendering

- Canvas-based rendering in [`canvas.ts`](src/core/render/canvas.ts).
- Handles resizing, drawing polygons, images, and lines for hexagons and overlays.

### Events

- Input handling in [`events.ts`](src/game/core/events.ts).
- Supports pointer, wheel, and keyboard events for interaction and navigation.

### Settings & Persistence

- Settings loaded and saved via [`settings.ts`](src/core/settings.ts) and [`save.ts`](src/core/save.ts).
- Game state can be saved and loaded.

---

## Modding & Extensibility

HexFac is designed to be easily extended:

- **Add New Buildings:**
  Create a new file in [`models/buildings/`](src/game/models/buildings/) and extend the [`Building`](src/game/models/building.ts) class.
- **Add New Items:**
  Create a new file in [`models/items/`](src/game/models/items/) and extend the [`Item`](src/game/models/item.ts) class.
- **Add New Recipes:**
  Create a new file in [`models/recipes/`](src/game/models/recipes/) and extend the [`Recipe`](src/game/models/recipe.ts) class.
- **UI Extensions:**
  Extend or modify [`ui.ts`](src/game/core/ui.ts) for new stats or overlays.
- **Game Logic:**
  The modular structure allows for easy injection of new systems or mechanics.

---

## Development

### Prerequisites

- Node.js (v16+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Setup

```sh
pnpm install
```

### Run in Development

```sh
pnpm run dev
```

### Build for Production

```sh
pnpm run build
```

### Preview Production Build

```sh
pnpm run preview
```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for features, bugfixes, or suggestions.

- Follow the existing code style and structure.
- Keep new features modular and extensible.
- Add documentation for new systems or APIs.
- By contributing, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md) and license your contributions under the GPLv3.

---

## Continuous Integration & Deployment

This project uses [GitHub Actions](https://github.com/features/actions) for CI/CD:

- **Automatic Build & Deploy:** On every push to `main`, the site is built and deployed to GitHub Pages.
- **Release Creation:** When you create a new GitHub Release, a production build (`dist/`) is zipped and attached to the release.

---

## License

This project is licensed under the GNU General Public License v3.0.
See [LICENSE](LICENSE) for details.

---

## Credits

- Hexagonal grid logic inspired by [Red Blob Games](https://www.redblobgames.com/grids/hexagons/).
- Uses [simplex-noise](https://github.com/jwagner/simplex-noise.js) for procedural generation.
- UI powered by [DaisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/).

---

## Screenshots

![Screenshot of the game Desktop](/.github/desktop.png) ![Screenshot of the game Mobile](/.github/mobile.png)

---

## Roadmap

- [ ] Add more building types and recipes
- [ ] Expand UI and add tooltips
- [ ] Add save/load UI
- [ ] Improve modding API and documentation
- [ ] Multiplayer support (stretch goal)

---

Happy modding and building!
