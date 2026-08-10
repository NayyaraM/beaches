document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  if (!searchForm || !searchInput) {
    return;
  }

  const normalizeQuery = (value) =>
    value
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  function scrollToBeach(beachElement) {
    beachElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    beachElement.classList.add('highlight');

    setTimeout(() => {
      beachElement.classList.remove('highlight');
    }, 2000);
  }

  function findBeachMatch(query) {
    const beaches = Array.from(document.querySelectorAll('.beach'));

    return beaches.find((beach) => {
      const text = normalizeQuery(beach.textContent);
      const id = normalizeQuery(beach.id);
      const dataSearch = normalizeQuery(beach.dataset.search || '');
      const searchTerms = [text, id, dataSearch].filter(Boolean);

      return searchTerms.some((term) => term.includes(query) || query.includes(term));
    });
  }

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = normalizeQuery(searchInput.value);
    if (!query) {
      return;
    }

    const beachesOnPage = document.querySelectorAll('.beach');
    const beach = findBeachMatch(query);

    if (beach) {
      const page = beach.dataset.page || 'beach.html';
      const beachKey = beach.dataset.beach || beach.id;

      if (page !== window.location.pathname.split('/').pop()) {
        window.location.href = page + '?beach=' + encodeURIComponent(beachKey) + '&query=' + encodeURIComponent(searchInput.value.trim());
        return;
      }

      scrollToBeach(beach);
      return;
    }

    if (beachesOnPage.length === 0 && window.location.pathname.endsWith('beach.html')) {
      window.location.href = 'index.html?query=' + encodeURIComponent(searchInput.value.trim());
      return;
    }

    alert('No beach matches that search.');
  });

  const urlParams = new URLSearchParams(window.location.search);
  const savedQuery = urlParams.get('query');
  const beachParam = urlParams.get('beach');

  if (savedQuery) {
    searchInput.value = savedQuery;
  }

  if (beachParam && window.location.pathname.endsWith('beach.html')) {
    const beachTitle = document.getElementById('beachTitle');
    const beachDescription = document.getElementById('beachDescription');
    const beachName = beachParam.replace(/-/g, ' ');

    if (beachTitle) {
      beachTitle.textContent = beachName.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    if (beachDescription) {
      beachDescription.textContent = 'This beach page is connected to the site search and is ready for more details about ' + beachName + '.';
    }

    if (savedQuery) {
      searchInput.value = savedQuery;
    }
  }

  if (savedQuery && !window.location.pathname.endsWith('beach.html')) {
    searchForm.dispatchEvent(new Event('submit'));
  }
});
