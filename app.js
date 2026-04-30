const SOURCES = {
  tdt: {
    label: "Spain · TDTChannels",
    type: "tdt-markdown",
    url: "https://raw.githubusercontent.com/LaQuay/TDTChannels/master/TELEVISION.md"
  },
  spa: {
    label: "All Spanish-language · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/languages/spa.m3u"
  },
  es: {
    label: "Spain · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/es.m3u"
  },
  mx: {
    label: "Mexico · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/mx.m3u"
  },
  ar: {
    label: "Argentina · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/ar.m3u"
  },
  co: {
    label: "Colombia · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/co.m3u"
  },
  cl: {
    label: "Chile · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/cl.m3u"
  },
  pe: {
    label: "Peru · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/pe.m3u"
  },
  ve: {
    label: "Venezuela · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/ve.m3u"
  },
  ec: {
    label: "Ecuador · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/ec.m3u"
  },
  bo: {
    label: "Bolivia · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/bo.m3u"
  },
  py: {
    label: "Paraguay · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/py.m3u"
  },
  uy: {
    label: "Uruguay · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/uy.m3u"
  },
  cr: {
    label: "Costa Rica · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/cr.m3u"
  },
  pa: {
    label: "Panama · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/pa.m3u"
  },
  do: {
    label: "Dominican Republic · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/do.m3u"
  },
  gt: {
    label: "Guatemala · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/gt.m3u"
  },
  hn: {
    label: "Honduras · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/hn.m3u"
  },
  sv: {
    label: "El Salvador · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/sv.m3u"
  },
  ni: {
    label: "Nicaragua · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/ni.m3u"
  },
  cu: {
    label: "Cuba · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/cu.m3u"
  },
  pr: {
    label: "Puerto Rico · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/pr.m3u"
  },
  us: {
    label: "United States · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/us.m3u"
  },

  // Backward-compatible aliases in case an older cached index.html is still around.
  "iptv-es": {
    label: "Spain · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/es.m3u"
  },
  "iptv-all": {
    label: "All Spanish-language · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/languages/spa.m3u"
  }
};

const channelsGrid = document.getElementById("channelsGrid");
const statusText = document.getElementById("statusText");
const activeFilterLabel = document.getElementById("activeFilterLabel");
const searchInput = document.getElementById("searchInput");
const sourceSelect = document.getElementById("sourceSelect");
const searchButton = document.getElementById("searchButton");
const videoPlayer = document.getElementById("videoPlayer");
const currentChannel = document.getElementById("currentChannel");
const currentMeta = document.getElementById("currentMeta");
const playerLogo = document.getElementById("playerLogo");
const playerFavoriteButton = document.getElementById("playerFavoriteButton");
const stopButton = document.getElementById("stopButton");
const themeToggle = document.getElementById("themeToggle");
const channelCount = document.getElementById("channelCount");
const favoriteCount = document.getElementById("favoriteCount");
const pills = Array.from(document.querySelectorAll(".pill"));

let channels = [];
let activeFilter = "";
let currentPlayingChannel = null;
let hlsInstance = null;

let favoriteChannels = JSON.parse(localStorage.getItem("tvHispanasFavoriteChannels") || "[]");
let recentlyWatchedChannels = JSON.parse(localStorage.getItem("tvHispanasRecentlyWatched") || "[]");
let favorites = favoriteChannels.map(channel => channel.id);
let preferredTheme = localStorage.getItem("tvHispanasTheme") || "light";

function updateFavoriteCount() {
  favoriteCount.textContent = favorites.length;
}

async function loadChannels() {
  if (activeFilter === "__favorites") {
    renderFavoriteChannels();
    return;
  }

  if (activeFilter === "__recent") {
    renderRecentlyWatchedChannels();
    return;
  }

  const selectedSource = SOURCES[sourceSelect.value];

  if (!selectedSource) {
    statusText.textContent = "Unknown channel source. Refresh the page and try again.";
    channelsGrid.innerHTML = `<div class="empty-state">The selected source is not available in this app version.</div>`;
    return;
  }

  statusText.textContent = `Loading ${selectedSource.label} channels...`;
  activeFilterLabel.textContent = selectedSource.label;
  channelsGrid.innerHTML = "";
  channelCount.textContent = "0";

  try {
    const response = await fetch(selectedSource.url);

    if (!response.ok) {
      throw new Error("Channel source could not be loaded.");
    }

    const rawData = selectedSource.type === "tdt-json"
      ? await response.json()
      : await response.text();

    const parsedChannels = selectedSource.type === "tdt-json"
      ? parseTdtChannels(rawData)
      : selectedSource.type === "tdt-markdown"
        ? parseTdtMarkdown(rawData)
        : parseM3U(rawData, selectedSource.label);

    channels = applyFilters(parsedChannels)
      .filter(channel => channel.url)
      .filter(removeDuplicateStreams)
      .slice(0, 220);

    renderChannels(channels);

    channelCount.textContent = channels.length;
    statusText.textContent = channels.length
      ? `${channels.length} channels loaded`
      : "No channels found. Try another source or filter.";
  } catch (error) {
    console.error(error);
    statusText.textContent = "Could not load channels. The public playlist may be temporarily unavailable.";
    channelsGrid.innerHTML = `<div class="empty-state">Something went wrong while loading channels.</div>`;
  }
}

function applyFilters(inputChannels) {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filterTerm = activeFilter.toLowerCase();

  return inputChannels.filter(channel => {
    const haystack = [
      channel.name,
      channel.country,
      channel.group,
      channel.category,
      channel.tags
    ].join(" ").toLowerCase();

    const matchesSearch = !searchTerm || haystack.includes(searchTerm);
    const matchesFilter = !filterTerm || haystack.includes(filterTerm);

    return matchesSearch && matchesFilter;
  });
}

function parseTdtChannels(data) {
  const parsed = [];

  function walk(node, context = {}) {
    if (!node || typeof node !== "object") {
      return;
    }

    if (Array.isArray(node)) {
      node.forEach(item => walk(item, context));
      return;
    }

    const nextContext = {
      ...context,
      country: node.country || node.country_name || context.country || "Spain",
      group: node.ambit || node.ambit_name || node.group || node.group_title || node.category || context.group || ""
    };

    const name = node.name || node.title;
    const logo = node.logo || node.logo_url || node.icon || node.image;
    const web = node.web || node.website || node.homepage;
    const options = Array.isArray(node.options) ? node.options : [];

    if (name && options.length) {
      options.forEach(option => {
        const streamUrl = option.url || option.link || option.uri;

        if (!streamUrl) {
          return;
        }

        parsed.push({
          id: makeChannelId(name, streamUrl),
          name,
          country: nextContext.country || "Spain",
          group: nextContext.group || "TDTChannels",
          category: option.format || option.type || nextContext.group || "Live TV",
          tags: `${nextContext.group || ""} ${option.format || ""}`,
          logo,
          web,
          url: streamUrl,
          source: "TDTChannels"
        });
      });
    }

    Object.keys(node).forEach(key => {
      if (["options"].includes(key)) {
        return;
      }

      walk(node[key], nextContext);
    });
  }

  walk(data);
  return parsed;
}


function parseTdtMarkdown(markdown) {
  const parsed = [];
  const lines = markdown.split(/\r?\n/);

  lines.forEach(line => {
    const trimmed = line.trim();

    if (!trimmed.startsWith("|") || !trimmed.includes("m3u8")) {
      return;
    }

    const cells = splitMarkdownTableRow(trimmed);

    if (cells.length < 3) {
      return;
    }

    const name = stripMarkdown(cells[0]).trim();

    if (!name || name.toLowerCase() === "canal") {
      return;
    }

    const streamLinks = extractMarkdownLinks(cells[1])
      .filter(link => link.href.includes(".m3u8"));

    if (!streamLinks.length) {
      return;
    }

    const webLink = extractMarkdownLinks(cells[2])[0]?.href || "";
    const logoLink = extractMarkdownLinks(cells[3] || "")[0]?.href || "";
    const epgId = stripMarkdown(cells[4] || "").trim();
    const info = stripMarkdown(cells[5] || "").trim();

    streamLinks.forEach((link, index) => {
      parsed.push({
        id: makeChannelId(`${name}-${index + 1}`, link.href),
        name,
        country: "Spain",
        group: info || "TDTChannels",
        category: info || "Live TV",
        tags: `${info || ""} ${epgId || ""} TDTChannels Spain`,
        logo: logoLink,
        web: webLink,
        url: link.href,
        source: "TDTChannels"
      });
    });
  });

  return parsed;
}

function splitMarkdownTableRow(row) {
  return row
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(cell => cell.trim());
}

function extractMarkdownLinks(value) {
  const links = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(value)) !== null) {
    links.push({
      text: match[1],
      href: match[2]
    });
  }

  return links;
}

function stripMarkdown(value) {
  return String(value || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/[#*_`]/g, "")
    .trim();
}


function parseM3U(text, sourceLabel) {
  const lines = text.split(/\r?\n/);
  const parsed = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line.startsWith("#EXTINF")) {
      continue;
    }

    const url = findNextStreamUrl(lines, index + 1);

    if (!url) {
      continue;
    }

    const name = parseM3UName(line);
    const logo = parseAttribute(line, "tvg-logo");
    const country = parseAttribute(line, "tvg-country") || inferCountryFromSource(sourceLabel);
    const group = parseAttribute(line, "group-title") || "Live TV";

    parsed.push({
      id: makeChannelId(name, url),
      name,
      country,
      group,
      category: group,
      tags: `${group} ${sourceLabel}`,
      logo,
      web: "",
      url,
      source: sourceLabel
    });
  }

  return parsed;
}

function findNextStreamUrl(lines, startIndex) {
  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    return line;
  }

  return "";
}

function parseM3UName(line) {
  const commaIndex = line.lastIndexOf(",");
  const fallback = "Unnamed channel";

  if (commaIndex === -1) {
    return fallback;
  }

  return line.slice(commaIndex + 1).trim() || fallback;
}

function parseAttribute(line, attributeName) {
  const regex = new RegExp(`${attributeName}="([^"]*)"`);
  const match = line.match(regex);
  return match ? match[1] : "";
}

function inferCountryFromSource(sourceLabel) {
  return sourceLabel.replace(" · IPTV-org", "").replace("All Spanish-language", "Spanish language");
}

function removeDuplicateStreams(channel, index, array) {
  return array.findIndex(item => item.url === channel.url) === index;
}

function renderChannels(channelsToRender) {
  channelsGrid.innerHTML = "";

  if (!channelsToRender.length) {
    channelsGrid.innerHTML = `<div class="empty-state">No channels to show yet.</div>`;
    return;
  }

  channelsToRender.forEach(channel => {
    const card = document.createElement("article");
    card.className = "channel-card";

    const initials = getInitials(channel.name);
    const isFavorite = favorites.includes(channel.id);

    card.innerHTML = `
      <div class="channel-top">
        <div class="channel-logo-wrap">
          ${channel.logo ? `<img class="channel-logo" src="${escapeHTML(channel.logo)}" alt="" loading="lazy" />` : initials}
        </div>
        <div>
          <div class="channel-name">${escapeHTML(channel.name)}</div>
          <div class="channel-country">${escapeHTML(channel.country || "Unknown")}</div>
        </div>
      </div>

      <div class="channel-tags">${escapeHTML(channel.group || channel.category || "Live TV")}</div>

      <div class="channel-actions">
        <button type="button" class="play-button">Watch</button>
        <button type="button" class="favorite-button ${isFavorite ? "active" : ""}" aria-label="Toggle favourite">★</button>
      </div>
    `;

    const logo = card.querySelector(".channel-logo");

    if (logo) {
      logo.addEventListener("error", () => {
        logo.parentElement.textContent = initials;
      });
    }

    card.querySelector(".play-button").addEventListener("click", () => {
      playChannel(channel);
    });

    card.querySelector(".favorite-button").addEventListener("click", event => {
      toggleFavorite(channel.id);
      event.currentTarget.classList.toggle("active");
    });

    channelsGrid.appendChild(card);
  });
}

function playChannel(channel) {
  statusText.textContent = `Trying to play ${channel.name}...`;
  destroyHls();

  if (window.Hls && Hls.isSupported() && channel.url.includes(".m3u8")) {
    hlsInstance = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    });

    hlsInstance.loadSource(channel.url);
    hlsInstance.attachMedia(videoPlayer);

    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      startPlayback(channel);
    });

    hlsInstance.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        statusText.textContent = "This channel could not be played in the browser. Try another one.";
        destroyHls();
      }
    });

    return;
  }

  if (videoPlayer.canPlayType("application/vnd.apple.mpegurl") || channel.url) {
    videoPlayer.src = channel.url;
    startPlayback(channel);
  }
}

function startPlayback(channel) {
  videoPlayer.play()
    .then(() => {
      currentPlayingChannel = channel;
      updatePlayerChannel(channel);
      saveRecentlyWatched(channel);
      statusText.textContent = `Now playing: ${channel.name}`;

      if (activeFilter === "__recent") {
        renderRecentlyWatchedChannels();
      }
    })
    .catch(error => {
      console.error(error);
      currentPlayingChannel = channel;
      updatePlayerChannel(channel);
      statusText.textContent = "Playback was prepared. Press play in the video player if it did not start automatically.";
    });
}

function updatePlayerChannel(channel) {
  currentChannel.textContent = channel.name;
  currentMeta.textContent = `${channel.country || ""}${channel.group ? " · " + channel.group : ""}`;

  const initials = getInitials(channel.name);

  if (channel.logo) {
    playerLogo.innerHTML = `<img src="${escapeHTML(channel.logo)}" alt="" />`;
    const logoImage = playerLogo.querySelector("img");
    logoImage.addEventListener("error", () => {
      playerLogo.textContent = initials;
    });
  } else {
    playerLogo.textContent = initials;
  }

  playerFavoriteButton.disabled = false;
  stopButton.disabled = false;
  playerFavoriteButton.classList.toggle("active", favorites.includes(channel.id));
}

function stopCurrentChannel() {
  videoPlayer.pause();
  destroyHls();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  currentPlayingChannel = null;
  currentChannel.textContent = "Nothing playing";
  currentMeta.textContent = "Choose a channel to start watching";
  playerLogo.textContent = "TV";
  playerFavoriteButton.disabled = true;
  playerFavoriteButton.classList.remove("active");
  stopButton.disabled = true;
  statusText.textContent = "Playback stopped.";
}

function destroyHls() {
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }
}

function saveRecentlyWatched(channel) {
  recentlyWatchedChannels = recentlyWatchedChannels.filter(item => item.id !== channel.id);
  recentlyWatchedChannels.unshift(channel);
  recentlyWatchedChannels = recentlyWatchedChannels.slice(0, 20);
  localStorage.setItem("tvHispanasRecentlyWatched", JSON.stringify(recentlyWatchedChannels));
}

function toggleFavorite(channelId) {
  const channel = channels.find(item => item.id === channelId)
    || favoriteChannels.find(item => item.id === channelId)
    || recentlyWatchedChannels.find(item => item.id === channelId);

  if (favorites.includes(channelId)) {
    favorites = favorites.filter(id => id !== channelId);
    favoriteChannels = favoriteChannels.filter(item => item.id !== channelId);
  } else if (channel) {
    favorites.push(channelId);
    favoriteChannels.push(channel);
  }

  localStorage.setItem("tvHispanasFavoriteChannels", JSON.stringify(favoriteChannels));
  updateFavoriteCount();

  if (currentPlayingChannel && currentPlayingChannel.id === channelId) {
    playerFavoriteButton.classList.toggle("active", favorites.includes(channelId));
  }

  if (activeFilter === "__favorites") {
    renderFavoriteChannels();
  }
}

function renderFavoriteChannels() {
  const selectedSource = SOURCES[sourceSelect.value];
  statusText.textContent = favoriteChannels.length
    ? `${favoriteChannels.length} favourite channel${favoriteChannels.length === 1 ? "" : "s"} saved`
    : "No favourites yet. Save channels with the star button.";
  activeFilterLabel.textContent = `${selectedSource.label} · Favorites`;
  channelCount.textContent = favoriteChannels.length;
  renderChannels(favoriteChannels);
}

function renderRecentlyWatchedChannels() {
  const selectedSource = SOURCES[sourceSelect.value];
  statusText.textContent = recentlyWatchedChannels.length
    ? `${recentlyWatchedChannels.length} recently watched channel${recentlyWatchedChannels.length === 1 ? "" : "s"}`
    : "No recently watched channels yet. Watch a channel and it will appear here.";
  activeFilterLabel.textContent = `${selectedSource.label} · Recently Watched`;
  channelCount.textContent = recentlyWatchedChannels.length;
  renderChannels(recentlyWatchedChannels);
}

function makeChannelId(name, url) {
  return `${name}-${url}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 120);
}

function getInitials(name) {
  return String(name || "TV")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  document.body.classList.toggle("dark", safeTheme === "dark");
  themeToggle.textContent = safeTheme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", safeTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("tvHispanasTheme", safeTheme);
  preferredTheme = safeTheme;
}

function toggleTheme() {
  applyTheme(preferredTheme === "dark" ? "light" : "dark");
}

searchButton.addEventListener("click", loadChannels);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    loadChannels();
  }
});

sourceSelect.addEventListener("change", loadChannels);

pills.forEach(pill => {
  pill.addEventListener("click", () => {
    pills.forEach(item => item.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.filter || "";
    loadChannels();
  });
});

playerFavoriteButton.addEventListener("click", () => {
  if (currentPlayingChannel) {
    toggleFavorite(currentPlayingChannel.id);
  }
});

stopButton.addEventListener("click", stopCurrentChannel);
themeToggle.addEventListener("click", toggleTheme);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

applyTheme(preferredTheme);
updateFavoriteCount();
loadChannels();
