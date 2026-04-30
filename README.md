# TV Hispanas

A simple, free live TV player for public Spanish and Spanish-speaking TV streams.

## What it does

- Loads public TV playlists
- Plays HLS / M3U8 streams in the browser
- Uses hls.js for browsers that do not support HLS natively
- Supports Spain via TDTChannels GitHub raw data
- Supports IPTV-org country playlists for:
  - Spain
  - Mexico
  - Argentina
  - Colombia
  - Chile
  - Peru
  - Venezuela
  - Ecuador
  - Bolivia
  - Paraguay
  - Uruguay
  - Costa Rica
  - Panama
  - Dominican Republic
  - Guatemala
  - Honduras
  - El Salvador
  - Nicaragua
  - Cuba
  - Puerto Rico
  - United States
- Supports the all Spanish-language IPTV-org playlist
- Includes search
- Includes category filters
- Saves favourites locally in the browser
- Saves recently watched channels locally in the browser
- Includes dark mode
- Includes PWA support
- Runs on GitHub Pages
- Requires no login, no backend and no paid services

## Sources

This app uses public/open playlist sources:

- TDTChannels GitHub raw file: https://raw.githubusercontent.com/LaQuay/TDTChannels/master/TELEVISION.md
- IPTV-org country playlists: https://iptv-org.github.io/iptv/countries/
- IPTV-org Spanish-language playlist: https://iptv-org.github.io/iptv/languages/spa.m3u
- hls.js: https://github.com/video-dev/hls.js/

## Project structure

```text
tv-hispanas/
  index.html
  style.css
  app.js
  README.md
  icon.svg
  manifest.json
  service-worker.js
```

## Deploy on GitHub Pages

1. Create or open your public GitHub repository called `tv-hispanas`.
2. Upload the files to the root of the repository.
3. Go to **Settings**.
4. Go to **Pages**.
5. Select:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.

Your app will be available at:

```text
https://yourusername.github.io/tv-hispanas/
```

## Notes

Live TV is less reliable than radio. Some channels may not play because of geo-blocking, CORS restrictions, dead URLs, stream format issues, or channels changing their official URLs.

The app is designed for public/free streams only. It does not include pay-TV, pirated sports streams, or protected content.

## v1.3 note

This version adds IPTV-org country playlists for Spanish-speaking countries while keeping the working TDTChannels GitHub raw source for Spain.
