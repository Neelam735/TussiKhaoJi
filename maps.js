// Shared helpers: build turn-by-turn direction links for Google Maps / Apple Maps.
// Leaving out the origin makes both apps start from the phone's current location.
(function () {
  const COORDS = /^\s*(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;

  function isIOS() {
    const ua = navigator.userAgent || '';
    // iPadOS 13+ reports itself as a Mac, so also check for touch support
    return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  }

  function clean(v) { return v == null ? '' : String(v).trim(); }

  // A destination is { name, address, lat, lng }. Returns null if it has nothing usable.
  function normalize(d) {
    d = d || {};
    const out = { name: clean(d.name), address: clean(d.address), lat: clean(d.lat), lng: clean(d.lng) };
    const okCoords = out.lat && out.lng && COORDS.test(`${out.lat},${out.lng}`) &&
      Math.abs(+out.lat) <= 90 && Math.abs(+out.lng) <= 180;
    if (!okCoords) { out.lat = ''; out.lng = ''; }
    return (out.name || out.address || out.lat) ? out : null;
  }

  // What we hand to the maps app as the destination
  function destinationText(d) {
    if (d.lat && d.lng) return `${d.lat},${d.lng}`;
    return [d.name, d.address].filter(Boolean).join(', ');
  }

  function googleDirections(d) {
    return 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=' +
      encodeURIComponent(destinationText(d));
  }

  function appleDirections(d) {
    // Classic maps.apple.com scheme: daddr = destination, no saddr = current location, dirflg=d = driving
    return 'https://maps.apple.com/?dirflg=d&daddr=' + encodeURIComponent(destinationText(d));
  }

  function directionsUrl(d, platform) {
    d = normalize(d);
    if (!d) return null;
    const p = platform || (isIOS() ? 'apple' : 'google');
    return p === 'apple' ? appleDirections(d) : googleDirections(d);
  }

  // Destination <-> query string, used by the QR link (go.html?name=..&address=..&lat=..&lng=..)
  function toQuery(d) {
    d = normalize(d);
    const p = new URLSearchParams();
    if (!d) return '';
    for (const k of ['name', 'address', 'lat', 'lng']) if (d[k]) p.set(k, d[k]);
    return p.toString();
  }
  function fromQuery(search) {
    const p = new URLSearchParams(search);
    return normalize({ name: p.get('name'), address: p.get('address'), lat: p.get('lat'), lng: p.get('lng') });
  }

  window.Maps = { isIOS, normalize, destinationText, googleDirections, appleDirections, directionsUrl, toQuery, fromQuery };
})();
