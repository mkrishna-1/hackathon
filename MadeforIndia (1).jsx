import { useState, useEffect, useCallback, useRef } from "react";

const T = {
  surface:      "rgba(255,255,255,0.84)",
  surfaceHigh:  "rgba(255,255,255,0.96)",
  surfaceLow:   "rgba(255,255,255,0.58)",
  surfaceDim:   "rgba(255,255,255,0.38)",
  border:       "rgba(255,255,255,0.92)",
  borderSoft:   "rgba(200,200,210,0.5)",
  text:         "#111111",
  textSub:      "#3a3a3a",
  textMuted:    "#888888",
  textXmuted:   "#BBBBBB",
  ink:          "#1a1a1a",
  inkMid:       "#555555",
  inkLight:     "rgba(26,26,26,0.07)",
  inkBorder:    "rgba(26,26,26,0.15)",
  violet:       "#1a1a1a",
  violetLight:  "#555555",
  violetPale:   "rgba(26,26,26,0.06)",
  violetBorder: "rgba(26,26,26,0.13)",
  green:        "#16a34a",
  greenBg:      "rgba(22,163,74,0.09)",
  greenBorder:  "rgba(22,163,74,0.22)",
  orange:       "#d97706",
  orangeBg:     "rgba(217,119,6,0.09)",
  orangeBorder: "rgba(217,119,6,0.22)",
  rose:         "#dc2626",
  roseBg:       "rgba(220,38,38,0.08)",
  roseBorder:   "rgba(220,38,38,0.22)",
  blue:         "#2563eb",
  blueBg:       "rgba(37,99,235,0.09)",
  blueBorder:   "rgba(37,99,235,0.22)",
  shadowSm:     "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
  shadowMd:     "0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)",
  shadowLg:     "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)",
};

const Icon = {
  menu:       (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  close:      (c,s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:      (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowRight: (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowLeft:  (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  dots:       (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>,
  chevronDown:(c,s=11) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  edit:       (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:      (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  key:        (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>,
  plus:       (c,s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  play:       (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  lock:       (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  download:   (c,s=13) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  zap:        (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  shield:     (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  cpu:        (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  target:     (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  ticket:     (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>,
  link:       (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  coin:       (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 16h.01"/></svg>,
  share:      (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  clock:      (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  list:       (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  layers:     (c,s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,

  // ── Slack: accurate 4-segment hashtag logo using rounded rectangles ──
  slack: (c, s=18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {/* Slack's logo: 4 colored pill segments arranged in a 2×2 hashtag grid */}
      {/* Top-left: green pill (horizontal, left half) */}
      <rect x="2.5" y="9.5" width="6" height="3" rx="1.5" fill="#36C5F0"/>
      {/* Top-right: yellow pill (horizontal, right half) */}
      <rect x="11.5" y="2.5" width="3" height="6" rx="1.5" fill="#36C5F0"/>
      {/* Adjust — use Slack's real 4-color pill segments */}
      {/* Reset and redo with correct Slack geometry */}
    </svg>
  ),

  telegram:   (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>,
  whatsapp:   (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  gmail:      (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  discord:    (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M7.5 7.5C9 7 10.5 6.5 12 6.5s3 .5 4.5 1"/><path d="M7.5 16.5C9 17 10.5 17.5 12 17.5s3-.5 4.5-1"/><path d="M8.5 4.5C6 5.5 4 7.5 3 10l-1 5 2 1.5C5 18 7 19 9 19.5l1-2"/><path d="M15.5 4.5C18 5.5 20 7.5 21 10l1 5-2 1.5C19 18 17 19 15 19.5l-1-2"/></svg>,
  twitter:    (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  notion:     (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 7l5 10 5-10"/></svg>,
  hubspot:    (c,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="15" cy="14" r="4"/><path d="M11 14a4 4 0 0 0 4-4V7"/><circle cx="15" cy="7" r="1.5" fill={c} stroke="none"/><path d="M7 9l2 2-2 2"/></svg>,
  support:    (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  sales:      (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill={c} stroke="none"/></svg>,
  devops:     (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>,
  custom:     (c,s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  dashboard:  (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  activity:   (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  globe:      (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  agents:     (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>,
  channels:   (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  settings:   (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  template:   (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  chevronRight:(c,s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  user:       (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  bell:       (c,s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
};

// ── Accurate Slack SVG logo (4-color pill segments, real Slack geometry) ──
// Rendered as a standalone component to keep it clean
function SlackLogo({ size = 18, muted = false }) {
  // Slack uses 4 brand colors: #E01E5A (red), #36C5F0 (blue), #2EB67D (green), #ECB22E (yellow)
  // When muted, we use a single neutral color with opacity
  const r = muted ? "#888" : "#E01E5A";
  const b = muted ? "#888" : "#36C5F0";
  const g = muted ? "#888" : "#2EB67D";
  const y = muted ? "#888" : "#ECB22E";
  const op = muted ? 0.7 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 54 54" fill="none" opacity={op}>
      {/* 
        Slack logo: 4 rounded bars forming a hashtag-like grid.
        Each bar is a rounded rectangle (pill).
        Positions based on Slack's official SVG proportions.
      */}

      {/* ── Horizontal bars ── */}
      {/* Left bar: green, pointing left with a circle cap at left end */}
      {/* Top-left segment (green) – horizontal bar left half */}
      <rect x="5" y="22" width="17" height="10" rx="5" fill={g}/>
      {/* Top-right segment (yellow) – horizontal bar right half */}
      <rect x="27" y="22" width="17" height="10" rx="5" fill={y}/>

      {/* ── Vertical bars ── */}
      {/* Top-left segment (blue) – vertical bar top half */}
      <rect x="22" y="5" width="10" height="17" rx="5" fill={b}/>
      {/* Bottom-right segment (red) – vertical bar bottom half */}
      <rect x="22" y="27" width="10" height="17" rx="5" fill={r}/>

      {/* ── Corner circles (the 4 "knobs" at intersections) ── */}
      {/* Top-left knob (blue) */}
      <circle cx="27" cy="22" r="5" fill={b}/>
      {/* Top-right knob (yellow) */}
      <circle cx="32" cy="27" r="5" fill={y}/>
      {/* Bottom-left knob (green) */}
      <circle cx="22" cy="27" r="5" fill={g}/>
      {/* Bottom-right knob (red) */}
      <circle cx="27" cy="32" r="5" fill={r}/>
    </svg>
  );
}

const PAGE_META = {
  dashboard:  { label: "Dashboard",  sub: "Good morning, Team" },
  agents:     { label: "Agents",     sub: "All deployed AI agents" },
  templates:  { label: "Templates",  sub: "Pre-built agent roles" },
  channels:   { label: "Channels",   sub: "Configure integrations" },
  settings:   { label: "Settings",   sub: "Workspace preferences" },
};

const AGENT_ROLES = {
  support: { name:"Support Agent", Icon:(c,s)=>Icon.shield(c,s), color:"#1a1a1a", colorVibrant:"#333333", bgColor:"rgba(26,26,26,0.06)", borderColor:"rgba(26,26,26,0.14)", tools:["Slack","Zendesk","GitHub","Sentry"], description:"Handles customer queries, triages bugs, escalates issues", tasksBase:62, progress:78 },
  sales:   { name:"Sales Agent",   Icon:(c,s)=>Icon.target(c,s), color:"#1a1a1a", colorVibrant:"#333333", bgColor:"rgba(26,26,26,0.06)", borderColor:"rgba(26,26,26,0.14)", tools:["HubSpot","Slack","LinkedIn","Gmail"], description:"Enriches leads, drafts follow-ups, updates CRM pipeline", tasksBase:38, progress:54 },
  devops:  { name:"DevOps Agent",  Icon:(c,s)=>Icon.cpu(c,s),    color:"#1a1a1a", colorVibrant:"#333333", bgColor:"rgba(26,26,26,0.06)", borderColor:"rgba(26,26,26,0.14)", tools:["GitHub","Sentry","Linear","AWS"], description:"Monitors errors, creates issues, deploys fixes, alerts team", tasksBase:51, progress:91 },
};

const MULTI_AGENT_SCENARIO = [
  { time:0,     agent:"support", type:"incoming", message:"New ticket from Rajesh Kumar: \"Payment gateway failing on checkout — stuck for 30 mins\"", channel:"#support" },
  { time:2200,  agent:"support", type:"action",   message:"Checking Sentry for recent payment errors...", channel:"#support" },
  { time:4000,  agent:"support", type:"finding",  message:"Found: Sentry alert RAZORPAY-502 — 47 occurrences in last hour. Error: timeout on /api/v1/payments/create", channel:"#support" },
  { time:6000,  agent:"support", type:"handoff",  message:"@devops-agent HANDOFF: Critical payment failure. Sentry ref: RAZORPAY-502. Priority: P0", channel:"#engineering" },
  { time:8000,  agent:"devops",  type:"action",   message:"Acknowledged. Pulling latest deployment logs from AWS...", channel:"#engineering" },
  { time:10000, agent:"devops",  type:"finding",  message:"Root cause: commit a3f9c2 changed Razorpay SDK timeout from 30s → 5s. Insufficient for UPI payments.", channel:"#engineering" },
  { time:12000, agent:"devops",  type:"action",   message:"Created Linear issue ENG-847: \"Revert Razorpay timeout — P0\". Assigned to @backend-team.", channel:"#engineering" },
  { time:14000, agent:"devops",  type:"handoff",  message:"@support-agent: ENG-847 ticketed. ETA fix ~20 mins. Customer response draft ready.", channel:"#support" },
  { time:16000, agent:"support", type:"action",   message:"Sending response to Rajesh: \"Fix deploying in ~20 mins. Sorry for the inconvenience.\"", channel:"#support" },
  { time:18000, agent:"sales",   type:"action",   message:"Rajesh is a high-value pipeline lead. Priority tag added in HubSpot. Follow-up scheduled.", channel:"#sales" },
  { time:20000, agent:"support", type:"resolved", message:"Ticket #4821 resolved. CSAT sent. Incident fully logged.", channel:"#support" },
];

const AUDIT_LOG_DATA = [
  { time:"14:23:01", agent:"support", action:"Received customer ticket #4821", risk:"low" },
  { time:"14:23:03", agent:"support", action:"Queried Sentry API for payment errors", risk:"low" },
  { time:"14:23:05", agent:"support", action:"Correlated 47 error events → RAZORPAY-502", risk:"low" },
  { time:"14:23:07", agent:"support", action:"Initiated handoff to DevOps Agent", risk:"medium" },
  { time:"14:23:09", agent:"devops",  action:"Accessed AWS CloudWatch logs", risk:"low" },
  { time:"14:23:12", agent:"devops",  action:"Identified root cause: commit a3f9c2", risk:"low" },
  { time:"14:23:14", agent:"devops",  action:"Created Linear issue ENG-847 (P0)", risk:"medium" },
  { time:"14:23:16", agent:"devops",  action:"Sent status update to Support Agent", risk:"low" },
  { time:"14:23:18", agent:"support", action:"Sent customer response (APPROVED)", risk:"medium" },
  { time:"14:23:22", agent:"sales",   action:"Updated HubSpot deal priority", risk:"low" },
  { time:"14:23:25", agent:"support", action:"Ticket #4821 marked resolved", risk:"low" },
];

const METRICS = [
  { label:"Tickets Resolved", value:"847",   sub:"+12% this week",  color:T.green,  positive:true,  iconFn:(c)=>Icon.ticket(c,15) },
  { label:"Avg Response",     value:"1.2s",  sub:"−68% vs human",   color:T.green,  positive:true,  iconFn:(c)=>Icon.zap(c,15)    },
  { label:"Handoff Rate",     value:"96%",   sub:"+234 total today", color:T.green,  positive:true,  iconFn:(c)=>Icon.share(c,15)  },
  { label:"Cost Saved",       value:"₹4.8L", sub:"vs 3 FTEs/month", color:T.green,  positive:true,  iconFn:(c)=>Icon.coin(c,15)   },
];

const TYPE_CONFIG = {
  incoming: { label:"Incoming", bg:T.orangeBg,  border:T.orangeBorder, text:T.orange },
  action:   { label:"Action",   bg:"rgba(160,150,180,0.07)", border:"rgba(160,150,180,0.18)", text:T.textMuted },
  finding:  { label:"Finding",  bg:T.greenBg,   border:T.greenBorder,  text:T.green  },
  handoff:  { label:"Handoff",  bg:"rgba(26,26,26,0.06)", border:"rgba(26,26,26,0.13)", text:T.text },
  resolved: { label:"Resolved", bg:T.greenBg,   border:T.greenBorder,  text:T.green  },
};

const MODELS = ["Claude Sonnet 4.6","Claude Opus 4.6","GPT-4o","Gemini 1.5 Pro","Mistral Large"];
const INTERVALS = ["Every 5 minutes","Every 15 minutes","Every 30 minutes","Every hour","Every 6 hours","Daily"];
const DEFAULT_TASKS = ["Monitor for new data","Send status report","Check for alerts","Sync with integrations","Clean up old records"];

const CHANNELS = [
  {
    id:"slack", name:"Slack", color:"#4A154B", colorLight:"rgba(74,21,75,0.07)", colorBorder:"rgba(74,21,75,0.2)",
    // Use the SlackLogo component instead of a stroke icon
    IconFn:(c,s) => <SlackLogo size={s} muted={c === T.textMuted || c === "#888" || c === "#555"}/>,
    fields:[{ key:"bot_token", label:"Bot OAuth Token", placeholder:"xoxb-...", type:"password" },{ key:"channel_id", label:"Default Channel ID", placeholder:"C0XXXXXXXX", type:"text" }]
  },
  { id:"telegram", name:"Telegram",   color:"#1A7FA8", colorLight:"rgba(34,158,217,0.07)", colorBorder:"rgba(34,158,217,0.18)", IconFn:(c,s)=>Icon.telegram(c,s), fields:[{ key:"bot_token", label:"Bot Token", placeholder:"123456:ABC-DEF...", type:"password" },{ key:"chat_id", label:"Chat / Group ID", placeholder:"-100...", type:"text" }] },
  { id:"whatsapp", name:"WhatsApp",   color:"#1A7A45", colorLight:"rgba(37,211,102,0.07)", colorBorder:"rgba(37,211,102,0.18)", IconFn:(c,s)=>Icon.whatsapp(c,s), fields:[{ key:"api_key", label:"API Key", placeholder:"Your WhatsApp Business API key", type:"password" },{ key:"phone_id", label:"Phone Number ID", placeholder:"10-digit number", type:"text" }] },
  { id:"gmail",    name:"Gmail",      color:"#B03020", colorLight:"rgba(234,67,53,0.07)",  colorBorder:"rgba(234,67,53,0.18)",  IconFn:(c,s)=>Icon.gmail(c,s),    fields:[{ key:"client_id", label:"OAuth Client ID", placeholder:"*.apps.googleusercontent.com", type:"text" },{ key:"client_secret", label:"Client Secret", placeholder:"GOCSPX-...", type:"password" }] },
  { id:"discord",  name:"Discord",    color:"#3D4AC0", colorLight:"rgba(88,101,242,0.07)", colorBorder:"rgba(88,101,242,0.18)", IconFn:(c,s)=>Icon.discord(c,s),  fields:[{ key:"bot_token", label:"Bot Token", placeholder:"Your Discord bot token", type:"password" },{ key:"guild_id", label:"Server (Guild) ID", placeholder:"18-digit ID", type:"text" }] },
  { id:"twitter",  name:"X / Twitter",color:"#1A1A1A", colorLight:"rgba(0,0,0,0.04)",      colorBorder:"rgba(0,0,0,0.12)",      IconFn:(c,s)=>Icon.twitter(c,s),  fields:[{ key:"api_key", label:"API Key", placeholder:"Your X API key", type:"password" },{ key:"api_secret", label:"API Secret", placeholder:"Your X API secret", type:"password" }] },
  { id:"notion",   name:"Notion",     color:"#1A1A1A", colorLight:"rgba(0,0,0,0.04)",      colorBorder:"rgba(0,0,0,0.12)",      IconFn:(c,s)=>Icon.notion(c,s),   fields:[{ key:"api_key", label:"Integration Token", placeholder:"secret_...", type:"password" },{ key:"db_id", label:"Database ID", placeholder:"32-char database ID", type:"text" }] },
  { id:"hubspot",  name:"HubSpot",    color:"#C05020", colorLight:"rgba(255,122,89,0.07)", colorBorder:"rgba(255,122,89,0.18)", IconFn:(c,s)=>Icon.hubspot(c,s),  fields:[{ key:"api_key", label:"Private App Token", placeholder:"pat-na1-...", type:"password" }] },
];

// Inject styles
const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
  @keyframes k-up    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes k-fade  { from{opacity:0} to{opacity:1} }
  @keyframes k-scale { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes k-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes k-ring  { 0%{transform:scale(1);opacity:0.35} 100%{transform:scale(2.8);opacity:0} }
  @keyframes k-spin  { to{transform:rotate(360deg)} }
  @keyframes blob1   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-25px,20px) scale(0.95)} }
  @keyframes blob2   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(1.05)} 66%{transform:translate(30px,-20px) scale(0.97)} }
  @keyframes blob3   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,35px) scale(0.96)} 66%{transform:translate(-40px,-15px) scale(1.06)} }
  @keyframes slide-in{ from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
  @keyframes k-shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-4px)} 40%,80%{transform:translateX(4px)} }
  @keyframes page-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes title-in { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans', system-ui, sans-serif; }
  ::-webkit-scrollbar{width:3px;height:3px}
  ::-webkit-scrollbar-thumb{background:rgba(124,111,224,0.18);border-radius:99px}
  ::-webkit-scrollbar-track{background:transparent}

  .audit-row:hover{background:rgba(124,111,224,0.06)!important}
  .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1) !important; }
  .card-hover:hover{transform:translateY(-2px);box-shadow:0 16px 48px rgba(100,90,160,0.16),0 2px 8px rgba(100,90,160,0.08)!important}
  .hire-opt:hover{border-color:rgba(124,111,224,0.38)!important;background:rgba(124,111,224,0.05)!important;transform:translateY(-1px)}
  .custom-opt:hover{border-color:rgba(124,111,224,0.45)!important;background:rgba(124,111,224,0.07)!important;transform:translateY(-1px)}
  .task-item:hover{background:rgba(124,111,224,0.04)!important;border-color:rgba(124,111,224,0.14)!important}
  .step-input:focus{border-color:rgba(124,111,224,0.38)!important;box-shadow:0 0 0 3px rgba(124,111,224,0.09)!important;outline:none}
  .channel-tile:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(100,90,160,0.13)!important}
  .icon-btn:hover{background:rgba(26,26,26,0.07)!important;color:#1a1a1a!important}
  .icon-btn-danger:hover{background:rgba(224,96,128,0.09)!important;color:#E06080!important}
  .delete-confirm-shake{animation:k-shake 0.35s ease}

  .sidebar {
    width: 68px;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
    flex-shrink: 0;
  }
  .sidebar:hover { width: 220px; }

  .nav-reveal {
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.2s ease 0.06s, transform 0.2s ease 0.06s;
    white-space: nowrap;
    pointer-events: none;
  }
  .sidebar:hover .nav-reveal { opacity: 1; transform: translateX(0); }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 12px;
    cursor: default;
    transition: background 0.15s ease, color 0.15s ease;
    position: relative;
  }
  .nav-item:hover { background: rgba(26,26,26,0.05); }
  .nav-item.active { background: transparent; }

  .nav-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s ease;
  }
  .nav-item:hover .nav-icon-wrap { background: rgba(26,26,26,0.06); }
  .nav-item.active .nav-icon-wrap { background: transparent; }

  .nav-sub-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 12px 7px 46px;
    border-radius: 10px;
    cursor: default;
    transition: background 0.15s ease;
    margin: 1px 0;
  }
  .nav-sub-item:hover { background: rgba(26,26,26,0.05); }
  .nav-sub-item.active { background: transparent; }

  .nav-section-label {
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.16s ease 0.08s, transform 0.16s ease 0.08s;
    white-space: nowrap;
    pointer-events: none;
    overflow: hidden;
  }
  .sidebar:hover .nav-section-label { opacity: 1; transform: translateX(0); }

  .sidebar-logo-text {
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.2s ease 0.04s, transform 0.2s ease 0.04s;
    white-space: nowrap;
  }
  .sidebar:hover .sidebar-logo-text { opacity: 1; transform: translateX(0); }

  .live-badge { animation: k-pulse 2.6s ease-in-out infinite; }

  .page-title-animate { animation: title-in 0.22s ease both; }
`;
document.head.appendChild(styleEl);

const inputStyle = {
  width:"100%", padding:"10px 14px",
  background:"rgba(255,255,255,0.78)",
  border:"1px solid rgba(200,195,235,0.65)",
  borderRadius:12, fontFamily:"'DM Sans'",
  fontSize:13, color:T.text, outline:"none",
  transition:"all 0.15s ease"
};
const labelStyle = {
  fontFamily:"'DM Sans'", fontSize:10, fontWeight:600,
  color:T.textMuted, letterSpacing:"0.07em",
  textTransform:"uppercase", display:"block", marginBottom:7
};

// ── Primitives ──────────────────────────────────────────────────────────
function Card({ children, style={}, dimmed=false, hover=false }) {
  return (
    <div className={hover?"card-hover":""} style={{
      background: dimmed ? T.surfaceDim : T.surface,
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      border:`1px solid ${T.border}`,
      borderRadius:20,
      boxShadow: dimmed ? T.shadowSm : T.shadowMd,
      position:"relative", overflow:"hidden",
      opacity: dimmed ? 0.6 : 1,
      ...style
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.95)", pointerEvents:"none", borderRadius:"20px 20px 0 0" }}/>
      {children}
    </div>
  );
}

function PulsingDot({ color }) {
  return (
    <span style={{ position:"relative", display:"inline-flex", width:7, height:7, flexShrink:0 }}>
      <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:color, animation:"k-pulse 2.4s ease-in-out infinite" }}/>
      <span style={{ position:"absolute", inset:-3, borderRadius:"50%", border:`1px solid ${color}`, opacity:0.26, animation:"k-ring 2.4s ease-in-out infinite" }}/>
    </span>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ height:4, borderRadius:99, background:`${color}12`, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${value}%`, borderRadius:99, background:"#1a1a1a", boxShadow:"none", transition:"width 1.3s cubic-bezier(0.4,0,0.2,1)" }}/>
    </div>
  );
}

// ── Metric Card ──────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, color, iconFn, delay }) {
  const isNeg = sub && (sub.startsWith("−") || sub.startsWith("-"));
  const statColor = isNeg ? T.rose : T.green;
  return (
    <Card hover style={{ padding:"20px 22px", animation:`k-up 0.5s ease ${delay}ms both` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <div style={{ width:38, height:38, borderRadius:12, background:"rgba(26,26,26,0.06)", border:"1px solid rgba(26,26,26,0.10)", display:"flex", alignItems:"center", justifyContent:"center" }}>{iconFn&&iconFn("#1a1a1a")}</div>
        <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:statColor, background:isNeg?T.roseBg:T.greenBg, border:`1px solid ${isNeg?T.roseBorder:T.greenBorder}`, padding:"3px 9px", borderRadius:99, letterSpacing:"0.03em" }}>{isNeg?"↓":"↑"} {sub}</span>
      </div>
      <div style={{ fontFamily:"'DM Sans'", fontSize:32, fontWeight:700, color:T.text, lineHeight:1, letterSpacing:"-0.03em", marginBottom:6 }}>{value}</div>
      <div style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:500, color:T.textMuted, letterSpacing:"0.04em", textTransform:"uppercase" }}>{label}</div>
    </Card>
  );
}

// ── Built-in Agent Edit Wizard ──────────────────────────────────────────
function BuiltinAgentEditWizard({ role, data, overrides, onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name:        overrides?.name        ?? data.name,
    description: overrides?.description ?? data.description,
    model:       overrides?.model       ?? "Claude Sonnet 4.6",
    heartbeatEnabled: overrides?.heartbeatEnabled ?? true,
    interval:    overrides?.interval    ?? "Every 15 minutes",
    tasks:       overrides?.tasks       ?? [],
    newTask: "",
  });

  const toggleTask = (task) => setForm(f => ({ ...f, tasks: f.tasks.includes(task) ? f.tasks.filter(t=>t!==task) : [...f.tasks, task] }));
  const addCustomTask = () => { if (form.newTask.trim()) setForm(f => ({ ...f, tasks:[...f.tasks, f.newTask.trim()], newTask:"" })); };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { onSave(role, form); onClose(); }, 900);
  };

  const StepDot = ({ n }) => {
    const isActive=step===n, isDone=step>n;
    return (
      <div style={{ display:"flex", alignItems:"center" }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:isActive?"#1a1a1a":isDone?T.greenBg:"rgba(200,195,225,0.3)", border:`1.5px solid ${isActive?"transparent":isDone?T.greenBorder:"rgba(200,195,225,0.5)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:isActive?"#fff":isDone?T.green:T.textMuted, boxShadow:isActive?"0 2px 6px rgba(22,163,74,0.3)":"none", transition:"all 0.3s ease", flexShrink:0 }}>
          {isDone ? Icon.check(T.green,12) : n}
        </div>
        {n<3&&<div style={{ width:36, height:1, background:isDone?`${T.green}50`:"rgba(200,195,225,0.35)", margin:"0 4px" }}/>}
      </div>
    );
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(20,15,40,0.5)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, animation:"k-fade 0.22s ease", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"rgba(255,255,255,0.94)", backdropFilter:"blur(28px)", border:`1px solid ${T.border}`, borderRadius:28, padding:32, width:500, maxWidth:"94vw", maxHeight:"88vh", overflowY:"auto", animation:"k-scale 0.28s ease", boxShadow:T.shadowLg, position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.95)", borderRadius:"28px 28px 0 0" }}/>
        <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle, ${data.bgColor}, transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", marginBottom:28, position:"relative" }}>
          <StepDot n={1}/><StepDot n={2}/><StepDot n={3}/>
          <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <span style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:T.text }}>{["Agent Basics","Heartbeat","Review & Save"][step-1]}</span>
            <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted }}>Step {step} of 3 · Edit Mode</span>
          </div>
        </div>

        {step===1&&!saving&&(
          <div style={{ animation:"k-up 0.28s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:44, height:44, borderRadius:13, background:data.bgColor, border:`1px solid ${data.borderColor}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{data.Icon(data.color, 20)}</div>
              <div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:18, fontWeight:600, color:T.text, letterSpacing:"-0.02em" }}>Edit {data.name}</div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, lineHeight:1.5 }}>Customize this agent's identity and model.</div>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div><label style={labelStyle}>Display Name</label><input className="step-input" style={inputStyle} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div><label style={labelStyle}>Description</label><textarea className="step-input" style={{...inputStyle,minHeight:80,resize:"vertical"}} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/></div>
              <div><label style={labelStyle}>Model</label><div style={{ position:"relative" }}><select className="step-input" style={{...inputStyle,appearance:"none",cursor:"pointer",paddingRight:36}} value={form.model} onChange={e=>setForm(f=>({...f,model:e.target.value}))}>{MODELS.map(m=><option key={m}>{m}</option>)}</select><span style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>{Icon.chevronDown(T.textMuted,11)}</span></div></div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:28, gap:10 }}>
              <button onClick={onClose} style={{ background:"transparent", border:"1px solid rgba(200,195,225,0.55)", borderRadius:99, padding:"9px 20px", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer" }}>Cancel</button>
              <button onClick={()=>setStep(2)} style={{ background:"#1a1a1a", border:"none", borderRadius:99, padding:"9px 22px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", gap:7 }}>Continue {Icon.arrowRight("#fff",13)}</button>
            </div>
          </div>
        )}

        {step===2&&!saving&&(
          <div style={{ animation:"k-up 0.28s ease" }}>
            <div style={{ fontFamily:"'DM Sans'", fontSize:18, fontWeight:600, color:T.text, letterSpacing:"-0.02em", marginBottom:4 }}>Heartbeat Config</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginBottom:22, lineHeight:1.55 }}>Configure background task scheduling.</div>
            <div style={{ background:data.bgColor, border:`1px solid ${data.borderColor}`, borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:9, background:"rgba(255,255,255,0.6)", border:`1px solid ${data.borderColor}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.clock(data.color, 14)}</div>
                <div>
                  <div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text, marginBottom:1 }}>Background Tasks</div>
                  <div style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted }}>Run autonomously on schedule</div>
                </div>
              </div>
              <button onClick={()=>setForm(f=>({...f,heartbeatEnabled:!f.heartbeatEnabled}))} style={{ width:46, height:26, borderRadius:99, border:"none", cursor:"pointer", position:"relative", transition:"all 0.25s ease", background:form.heartbeatEnabled?T.green:"rgba(180,175,200,0.28)", boxShadow:form.heartbeatEnabled?"0 2px 6px rgba(22,163,74,0.3)":"none" }}>
                <div style={{ position:"absolute", top:3, width:20, height:20, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.14)", transition:"left 0.25s ease", left:form.heartbeatEnabled?"calc(100% - 23px)":3 }}/>
              </button>
            </div>
            {form.heartbeatEnabled&&(
              <div style={{ display:"flex", flexDirection:"column", gap:18, animation:"k-up 0.22s ease" }}>
                <div><label style={labelStyle}>Interval</label><div style={{ position:"relative" }}><select className="step-input" style={{...inputStyle,appearance:"none",cursor:"pointer",paddingRight:36}} value={form.interval} onChange={e=>setForm(f=>({...f,interval:e.target.value}))}>{INTERVALS.map(i=><option key={i}>{i}</option>)}</select><span style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>{Icon.chevronDown(T.textMuted,11)}</span></div></div>
                <div>
                  <label style={labelStyle}>Task Checklist</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:3, marginBottom:10 }}>
                    {[...DEFAULT_TASKS, ...form.tasks.filter(t=>!DEFAULT_TASKS.includes(t))].map(task => {
                      const checked = form.tasks.includes(task);
                      return (
                        <div key={task} className="task-item" onClick={()=>toggleTask(task)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:10, cursor:"pointer", background:checked?data.bgColor:"transparent", border:`1px solid ${checked?data.borderColor:"transparent"}`, transition:"all 0.15s ease" }}>
                          <div style={{ width:17, height:17, borderRadius:5, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:checked?data.color:"rgba(200,195,225,0.3)", border:`1px solid ${checked?data.color:"rgba(200,195,225,0.55)"}`, transition:"all 0.15s ease" }}>{checked&&Icon.check("#fff",10)}</div>
                          <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:checked?T.textSub:T.textMuted }}>{task}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <input className="step-input" style={{...inputStyle,flex:1}} placeholder="Add custom task…" value={form.newTask} onChange={e=>setForm(f=>({...f,newTask:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addCustomTask()}/>
                    <button onClick={addCustomTask} style={{ background:data.bgColor, border:`1px solid ${data.borderColor}`, borderRadius:12, padding:"10px 16px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:data.color, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, display:"flex", alignItems:"center", gap:6 }}>{Icon.plus(data.color,12)} Add</button>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:28, gap:10 }}>
              <button onClick={()=>setStep(1)} style={{ background:"transparent", border:"1px solid rgba(200,195,225,0.55)", borderRadius:99, padding:"9px 20px", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>{Icon.arrowLeft(T.textMuted,13)} Back</button>
              <button onClick={()=>setStep(3)} style={{ background:"#1a1a1a", border:"none", borderRadius:99, padding:"9px 22px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", gap:7 }}>Continue {Icon.arrowRight("#fff",13)}</button>
            </div>
          </div>
        )}

        {step===3&&!saving&&(
          <div style={{ animation:"k-up 0.28s ease" }}>
            <div style={{ fontFamily:"'DM Sans'", fontSize:18, fontWeight:600, color:T.text, letterSpacing:"-0.02em", marginBottom:4 }}>Review & Save</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginBottom:22 }}>Confirm your changes before applying.</div>
            <div style={{ background:data.bgColor, border:`1px solid ${data.borderColor}`, borderRadius:16, padding:"16px 18px", marginBottom:12 }}>
              <div style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>Basics</div>
              {[["Name",form.name,data.color],["Model",form.model,T.textSub],["Description",form.description.slice(0,70)+(form.description.length>70?"…":""),T.textSub]].map(([k,v,c])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 0", borderBottom:"1px solid rgba(200,195,225,0.2)" }}>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, flexShrink:0 }}>{k}</span>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:c, fontWeight:k==="Name"?600:400, maxWidth:"62%", textAlign:"right" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:16, padding:"16px 18px", marginBottom:26 }}>
              <div style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>Heartbeat</div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(200,195,225,0.2)" }}>
                <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Background Tasks</span>
                <span style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:form.heartbeatEnabled?T.green:T.textMuted }}>{form.heartbeatEnabled?"Enabled":"Disabled"}</span>
              </div>
              {form.heartbeatEnabled&&(
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(200,195,225,0.2)" }}>
                    <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Interval</span>
                    <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textSub }}>{form.interval}</span>
                  </div>
                  <div style={{ padding:"10px 0 2px" }}>
                    <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:7 }}>Tasks ({form.tasks.length})</div>
                    {form.tasks.length>0?<div style={{ display:"flex", flexDirection:"column", gap:4 }}>{form.tasks.map(t=><div key={t} style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.green, display:"flex", alignItems:"center", gap:6 }}>{Icon.check(T.green,10)}{t}</div>)}</div>:<span style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textXmuted }}>None selected</span>}
                  </div>
                </>
              )}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              <button onClick={()=>setStep(2)} style={{ background:"transparent", border:"1px solid rgba(200,195,225,0.55)", borderRadius:99, padding:"9px 20px", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>{Icon.arrowLeft(T.textMuted,13)} Back</button>
              <button onClick={handleSave} style={{ background:"#1a1a1a", border:"none", borderRadius:99, padding:"10px 26px", fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:"#fff", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", gap:8 }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}>
                {Icon.check("#fff",14)} Save Changes
              </button>
            </div>
          </div>
        )}

        {saving&&(
          <div style={{ textAlign:"center", padding:"36px 0", animation:"k-fade 0.28s ease" }}>
            <div style={{ width:48, height:48, border:`3px solid ${data.bgColor}`, borderTopColor:data.colorVibrant, borderRadius:"50%", animation:"k-spin 0.85s linear infinite", margin:"0 auto 20px" }}/>
            <div style={{ fontFamily:"'DM Sans'", fontSize:16, fontWeight:600, color:T.text, marginBottom:6 }}>Saving changes…</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Applying updates to {form.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Builtin Delete Modal ────────────────────────────────────────────────
function BuiltinDeleteModal({ role, data, onClose, onConfirm }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const isMatch = input.trim().toLowerCase() === data.name.toLowerCase();
  const handleReset = () => {
    if (!isMatch) { setShake(true); setTimeout(()=>setShake(false), 400); return; }
    onConfirm(role); onClose();
  };
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(30,10,20,0.52)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:110, animation:"k-fade 0.2s ease", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"rgba(255,255,255,0.96)", backdropFilter:"blur(28px)", border:`1px solid rgba(224,96,128,0.28)`, borderRadius:24, padding:28, width:420, maxWidth:"94vw", animation:"k-scale 0.24s ease", boxShadow:T.shadowLg, position:"relative" }}>
        <div style={{ position:"absolute", top:-50, right:-30, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle, ${T.roseBg}, transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ width:44, height:44, borderRadius:14, background:T.roseBg, border:`1px solid ${T.roseBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>{Icon.trash(T.rose, 18)}</div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:17, fontWeight:600, color:T.text, marginBottom:7, letterSpacing:"-0.01em" }}>Reset "{data.name}"?</div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, lineHeight:1.65, marginBottom:7 }}>This will reset all customizations and credentials back to defaults. The agent will remain in your roster.</div>
        <div style={{ background:T.orangeBg, border:`1px solid ${T.orangeBorder}`, borderRadius:10, padding:"9px 13px", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
          {Icon.zap(T.orange,12)}
          <span style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.orange }}>Built-in agents cannot be fully deleted — this resets to defaults.</span>
        </div>
        <label style={labelStyle}>Type <span style={{ color:T.rose, fontStyle:"italic" }}>{data.name}</span> to confirm</label>
        <input className={shake?"delete-confirm-shake":""} style={{ ...inputStyle, border:`1px solid ${isMatch?T.greenBorder:"rgba(200,195,235,0.65)"}`, marginBottom:18 }} placeholder={`Type "${data.name}" to confirm`} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleReset()}/>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{ flex:1, padding:"10px", borderRadius:12, border:"1px solid rgba(200,195,225,0.45)", background:"transparent", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer" }}>Cancel</button>
          <button onClick={handleReset} style={{ flex:1.5, padding:"10px", borderRadius:12, border:"none", background:isMatch?`linear-gradient(135deg, ${T.rose}, #c0405a)`:"rgba(224,96,128,0.14)", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:isMatch?"#fff":T.rose, cursor:"pointer", transition:"all 0.2s ease", boxShadow:isMatch?`0 3px 12px ${T.rose}40`:"none" }}>Reset to Defaults</button>
        </div>
      </div>
    </div>
  );
}

// ── Agent Card ──────────────────────────────────────────────────────────
function AgentCard({ role, data, isActive, overrides, onToggle, onEdit, onDelete, onCredentials }) {
  const [taskCount, setTaskCount] = useState(data.tasksBase);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const iv = setInterval(() => setTaskCount(c=>c+1), 9000+Math.random()*4000);
    return ()=>clearInterval(iv);
  }, [isActive]);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayName = overrides?.name || data.name;
  const displayDesc = overrides?.description || data.description;
  const connectedCount = overrides?.credentials ? Object.keys(overrides.credentials).filter(k => overrides.credentials[k]?.connected).length : 0;

  return (
    <Card dimmed={!isActive} hover style={{ padding:"20px", transition:"all 0.35s ease" }}>
      {isActive && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, borderRadius:"20px 20px 0 0", background:`linear-gradient(90deg, transparent, ${T.green}60, transparent)` }}/>}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
          <div style={{ width:42, height:42, borderRadius:13, background:isActive?T.greenBg:"rgba(200,195,215,0.18)", border:`1px solid ${isActive?T.greenBorder:"rgba(200,195,215,0.35)"}`, display:"flex", alignItems:"center", justifyContent:"center", filter:isActive?"none":"grayscale(0.7) opacity(0.5)", boxShadow:isActive?"0 4px 12px rgba(22,163,74,0.15)":"none", transition:"all 0.35s ease" }}>
            {data.Icon(isActive?data.color:T.textMuted, 20)}
          </div>
          <div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:isActive?T.text:T.textMuted, transition:"color 0.3s" }}>{displayName}</div>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
              {isActive
                ? <><PulsingDot color={T.green}/><span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.green, marginLeft:4, fontWeight:500 }}>Active</span></>
                : <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted }}>Paused</span>}
            </div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <button onClick={onToggle} style={{ width:42, height:23, borderRadius:99, border:"none", cursor:"pointer", flexShrink:0, background:isActive?T.green:"rgba(180,175,195,0.28)", boxShadow:isActive?"0 2px 6px rgba(22,163,74,0.3)":"none", position:"relative", transition:"all 0.32s ease" }}>
            <div style={{ position:"absolute", top:3, left:isActive?"calc(100% - 20px)":3, width:17, height:17, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.14)", transition:"left 0.32s ease" }}/>
          </button>
          <div ref={menuRef} style={{ position:"relative" }}>
            <button onClick={()=>setMenuOpen(o=>!o)} style={{ width:28, height:28, borderRadius:8, border:`1px solid rgba(200,195,225,0.45)`, background:"rgba(255,255,255,0.65)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {Icon.dots(T.textMuted, 14)}
            </button>
            {menuOpen && (
              <div style={{ position:"absolute", right:0, top:34, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(24px)", border:`1px solid rgba(200,195,225,0.55)`, borderRadius:14, padding:"5px", boxShadow:T.shadowLg, zIndex:50, minWidth:178, animation:"k-scale 0.16s ease" }}>
                <button onClick={()=>{setMenuOpen(false);onCredentials();}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textSub }} className="icon-btn">
                  {Icon.key("#555",13)}<span>Add Credentials</span>
                </button>
                <button onClick={()=>{setMenuOpen(false);onEdit();}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textSub }} className="icon-btn">
                  {Icon.edit("#555",13)}<span>Edit Agent</span>
                </button>
                <div style={{ height:1, background:"rgba(200,195,225,0.3)", margin:"4px 6px" }}/>
                <button onClick={()=>{setMenuOpen(false);onDelete();}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }} className="icon-btn-danger">
                  {Icon.trash(T.rose,13)}<span style={{ color:T.rose }}>Reset to Defaults</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p style={{ fontFamily:"'DM Sans'", fontSize:13, color:isActive?T.textSub:T.textMuted, lineHeight:1.6, marginBottom:13 }}>{displayDesc}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:connectedCount>0?10:14 }}>
        {data.tools.map(t=><span key={t} style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:"rgba(26,26,26,0.06)", border:"1px solid rgba(26,26,26,0.12)", borderRadius:7, padding:"3px 9px", color:isActive?T.textSub:T.textMuted }}>{t}</span>)}
        {overrides?.model && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:data.bgColor, border:`1px solid ${data.borderColor}`, borderRadius:7, padding:"3px 9px", color:data.color }}>{overrides.model}</span>}
        {overrides?.heartbeatEnabled && overrides?.interval && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:7, padding:"3px 9px", color:T.green }}>{overrides.interval}</span>}
        {connectedCount>0 && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:"rgba(88,101,242,0.07)", border:"1px solid rgba(88,101,242,0.2)", borderRadius:7, padding:"3px 9px", color:"#5865F2" }}>{connectedCount} channel{connectedCount>1?"s":""}</span>}
      </div>

      {connectedCount > 0 && (
        <div style={{ display:"flex", gap:5, marginBottom:12, flexWrap:"wrap" }}>
          {CHANNELS.filter(ch => overrides?.credentials?.[ch.id]?.connected).map(ch => (
            <div key={ch.id} title={ch.name} style={{ width:26, height:26, borderRadius:7, background:ch.colorLight, border:`1px solid ${ch.colorBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {ch.IconFn(ch.color, 14)}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted, fontWeight:500 }}>Daily progress</span>
          <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:isActive?data.color:T.textMuted, fontWeight:600 }}>{isActive?data.progress:0}%</span>
        </div>
        <ProgressBar value={isActive?data.progress:0} color={data.colorVibrant}/>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid rgba(200,195,225,0.22)", paddingTop:13 }}>
        <div>
          <div style={{ fontFamily:"'DM Sans'", fontSize:22, fontWeight:700, color:isActive?data.color:T.textMuted, lineHeight:1, letterSpacing:"-0.03em" }}>{taskCount}</div>
          <div style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textMuted, marginTop:3, fontWeight:500 }}>tasks today</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'DM Sans'", fontSize:22, fontWeight:700, color:isActive?T.text:T.textMuted, lineHeight:1, letterSpacing:"-0.03em" }}>99.2%</div>
          <div style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textMuted, marginTop:3, fontWeight:500 }}>success rate</div>
        </div>
      </div>
    </Card>
  );
}

// ── Custom Agent Card ───────────────────────────────────────────────────
function CustomAgentCard({ agent, onEdit, onDelete, onCredentials }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const connectedCount = agent.credentials ? Object.keys(agent.credentials).filter(k => agent.credentials[k]?.connected).length : 0;

  return (
    <Card hover style={{ padding:"20px" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, borderRadius:"20px 20px 0 0", background:"rgba(26,26,26,0.08)" }}/>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
          <div style={{ width:42, height:42, borderRadius:13, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.custom("#555", 20)}</div>
          <div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:T.text }}>{agent.name}</div>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
              <PulsingDot color={T.green}/>
              <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.ink, marginLeft:4, fontWeight:500 }}>Active</span>
            </div>
          </div>
        </div>
        <div ref={menuRef} style={{ position:"relative" }}>
          <button onClick={() => setMenuOpen(o=>!o)} style={{ width:28, height:28, borderRadius:8, border:`1px solid rgba(200,195,225,0.45)`, background:"rgba(255,255,255,0.65)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.dots(T.textMuted, 14)}</button>
          {menuOpen && (
            <div style={{ position:"absolute", right:0, top:34, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(24px)", border:`1px solid rgba(200,195,225,0.55)`, borderRadius:14, padding:"5px", boxShadow:T.shadowLg, zIndex:50, minWidth:170, animation:"k-scale 0.16s ease" }}>
              <button onClick={()=>{setMenuOpen(false);onCredentials(agent);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textSub }} className="icon-btn">
                {Icon.key("#555",13)}<span>Add Credentials</span>
              </button>
              <button onClick={()=>{setMenuOpen(false);onEdit(agent);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textSub }} className="icon-btn">
                {Icon.edit("#555",13)}<span>Edit Agent</span>
              </button>
              <div style={{ height:1, background:"rgba(200,195,225,0.3)", margin:"4px 6px" }}/>
              <button onClick={()=>{setMenuOpen(false);onDelete(agent);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13 }} className="icon-btn-danger">
                {Icon.trash(T.rose,13)}<span style={{ color:T.rose }}>Delete Agent</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <p style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textSub, lineHeight:1.6, marginBottom:13 }}>{agent.persona.slice(0,90)}{agent.persona.length>90?"…":""}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:14 }}>
        <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:7, padding:"3px 9px", color:T.textSub }}>{agent.model}</span>
        {agent.heartbeatEnabled && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:7, padding:"3px 9px", color:T.green }}>{agent.interval}</span>}
        {agent.tasks?.length>0 && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:T.orangeBg, border:`1px solid ${T.orangeBorder}`, borderRadius:7, padding:"3px 9px", color:T.orange }}>{agent.tasks.length} tasks</span>}
        {connectedCount>0 && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, background:"rgba(88,101,242,0.07)", border:"1px solid rgba(88,101,242,0.2)", borderRadius:7, padding:"3px 9px", color:"#5865F2" }}>{connectedCount} channel{connectedCount>1?"s":""}</span>}
      </div>
      {connectedCount > 0 && (
        <div style={{ display:"flex", gap:5, marginBottom:14, flexWrap:"wrap" }}>
          {CHANNELS.filter(ch => agent.credentials?.[ch.id]?.connected).map(ch => (
            <div key={ch.id} title={ch.name} style={{ width:28, height:28, borderRadius:8, background:ch.colorLight, border:`1px solid ${ch.colorBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {ch.IconFn(ch.color, 15)}
            </div>
          ))}
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid rgba(200,195,225,0.22)", paddingTop:13 }}>
        <div><div style={{ fontFamily:"'DM Sans'", fontSize:22, fontWeight:700, color:T.ink, lineHeight:1, letterSpacing:"-0.03em" }}>0</div><div style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textMuted, marginTop:3, fontWeight:500 }}>tasks today</div></div>
        <div style={{ textAlign:"right" }}><div style={{ fontFamily:"'DM Sans'", fontSize:22, fontWeight:700, color:T.text, lineHeight:1, letterSpacing:"-0.03em" }}>—</div><div style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textMuted, marginTop:3, fontWeight:500 }}>success rate</div></div>
      </div>
    </Card>
  );
}

// ── Credentials Modal ───────────────────────────────────────────────────
function CredentialsModal({ agent, onClose, onSave }) {
  const [activeChannel, setActiveChannel] = useState(null);
  const [creds, setCreds] = useState(agent.credentials || {});
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(null);

  const handleSaveChannel = (channelId) => {
    setSaving(true);
    setTimeout(() => {
      const updated = { ...creds, [channelId]: { ...(creds[channelId]||{}), connected: true } };
      setCreds(updated);
      onSave(agent.id, updated);
      setSaving(false);
      setSavedFlash(channelId);
      setTimeout(() => { setSavedFlash(null); setActiveChannel(null); }, 1200);
    }, 900);
  };

  const handleDisconnect = (channelId) => {
    const updated = { ...creds, [channelId]: { connected: false } };
    setCreds(updated);
    onSave(agent.id, updated);
  };

  const ch = CHANNELS.find(c => c.id === activeChannel);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(20,15,40,0.5)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, animation:"k-fade 0.22s ease", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"rgba(255,255,255,0.94)", backdropFilter:"blur(28px)", border:`1px solid ${T.border}`, borderRadius:28, padding:32, width:560, maxWidth:"95vw", maxHeight:"88vh", overflowY:"auto", animation:"k-scale 0.28s ease", boxShadow:T.shadowLg, position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.95)", borderRadius:"28px 28px 0 0" }}/>
        <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle, ${"rgba(26,26,26,0.06)"}, transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6, position:"relative" }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.link("#555", 18)}</div>
          <div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:18, fontWeight:600, color:T.text, letterSpacing:"-0.02em" }}>Channel Credentials</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted }}>Connect <span style={{ fontWeight:600, color:T.ink }}>{agent.name}</span> to your channels</div>
          </div>
        </div>

        {!activeChannel ? (
          <div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginTop:22, marginBottom:14 }}>Available Channels</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:9 }}>
              {CHANNELS.map(channel => {
                const isConnected = creds[channel.id]?.connected;
                return (
                  <button key={channel.id} className="channel-tile" onClick={() => setActiveChannel(channel.id)} style={{ background: isConnected ? channel.colorLight : "rgba(124,111,224,0.03)", border:`1.5px solid ${isConnected ? channel.colorBorder : "rgba(200,195,225,0.38)"}`, borderRadius:14, padding:"13px 15px", cursor:"pointer", display:"flex", alignItems:"center", gap:11, textAlign:"left", transition:"all 0.2s ease", boxShadow: isConnected ? T.shadowSm : "none" }}>
                    <div style={{ width:38, height:38, borderRadius:10, background:channel.colorLight, border:`1px solid ${channel.colorBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {channel.IconFn(channel.color, 19)}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text }}>{channel.name}</div>
                      <div style={{ fontFamily:"'DM Sans'", fontSize:11, color: isConnected ? channel.color : T.textMuted, marginTop:1, fontWeight: isConnected ? 600 : 400 }}>{isConnected ? "Connected" : `${channel.fields.length} field${channel.fields.length>1?"s":""}`}</div>
                    </div>
                    <span style={{ color: isConnected ? channel.color : T.textMuted, display:"flex" }}>{Icon.arrowRight(isConnected ? channel.color : T.textMuted, 12)}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={onClose} style={{ width:"100%", marginTop:18, padding:"11px", borderRadius:14, border:"1px solid rgba(200,195,225,0.45)", background:"transparent", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer" }}>Done</button>
          </div>
        ) : (
          <div style={{ animation:"k-up 0.22s ease" }}>
            <button onClick={() => setActiveChannel(null)} style={{ display:"flex", alignItems:"center", gap:6, background:"transparent", border:"none", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginTop:20, marginBottom:16, padding:0 }}>
              {Icon.arrowLeft(T.textMuted,13)} Back
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:ch.colorLight, border:`1.5px solid ${ch.colorBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{ch.IconFn(ch.color, 22)}</div>
              <div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:16, fontWeight:600, color:T.text }}>{ch.name}</div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted }}>Enter your API credentials below</div>
              </div>
            </div>
            {ch.fields.map(field => (
              <div key={field.key} style={{ marginBottom:14 }}>
                <label style={labelStyle}>{field.label}</label>
                <input className="step-input" type={field.type} style={inputStyle} placeholder={field.placeholder} value={creds[ch.id]?.[field.key]||""} onChange={e => setCreds(prev => ({ ...prev, [ch.id]: { ...prev[ch.id], [field.key]: e.target.value } }))}/>
              </div>
            ))}
            <div style={{ background:"rgba(124,111,224,0.05)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:12, padding:"11px 14px", marginBottom:20, display:"flex", alignItems:"flex-start", gap:9 }}>
              <span style={{ marginTop:1, flexShrink:0 }}>{Icon.lock("#555", 13)}</span>
              <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, lineHeight:1.6 }}>Credentials are encrypted and stored securely. Your agent will use these to send/receive messages on your behalf.</div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {creds[ch.id]?.connected && (
                <button onClick={() => { handleDisconnect(ch.id); setActiveChannel(null); }} style={{ flex:1, padding:"10px", borderRadius:12, border:`1px solid ${T.roseBorder}`, background:T.roseBg, fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.rose, cursor:"pointer" }}>Disconnect</button>
              )}
              <button onClick={() => handleSaveChannel(ch.id)} disabled={saving} style={{ flex:2, padding:"11px", borderRadius:12, border:"none", background: saving ? "rgba(180,175,200,0.22)" : savedFlash===ch.id ? T.greenBg : "#1a1a1a", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color: saving ? T.textMuted : savedFlash===ch.id ? T.green : "#fff", cursor: saving ? "default" : "pointer", transition:"all 0.25s ease", boxShadow: saving||savedFlash===ch.id ? "none" : "0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
                {saving ? <><div style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"k-spin 0.7s linear infinite" }}/> Saving…</> : savedFlash===ch.id ? <>{Icon.check(T.green, 14)} Connected!</> : `Connect ${ch.name}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Delete Modal ────────────────────────────────────────────────────────
function DeleteModal({ agent, onClose, onConfirm }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const isMatch = input.trim().toLowerCase() === agent.name.toLowerCase();
  const handleDelete = () => {
    if (!isMatch) { setShake(true); setTimeout(() => setShake(false), 400); return; }
    onConfirm(agent.id); onClose();
  };
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(30,10,20,0.52)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:110, animation:"k-fade 0.2s ease", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"rgba(255,255,255,0.96)", backdropFilter:"blur(28px)", border:`1px solid rgba(224,96,128,0.28)`, borderRadius:24, padding:28, width:420, maxWidth:"94vw", animation:"k-scale 0.24s ease", boxShadow:T.shadowLg, position:"relative" }}>
        <div style={{ position:"absolute", top:-50, right:-30, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle, ${T.roseBg}, transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ width:44, height:44, borderRadius:14, background:T.roseBg, border:`1px solid ${T.roseBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>{Icon.trash(T.rose, 18)}</div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:17, fontWeight:600, color:T.text, marginBottom:7, letterSpacing:"-0.01em" }}>Delete "{agent.name}"?</div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, lineHeight:1.65, marginBottom:20 }}>This will permanently remove the agent and all its credentials. This action cannot be undone.</div>
        <label style={labelStyle}>Type <span style={{ color:T.rose, fontStyle:"italic" }}>{agent.name}</span> to confirm</label>
        <input className={shake ? "delete-confirm-shake" : ""} style={{ ...inputStyle, border:`1px solid ${isMatch ? T.greenBorder : "rgba(200,195,235,0.65)"}`, marginBottom:18 }} placeholder={`Type "${agent.name}" to confirm`} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleDelete()}/>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{ flex:1, padding:"10px", borderRadius:12, border:"1px solid rgba(200,195,225,0.45)", background:"transparent", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer" }}>Cancel</button>
          <button onClick={handleDelete} style={{ flex:1.5, padding:"10px", borderRadius:12, border:"none", background: isMatch ? `linear-gradient(135deg, ${T.rose}, #c0405a)` : "rgba(224,96,128,0.14)", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color: isMatch ? "#fff" : T.rose, cursor:"pointer", transition:"all 0.2s ease", boxShadow: isMatch ? `0 3px 12px ${T.rose}40` : "none" }}>Delete Agent</button>
        </div>
      </div>
    </div>
  );
}

// ── Feed Skeletons ──────────────────────────────────────────────────────
function SkeletonMessage({ width="80%", delay=0 }) {
  return (
    <div style={{ display:"flex", gap:9, opacity:0.3, animation:`k-up 0.5s ease ${delay}ms both` }}>
      <div style={{ width:28, height:28, borderRadius:9, background:"rgba(124,111,224,0.1)", flexShrink:0, marginTop:1 }}/>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", gap:6, marginBottom:7 }}><div style={{ width:80, height:8, borderRadius:5, background:"rgba(124,111,224,0.09)" }}/><div style={{ width:44, height:8, borderRadius:5, background:"rgba(124,111,224,0.06)" }}/></div>
        <div style={{ width:"100%", height:7, borderRadius:5, background:"rgba(124,111,224,0.06)", marginBottom:4 }}/>
        <div style={{ width, height:7, borderRadius:5, background:"rgba(124,111,224,0.04)" }}/>
      </div>
    </div>
  );
}

function MessageBubble({ msg, index }) {
  const agent = AGENT_ROLES[msg.agent];
  const tc = TYPE_CONFIG[msg.type]||TYPE_CONFIG.action;

  const renderMessage = (text) => {
    const parts = text.split(/(@[\w-]+)/g);
    return parts.map((part, i) =>
      part.startsWith("@")
        ? <span key={i} style={{ display:"inline-flex", alignItems:"center", background:T.blueBg, border:`1px solid ${T.blueBorder}`, color:T.blue, borderRadius:6, padding:"1px 6px", fontSize:11, fontWeight:600, fontFamily:"'DM Mono'", lineHeight:1.4 }}>{part}</span>
        : part
    );
  };

  return (
    <div style={{ display:"flex", gap:9, animation:`slide-in 0.32s ease ${Math.min(index*30,140)}ms both` }}>
      <div style={{ width:28, height:28, borderRadius:9, flexShrink:0, marginTop:1, background:"rgba(26,26,26,0.07)", border:"1px solid rgba(26,26,26,0.12)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:T.shadowSm }}>{agent.Icon("#1a1a1a", 14)}</div>
      <div style={{ flex:1, background:tc.bg, border:`1px solid ${tc.border}`, borderRadius:"4px 14px 14px 14px", padding:"9px 13px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5, flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:T.text }}>{agent.name}</span>
          <span style={{ fontFamily:"'DM Sans'", fontSize:9, fontWeight:600, color:tc.text, background:"rgba(255,255,255,0.65)", padding:"2px 7px", borderRadius:99, border:`1px solid ${tc.border}` }}>{tc.label}</span>
          <span style={{ marginLeft:"auto", fontFamily:"'DM Mono'", fontSize:9, color:T.textXmuted }}>{msg.channel}</span>
        </div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textSub, lineHeight:1.6 }}>{renderMessage(msg.message)}</div>
      </div>
    </div>
  );
}

// ── Chat Message type for user messages in the chat tab ──────────────────
const CHAT_AGENT_OPTIONS = [
  { id:"support", label:"Support Agent" },
  { id:"sales",   label:"Sales Agent" },
  { id:"devops",  label:"DevOps Agent" },
  { id:"all",     label:"All Agents" },
];

const AGENT_SYSTEM_PROMPTS = {
  support: `You are a Support Agent for Lares.AI, an AI workforce platform used by Indian SMBs. Your role is to handle customer support queries, triage bugs, check system logs, escalate issues to DevOps, and update tickets in Zendesk. You have access to Sentry for error tracking, GitHub for code context, and Slack for team communication.

Respond in a professional but helpful tone. Be concise — 2-4 sentences max unless a detailed breakdown is genuinely needed. Use bullet points only when listing multiple distinct items. Reference real tools (Zendesk, Sentry, GitHub, Slack) naturally when relevant.

If asked something outside your scope (e.g. financial projections, coding tasks, personal questions), say so clearly and suggest who can help instead. Do not make up ticket IDs, error codes, or data — acknowledge you'd need to check the actual system.`,

  sales: `You are a Sales Agent for Lares.AI, an AI workforce platform. Your role is to enrich leads, draft outreach sequences, update the HubSpot CRM, qualify prospects, and support the sales pipeline. You work with HubSpot, LinkedIn, Gmail, and Slack.

Respond in a sharp, business-oriented tone. Be concise — 2-4 sentences unless a detailed breakdown is needed. Reference tools (HubSpot, LinkedIn, Gmail) naturally when relevant. Help with drafting emails, qualifying leads, pipeline strategy, follow-up timing, and CRM hygiene.

If asked something outside your scope (e.g. technical bugs, financial audits, personal tasks), say so clearly and suggest who can help. Do not fabricate deal values, contact names, or CRM data — acknowledge you'd need to pull from the actual system.`,

  devops: `You are a DevOps Agent for Lares.AI, an AI workforce platform. Your role is to monitor infrastructure, triage errors via Sentry, manage deployments, create Linear issues, and alert the engineering team via Slack. You work with GitHub, Sentry, Linear, and AWS.

Respond in a technical but clear tone. Be concise — 2-4 sentences unless a root-cause analysis or step-by-step is genuinely needed. Reference tools (Sentry, GitHub, Linear, AWS CloudWatch) naturally. Help with debugging, deployment status, incident response, pipeline health, and issue tracking.

If asked something outside your scope (e.g. sales strategy, HR tasks, non-technical questions), say so clearly and suggest who can help. Do not fabricate error codes, deployment hashes, or metrics — acknowledge you'd need to check the actual system.`,

  all: `You are the Lares.AI multi-agent coordinator. You represent the combined capabilities of three specialist agents: a Support Agent (customer tickets, Zendesk, Sentry), a Sales Agent (leads, HubSpot, outreach), and a DevOps Agent (infrastructure, GitHub, Linear, AWS). 

When the user sends a message, route it to the most relevant agent's domain and respond accordingly, or acknowledge that multiple agents would be involved. Be concise and clear about which agent/domain you're speaking from. If a question is ambiguous, answer from the most likely relevant perspective and mention which agent would normally handle it.`,
};

function CollaborationFeed({ messages, demoRunning, onRun }) {
  const feedRef  = useRef(null);
  const chatRef  = useRef(null);
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("feed");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [targetAgent, setTargetAgent] = useState("support");
  const [agentTyping, setAgentTyping] = useState(false);

  useEffect(() => { if (feedRef.current)  feedRef.current.scrollTop  = feedRef.current.scrollHeight;  }, [messages]);
  useEffect(() => { if (chatRef.current)  chatRef.current.scrollTop  = chatRef.current.scrollHeight;  }, [chatMessages, agentTyping]);

  const sendChat = async () => {
    const text = chatInput.trim();
    if (!text || agentTyping) return;
    const ts = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    const userMsg = { role:"user", text, ts, target: targetAgent };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setAgentTyping(true);

    // Build conversation history for Claude API (only user/agent pairs, no system)
    const apiMessages = updatedMessages.map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: AGENT_SYSTEM_PROMPTS[targetAgent] || AGENT_SYSTEM_PROMPTS.support,
          messages: apiMessages,
        }),
      });
      const data = await response.json();
      const replyText = data?.content?.[0]?.text || "I'm having trouble connecting right now. Please try again.";
      setAgentTyping(false);
      setChatMessages(prev => [...prev, {
        role: "agent",
        agent: targetAgent === "all" ? "support" : targetAgent,
        text: replyText,
        ts: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }),
      }]);
    } catch (err) {
      setAgentTyping(false);
      setChatMessages(prev => [...prev, {
        role: "agent",
        agent: targetAgent === "all" ? "support" : targetAgent,
        text: "I couldn't reach the AI backend right now. Please check your connection and try again.",
        ts: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }),
      }]);
    }
  };

  const TAB_UNDERLINE_STYLE = (id) => ({
    background:"transparent", border:"none", cursor:"pointer",
    padding:"7px 14px 10px",
    fontFamily:"'DM Sans'", fontSize:12.5,
    fontWeight: activeTab===id ? 600 : 400,
    color: activeTab===id ? T.text : T.textMuted,
    borderBottom: activeTab===id ? "2px solid #1a1a1a" : "2px solid transparent",
    transition:"all 0.18s ease",
    display:"flex", alignItems:"center", gap:5,
  });

  return (
    <Card style={{ display:"flex", flexDirection:"column", height:520 }}>
      {/* ── Header ── */}
      <div style={{ padding:"12px 18px 0", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:30, height:30, borderRadius:9, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.share("#555", 14)}</div>
          <span style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text }}>Agent Collaboration</span>
          {demoRunning && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, background:T.roseBg, color:T.rose, padding:"3px 9px", borderRadius:99, border:`1px solid ${T.roseBorder}`, animation:"k-pulse 1.8s ease-in-out infinite" }}>Live</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {activeTab === "feed" && (
            <>
              <span style={{ fontFamily:"'DM Mono'", fontSize:9, color:T.textXmuted }}>synced just now</span>
              <button onClick={()=>window.open("https://slack.com/intl/en-in/get-started#/createnew","_blank","noopener,noreferrer")} style={{ background:"#fff", border:"1px solid rgba(74,21,75,0.22)", borderRadius:99, padding:"7px 14px", fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:"#4A154B", cursor:"pointer", transition:"all 0.18s ease", boxShadow:"0 1px 4px rgba(74,21,75,0.10)", display:"flex", alignItems:"center", gap:6 }}
                onMouseEnter={e=>{ e.currentTarget.style.background="#f5eaf5"; e.currentTarget.style.borderColor="rgba(74,21,75,0.4)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="rgba(74,21,75,0.22)"; }}>
                <svg width="12" height="12" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.712 33.001a4.499 4.499 0 0 1-4.5 4.5 4.499 4.499 0 0 1-4.5-4.5 4.499 4.499 0 0 1 4.5-4.5h4.5v4.5z" fill="#E01E5A"/>
                  <path d="M21.962 33.001a4.499 4.499 0 0 1 4.5-4.5 4.499 4.499 0 0 1 4.5 4.5v11.25a4.499 4.499 0 0 1-4.5 4.5 4.499 4.499 0 0 1-4.5-4.5V33.001z" fill="#E01E5A"/>
                  <path d="M26.462 19.712a4.499 4.499 0 0 1-4.5-4.5 4.499 4.499 0 0 1 4.5-4.5 4.499 4.499 0 0 1 4.5 4.5v4.5h-4.5z" fill="#36C5F0"/>
                  <path d="M26.462 21.962a4.499 4.499 0 0 1 4.5 4.5 4.499 4.499 0 0 1-4.5 4.5H15.212a4.499 4.499 0 0 1-4.5-4.5 4.499 4.499 0 0 1 4.5-4.5h11.25z" fill="#36C5F0"/>
                  <path d="M39.751 26.462a4.499 4.499 0 0 1 4.5 4.5 4.499 4.499 0 0 1-4.5 4.5 4.499 4.499 0 0 1-4.5-4.5v-4.5h4.5z" fill="#2EB67D"/>
                  <path d="M37.501 26.462a4.499 4.499 0 0 1-4.5-4.5 4.499 4.499 0 0 1 4.5-4.5h11.25a4.499 4.499 0 0 1 4.5 4.5 4.499 4.499 0 0 1-4.5 4.5H37.501z" fill="#2EB67D"/>
                  <path d="M33.001 39.751a4.499 4.499 0 0 1 4.5 4.5 4.499 4.499 0 0 1-4.5 4.5 4.499 4.499 0 0 1-4.5-4.5v-4.5h4.5z" fill="#ECB22E"/>
                  <path d="M33.001 37.501a4.499 4.499 0 0 1-4.5-4.5 4.499 4.499 0 0 1 4.5-4.5h11.25a4.499 4.499 0 0 1 4.5 4.5 4.499 4.499 0 0 1-4.5 4.5H33.001z" fill="#ECB22E"/>
                </svg>
                Test in Slack
              </button>
              <button onClick={onRun} disabled={demoRunning} style={{ background:demoRunning?"rgba(180,175,200,0.18)":"#1a1a1a", border:`1px solid ${demoRunning?"rgba(180,175,200,0.28)":"transparent"}`, borderRadius:99, padding:"7px 16px", fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:demoRunning?T.textMuted:"#fff", cursor:demoRunning?"default":"pointer", transition:"all 0.22s ease", boxShadow:demoRunning?"none":"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", gap:6 }}>
                {!demoRunning && <span style={{ display:"flex", marginTop:1 }}>{Icon.play("#fff", 9)}</span>}
                {demoRunning?"Running…":"Run Demo"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display:"flex", borderBottom:"1px solid rgba(200,195,225,0.22)", paddingLeft:6, flexShrink:0, marginTop:2 }}>
        <button style={TAB_UNDERLINE_STYLE("feed")} onClick={()=>setActiveTab("feed")}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Activity
        </button>
        <button style={TAB_UNDERLINE_STYLE("chat")} onClick={()=>setActiveTab("chat")}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Chat
          {chatMessages.length > 0 && <span style={{ background:"#1a1a1a", color:"#fff", fontSize:9, fontWeight:700, borderRadius:99, padding:"1px 6px", minWidth:16, textAlign:"center" }}>{chatMessages.filter(m=>m.role==="agent").length}</span>}
        </button>
      </div>

      {/* ── Feed Tab ── */}
      {activeTab === "feed" && (
        <div ref={feedRef} style={{ flex:1, overflowY:"auto", padding:"12px 14px", display:"flex", flexDirection:"column", gap:7 }}>
          {messages.length===0?(
            <div style={{ display:"flex", flexDirection:"column", gap:8, paddingTop:2 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:6 }}>
                <div style={{ width:32, height:32, borderRadius:10, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.activity("#555", 15)}</div>
                <div><div style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:T.textMuted, marginBottom:2 }}>Agents standing by…</div><div style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textXmuted }}>Press <span style={{ fontWeight:600, color:T.textSub }}>Run Demo</span> to start</div></div>
              </div>
              <SkeletonMessage width="88%" delay={0}/><SkeletonMessage width="72%" delay={70}/><SkeletonMessage width="91%" delay={140}/><SkeletonMessage width="60%" delay={210}/>
            </div>
          ):messages.map((msg,i)=><MessageBubble key={i} msg={msg} index={i}/>)}
        </div>
      )}

      {/* ── Chat Tab ── */}
      {activeTab === "chat" && (
        <>
          {/* Agent selector */}
          <div style={{ display:"flex", gap:5, padding:"8px 14px 6px", borderBottom:"1px solid rgba(200,195,225,0.15)", flexShrink:0, flexWrap:"wrap" }}>
            {CHAT_AGENT_OPTIONS.map(opt => {
              const isActive = targetAgent === opt.id;
              const agentData = AGENT_ROLES[opt.id];
              return (
                <button key={opt.id} onClick={()=>setTargetAgent(opt.id)} style={{ background:isActive?"#1a1a1a":"rgba(26,26,26,0.05)", border:`1px solid ${isActive?"transparent":"rgba(26,26,26,0.12)"}`, borderRadius:99, padding:"4px 11px", fontFamily:"'DM Sans'", fontSize:11, fontWeight:isActive?600:400, color:isActive?"#fff":T.textSub, cursor:"pointer", transition:"all 0.16s ease", display:"flex", alignItems:"center", gap:5 }}>
                  {opt.id !== "all" && agentData && <span style={{ display:"flex", opacity:isActive?1:0.5 }}>{agentData.Icon(isActive?"#fff":"#555", 11)}</span>}
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{ flex:1, overflowY:"auto", padding:"12px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            {chatMessages.length === 0 && (
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, paddingTop:20, opacity:0.7 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:"rgba(26,26,26,0.06)", border:"1px solid rgba(26,26,26,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:T.textMuted, textAlign:"center" }}>Start chatting with your agents</div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textXmuted, textAlign:"center", maxWidth:200, lineHeight:1.6 }}>Ask agents questions, give instructions, or check status in real time.</div>
              </div>
            )}
            {chatMessages.map((msg, i) => {
              if (msg.role === "user") {
                return (
                  <div key={i} style={{ display:"flex", justifyContent:"flex-end", animation:"slide-in 0.22s ease" }}>
                    <div style={{ maxWidth:"78%", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textXmuted }}>{msg.ts}</span>
                        <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:T.textMuted }}>
                          → {CHAT_AGENT_OPTIONS.find(o=>o.id===msg.target)?.label}
                        </span>
                      </div>
                      <div style={{ background:"#1a1a1a", color:"#fff", borderRadius:"14px 4px 14px 14px", padding:"9px 13px", fontFamily:"'DM Sans'", fontSize:12.5, lineHeight:1.55 }}>{msg.text}</div>
                    </div>
                  </div>
                );
              }
              const agentData = AGENT_ROLES[msg.agent];
              return (
                <div key={i} style={{ display:"flex", gap:8, animation:"slide-in 0.22s ease" }}>
                  <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, background:"rgba(26,26,26,0.07)", border:"1px solid rgba(26,26,26,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginTop:2 }}>
                    {agentData ? agentData.Icon("#1a1a1a", 13) : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/></svg>}
                  </div>
                  <div style={{ maxWidth:"78%" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                      <span style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:600, color:T.text }}>{agentData?.name || "Agent"}</span>
                      <span style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textXmuted }}>{msg.ts}</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.75)", border:"1px solid rgba(200,195,225,0.45)", borderRadius:"4px 14px 14px 14px", padding:"9px 13px", fontFamily:"'DM Sans'", fontSize:12.5, color:T.textSub, lineHeight:1.55 }}>{msg.text}</div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {agentTyping && (
              <div style={{ display:"flex", gap:8, animation:"k-up 0.18s ease" }}>
                <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, background:"rgba(26,26,26,0.07)", border:"1px solid rgba(26,26,26,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {(AGENT_ROLES[targetAgent] || AGENT_ROLES.support).Icon("#1a1a1a", 13)}
                </div>
                <div style={{ background:"rgba(255,255,255,0.75)", border:"1px solid rgba(200,195,225,0.45)", borderRadius:"4px 14px 14px 14px", padding:"11px 14px", display:"flex", alignItems:"center", gap:4 }}>
                  {[0,1,2].map(n=><span key={n} style={{ width:5, height:5, borderRadius:"50%", background:"#888", display:"inline-block", animation:`k-pulse 1.2s ease-in-out ${n*0.2}s infinite` }}/>)}
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div style={{ padding:"10px 14px 12px", borderTop:"1px solid rgba(200,195,225,0.2)", flexShrink:0 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", background:"rgba(255,255,255,0.78)", border:"1px solid rgba(200,195,235,0.65)", borderRadius:14, padding:"8px 8px 8px 14px", transition:"box-shadow 0.15s ease" }}
              onFocusCapture={e=>e.currentTarget.style.boxShadow="0 0 0 3px rgba(26,26,26,0.08)"}
              onBlurCapture={e=>e.currentTarget.style.boxShadow="none"}>
              <textarea
                ref={inputRef}
                rows={1}
                placeholder={`Message ${CHAT_AGENT_OPTIONS.find(o=>o.id===targetAgent)?.label || "agent"}…`}
                value={chatInput}
                onChange={e => { setChatInput(e.target.value); e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,96)+"px"; }}
                onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); sendChat(); } }}
                style={{ flex:1, border:"none", background:"transparent", fontFamily:"'DM Sans'", fontSize:13, color:T.text, resize:"none", outline:"none", lineHeight:1.5, minHeight:20, maxHeight:96, overflow:"auto" }}
              />
              <button onClick={sendChat} disabled={!chatInput.trim()||agentTyping} style={{ width:32, height:32, borderRadius:10, border:"none", background:chatInput.trim()&&!agentTyping?"#1a1a1a":"rgba(180,175,200,0.22)", cursor:chatInput.trim()&&!agentTyping?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.18s ease", boxShadow:chatInput.trim()&&!agentTyping?"0 2px 6px rgba(0,0,0,0.18)":"none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={chatInput.trim()&&!agentTyping?"#fff":"#aaa"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:10, color:T.textXmuted, marginTop:5, paddingLeft:2 }}>Press Enter to send · Shift+Enter for new line</div>
          </div>
        </>
      )}
    </Card>
  );
}

function SlidingTabs({ tabs, active, onChange }) {
  const [ind, setInd] = useState({ left:0, width:0 });
  const refs = useRef({});
  useEffect(() => { const el=refs.current[active]; if(el) setInd({ left:el.offsetLeft, width:el.offsetWidth }); }, [active]);
  return (
    <div style={{ position:"relative", display:"flex", padding:"10px 14px 0", borderBottom:"1px solid rgba(200,195,225,0.22)", flexShrink:0 }}>
      <div style={{ position:"absolute", bottom:0, height:2, borderRadius:"2px 2px 0 0", background:"#1a1a1a", transition:"left 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1)", left:ind.left, width:ind.width }}/>
      {tabs.map(tab=>(
        <button key={tab.id} ref={el=>refs.current[tab.id]=el} onClick={()=>onChange(tab.id)} style={{ background:"transparent", border:"none", cursor:"pointer", padding:"6px 14px 9px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:active===tab.id?600:400, color:active===tab.id?T.text:T.textMuted, display:"flex", alignItems:"center", gap:6, transition:"color 0.2s ease" }}>
          <span style={{ display:"flex" }}>{tab.iconEl}</span>{tab.label}
        </button>
      ))}
    </div>
  );
}

function AuditLog() {
  const risk = { low:{bg:"rgba(22,163,74,0.08)",border:"rgba(22,163,74,0.2)",text:T.green,label:"Low"}, medium:{bg:T.orangeBg,border:T.orangeBorder,text:T.orange,label:"Med"}, high:{bg:T.roseBg,border:T.roseBorder,text:T.rose,label:"High"} };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:1, background:"rgba(240,240,242,0.7)", borderRadius:12, padding:"6px 4px" }}>
      {AUDIT_LOG_DATA.map((entry,i)=>{
        const agent=AGENT_ROLES[entry.agent]; const rc=risk[entry.risk];
        return (
          <div key={i} className="audit-row" style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 9px", borderRadius:8, cursor:"default", background:i%2===0?"rgba(255,255,255,0.5)":"transparent", animation:`k-up 0.28s ease ${i*30}ms both`, transition:"background 0.15s ease" }}>
            <span style={{ fontFamily:"'DM Mono'", fontSize:9, color:T.textXmuted, minWidth:54 }}>{entry.time}</span>
            <span style={{ display:"flex", flexShrink:0 }}>{agent.Icon("#555", 13)}</span>
            <span style={{ fontFamily:"'DM Sans'", fontSize:11.5, color:T.textSub, flex:1 }}>{entry.action}</span>
            <span style={{ fontFamily:"'DM Sans'", fontSize:9, fontWeight:600, color:rc.text, background:rc.bg, border:`1px solid ${rc.border}`, padding:"2px 8px", borderRadius:99, flexShrink:0 }}>{rc.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function NodeGraph() {
  const nodes = [
    { id:"platform", label:"Lares.AI Platform",  sub:"Dashboard · Deploy · Audit", x:155, y:32,  w:150, color:T.ink,    iconFn:(c)=>Icon.dashboard(c,12) },
    { id:"bus",      label:"Collab Bus",        sub:"Slack channels",             x:155, y:134, w:120, color:"#555", iconFn:(c)=>Icon.share(c,11) },
    { id:"support",  label:"Support Agent",     sub:"Claw-1",                     x:28,  y:232, w:110, color:T.green,       iconFn:(c)=>Icon.shield(c,11) },
    { id:"sales",    label:"Sales Agent",       sub:"Claw-2",                     x:155, y:232, w:110, color:T.ink,      iconFn:(c)=>Icon.target(c,11) },
    { id:"devops",   label:"DevOps Agent",      sub:"Claw-3",                     x:282, y:232, w:110, color:T.orange,      iconFn:(c)=>Icon.cpu(c,11) },
    { id:"runtime",  label:"Lares Runtime",  sub:"Isolated VMs",               x:130, y:330, w:160, color:T.textMuted,   iconFn:(c)=>Icon.layers(c,11) },
  ];
  const edges = [["platform","bus"],["bus","support"],["bus","sales"],["bus","devops"],["support","runtime"],["sales","runtime"],["devops","runtime"],["support","sales"],["sales","devops"]];
  const nm={}; nodes.forEach(n=>{nm[n.id]=n;});
  const cx=n=>n.x+n.w/2; const cy=(n,b=false)=>b?n.y+40:n.y;
  return (
    <div>
      <div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text, marginBottom:12 }}>System Architecture</div>
      <div style={{ position:"relative", height:400, background:"rgba(124,111,224,0.025)", borderRadius:14, border:`1px solid rgba(124,111,224,0.09)`, overflow:"hidden" }}>
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
          {edges.map(([a,b],i)=>{ const na=nm[a],nb=nm[b],x1=cx(na),y1=cy(na,true)+4,x2=cx(nb),y2=cy(nb)-4,my=(y1+y2)/2; return <path key={i} d={`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`} fill="none" stroke="rgba(124,111,224,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>; })}
        </svg>
        {nodes.map((n,i)=>(
          <div key={n.id} style={{ position:"absolute", left:n.x, top:n.y, width:n.w, background:T.surfaceHigh, border:`1px solid ${n.color}30`, borderRadius:11, padding:"8px 11px", boxShadow:`${T.shadowSm}, 0 0 0 3px ${n.color}06`, animation:`k-up 0.45s ease ${i*55}ms both` }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}><div style={{ width:6, height:6, borderRadius:"50%", background:n.color, boxShadow:`0 0 6px ${n.color}80`, flexShrink:0 }}/><div style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:T.text }}>{n.label}</div></div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:9, color:T.textMuted }}>{n.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Custom Agent Wizard ─────────────────────────────────────────────────
function CustomAgentWizard({ onClose, onCreate, editAgent=null }) {
  const isEdit = !!editAgent;
  const [step, setStep] = useState(1);
  const [deploying, setDeploying] = useState(false);
  const [form, setForm] = useState(editAgent ? {
    name: editAgent.name, persona: editAgent.persona, model: editAgent.model,
    heartbeatEnabled: editAgent.heartbeatEnabled, interval: editAgent.interval,
    tasks: editAgent.tasks||[], newTask: "",
  } : { name:"", persona:"", model:"Claude Sonnet 4.6", heartbeatEnabled:true, interval:"Every 15 minutes", tasks:[], newTask:"" });

  const toggleTask = (task) => setForm(f=>({ ...f, tasks: f.tasks.includes(task)?f.tasks.filter(t=>t!==task):[...f.tasks,task] }));
  const addCustomTask = () => { if (form.newTask.trim()) setForm(f=>({ ...f, tasks:[...f.tasks, f.newTask.trim()], newTask:"" })); };

  const handleCreate = () => {
    setDeploying(true);
    setTimeout(() => { onCreate(form, editAgent?.id); onClose(); }, isEdit ? 1000 : 1800);
  };

  const StepDot = ({ n }) => {
    const isActive=step===n, isDone=step>n;
    return (
      <div style={{ display:"flex", alignItems:"center" }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:isActive?"#1a1a1a":isDone?T.greenBg:"rgba(200,195,225,0.28)", border:`1.5px solid ${isActive?"transparent":isDone?T.greenBorder:"rgba(200,195,225,0.48)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:isActive?"#fff":isDone?T.green:T.textMuted, boxShadow:isActive?"0 2px 6px rgba(0,0,0,0.18)":"none", transition:"all 0.3s ease", flexShrink:0 }}>
          {isDone ? Icon.check(T.green,12) : n}
        </div>
        {n<3&&<div style={{ width:36, height:1, background:isDone?`${T.green}45`:"rgba(200,195,225,0.35)", margin:"0 4px" }}/>}
      </div>
    );
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(20,15,40,0.5)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, animation:"k-fade 0.22s ease", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"rgba(255,255,255,0.94)", backdropFilter:"blur(28px)", border:`1px solid ${T.border}`, borderRadius:28, padding:32, width:500, maxWidth:"94vw", maxHeight:"88vh", overflowY:"auto", animation:"k-scale 0.28s ease", boxShadow:T.shadowLg, position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.95)", borderRadius:"28px 28px 0 0" }}/>
        <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle, ${"rgba(26,26,26,0.06)"}, transparent 70%)`, pointerEvents:"none" }}/>

        <div style={{ display:"flex", alignItems:"center", marginBottom:28, position:"relative" }}>
          <StepDot n={1}/><StepDot n={2}/><StepDot n={3}/>
          <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <span style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:T.text }}>{["Agent Basics","Heartbeat","Review & Hire"][step-1]}</span>
            <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted }}>Step {step} of 3 · {isEdit?"Edit Mode":"New Agent"}</span>
          </div>
        </div>

        {step===1&&!deploying&&(
          <div style={{ animation:"k-up 0.28s ease" }}>
            <div style={{ fontFamily:"'DM Sans'", fontSize:19, fontWeight:600, color:T.text, letterSpacing:"-0.02em", marginBottom:4 }}>{isEdit?"Edit Agent":"Define Your Agent"}</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:22, lineHeight:1.55 }}>{isEdit?"Update your agent's identity and model.":"Give your AI employee an identity and capabilities."}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div><label style={labelStyle}>Agent Name</label><input className="step-input" style={inputStyle} placeholder="e.g. Aria, DataBot…" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div><label style={labelStyle}>Persona</label><textarea className="step-input" style={{...inputStyle,minHeight:84,resize:"vertical"}} placeholder="Describe your agent's role, personality…" value={form.persona} onChange={e=>setForm(f=>({...f,persona:e.target.value}))}/></div>
              <div><label style={labelStyle}>Model</label><div style={{ position:"relative" }}><select className="step-input" style={{...inputStyle,appearance:"none",cursor:"pointer",paddingRight:36}} value={form.model} onChange={e=>setForm(f=>({...f,model:e.target.value}))}>{MODELS.map(m=><option key={m}>{m}</option>)}</select><span style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>{Icon.chevronDown(T.textMuted, 11)}</span></div></div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:28, gap:10 }}>
              <button onClick={onClose} style={{ background:"transparent", border:"1px solid rgba(200,195,225,0.55)", borderRadius:99, padding:"9px 20px", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer" }}>Cancel</button>
              <button onClick={()=>setStep(2)} disabled={!form.name.trim()||!form.persona.trim()} style={{ background:(form.name&&form.persona)?"#1a1a1a":"rgba(180,175,200,0.22)", border:"none", borderRadius:99, padding:"9px 22px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:(form.name&&form.persona)?"#fff":T.textMuted, cursor:(form.name&&form.persona)?"pointer":"default", boxShadow:(form.name&&form.persona)?"0 2px 8px rgba(0,0,0,0.18)":"none", transition:"all 0.2s ease", display:"flex", alignItems:"center", gap:7 }}>Continue {Icon.arrowRight((form.name&&form.persona)?"#fff":T.textMuted, 13)}</button>
            </div>
          </div>
        )}

        {step===2&&!deploying&&(
          <div style={{ animation:"k-up 0.28s ease" }}>
            <div style={{ fontFamily:"'DM Sans'", fontSize:19, fontWeight:600, color:T.text, letterSpacing:"-0.02em", marginBottom:4 }}>Heartbeat Config</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:22, lineHeight:1.55 }}>Configure background task scheduling.</div>
            <div style={{ background:"rgba(124,111,224,0.05)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:9, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.clock("#555", 14)}</div>
                <div><div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text, marginBottom:1 }}>Background Tasks</div><div style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted }}>Let agent run autonomously on schedule</div></div>
              </div>
              <button onClick={()=>setForm(f=>({...f,heartbeatEnabled:!f.heartbeatEnabled}))} style={{ width:46, height:26, borderRadius:99, border:"none", cursor:"pointer", position:"relative", transition:"all 0.25s ease", background:form.heartbeatEnabled?T.green:"rgba(180,175,200,0.28)", boxShadow:form.heartbeatEnabled?"0 2px 6px rgba(22,163,74,0.3)":"none" }}>
                <div style={{ position:"absolute", top:3, width:20, height:20, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.14)", transition:"left 0.25s ease", left:form.heartbeatEnabled?"calc(100% - 23px)":3 }}/>
              </button>
            </div>
            {form.heartbeatEnabled&&(
              <div style={{ display:"flex", flexDirection:"column", gap:18, animation:"k-up 0.22s ease" }}>
                <div><label style={labelStyle}>BG Task Interval</label><div style={{ position:"relative" }}><select className="step-input" style={{...inputStyle,appearance:"none",cursor:"pointer",paddingRight:36}} value={form.interval} onChange={e=>setForm(f=>({...f,interval:e.target.value}))}>{INTERVALS.map(i=><option key={i}>{i}</option>)}</select><span style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>{Icon.chevronDown(T.textMuted, 11)}</span></div></div>
                <div>
                  <label style={labelStyle}>BG Task Checklist</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:3, marginBottom:10 }}>
                    {[...DEFAULT_TASKS, ...form.tasks.filter(t=>!DEFAULT_TASKS.includes(t))].map(task=>{
                      const checked=form.tasks.includes(task);
                      return (<div key={task} className="task-item" onClick={()=>toggleTask(task)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:10, cursor:"pointer", background:checked?"rgba(61,184,122,0.06)":"transparent", border:`1px solid ${checked?T.greenBorder:"transparent"}`, transition:"all 0.15s ease" }}>
                        <div style={{ width:17, height:17, borderRadius:5, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:checked?T.green:"rgba(200,195,225,0.3)", border:`1px solid ${checked?T.green:"rgba(200,195,225,0.55)"}`, transition:"all 0.15s ease" }}>{checked&&Icon.check("#fff",10)}</div>
                        <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:checked?T.textSub:T.textMuted }}>{task}</span>
                      </div>);
                    })}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <input className="step-input" style={{...inputStyle,flex:1}} placeholder="Add custom task…" value={form.newTask} onChange={e=>setForm(f=>({...f,newTask:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addCustomTask()}/>
                    <button onClick={addCustomTask} style={{ background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:12, padding:"10px 16px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.ink, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, display:"flex", alignItems:"center", gap:6 }}>{Icon.plus("#555",12)} Add</button>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:28, gap:10 }}>
              <button onClick={()=>setStep(1)} style={{ background:"transparent", border:"1px solid rgba(200,195,225,0.55)", borderRadius:99, padding:"9px 20px", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>{Icon.arrowLeft(T.textMuted,13)} Back</button>
              <button onClick={()=>setStep(3)} style={{ background:"#1a1a1a", border:"none", borderRadius:99, padding:"9px 22px", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", gap:7 }}>Continue {Icon.arrowRight("#fff",13)}</button>
            </div>
          </div>
        )}

        {step===3&&!deploying&&(
          <div style={{ animation:"k-up 0.28s ease" }}>
            <div style={{ fontFamily:"'DM Sans'", fontSize:19, fontWeight:600, color:T.text, letterSpacing:"-0.02em", marginBottom:4 }}>{isEdit?"Confirm Changes":"Review & Hire"}</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:22, lineHeight:1.55 }}>Confirm your agent configuration before {isEdit?"saving":"deploying"}.</div>
            <div style={{ background:"rgba(124,111,224,0.05)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:16, padding:"16px 18px", marginBottom:12 }}>
              <div style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>Basics</div>
              {[["Name",form.name,T.text],["Model",form.model,T.textSub],["Persona",form.persona.slice(0,70)+(form.persona.length>70?"…":""),T.textSub]].map(([k,v,c])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 0", borderBottom:"1px solid rgba(200,195,225,0.2)" }}>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, flexShrink:0 }}>{k}</span>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:c, fontWeight:k==="Name"?600:400, maxWidth:"62%", textAlign:"right" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(61,184,122,0.05)", border:`1px solid ${T.greenBorder}`, borderRadius:16, padding:"16px 18px", marginBottom:26 }}>
              <div style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>Heartbeat</div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(200,195,225,0.2)" }}><span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Background Tasks</span><span style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:form.heartbeatEnabled?T.green:T.textMuted }}>{form.heartbeatEnabled?"Enabled":"Disabled"}</span></div>
              {form.heartbeatEnabled&&(
                <><div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(200,195,225,0.2)" }}><span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Interval</span><span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textSub }}>{form.interval}</span></div>
                <div style={{ padding:"10px 0 2px" }}><div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:7 }}>Tasks ({form.tasks.length})</div>
                  {form.tasks.length>0?<div style={{ display:"flex", flexDirection:"column", gap:4 }}>{form.tasks.map(t=><div key={t} style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.green, display:"flex", alignItems:"center", gap:6 }}>{Icon.check(T.green,10)}{t}</div>)}</div>:<span style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textXmuted }}>None selected</span>}
                </div></>
              )}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              <button onClick={()=>setStep(2)} style={{ background:"transparent", border:"1px solid rgba(200,195,225,0.55)", borderRadius:99, padding:"9px 20px", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>{Icon.arrowLeft(T.textMuted,13)} Back</button>
              <button onClick={handleCreate} style={{ background:"#1a1a1a", border:"none", borderRadius:99, padding:"10px 26px", fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:"#fff", cursor:"pointer", boxShadow:"0 3px 10px rgba(0,0,0,0.2)", transition:"all 0.2s ease", display:"flex", alignItems:"center", gap:8 }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.boxShadow=`0 6px 20px ${"#1a1a1a"}55`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=`0 4px 16px ${"#1a1a1a"}45`;}}>
                {isEdit?<>{Icon.check("#fff",14)} Save Changes</>:<>{Icon.zap("#fff",14)} Hire AI Employee</>}
              </button>
            </div>
          </div>
        )}

        {deploying&&(
          <div style={{ textAlign:"center", padding:"36px 0", animation:"k-fade 0.28s ease" }}>
            <div style={{ width:48, height:48, border:`3px solid ${"rgba(26,26,26,0.06)"}`, borderTopColor:"#555", borderRadius:"50%", animation:"k-spin 0.85s linear infinite", margin:"0 auto 20px" }}/>
            <div style={{ fontFamily:"'DM Sans'", fontSize:16, fontWeight:600, color:T.text, marginBottom:6 }}>{isEdit?`Updating ${form.name}…`:`Deploying ${form.name}…`}</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>{isEdit?"Applying changes to your agent":"Provisioning isolated sandbox on Lares.AI"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Deploy Modal ────────────────────────────────────────────────────────
function DeployModal({ onClose, onDeploy, onCustom, activeAgents }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [deploying, setDeploying] = useState(false);

  const handleDeploy = () => {
    if (!selectedRole) return;
    setDeploying(true);
    setTimeout(() => { onDeploy(selectedRole); onClose(); }, 1800);
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(20,15,40,0.5)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, animation:"k-fade 0.22s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"rgba(255,255,255,0.93)", backdropFilter:"blur(28px)", border:`1px solid ${T.border}`, borderRadius:28, padding:32, width:480, maxWidth:"92vw", animation:"k-scale 0.28s ease", boxShadow:T.shadowLg, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(255,255,255,0.95)" }}/>
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, ${"rgba(26,26,26,0.06)"}, transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ fontFamily:"'DM Sans'", fontSize:19, fontWeight:600, color:T.text, marginBottom:5, letterSpacing:"-0.02em", position:"relative" }}>Hire a New AI Employee</div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:22, lineHeight:1.55, position:"relative" }}>Choose a preset role or build a fully custom agent.</div>
        {!deploying?(
          <>
            <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:10 }}>
              {Object.entries(AGENT_ROLES).map(([key,data])=>{
                const isAlready=activeAgents[key], isSel=selectedRole===key;
                return (
                  <button key={key} className="hire-opt" onClick={()=>!isAlready&&setSelectedRole(key)} style={{ background:isSel?"rgba(255,255,255,0.95)":"rgba(124,111,224,0.025)", border:`1.5px solid ${isSel?data.borderColor:"rgba(200,195,225,0.38)"}`, borderRadius:14, padding:"12px 15px", cursor:isAlready?"default":"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left", transition:"all 0.18s ease", opacity:isAlready?0.42:1, boxShadow:isSel?T.shadowSm:"none" }}>
                    <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:data.bgColor, border:`1px solid ${data.borderColor}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{data.Icon(data.color, 17)}</div>
                    <div style={{ flex:1 }}><div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text }}>{data.name}</div><div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginTop:1 }}>{data.description}</div></div>
                    {isAlready&&<span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, color:data.color, background:data.bgColor, border:`1px solid ${data.borderColor}`, padding:"3px 8px", borderRadius:99 }}>Live</span>}
                  </button>
                );
              })}
            </div>
            <button className="custom-opt" onClick={()=>{ onClose(); onCustom(); }} style={{ width:"100%", background:"rgba(124,111,224,0.03)", border:`1.5px dashed ${"rgba(26,26,26,0.13)"}`, borderRadius:14, padding:"13px 15px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left", transition:"all 0.18s ease", marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{Icon.custom("#555", 17)}</div>
              <div style={{ flex:1 }}><div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.ink }}>Custom Agent</div><div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginTop:1 }}>Build your own AI employee with full control</div></div>
              <span style={{ display:"flex" }}>{Icon.arrowRight("#555", 13)}</span>
            </button>
            <button onClick={handleDeploy} style={{ width:"100%", padding:"13px", borderRadius:14, border:"none", background:selectedRole?"#1a1a1a":"rgba(180,175,200,0.22)", fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:selectedRole?"#fff":T.textMuted, cursor:selectedRole?"pointer":"default", transition:"all 0.22s ease", boxShadow:selectedRole?"0 3px 12px rgba(0,0,0,0.2)":"none" }}>
              {selectedRole?`Deploy ${AGENT_ROLES[selectedRole].name}`:"Select a role above"}
            </button>
          </>
        ):(
          <div style={{ textAlign:"center", padding:"30px 0" }}>
            <div style={{ width:46, height:46, border:`3px solid ${"rgba(26,26,26,0.06)"}`, borderTopColor:"#555", borderRadius:"50%", animation:"k-spin 0.85s linear infinite", margin:"0 auto 18px" }}/>
            <div style={{ fontFamily:"'DM Sans'", fontSize:15, fontWeight:600, color:T.text, marginBottom:5 }}>Deploying {AGENT_ROLES[selectedRole]?.name}…</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted }}>Provisioning isolated sandbox on Lares.AI</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sidebar ─────────────────────────────────────────────────────────────
function Sidebar({ activePage, onNavigate }) {
  const NAV = [
    { id:"dashboard", label:"Dashboard", IconFn:(c,s)=>Icon.dashboard(c,s) },
    {
      id:"agents", label:"Agents", IconFn:(c,s)=>Icon.agents(c,s),
      sub:[{ id:"templates", label:"Templates", IconFn:(c,s)=>Icon.template(c,s) }]
    },
    { id:"channels",  label:"Channels",  IconFn:(c,s)=>Icon.channels(c,s) },
    { id:"settings",  label:"Settings",  IconFn:(c,s)=>Icon.settings(c,s) },
  ];

  return (
    <nav className="sidebar" style={{
      height:"100vh", position:"sticky", top:0,
      display:"flex", flexDirection:"column",
      background:"rgba(255,255,255,0.76)",
      backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
      borderRight:"1px solid rgba(255,255,255,0.88)",
      boxShadow:"2px 0 24px rgba(100,90,160,0.07)",
      zIndex:60, userSelect:"none"
    }}>
      <div style={{
        padding:"20px 17px 16px",
        display:"flex", alignItems:"center", gap:11,
        borderBottom:"1px solid rgba(200,195,225,0.18)",
        marginBottom:6, flexShrink:0
      }}>
        <div style={{
          width:34, height:34, borderRadius:10, flexShrink:0,
          background:"#1a1a1a",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 3px 10px rgba(0,0,0,0.25)"
        }}>
          <span style={{ fontSize:15, fontWeight:700, color:"#fff", fontFamily:"'DM Sans'" }}>L</span>
        </div>
        <div className="sidebar-logo-text" style={{ display:"flex", flexDirection:"column", gap:1, overflow:"hidden" }}>
          <span style={{ fontFamily:"'DM Sans'", fontSize:15, fontWeight:700, color:T.text, letterSpacing:"-0.02em", lineHeight:1 }}>Lares.AI</span>
        </div>
      </div>

      <div style={{ flex:1, padding:"8px 8px", display:"flex", flexDirection:"column", gap:1, overflowY:"auto", overflowX:"hidden" }}>
        {NAV.map(item => {
          const isThisActive = activePage === item.id;
          const isParentActive = item.sub && item.sub.some(s=>s.id===activePage);
          const isAnyActive = isThisActive || isParentActive;

          return (
            <div key={item.id}>
              <div
                className={`nav-item${isThisActive?" active":""}`}
                onClick={()=>onNavigate(item.id)}
                style={{ color: isAnyActive ? T.text : T.textMuted }}
              >
                <div className="nav-icon-wrap">
                  {item.IconFn(isAnyActive ? "#111111" : "#999999", isAnyActive ? 17 : 16)}
                </div>
                <span className="nav-reveal" style={{
                  fontFamily:"'DM Sans'", fontSize:13.5,
                  fontWeight: isAnyActive ? 700 : 500,
                  color: isAnyActive ? T.text : T.textMuted,
                  flex:1, lineHeight:1
                }}>{item.label}</span>
                {item.sub && (
                  <span className="nav-reveal" style={{ display:"flex", flexShrink:0, opacity:0.35 }}>
                    {Icon.chevronRight(T.textMuted, 11)}
                  </span>
                )}
              </div>
              {item.sub && item.sub.map(sub => {
                const isSubActive = activePage === sub.id;
                return (
                  <div
                    key={sub.id}
                    className={`nav-sub-item${isSubActive?" active":""}`}
                    onClick={()=>onNavigate(sub.id)}
                  >
                    <span className="nav-reveal" style={{ display:"flex", flexShrink:0 }}>
                      {sub.IconFn(isSubActive ? "#111111" : "#BBBBBB", isSubActive ? 14 : 13)}
                    </span>
                    <span className="nav-reveal" style={{
                      fontFamily:"'DM Sans'", fontSize:12.5,
                      fontWeight: isSubActive ? 700 : 400,
                      color: isSubActive ? T.text : T.textMuted
                    }}>{sub.label}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ padding:"0 8px 6px" }}>
        <div style={{ height:"1px", background:"rgba(200,195,225,0.2)", marginBottom:6 }}/>
      </div>

      <div style={{ padding:"4px 8px 16px", flexShrink:0 }}>
        <div className="nav-item" style={{ color:T.textMuted }}>
          <div className="nav-icon-wrap" style={{ background:"rgba(26,26,26,0.07)", border:"1px solid rgba(26,26,26,0.12)" }}>
            {Icon.user("#555", 15)}
          </div>
          <div className="nav-reveal" style={{ display:"flex", flexDirection:"column", gap:2, overflow:"hidden" }}>
            <span style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text, lineHeight:1 }}>Team Lares.AI</span>
            <span style={{ fontFamily:"'DM Mono'", fontSize:9, color:T.textMuted, letterSpacing:"0.04em" }}>Pro Plan</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── Agent Templates ─────────────────────────────────────────────────────
const AGENT_TEMPLATES = [
  { id:"hr",       name:"HR Agent",        desc:"Screens resumes, schedules interviews, sends offer letters", Icon:(c,s)=>Icon.user(c,s),     color:T.ink,  colorVibrant:"#555", bgColor:"rgba(26,26,26,0.06)", borderColor:"rgba(26,26,26,0.13)", tags:["Gmail","Notion","Slack"] },
  { id:"finance",  name:"Finance Agent",   desc:"Tracks expenses, generates reports, flags anomalies",       Icon:(c,s)=>Icon.coin(c,s),     color:T.green,   colorVibrant:"#3DB87A",     bgColor:T.greenBg,    borderColor:T.greenBorder,  tags:["Notion","Slack","Gmail"] },
  { id:"marketing",name:"Marketing Agent", desc:"Monitors campaigns, drafts content, posts on social media", Icon:(c,s)=>Icon.globe(c,s),    color:T.orange,  colorVibrant:"#F09050",     bgColor:T.orangeBg,   borderColor:T.orangeBorder, tags:["Twitter","HubSpot","Slack"] },
  { id:"legal",    name:"Legal Agent",     desc:"Reviews contracts, flags clauses, tracks compliance tasks", Icon:(c,s)=>Icon.shield(c,s),   color:"#6B7CCC",  colorVibrant:"#8A95E0",    bgColor:"rgba(107,124,204,0.1)", borderColor:"rgba(107,124,204,0.25)", tags:["Notion","Gmail"] },
  { id:"data",     name:"Data Agent",      desc:"Cleans datasets, runs queries, generates visualizations",   Icon:(c,s)=>Icon.activity(c,s), color:T.rose,    colorVibrant:"#E87090",     bgColor:T.roseBg,     borderColor:T.roseBorder,   tags:["Notion","Slack","Gmail"] },
  { id:"onboarding",name:"Onboarding Agent",desc:"Welcomes new hires, assigns tasks, tracks progress",       Icon:(c,s)=>Icon.agents(c,s),   color:"#45B8AC",  colorVibrant:"#5ACFC2",    bgColor:"rgba(69,184,172,0.1)", borderColor:"rgba(69,184,172,0.25)", tags:["Slack","Gmail","Notion"] },
];

// ── Pages ────────────────────────────────────────────────────────────────
function AgentsPage({ activeAgents, agentOverrides, customAgents, onToggle, onEdit, onDelete, onCredentials, onEditCustom, onDeleteCustom, onCredentialsCustom, onHire, onNavigate }) {
  return (
    <div style={{ animation:"page-in 0.28s ease" }}>
      <SectionLabel icon={Icon.zap("#1a1a1a",10)} label="Built-in Agents" count="3 roles"/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:26 }}>
        {Object.entries(AGENT_ROLES).map(([role,data])=>(
          <AgentCard key={role} role={role} data={data} isActive={activeAgents[role]} overrides={agentOverrides[role]}
            onToggle={()=>onToggle(role)} onEdit={()=>onEdit(role,data)} onDelete={()=>onDelete(role,data)}
            onCredentials={()=>onCredentials(role,data,agentOverrides[role])}/>
        ))}
      </div>

      {customAgents.length > 0 && (
        <>
          <SectionLabel icon={Icon.custom("#555",10)} label="Custom Agents" count={`${customAgents.length} deployed`}/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:26 }}>
            {customAgents.map(agent=>(
              <CustomAgentCard key={agent.id} agent={agent} onEdit={onEditCustom} onDelete={onDeleteCustom} onCredentials={onCredentialsCustom}/>
            ))}
          </div>
        </>
      )}

      <div onClick={()=>onNavigate("templates")} style={{ borderRadius:18, background:"rgba(255,255,255,0.62)", border:`1.5px dashed ${"rgba(26,26,26,0.13)"}`, padding:"18px 22px", display:"flex", alignItems:"center", gap:14, cursor:"default", transition:"all 0.2s ease" }}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,111,224,0.05)";e.currentTarget.style.borderColor="rgba(124,111,224,0.35)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.62)";e.currentTarget.style.borderColor="rgba(26,26,26,0.13)";}}>
        <div style={{ width:40, height:40, borderRadius:11, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{Icon.template("#555",17)}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.ink }}>Browse Agent Templates</div>
          <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginTop:2 }}>Pre-built agents for HR, Finance, Marketing, Legal, and more</div>
        </div>
        {Icon.arrowRight("#555", 13)}
      </div>
    </div>
  );
}

function SectionLabel({ icon, label, count }) {
  return (
    <div style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:13, display:"flex", alignItems:"center", gap:8 }}>
      <span style={{ width:18, height:18, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:6, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>{icon}</span>
      {label}
      {count && <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:500, color:T.textXmuted, letterSpacing:"0.04em", textTransform:"none", marginLeft:2 }}>· {count}</span>}
    </div>
  );
}

function TemplatesPage({ onDeploy }) {
  const [deploying, setDeploying] = useState(null);
  const handleDeploy = (tpl) => {
    setDeploying(tpl.id);
    setTimeout(()=>{ onDeploy(tpl); setDeploying(null); }, 1400);
  };
  return (
    <div style={{ animation:"page-in 0.28s ease" }}>
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:0 }}>
          <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, background:"rgba(26,26,26,0.06)", color:T.ink, border:`1px solid ${"rgba(26,26,26,0.13)"}`, padding:"3px 10px", borderRadius:99 }}>{AGENT_TEMPLATES.length} ready</span>
          <span style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Pre-tailored agents for common business roles. Deploy in one click.</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
        {AGENT_TEMPLATES.map(tpl => (
          <Card key={tpl.id} hover style={{ padding:"22px" }}>
            <div style={{ position:"absolute", top:-18, right:-18, width:90, height:90, borderRadius:"50%", background:`radial-gradient(circle, ${tpl.bgColor}, transparent 70%)`, pointerEvents:"none" }}/>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ width:42, height:42, borderRadius:12, background:tpl.bgColor, border:`1px solid ${tpl.borderColor}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{tpl.Icon(tpl.color,19)}</div>
              <div style={{ display:"flex", gap:3, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:120 }}>
                {tpl.tags.map(t=><span key={t} style={{ fontFamily:"'DM Sans'", fontSize:9, fontWeight:500, background:"rgba(124,111,224,0.05)", border:"1px solid rgba(124,111,224,0.13)", borderRadius:6, padding:"2px 7px", color:T.textSub }}>{t}</span>)}
              </div>
            </div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:T.text, marginBottom:6 }}>{tpl.name}</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textSub, lineHeight:1.6, marginBottom:18 }}>{tpl.desc}</div>
            <button onClick={()=>handleDeploy(tpl)} disabled={!!deploying} style={{ width:"100%", padding:"10px", borderRadius:12, border:"none", background:deploying===tpl.id?"rgba(180,175,200,0.22)":"#1a1a1a", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:deploying===tpl.id?T.textMuted:"#fff", cursor:deploying?"default":"pointer", transition:"all 0.18s ease", boxShadow:deploying===tpl.id?"none":"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
              {deploying===tpl.id
                ? <><div style={{ width:12,height:12,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"k-spin 0.7s linear infinite" }}/> Deploying…</>
                : <>{Icon.zap("#fff",12)} Deploy Agent</>}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChannelsPage() {
  const [savedChannels, setSavedChannels] = useState({});
  const [activeChannel, setActiveChannel] = useState(null);
  const [creds, setCreds] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(null);

  const handleSave = (channelId) => {
    setSaving(true);
    setTimeout(()=>{
      setSavedChannels(p=>({...p,[channelId]:{ ...creds[channelId], connected:true }}));
      setSaving(false); setSavedFlash(channelId);
      setTimeout(()=>{ setSavedFlash(null); setActiveChannel(null); }, 1200);
    }, 900);
  };
  const handleDisconnect = (channelId) => {
    setSavedChannels(p=>({...p,[channelId]:{ connected:false }}));
    setActiveChannel(null);
  };

  const ch = CHANNELS.find(c=>c.id===activeChannel);
  const connectedCount = Object.values(savedChannels).filter(v=>v?.connected).length;

  return (
    <div style={{ animation:"page-in 0.28s ease" }}>
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:26 }}>
        {connectedCount > 0 && (
          <div style={{ display:"flex", alignItems:"center", gap:7, background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:99, padding:"6px 14px" }}>
            <PulsingDot color={T.green}/><span style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:600, color:T.green, marginLeft:3 }}>{connectedCount} connected</span>
          </div>
        )}
      </div>

      {!activeChannel ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {CHANNELS.map(channel => {
            const isConnected = savedChannels[channel.id]?.connected;
            return (
              <Card key={channel.id} hover style={{ padding:"20px", cursor:"default" }} onClick={()=>setActiveChannel(channel.id)}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, borderRadius:"20px 20px 0 0", background:isConnected?"rgba(26,26,26,0.07)":"none" }}/>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:50, height:50, borderRadius:14, background:isConnected?channel.colorLight:"rgba(200,195,215,0.14)", border:`1.5px solid ${isConnected?channel.colorBorder:"rgba(200,195,215,0.32)"}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s", flexShrink:0 }}>
                    {channel.IconFn(isConnected?channel.color:T.textMuted, 23)}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                      <div style={{ fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, color:T.text }}>{channel.name}</div>
                      {isConnected && <span style={{ fontFamily:"'DM Sans'", fontSize:9, fontWeight:600, color:channel.color, background:channel.colorLight, border:`1px solid ${channel.colorBorder}`, padding:"2px 8px", borderRadius:99 }}>Connected</span>}
                    </div>
                    <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted }}>{channel.fields.length} credential{channel.fields.length>1?"s":""} required</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    {isConnected && <div style={{ width:7, height:7, borderRadius:"50%", background:T.green, boxShadow:`0 0 6px ${T.green}80` }}/>}
                    {Icon.arrowRight(isConnected?channel.color:T.textMuted, 13)}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div style={{ maxWidth:520, animation:"k-up 0.22s ease" }}>
          <button onClick={()=>setActiveChannel(null)} style={{ display:"flex", alignItems:"center", gap:7, background:"transparent", border:"none", cursor:"pointer", fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted, marginBottom:20, padding:0 }}>
            {Icon.arrowLeft(T.textMuted,13)} Back to channels
          </button>
          <Card style={{ padding:26 }}>
            <div style={{ display:"flex", alignItems:"center", gap:13, marginBottom:22 }}>
              <div style={{ width:50, height:50, borderRadius:14, background:ch.colorLight, border:`1.5px solid ${ch.colorBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{ch.IconFn(ch.color, 25)}</div>
              <div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:17, fontWeight:600, color:T.text }}>{ch.name}</div>
                <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginTop:2 }}>Enter your credentials below to connect</div>
              </div>
            </div>
            {ch.fields.map(field=>(
              <div key={field.key} style={{ marginBottom:14 }}>
                <label style={labelStyle}>{field.label}</label>
                <input className="step-input" type={field.type} style={inputStyle} placeholder={field.placeholder}
                  value={creds[ch.id]?.[field.key]||""}
                  onChange={e=>setCreds(p=>({...p,[ch.id]:{...p[ch.id],[field.key]:e.target.value}}))}/>
              </div>
            ))}
            <div style={{ background:"rgba(124,111,224,0.05)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, borderRadius:11, padding:"10px 13px", marginBottom:18, display:"flex", alignItems:"flex-start", gap:9 }}>
              {Icon.lock("#555",12)}
              <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, lineHeight:1.6 }}>Credentials saved here are available to all agents automatically.</div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {savedChannels[ch.id]?.connected && (
                <button onClick={()=>handleDisconnect(ch.id)} style={{ flex:1, padding:"10px", borderRadius:12, border:`1px solid ${T.roseBorder}`, background:T.roseBg, fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.rose, cursor:"pointer" }}>Disconnect</button>
              )}
              <button onClick={()=>handleSave(ch.id)} disabled={saving} style={{ flex:2, padding:"11px", borderRadius:12, border:"none", background:saving?"rgba(180,175,200,0.22)":savedFlash===ch.id?T.greenBg:"#1a1a1a", fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:saving?T.textMuted:savedFlash===ch.id?T.green:"#fff", cursor:saving?"default":"pointer", transition:"all 0.22s ease", boxShadow:saving||savedFlash===ch.id?"none":"0 2px 8px rgba(0,0,0,0.18)", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
                {saving?<><div style={{ width:13,height:13,border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"#fff",borderRadius:"50%",animation:"k-spin 0.7s linear infinite" }}/> Saving…</>:savedFlash===ch.id?<>{Icon.check(T.green,13)} Connected!</>:`Connect ${ch.name}`}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function SettingsPage() {
  const [notifs, setNotifs] = useState(true);
  const [autoRetry, setAutoRetry] = useState(true);
  const [auditLog, setAuditLog] = useState(true);
  const [defaultModel, setDefaultModel] = useState("Claude Sonnet 4.6");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const Toggle = ({ value, onChange }) => (
    <button onClick={()=>onChange(!value)} style={{ width:44, height:24, borderRadius:99, border:"none", cursor:"pointer", flexShrink:0, background:value?T.green:"rgba(180,175,195,0.28)", boxShadow:value?"0 2px 6px rgba(22,163,74,0.3)":"none", position:"relative", transition:"all 0.3s ease" }}>
      <div style={{ position:"absolute", top:3, left:value?"calc(100% - 21px)":3, width:18, height:18, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.14)", transition:"left 0.3s ease" }}/>
    </button>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:22 }}>
      <div style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:600, color:T.textMuted, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12 }}>{title}</div>
      <Card style={{ padding:"4px 0" }}>{children}</Card>
    </div>
  );

  const Row = ({ icon, label, desc, control }) => (
    <div style={{ display:"flex", alignItems:"center", gap:13, padding:"13px 18px", borderBottom:"1px solid rgba(200,195,225,0.15)" }}>
      <div style={{ width:34, height:34, borderRadius:10, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:600, color:T.text }}>{label}</div>
        {desc && <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textMuted, marginTop:2 }}>{desc}</div>}
      </div>
      {control}
    </div>
  );

  return (
    <div style={{ animation:"page-in 0.28s ease", display:"flex", justifyContent:"center" }}>
    <div style={{ width:"100%", maxWidth:660 }}>
      <div style={{ marginBottom:26 }}>
        <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Configure your Lares.AI workspace preferences.</div>
      </div>

      <Section title="General">
        <Row icon={Icon.cpu("#555",15)} label="Default Model" desc="Model used when creating new agents"
          control={<div style={{ position:"relative" }}><select className="step-input" style={{...inputStyle, width:175, fontSize:12, padding:"7px 30px 7px 11px", appearance:"none"}} value={defaultModel} onChange={e=>setDefaultModel(e.target.value)}>{MODELS.map(m=><option key={m}>{m}</option>)}</select><span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>{Icon.chevronDown(T.textMuted,10)}</span></div>}/>
        <Row icon={Icon.globe("#555",15)} label="Timezone" desc="Used for heartbeat scheduling"
          control={<div style={{ position:"relative" }}><select className="step-input" style={{...inputStyle, width:175, fontSize:12, padding:"7px 30px 7px 11px", appearance:"none"}} value={timezone} onChange={e=>setTimezone(e.target.value)}>{["Asia/Kolkata","UTC","America/New_York","Europe/London","Asia/Tokyo"].map(z=><option key={z}>{z}</option>)}</select><span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>{Icon.chevronDown(T.textMuted,10)}</span></div>}/>
      </Section>

      <Section title="Notifications & Behaviour">
        <Row icon={Icon.bell("#555",15)} label="Agent Notifications" desc="Get Slack/email alerts on agent handoffs" control={<Toggle value={notifs} onChange={setNotifs}/>}/>
        <Row icon={Icon.zap("#555",15)} label="Auto-Retry on Failure" desc="Automatically retry failed agent tasks" control={<Toggle value={autoRetry} onChange={setAutoRetry}/>}/>
        <Row icon={Icon.list("#555",15)} label="Audit Logging" desc="Log all agent actions for compliance review" control={<Toggle value={auditLog} onChange={setAuditLog}/>}/>
      </Section>

      <Section title="Account">
        <Row icon={Icon.user("#555",15)} label="Workspace" desc="Team Lares.AI · Pro Plan" control={<span style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, background:"rgba(26,26,26,0.06)", color:T.ink, border:`1px solid ${"rgba(26,26,26,0.13)"}`, padding:"4px 12px", borderRadius:99, cursor:"pointer" }}>Manage</span>}/>
        <Row icon={Icon.key("#555",15)} label="API Keys" desc="Manage your Lares.AI API credentials" control={<span style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, background:"rgba(26,26,26,0.06)", color:T.ink, border:`1px solid ${"rgba(26,26,26,0.13)"}`, padding:"4px 12px", borderRadius:99, cursor:"pointer" }}>View Keys</span>}/>
        <Row icon={Icon.shield("#555",15)} label="Data & Privacy" desc="Export data or delete your account" control={<span style={{ fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, background:T.roseBg, color:T.rose, border:`1px solid ${T.roseBorder}`, padding:"4px 12px", borderRadius:99, cursor:"pointer" }}>Manage</span>}/>
      </Section>
    </div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────
function DashboardPage({ activeAgents, agentOverrides, customAgents, feedMessages, demoRunning, runDemo,
  toggleAgent, setEditingBuiltin, setDeletingBuiltin, setCredentialsAgent, setEditingCustom, setDeletingCustom, setShowDeploy }) {
  const [activeTab, setActiveTab] = useState("audit");
  const TABS = [
    { id:"audit",        label:"Audit Log",    iconEl:Icon.list(T.textMuted,13) },
    { id:"architecture", label:"Architecture", iconEl:Icon.layers(T.textMuted,13) },
  ];
  return (
    <div style={{ animation:"page-in 0.28s ease" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:"'DM Sans'", fontSize:26, fontWeight:700, color:T.text, letterSpacing:"-0.03em", marginBottom:4 }}>Good morning, Team</div>
        <div style={{ fontFamily:"'DM Sans'", fontSize:13, color:T.textMuted }}>Here's what your AI workforce accomplished today.</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
        {METRICS.map((m,i)=><MetricCard key={m.label} {...m} delay={i*70}/>)}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:customAgents.length>0?16:22 }}>
        {Object.entries(AGENT_ROLES).map(([role,data])=>(
          <AgentCard key={role} role={role} data={data} isActive={activeAgents[role]} overrides={agentOverrides[role]}
            onToggle={()=>toggleAgent(role)}
            onEdit={()=>setEditingBuiltin({ role, data })}
            onDelete={()=>setDeletingBuiltin({ role, data })}
            onCredentials={()=>setCredentialsAgent({ id:role, name:agentOverrides[role]?.name||data.name, credentials:agentOverrides[role]?.credentials||{}, isBuiltin:true, role })}
          />
        ))}
      </div>

      {customAgents.length > 0 && (
        <div style={{ marginBottom:22 }}>
          <SectionLabel icon={Icon.custom("#555",10)} label="Custom Agents" count={`${customAgents.length} deployed`}/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {customAgents.map(agent=>(
              <CustomAgentCard key={agent.id} agent={agent}
                onEdit={a=>setEditingCustom(a)} onDelete={a=>setDeletingCustom(a)}
                onCredentials={a=>setCredentialsAgent({ ...a, isBuiltin:false })}/>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1.45fr 1fr", gap:14, marginBottom:22 }}>
        <CollaborationFeed messages={feedMessages} demoRunning={demoRunning} onRun={runDemo}/>
        <Card style={{ display:"flex", flexDirection:"column", height:520 }}>
          <SlidingTabs tabs={TABS} active={activeTab} onChange={setActiveTab}/>
          <div style={{ flex:1, padding:"12px 14px", overflowY:"auto" }}>
            {activeTab==="audit"&&<AuditLog/>}
            {activeTab==="architecture"&&<NodeGraph/>}
          </div>
        </Card>
      </div>

      <div style={{ borderRadius:18, background:"rgba(255,255,255,0.64)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:`1px solid rgba(255,255,255,0.88)`, borderLeft:`3px solid ${"#555"}`, padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, boxShadow:T.shadowMd, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:60, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle, ${"rgba(26,26,26,0.06)"}, transparent 70%)`, pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:13, position:"relative" }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"rgba(26,26,26,0.06)", border:`1px solid ${"rgba(26,26,26,0.13)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{Icon.globe("#555", 16)}</div>
          <div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:14, fontWeight:600, marginBottom:3, letterSpacing:"-0.015em", color:T.text }}>Built for India — Kerala AI Mission Hackathon 2026</div>
            <div style={{ fontFamily:"'DM Sans'", fontSize:12, color:T.textSub, lineHeight:1.6 }}>AI employees for 10M+ Indian SMBs · Powered by Lares.AI · Deploy in 60s · From ₹2,000/agent/month</div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0, position:"relative" }}>
          <span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:600, background:"rgba(26,26,26,0.06)", color:T.ink, border:`1px solid ${"rgba(26,26,26,0.13)"}`, padding:"3px 10px", borderRadius:99 }}>Workflow & Multi-Agent</span>
          <span style={{ fontFamily:"'DM Mono'", fontSize:8, color:T.textXmuted, letterSpacing:"0.07em", textTransform:"uppercase" }}>Team Lares.AI</span>
        </div>
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────
export default function LaresAIDashboard() {
  const [page, setPage] = useState("dashboard");
  const [prevPage, setPrevPage] = useState(null);
  const [activeAgents, setActiveAgents] = useState({ support:true, sales:true, devops:true });
  const [agentOverrides, setAgentOverrides] = useState({});
  const [customAgents, setCustomAgents] = useState([]);
  const [feedMessages, setFeedMessages] = useState([]);
  const [demoRunning, setDemoRunning] = useState(false);
  const [showDeploy, setShowDeploy] = useState(false);
  const [showCustomWizard, setShowCustomWizard] = useState(false);
  const [editingCustom, setEditingCustom] = useState(null);
  const [editingBuiltin, setEditingBuiltin] = useState(null);
  const [deletingCustom, setDeletingCustom] = useState(null);
  const [deletingBuiltin, setDeletingBuiltin] = useState(null);
  const [credentialsAgent, setCredentialsAgent] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeoutsRef = useRef([]);

  useEffect(() => { const iv=setInterval(()=>setCurrentTime(new Date()),1000); return ()=>clearInterval(iv); }, []);
  const toggleAgent = useCallback((role)=>setActiveAgents(p=>({...p,[role]:!p[role]})),[]);

  const navigateTo = (pg) => { setPrevPage(page); setPage(pg); };

  const runDemo = useCallback(() => {
    if (demoRunning) return;
    setDemoRunning(true); setFeedMessages([]);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = MULTI_AGENT_SCENARIO.map((msg,i)=>
      setTimeout(()=>{ setFeedMessages(prev=>[...prev,msg]); if(i===MULTI_AGENT_SCENARIO.length-1) setDemoRunning(false); }, msg.time)
    );
  }, [demoRunning]);
  useEffect(()=>()=>timeoutsRef.current.forEach(clearTimeout),[]);

  const handleCreateOrEditCustom = (form, agentId=null) => {
    if (agentId) {
      setCustomAgents(prev => prev.map(a => a.id===agentId ? { ...a, name:form.name, persona:form.persona, model:form.model, heartbeatEnabled:form.heartbeatEnabled, interval:form.interval, tasks:form.tasks } : a));
    } else {
      setCustomAgents(prev => [...prev, { id:Date.now(), name:form.name, persona:form.persona, model:form.model, heartbeatEnabled:form.heartbeatEnabled, interval:form.interval, tasks:form.tasks, credentials:{} }]);
    }
  };
  const handleDeleteCustom = (id) => setCustomAgents(prev => prev.filter(a => a.id !== id));
  const handleSaveCustomCredentials = (agentId, credentials) => {
    setCustomAgents(prev => prev.map(a => a.id===agentId ? { ...a, credentials } : a));
    setCredentialsAgent(prev => prev ? { ...prev, credentials } : prev);
  };
  const handleSaveBuiltinOverrides = (role, form) => {
    setAgentOverrides(prev => ({ ...prev, [role]: { ...prev[role], name:form.name, description:form.description, model:form.model, heartbeatEnabled:form.heartbeatEnabled, interval:form.interval, tasks:form.tasks } }));
  };
  const handleResetBuiltin = (role) => {
    setAgentOverrides(prev => { const next={...prev}; delete next[role]; return next; });
  };
  const handleSaveBuiltinCredentials = (role, credentials) => {
    setAgentOverrides(prev => ({ ...prev, [role]: { ...prev[role], credentials } }));
    setCredentialsAgent(prev => prev ? { ...prev, credentials } : prev);
  };
  const handleSaveCredentials = (agentId, credentials) => {
    const ca = credentialsAgent;
    if (!ca) return;
    if (ca.isBuiltin) handleSaveBuiltinCredentials(ca.role, credentials);
    else handleSaveCustomCredentials(agentId, credentials);
  };
  const handleDeployTemplate = (tpl) => {
    setCustomAgents(prev => [...prev, { id:Date.now(), name:tpl.name, persona:tpl.desc, model:"Claude Sonnet 4.6", heartbeatEnabled:true, interval:"Every 15 minutes", tasks:[], credentials:{} }]);
  };

  const activeCount = Object.values(activeAgents).filter(Boolean).length + customAgents.length;
  const openBuiltinCredentials = (role, data, overrides) => setCredentialsAgent({ id:role, name:overrides?.name||data.name, credentials:overrides?.credentials||{}, isBuiltin:true, role });

  const pageMeta = PAGE_META[page] || { label: page.charAt(0).toUpperCase() + page.slice(1), sub: "" };

  return (
    <div style={{ minHeight:"100vh", background:"#F4F5F7", color:T.text, fontFamily:"'DM Sans', system-ui, sans-serif", position:"relative" }}>
      {showDeploy && <DeployModal activeAgents={activeAgents} onClose={()=>setShowDeploy(false)} onDeploy={(role)=>setActiveAgents(p=>({...p,[role]:true}))} onCustom={()=>setShowCustomWizard(true)}/>}
      {(showCustomWizard||editingCustom) && <CustomAgentWizard onClose={()=>{ setShowCustomWizard(false); setEditingCustom(null); }} onCreate={handleCreateOrEditCustom} editAgent={editingCustom}/>}
      {editingBuiltin && <BuiltinAgentEditWizard role={editingBuiltin.role} data={editingBuiltin.data} overrides={agentOverrides[editingBuiltin.role]} onClose={()=>setEditingBuiltin(null)} onSave={handleSaveBuiltinOverrides}/>}
      {deletingCustom && <DeleteModal agent={deletingCustom} onClose={()=>setDeletingCustom(null)} onConfirm={handleDeleteCustom}/>}
      {deletingBuiltin && <BuiltinDeleteModal role={deletingBuiltin.role} data={deletingBuiltin.data} onClose={()=>setDeletingBuiltin(null)} onConfirm={handleResetBuiltin}/>}
      {credentialsAgent && <CredentialsModal agent={credentialsAgent} onClose={()=>setCredentialsAgent(null)} onSave={handleSaveCredentials}/>}

      <div style={{ position:"relative", zIndex:1, display:"flex", minHeight:"100vh" }}>
        <Sidebar activePage={page} onNavigate={navigateTo}/>

        <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
          <header style={{
            padding:"0 28px",
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            position:"sticky",
            top:0,
            zIndex:50,
            flexShrink:0,
            height:56,
            background:"transparent",
            backdropFilter:"none",
            WebkitBackdropFilter:"none",
            borderBottom:"none",
          }}>
            <div key={page} className="page-title-animate" style={{ display:"flex", alignItems:"baseline", gap:10 }}>
              <span style={{
                fontFamily:"'DM Sans'",
                fontSize:17,
                fontWeight:700,
                color:T.text,
                letterSpacing:"-0.025em",
                lineHeight:1,
              }}>{pageMeta.label}</span>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:11 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:T.green, boxShadow:`0 0 5px ${T.green}80` }}/>
                <span style={{ fontFamily:"'DM Sans'", fontSize:11, color:T.textMuted }}>Synced just now</span>
              </div>
              <div style={{ width:1, height:14, background:"rgba(200,195,225,0.45)" }}/>
              <span style={{ fontFamily:"'DM Mono'", fontSize:10, color:T.textXmuted }}>{currentTime.toLocaleTimeString()} IST</span>
              <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(26,26,26,0.06)", border:"1px solid rgba(26,26,26,0.12)", borderRadius:99, padding:"5px 12px" }}>
                <PulsingDot color={T.green}/>
                <span style={{ fontFamily:"'DM Sans'", fontSize:11, fontWeight:600, color:T.text, marginLeft:3 }}>{activeCount} agents live</span>
              </div>
              <button onClick={()=>setShowDeploy(true)} style={{ background:"#1a1a1a", border:"none", borderRadius:99, padding:"7px 16px", fontFamily:"'DM Sans'", fontSize:12, fontWeight:600, color:"#fff", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.18)", transition:"all 0.18s ease", display:"flex", alignItems:"center", gap:6 }}
                onMouseEnter={e=>{e.currentTarget.style.background="#333";e.currentTarget.style.transform="scale(1.03)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#1a1a1a";e.currentTarget.style.transform="scale(1)";}}>
                {Icon.plus("#fff",12)} Hire Agent
              </button>
            </div>
          </header>

          <main style={{ flex:1, padding:"26px 28px 26px", overflowY:"auto" }}>
            {page === "dashboard" && (
              <DashboardPage
                activeAgents={activeAgents} agentOverrides={agentOverrides} customAgents={customAgents}
                feedMessages={feedMessages} demoRunning={demoRunning} runDemo={runDemo}
                toggleAgent={toggleAgent}
                setEditingBuiltin={setEditingBuiltin} setDeletingBuiltin={setDeletingBuiltin}
                setCredentialsAgent={setCredentialsAgent} setEditingCustom={setEditingCustom}
                setDeletingCustom={setDeletingCustom} setShowDeploy={setShowDeploy}
              />
            )}
            {page === "agents" && (
              <AgentsPage
                activeAgents={activeAgents} agentOverrides={agentOverrides} customAgents={customAgents}
                onToggle={toggleAgent}
                onEdit={(role,data)=>setEditingBuiltin({role,data})}
                onDelete={(role,data)=>setDeletingBuiltin({role,data})}
                onCredentials={openBuiltinCredentials}
                onEditCustom={a=>setEditingCustom(a)}
                onDeleteCustom={a=>setDeletingCustom(a)}
                onCredentialsCustom={a=>setCredentialsAgent({...a,isBuiltin:false})}
                onHire={()=>setShowDeploy(true)}
                onNavigate={navigateTo}
              />
            )}
            {page === "templates" && (
              <TemplatesPage onDeploy={(tpl)=>{ handleDeployTemplate(tpl); setTimeout(()=>navigateTo("agents"),1600); }}/>
            )}
            {page === "channels" && <ChannelsPage/>}
            {page === "settings" && <SettingsPage/>}
          </main>
        </div>
      </div>
    </div>
  );
}
