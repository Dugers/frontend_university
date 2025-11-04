const goTopButtons = document.querySelectorAll('.go-top__button');
goTopButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }),
);
