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

// این کامپوننت یک <script> خام را همان‌جا که در HTML قرار می‌گیرد اجرا می‌کند —
// یعنی قبل از این‌که React چیزی رندر کند، کلاس dark (اگر لازم بود) اضافه می‌شود.
// بدون این، صفحه یک لحظه با تم روشن فلش می‌زند و بعد به تاریک تغییر می‌کند.
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
