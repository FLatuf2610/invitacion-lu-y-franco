# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing for a wedding invitation ("invitación de casamiento"). Plain HTML + CSS + vanilla JS — no framework, no bundler, no package manager, no build step, no tests. Keep it that way unless the user asks otherwise.

Planned scope (per the user): static layout plus **three animations** and a **countdown** to the wedding date. Nothing more.

## Structure

- `index.html` — all markup
- `styles.css` — all styles
- `index.js` — countdown + animation logic
- `assets/` — images and SVGs exported from Figma (logos, photos, copy icon). Several filenames contain spaces (e.g. `1M1A7684 edit 1.png`); URL-encode them (`%20`) or quote them when referencing.

## Running

Open `index.html` directly in a browser, or serve the folder statically (e.g. `python3 -m http.server`) and visit `http://localhost:8000`.

## Working with the design

The design lives in Figma but there is no Dev Mode access. The user describes the layout step by step (spacing, fonts, colors, sizes) — follow those instructions literally rather than inventing design details, and ask when a value is missing.

UI copy is in Spanish.
