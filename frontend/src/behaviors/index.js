import { RCGA_API } from '../../assets/api-client.js';
import { setHTML, escapeHTML } from '../security';
import { navigateTo } from '../navigation';

export function initPage(scope) {

  scope.listen(document, 'click', event => {
    const target = event.target.closest('[data-click]');
    if (!target) return;
    const handlers = {
      h0: () => { window.scrollTo({top:0,behavior:'smooth'}); return false; },
    };
    if (handlers[target.dataset.click]?.() === false) event.preventDefault();
  });

}
