# Alexander Potiagalov Portfolio

Personal portfolio website for Alexander Potiagalov, a Computing Science student
and software developer working across AI, full-stack development, cybersecurity,
and data systems.

**Live site:** [alexanderpotiagalov.github.io](https://alexanderpotiagalov.github.io/)

## Features

- Responsive editorial-style interface for desktop, tablet, and mobile
- Interactive project case files with live demos and repository links
- Experience, technical skills, education, and contact sections
- Outside-of-tech photo contact sheet focused on travel, nature, and friends
- Rotating hero photo gallery with manual controls
- Command deck navigation opened with `Ctrl+K`, `Cmd+K`, or `/`
- Switchable color palettes
- Scroll-triggered reveal animations with reduced-motion support
- Formspree-powered contact form with layered spam and rate-limit protection
- SEO and Open Graph metadata

## Tech Stack

- React 18
- Vite
- JavaScript and JSX
- CSS
- React Icons
- PropTypes
- Formspree
- GitHub Pages

## Local Development

### Requirements

- Node.js
- npm

### Setup

```bash
git clone https://github.com/AlexanderPotiagalov/AlexanderPotiagalov.github.io.git
cd AlexanderPotiagalov.github.io
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally for verification.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run deploy
```

Builds the site and publishes `dist/` through `gh-pages`.

## Project Structure

```text
public/                 Static images, documents, and other assets
src/
  App.jsx               Page composition and command deck
  Header.jsx            Navigation and palette controls
  PortfolioPicture.jsx  Hero section and photo gallery
  Experience.jsx        Professional experience
  Projects.jsx          Interactive project case files
  SkillsSection.jsx     Technical skills and education
  ContactMeForm.jsx     Contact form and social links
  Footer.jsx            Site footer
  index.css             Global styles and responsive layouts
  main.jsx              React entry point
index.html              Page metadata and application mount point
vite.config.js          Vite configuration
```

## Deployment

The site is configured for deployment to the root GitHub Pages domain:

```text
https://alexanderpotiagalov.github.io/
```

Run `npm run deploy` to generate the production build and publish it.

## License

This project is available under the [MIT License](LICENSE).
