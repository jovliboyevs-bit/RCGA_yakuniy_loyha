import { RCGA_API } from '../../assets/api-client.js';
import { setHTML, escapeHTML } from '../security';
import { navigateTo } from '../navigation';

export function initPage(scope) {

  scope.listen(document, 'mouseover', event => {
    const target = event.target.closest('[data-mouseover]');
    if (!target) return;
    const handlers = {
      h0: () => { target.style.borderColor='var(--green-700)' },
      h2: () => { target.style.borderColor='var(--green-700)' },
      h4: () => { target.style.borderColor='var(--green-700)' },
      h6: () => { target.style.borderColor='var(--green-700)' },
      h8: () => { target.style.borderColor='var(--green-700)' },
    };
    if (handlers[target.dataset.mouseover]?.() === false) event.preventDefault();
  });

  scope.listen(document, 'mouseout', event => {
    const target = event.target.closest('[data-mouseout]');
    if (!target) return;
    const handlers = {
      h1: () => { target.style.borderColor='var(--ink-200)' },
      h3: () => { target.style.borderColor='var(--ink-200)' },
      h5: () => { target.style.borderColor='var(--ink-200)' },
      h7: () => { target.style.borderColor='var(--ink-200)' },
      h9: () => { target.style.borderColor='var(--ink-200)' },
    };
    if (handlers[target.dataset.mouseout]?.() === false) event.preventDefault();
  });

}
