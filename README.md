# Pixeliano Admin App

> Companion mobile app for the Pixeliano platform — admin CRUD for posts and tags, on Android and iOS.

## Overview

Pixeliano Admin App is a cross-platform React Native client that lets the platform owner manage content for the Pixeliano photography platform from a phone. It is the mobile companion to the Pixeliano web dashboard: both talk to the same shared Express backend over JWT-authenticated REST endpoints. From the app you can sign in, create and edit image posts (picture, caption, tags), browse and delete existing posts, manage reusable default tags, and copy a personal syndication feed URL to share elsewhere.

> **Naming note:** internally the project is still named `rss_data_generator` (display name "RSS Generator"), reflecting its origins as an RSS/feed publishing tool. The product it serves is Pixeliano.

## Problem statement

Managing a content platform from a desktop dashboard alone is friction-heavy: photos usually live on a phone, and switching to a laptop to publish or fix a post breaks the flow. This app closes that gap by putting the platform's administrative CRUD on the device where the photos already are — including the ability to share an image straight from the Android gallery into the app and start a new post from it.

## Goals

- Give the platform owner full create/read/update/delete control over posts and tags from mobile.
- Run from a single codebase on both Android and iOS.
- Authenticate against the existing shared Express backend rather than introducing a separate auth system.
- Make publishing fast from the device: pick or share an image, caption it, tag it, publish.
- Provide a shareable per-user feed link for downstream syndication.

## Key features

- **Email/password sign-in and registration** against the shared backend, with email-existence verification and client-side validation of email format and password strength.
- **Persistent sessions** — the JWT is stored in `AsyncStorage`; on launch the app reads the token and routes to the dashboard (authenticated) or sign-in screen (not).
- **Post management (full CRUD)** — create a post from a picked image plus caption and tags, edit an existing post, view a post, and delete posts.
- **Image handling** — pick a photo with the native image picker, upload it to Cloudinary using a client-computed signed request, and render images through Cloudinary delivery URLs with width/height/quality transformations.
- **Tag system** — server-backed tag autocomplete as you type, a set of reusable "default tags" that can be auto-applied to new (and optionally edited) posts, plus tag deletion. An Instagram-oriented tag limit is configured.
- **Share-to-app on Android** — an `ACTION_SEND` `image/*` intent filter lets you share a photo from another app directly into Pixeliano Admin to begin a new post.
- **Per-user syndication feed** — the Settings screen builds a personal feed URL (`.../listing/get/<userId>/posts`) and copies it to the clipboard for sharing.
- **Dashboard** with a floating action button to start a new post and a post count fetched from the backend.

## Architecture & key decisions

The app is a React Navigation v5 stack of container screens (`SignIn`, `RegisterUser`, `Dashboard`, `InsertData`, `ViewPost`, `Settings`) composed from a library of presentational components. A thin services layer isolates all I/O — REST calls, auth storage, Cloudinary, clipboard, image picking, and validation — from the UI.

- **Single codebase, two platforms.** React Native was chosen so one team can ship the admin tool to both Android and iOS; native shells (`android/`, `ios/`) exist only to host the JS app, with iOS dependencies managed via CocoaPods.

- **Token-gated startup.** A bootstrap screen reads the stored JWT and resets the navigation stack to either `Dashboard` or `SignIn` (a helper rebuilds the stack so there is no "back" into a stale auth state). On Android, if an image was shared into the app it instead lands directly on the new-post screen pre-loaded with that image.

- **Two axios instances by intent.** An authenticated instance attaches `Authorization: Bearer <token>` via a request interceptor and is used for all post/tag endpoints; a separate Cloudinary instance carries a request transform that computes the upload signature. Pre-auth endpoints (verify-email, sign-in, register) deliberately use a plain axios call with no interceptor.

- **Client-side signed Cloudinary uploads.** Rather than proxying uploads through the backend, the app signs upload requests on-device. This is why the dependency list carries a large set of Node core-module polyfills (`react-native-crypto`, `stream`/`http`/`os`/`fs` browserify shims wired up via `rn-nodeify` and `shim.js`) — they back `crypto`'s SHA-1 signing in the React Native runtime. The trade-off is fewer backend round-trips at the cost of a heavier shim footprint and credentials living on the client.

- **Environment selection in code.** The target backend (local, Heroku dev, Heroku prod) and the matching Cloudinary upload preset are chosen by a `mode` switch in `config/config.js` rather than at runtime, keeping the build self-contained.

> Auth here is functional, not hardened: the JWT is persisted in `AsyncStorage` and the sign-in/verify endpoints pass credentials as query parameters. Treat it as an internal admin tool.

## Tech stack

- **React Native 0.61** with **React 16.9** (Android + iOS native shells)
- **React Navigation v5** (`@react-navigation/native`, `@react-navigation/stack`) with gesture-handler, screens, safe-area-context, and masked-view
- **axios** for REST; **qs** for request serialization
- **@react-native-community/async-storage** for token/session persistence
- **Cloudinary** image storage with client-side signing via **react-native-crypto** (+ `rn-nodeify` Node polyfills)
- **react-native-image-picker** for photo selection; **@react-native-community/clipboard** for the feed-link copy
- **@fortawesome/react-native-fontawesome** icons, **react-native-material-menu** (overflow menu), **react-native-splash-screen**
- **prop-types** for component typing
- Tooling: **ESLint** (`@react-native-community/eslint-config`), **Prettier**, **Flow**, **Jest** + **react-test-renderer**

The Express backend, JWT issuance, and tag/post APIs live in a separate repository (the shared `broadcast-rss` service); this repo is the mobile client only.

## Getting started

### Prerequisites

- A working [React Native 0.61 environment](https://reactnative.dev/docs/environment-setup) (Node, JDK, Android SDK, and Xcode + CocoaPods for iOS).
- Access to the shared backend and a Cloudinary account (the app expects its own API/preset configuration).

### Install

```bash
git clone https://github.com/harshdeepsingh13/Pixeliano-admin-app.git
cd Pixeliano-admin-app
npm install

# iOS only
cd ios && pod install && cd ..
```

### Configure

The backend URL and Cloudinary upload preset are selected by the `mode` switch (`dev` / `herokudev` / `prod`) in `config/config.js`.

Cloudinary **credentials are read from the environment at build time** (inlined by `babel-plugin-transform-inline-environment-variables`) and are never committed to the repo. Provide them before building — see `.env.example`:

```bash
CLOUDINARY_API_KEY=your_key CLOUDINARY_API_SECRET=your_secret npm run android
```

In production, set `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in your build environment / CI secrets.

> Note: this app signs Cloudinary uploads on the client, so these credentials are inlined into the shipped bundle and can still be extracted from a built app. Moving signing to a backend endpoint (see Future scope) is the durable fix; the environment change here removes the secrets from source control.

### Run

```bash
npm run start       # start the Metro bundler
npm run android     # build & launch on Android (react-native run-android)
npm run ios         # build & launch on iOS (react-native run-ios)
npm run android-dev # run on Android, then start Metro
```

### Other scripts

```bash
npm test            # Jest tests
npm run lint        # ESLint
npm run relase-apk  # assemble a release APK via Gradle (script name is spelled "relase-apk")
```

## Future scope

- Move Cloudinary signing and credentials off the client to a backend-issued signature endpoint.
- Send credentials over POST bodies (not query strings) and add token refresh/expiry handling.
- Extend the Android share intent flow to iOS via a share extension.
- Upgrade React Native / React Navigation to current versions and trim the Node polyfill surface.
- Add richer admin tooling (multi-image posts, search/filter, true content moderation across users).

## Author

Built by [Harshdeep Singh](https://theharshdeepsingh.com).
