// Vercel Web Analytics initialization for static HTML
// This creates the analytics queue and loads the tracking script

(function() {
  // Initialize the analytics queue
  window.va = window.va || function() {
    (window.vaq = window.vaq || []).push(arguments);
  };

  // Detect environment
  var mode = 'production'; // Default to production for static sites
  window.vam = mode;

  // Create and inject the analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Append to head
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
})();
