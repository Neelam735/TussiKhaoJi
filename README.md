# Tussi Khao Ji – Restaurant QR Scanner

A web page that scans a restaurant's QR code and opens the restaurant's location in Google Maps.

## Usage

Open `index.html` in a browser. To use the camera, the page must be served over **HTTPS** or from `localhost`, for example:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000. You can also scan a QR code from an image with **Scan image**.

## What the QR code can contain

| QR content | Result |
|---|---|
| Google Maps link (`maps.app.goo.gl/…`, `google.com/maps/…`, `g.page/…`) | Opened directly |
| `geo:28.6139,77.2090?q=Restaurant+Name` | Maps search for the name (or the coordinates) |
| `28.6139,77.2090` | Maps at those coordinates |
| `{"name": "...", "address": "...", "placeId": "..."}` | Maps search (pinned to the place ID if one is given) |
| Plain text, e.g. `Tussi Khao Ji, Amritsar` | Maps search for that text |
| Any other website link | Not opened (it isn't a location) |

**Tip for restaurant owners:** for the most accurate result, open your restaurant in Google Maps, tap **Share**, copy the link, and make a QR code from that link.

Scanning runs entirely in the browser. It uses the native `BarcodeDetector` when available and falls back to the bundled [jsQR](https://github.com/cozmo/jsQR) (Apache-2.0, `vendor/`).
