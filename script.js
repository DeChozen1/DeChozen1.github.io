const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const divider = document.querySelector('.project-divider');

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    cards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
    });

    if (divider) {
      divider.classList.toggle('hidden', !(filter === 'all' || filter === 'external'));
    }
  });
});
