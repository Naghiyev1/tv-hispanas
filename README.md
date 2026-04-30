# TV Hispanas

A simple, free live TV player for public Spanish and Spanish-speaking TV streams.

## What it does

- Loads public TV playlists
- Plays HLS / M3U8 streams in the browser
- Uses hls.js for browsers that do not support HLS natively
- Supports:
  - Spain · TDTChannels M3U8
  - Spain · IPTV-org
  - Spanish-language · IPTV-org
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

- TDTChannels M3U8 TV playlist: https://www.tdtchannels.com/lists/tv.m3u8
- IPTV-org: https://github.com/iptv-org/iptv
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

1. Create a public GitHub repository called `tv-hispanas`.
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




## v1.2 note

The TDTChannels source now uses the raw GitHub `TELEVISION.md` file instead of fetching `www.tdtchannels.com/lists/tv.m3u8` directly. This avoids browser access/CORS issues with the TDTChannels website and keeps the source aligned with the official TDTChannels repository.
