const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('kaaryab_theme') || 'system';
    var resolved = stored === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
