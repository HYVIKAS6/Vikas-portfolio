(() => {
  if (location.origin !== 'https://vikas-hy-portfolio.vercel.app') return;
  const id = 'G-KJ11WTRN6R', key = 'portfolio-analytics-consent';
  const read = () => { try { return localStorage.getItem(key); } catch { return null; } };
  let choice = read(), loaded = false;
  const start = () => {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    gtag('js', new Date());
    gtag('config', id, {allow_google_signals:false, allow_ad_personalization_signals:false, page_location:location.origin + location.pathname, page_referrer: (() => {try{return new URL(document.referrer).origin;}catch{return '';}})()});
    const script = document.createElement('script');
    script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  };
  const save = value => {
    choice = value;
    try { localStorage.setItem(key, value); } catch {}
    if (value === 'yes') start();
    else {
      window['ga-disable-' + id] = true;
      if (loaded) gtag('consent','update',{analytics_storage:'denied'});
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (/^_ga(?:_|$)/.test(name)) for (const domain of ['', '; domain=' + location.hostname]) document.cookie = name + '=; Max-Age=0; path=/' + domain;
      }
    }
    panel.hidden = true; settings.hidden = false; settings.focus();
    if (value === 'no' && loaded) location.reload();
  };
  const panel = document.createElement('section'); panel.className = 'pa-panel'; panel.setAttribute('aria-label','Analytics privacy choices');
  panel.innerHTML = '<strong>Analytics preferences</strong><p>Optional analytics helps me understand visits and project interest. <a href="/privacy.html">Privacy details</a>.</p><div><button type="button" data-choice="yes">Accept analytics</button><button type="button" data-choice="no">Decline</button></div>';
  const settings = document.createElement('button'); settings.type = 'button'; settings.className = 'pa-settings'; settings.textContent = 'Privacy';
  settings.onclick = () => { panel.hidden = false; settings.hidden = true; panel.querySelector('button').focus(); };
  panel.addEventListener('click', e => { const b = e.target.closest('[data-choice]'); if (b) save(b.dataset.choice); });
  panel.hidden = choice === 'yes' || choice === 'no'; settings.hidden = !panel.hidden;
  document.body.append(panel);
  // Keep the preference control outside React's hydrated root.
  const privacyFooter = document.createElement('div'); privacyFooter.className = 'pa-footer';
  privacyFooter.append(settings); document.body.append(privacyFooter);
  if (choice === 'yes') start();
})();
