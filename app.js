(() => {
  'use strict';

  const course = window.COURSE;
  const content = document.querySelector('#course-content');
  const navigation = document.querySelector('#course-navigation');
  const search = document.querySelector('#course-search');
  const progress = document.querySelector('#course-progress');
  const progressCount = document.querySelector('#progress-count');
  const videoStorageKey = 'ai-evals-guide-completed-v1';

  function element(tag, className = '', text = '') {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  if (!course?.sections?.length) {
    content.append(element('p', 'empty-state', 'Программа не загрузилась. Проверьте, что файл course-data.js находится рядом с index.html, и обновите страницу.'));
    return;
  }

  const kindText = { video: 'Видео', pdf: 'Документ PDF', slides: 'Слайды', link: 'Ссылка' };
  const videos = new Set();
  const sectionLinks = new Map();
  const completed = readCompleted();
  let activeSection = getSection();
  let activePlayer;

  for (const section of course.sections) {
    for (const group of section.groups) {
      for (const item of group.items) {
        if (item.kind === 'video') videos.add(item.id);
      }
    }
  }

  document.querySelector('#course-title').textContent = course.title;
  document.querySelector('#course-subtitle').textContent = course.subtitle || '';
  const meta = document.querySelector('#course-meta');
  const weeks = course.sections.filter(section => /^week-\d+$/.test(section.id)).length;
  meta.textContent = [weeks && `${weeks} ${plural(weeks, 'неделя', 'недели', 'недель')}`, videos.size && `${videos.size} ${plural(videos.size, 'запись', 'записи', 'записей')}`].filter(Boolean).join(' · ');
  meta.hidden = !meta.textContent;
  document.title = course.title;

  for (const section of course.sections) {
    const link = sectionLink(section, 'section-link');
    sectionLinks.set(section.id, link);
    navigation.append(link);
  }

  document.querySelector('.brand').href = sectionHref(course.sections[0]);
  document.querySelector('.brand').addEventListener('click', navigate);
  window.addEventListener('hashchange', handleLocationChange);
  search.addEventListener('input', render);
  updateProgress();
  render();

  function readCompleted() {
    try {
      const value = JSON.parse(localStorage.getItem(videoStorageKey) || '[]');
      return new Set(Array.isArray(value) ? value : []);
    } catch {
      return new Set();
    }
  }

  function storeCompleted() {
    try {
      localStorage.setItem(videoStorageKey, JSON.stringify([...completed]));
    } catch {
      // The current page can still show progress when storage is unavailable.
    }
  }

  function updateProgress() {
    const viewed = [...videos].filter(id => completed.has(id)).length;
    document.querySelector('#progress-box').hidden = videos.size === 0;
    progress.max = Math.max(videos.size, 1);
    progress.value = viewed;
    progressCount.textContent = `${viewed} из ${videos.size}`;
  }

  function plural(number, one, several, many) {
    if (number % 100 >= 11 && number % 100 <= 14) return many;
    const lastDigit = number % 10;
    if (lastDigit === 1) return one;
    if (lastDigit >= 2 && lastDigit <= 4) return several;
    return many;
  }

  function sectionHref(section) {
    return `#${encodeURIComponent(section.id)}`;
  }

  function getSection() {
    return course.sections.find(section => sectionHref(section) === location.hash) || course.sections[0];
  }

  function sectionLink(section, className) {
    const link = element('a', className, section.title);
    link.href = sectionHref(section);
    link.addEventListener('click', navigate);
    return link;
  }

  function navigate(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const section = course.sections.find(item => sectionHref(item) === event.currentTarget.hash);
    if (!section) return;
    if (location.hash !== sectionHref(section)) {
      try {
        history.pushState(null, '', sectionHref(section));
      } catch {
        location.hash = sectionHref(section);
      }
    }
    activeSection = section;
    search.value = '';
    render();
    content.focus({ preventScroll: true });
    content.scrollIntoView({ block: 'start' });
  }

  function handleLocationChange() {
    if (location.hash === '#course-content') return;
    activeSection = getSection();
    search.value = '';
    render();
  }

  function normalize(value) {
    return value.toLowerCase().replaceAll('ё', 'е').trim();
  }

  function matches(item, group, section, words) {
    const childTitles = (item.children || []).map(child => child.title).join(' ');
    const key = normalize([section.title, group.title, item.title, item.description, kindText[item.kind], childTitles].filter(Boolean).join(' '));
    return words.every(word => key.includes(word));
  }

  function render() {
    closePlayer();
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    for (const [id, link] of sectionLinks) {
      if (!words.length && id === activeSection.id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    if (words.length) renderSearch(words);
    else renderSection(activeSection);
  }

  function sectionHeader(title, subtitle) {
    const header = element('header', 'section-header');
    header.append(element('h2', '', title));
    if (subtitle) header.append(element('p', '', subtitle));
    return header;
  }

  function renderSection(section) {
    const parts = [sectionHeader(section.title, section.subtitle)];
    for (const group of section.groups) {
      if (group.items.length) parts.push(renderGroup(group.items, group.title));
    }
    const index = course.sections.indexOf(section);
    const footer = element('nav', 'section-footer');
    footer.setAttribute('aria-label', 'Следующий и предыдущий разделы');
    const previous = course.sections[index - 1];
    const next = course.sections[index + 1];
    if (previous) footer.append(sectionLink(previous, 'action-button'));
    if (next) footer.append(sectionLink(next, 'action-button primary next'));
    if (previous || next) parts.push(footer);
    content.replaceChildren(...parts);
  }

  function renderSearch(words) {
    const groups = course.sections.map(section => ({
      title: section.title,
      items: section.groups.flatMap(group => group.items.filter(item => matches(item, group, section, words)))
    })).filter(group => group.items.length);
    const count = groups.reduce((total, group) => total + group.items.length, 0);
    const status = count ? `${count} ${plural(count, 'материал', 'материала', 'материалов')}` : 'Совпадений нет';
    const header = sectionHeader('Результаты поиска', status);
    header.querySelector('p').setAttribute('role', 'status');
    const results = groups.map(group => renderGroup(group.items, group.title));
    if (count === 0) results.push(element('p', 'empty-state', 'Попробуйте название темы, урока или имя автора.'));
    content.replaceChildren(header, ...results);
  }

  function renderGroup(items, title) {
    const group = element('section', 'group');
    if (title) group.append(element('h3', 'group-title', title));
    const list = element('ul', 'item-list');
    for (const item of items) list.append(renderItem(item, title ? 'h4' : 'h3'));
    group.append(list);
    return group;
  }

  function getUrl(item) {
    try {
      const url = new URL(item.url, location.href);
      if (item.url && ['http:', 'https:', 'file:'].includes(url.protocol)) return url;
    } catch {
      // Keep the material unavailable when a link is malformed.
    }
    return null;
  }

  function isExternal(url) {
    return url.protocol !== 'file:' && (location.protocol === 'file:' || url.origin !== location.origin);
  }

  function resourceLink(item, label, download = false) {
    const url = getUrl(item);
    if (!url) return null;
    const link = element('a', 'action-button', label);
    link.href = url.href;
    link.setAttribute('aria-label', `${label} — ${item.title}`);
    if (download && !isExternal(url)) link.download = '';
    else {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  }

  function renderItem(item, titleTag) {
    const card = element('li', 'item-card');
    const row = element('div', 'item-row');
    const icon = element('span', 'item-icon');
    icon.dataset.kind = item.kind;
    icon.setAttribute('aria-hidden', 'true');
    const info = element('div', 'item-info');
    info.append(element(titleTag, 'item-title', item.title));
    const metadata = [kindText[item.kind], item.duration].filter(Boolean).join(' · ');
    if (metadata) info.append(element('p', 'item-meta', metadata));
    if (item.description) info.append(element('p', 'item-description', item.description));
    const actions = element('div', 'item-actions');

    if (item.kind === 'video' && /^[A-Za-z0-9_-]{11}$/.test(item.youtubeId) && getUrl(item)) actions.append(...videoButtons(item, card));
    else if (item.kind === 'pdf') {
      const open = resourceLink(item, 'Открыть PDF');
      const download = resourceLink(item, 'Скачать', true);
      if (open) actions.append(open);
      if (download && !isExternal(getUrl(item))) actions.append(download);
    } else {
      const url = getUrl(item);
      const download = item.kind === 'slides' && url && !isExternal(url);
      const action = resourceLink(item, download ? 'Скачать слайды' : 'Открыть', download);
      if (action) actions.append(action);
    }

    row.append(icon, info, actions);
    card.append(row);
    if (item.children?.length) {
      const attachments = element('ul', 'item-children');
      for (const child of item.children) {
        const url = getUrl(child);
        const download = child.kind === 'slides' && url && !isExternal(url);
        const attachment = resourceLink(child, child.title, download);
        if (!attachment) continue;
        const entry = element('li');
        entry.append(attachment);
        attachments.append(entry);
      }
      if (attachments.children.length) card.append(attachments);
    }
    return card;
  }

  function videoButtons(item, card) {
    const watch = element('button', 'action-button primary', 'Смотреть');
    watch.type = 'button';
    watch.setAttribute('aria-expanded', 'false');
    watch.setAttribute('aria-label', `Смотреть — ${item.title}`);
    watch.addEventListener('click', () => {
      if (activePlayer?.watch === watch) closePlayer();
      else openPlayer(item, card, watch);
    });

    const mark = element('button', 'action-button done');
    mark.type = 'button';
    updateMark(mark, item);
    mark.addEventListener('click', () => markVideo(item, mark, !completed.has(item.id)));
    return [watch, mark];
  }

  function updateMark(mark, item) {
    const viewed = completed.has(item.id);
    const label = viewed ? 'Снять отметку о просмотре' : 'Отметить просмотренным';
    mark.textContent = viewed ? '✓' : '○';
    mark.title = label;
    mark.setAttribute('aria-label', `${label} — ${item.title}`);
    mark.setAttribute('aria-pressed', String(viewed));
  }

  function markVideo(item, mark, viewed) {
    if (viewed) completed.add(item.id);
    else completed.delete(item.id);
    storeCompleted();
    updateMark(mark, item);
    updateProgress();
  }

  function openPlayer(item, card, watch) {
    closePlayer();
    const pane = element('div', 'player-pane');
    const iframe = element('iframe');
    iframe.title = item.title;
    iframe.src = `https://www.youtube-nocookie.com/embed/${item.youtubeId}`;
    iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    const footer = element('div', 'player-footer');
    const direct = resourceLink(item, 'Открыть на YouTube');
    if (direct) footer.append(direct);
    pane.append(iframe, footer);
    card.append(pane);
    watch.setAttribute('aria-expanded', 'true');
    watch.setAttribute('aria-label', `Свернуть видео — ${item.title}`);
    watch.textContent = 'Свернуть';
    activePlayer = { pane, watch, item };
  }

  function closePlayer() {
    if (!activePlayer) return;
    const { pane, watch, item } = activePlayer;
    pane.remove();
    watch.setAttribute('aria-expanded', 'false');
    watch.setAttribute('aria-label', `Смотреть — ${item.title}`);
    watch.textContent = 'Смотреть';
    activePlayer = undefined;
  }
})();
