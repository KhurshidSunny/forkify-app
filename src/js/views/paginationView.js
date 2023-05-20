import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const gotoPage = +btn.dataset.goto;
      if (!btn) return;

      console.log(btn);
      console.log(gotoPage);

      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and ther are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto=${
        currentPage + 1
      } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto=${
        currentPage - 1
      }  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
            </button>`;
    }

    // other pages
    if (currentPage < numPages) {
      return `<button data-goto=${
        currentPage - 1
      }  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        
        <button data-goto=${
          currentPage + 1
        }  class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
        `;
    }
  }
}

export default new paginationView();
