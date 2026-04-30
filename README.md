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
  style-v1-4.css
  app-v1-4.js
  README.md
  icon.svg
  manifest.json
  service-worker.js
```

## Deploy on GitHub Pages

1. Upload all files to the root of your `tv-hispanas` repository.
2. Commit the changes.
3. Wait for GitHub Pages to redeploy.
4. Hard refresh once.

## Important v1.4 note

This version uses versioned local asset filenames:

```text
style-v1-4.css
app-v1-4.js
```

That prevents the service worker from mixing an older cached JavaScript file with a newer HTML file.
