import { RCGA_API } from '../../assets/api-client.js';
import { setHTML, escapeHTML } from '../security';
import { navigateTo } from '../navigation';

export function initPage(scope) {

  const tabLogin = document.getElementById('tab-login');
  const tabReg = document.getElementById('tab-register');
  const fLogin = document.getElementById('form-login');
  const fReg = document.getElementById('form-register');
  function show(which) {
    tabLogin.classList.toggle('active', which === 'login');
    tabReg.classList.toggle('active', which === 'register');
    fLogin.style.display = which === 'login' ? 'block' : 'none';
    fReg.style.display = which === 'register' ? 'block' : 'none';
  }
  scope.listen(tabLogin, 'click', () => show('login'));
  scope.listen(tabReg, 'click', () => show('register'));
  if (location.hash === '#register') show('register');

  scope.listen(document, 'change', event => {
    const target = event.target.closest('[data-change]');
    if (!target) return;
    const handlers = {
      h0: () => { window.applyLanguage ? window.applyLanguage(target.value) : null },
    };
    if (handlers[target.dataset.change]?.() === false) event.preventDefault();
  });

  scope.listen(document, 'click', event => {
    const target = event.target.closest('[data-click]');
    if (!target) return;
    const handlers = {
      h1: () => { document.getElementById('tab-register').click(); return false; },
      h2: () => { document.getElementById('tab-login').click(); return false; },
    };
    if (handlers[target.dataset.click]?.() === false) event.preventDefault();
  });

}
