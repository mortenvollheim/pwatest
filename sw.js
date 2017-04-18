// Install the service worker.
this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			// The cache will fail if any of these resources can't be saved.
			return cache.addAll([
				// Path is relative to the origin, not the app directory.
				'/pwatest/',
				'/pwatest/index.html',
				'/pwatest/css/styles.css',
				'/pwatest/fonts/MaterialIcons-Regular.woff2',
				'/pwatest/js/script.js',
				'/pwatest/icons/ic-face.png',
				'/pwatest/icons/ic-face-large.png',
				'/pwatest/manifest.json'
			])
			.then(function() {
				console.log('Success! App is available offline!');
			})
		})
	);
});


// Define what happens when a resource is requested.
// For our app we do a Cache-first approach.
self.addEventListener('fetch', function(event) {
	event.respondWith(
	    // Try the cache.
	    caches.match(event.request)
    	.then(function(response) {
			// Fallback to network if resource not stored in cache.
			return response || fetch(event.request);
		})
  	);
});