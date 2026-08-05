document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      return;
    }

    const normalizedQuery = query.replace(/\s+/g, '-');
    const beach = document.getElementById(normalizedQuery);

    if (beach) {
      scrollToBeach(beach);
      return;
    }

    const matches = Array.from(document.querySelectorAll('.beach')).find((item) =>
      item.textContent.toLowerCase().includes(query)
    );

    if (matches) {
      scrollToBeach(matches);
    } else {
      alert('No beach matches that search.');
    }
  });

  function scrollToBeach(beachElement) {
    beachElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    beachElement.classList.add('highlight');

    setTimeout(() => {
      beachElement.classList.remove('highlight');
    }, 2000);
  }
});
