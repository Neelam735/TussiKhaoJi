# Tussi Khao Ji – Restaurant Directions QR

Open the app to show the restaurant's QR code. When a customer scans it with their phone camera, the phone opens **Apple Maps (iPhone/iPad)** or **Google Maps (Android and others)** with **directions from their current location** to the restaurant.

## Pages

| File | What it does |
|---|---|
| `index.html` | Shows the restaurant's QR code, with Download PNG and Print buttons. You can edit the name, address and coordinates on the page. |
| `go.html` | The page the QR code links to. It detects the phone and redirects to Apple Maps or Google Maps directions. |
| `scan.html` | Optional in-app scanner (camera or image) that also opens directions. |
| `config.js` | **Set your restaurant's name, address and coordinates here.** |
| `maps.js` | Shared code that builds the directions links. |

## Setup

1. Edit `config.js` with the restaurant's details. Coordinates (`lat`, `lng`) give the most accurate directions: in Google Maps, long-press the restaurant's pin and copy the two numbers shown.
2. Put the site online, for example with GitHub Pages: **Settings → Pages → Deploy from a branch**, then pick this branch and `/ (root)`.
3. Open the site and print or download the QR code.

> **Note:** the iPhone→Apple Maps / Android→Google Maps choice only happens once the site is online, because the phone must be able to open `go.html`. When you open `index.html` from your computer (file or `localhost`), the QR code links straight to Google Maps directions instead. That still works on both iPhone and Android, but opens in Google Maps (or the browser) on iPhone.

## Running locally

Double-click `index.html`, or serve the folder with `npx serve` or `py -m http.server 8000`.

Libraries are bundled in `vendor/`: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT) and [jsQR](https://github.com/cozmo/jsQR) (Apache-2.0).
