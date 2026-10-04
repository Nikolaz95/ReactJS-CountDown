# CountDown

A responsive countdown app built with React. See how many days, hours, minutes and seconds are left until New Year, the next holiday or any date you choose.

## Features

- **New Year** countdown with a progress bar for the current year
- **Holidays**: popular holidays sorted so the closest one is first
- **Custom countdowns**: pick a name, date and time; saved in localStorage
- Light / dark theme, mobile-first layout for every screen size

## Tech

React 19 · React Router 7 · Vite · React Hot Toast · React Icons

## Project structure

```
src/
├── components/   reusable UI (CountdownDisplay, CountdownCard, CountdownPanel, Header, Footer...)
├── hooks/        useNow, useCountdown, useLocalStorage, useCustomCountdowns, useTheme, useTitle
├── pages/        Home, NewYear, Holidays, CustomCountdown, About, Error
└── utils/        time helpers, constants (links, nav) and page content
```

## Run locally

```bash
npm install
npm run dev
```

Made by [Nikola Zovko](https://nikolazovkoportfolio.netlify.app/#home)
