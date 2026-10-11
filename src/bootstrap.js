const view = new URL(window.location.href).searchParams.get('view');

if (view === 'analytics') {
  import('./analytics.js');
} else {
  import('./main.js');
}
