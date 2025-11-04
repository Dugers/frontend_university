const sliders = document.querySelectorAll('.slider');

sliders.forEach((slider) => {
  const items = Array.from(slider.querySelectorAll('.slider__item'));

  if (!items.length) {
    return;
  }

  const nextButtons = slider.querySelectorAll('.slider__next');
  const prevButtons = slider.querySelectorAll('.slider__prev');

  const collectActiveIndices = () =>
    items.reduce((indices, item, index) => {
      if (item.classList.contains('slider__item-active')) {
        indices.push(index);
      }
      return indices;
    }, []);

  let activeIndices = collectActiveIndices();
  let visibleCount = activeIndices.length || 1;

  if (visibleCount > items.length) {
    visibleCount = items.length;
  }

  let startIndex = activeIndices.length ? activeIndices[0] : 0;

  const applyActiveWindow = (direction = 0) => {
    // Убираем все классы анимации
    items.forEach((item) => {
      item.classList.remove('slider__item-animating');
    });

    // Сначала убираем активный класс у всех элементов
    items.forEach((item) => {
      item.classList.remove('slider__item-active');
    });

    // Добавляем класс анимации и активный класс для новых элементов
    for (let offset = 0; offset < visibleCount; offset += 1) {
      const index = (startIndex + offset) % items.length;
      const item = items[index];

      // Добавляем класс анимации если есть направление
      if (direction !== 0) {
        item.classList.add('slider__item-animating');
      }

      // Добавляем активный класс
      item.classList.add('slider__item-active');
    }

    activeIndices = collectActiveIndices();
  };

  const isValidWindow = () => {
    if (!activeIndices.length || activeIndices.length !== visibleCount) {
      return false;
    }

    return activeIndices.every((index, position) => {
      const expected = (activeIndices[0] + position) % items.length;
      return index === expected;
    });
  };

  if (!isValidWindow()) {
    applyActiveWindow();
  } else {
    startIndex = activeIndices[0];
  }

  const shiftWindow = (direction) => {
    if (items.length <= visibleCount) {
      return;
    }

    const step = 1 * direction;
    let newStartIndex = startIndex + step;

    // Обработка перехода через границы с учетом направления
    if (newStartIndex < 0) {
      // Переход назад из начала - показываем последние элементы
      newStartIndex = items.length - visibleCount;
    } else if (newStartIndex > items.length - visibleCount) {
      // Переход вперед из конца - показываем первые элементы
      newStartIndex = 0;
    }

    startIndex = newStartIndex;
    applyActiveWindow(direction);
  };

  const showNext = () => shiftWindow(1);
  const showPrev = () => shiftWindow(-1);

  nextButtons.forEach((button) => {
    button.addEventListener('click', showNext);
  });

  prevButtons.forEach((button) => {
    button.addEventListener('click', showPrev);
  });
});
