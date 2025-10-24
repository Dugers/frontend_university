const dropdownsList = document.querySelectorAll('.dropdown');

dropdownsList.forEach((dropdown) =>
  dropdown.addEventListener('click', function () {
    this.classList.toggle('active');
  }),
);
