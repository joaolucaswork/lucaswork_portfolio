// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const global = () => {
  function toggleTheme() {
    const currentTheme = document.body.getAttribute('element-theme');
    const newTheme = currentTheme === '1' ? '2' : '1';
    document.body.setAttribute('element-theme', newTheme);

    localStorage.setItem('theme', newTheme);
  }

  window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('element-theme', savedTheme);
    }
  });

  const changeModeLink = document.querySelector('.change-mode');
  changeModeLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleTheme();
  });
};
