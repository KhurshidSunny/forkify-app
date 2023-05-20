import icons from 'url:../../img/icons.svg';
import View from './View.js';
import { updateServings } from '../model.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We could not find that recipe.please try anothe one!`;

  addHandlerRender(handler) {
    // adding hashchange event

    // if we want use controlRecipe function for many events then we will a lot addEventListener
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    // window.addEventListener('hashchange', handler);
    // window.addEventListener('load', handler);
  }

  // handler functions for updating servings
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const updatTo = btn.dataset.updateTo;

      if (+updatTo > 0) handler(+updatTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-bookmark');
      if (!btn) return;
      handler();
    });
  }

  _recipeIngredient(ing) {
    return ` <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${new Fraction(
        ing.quantity
      ).toString()}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description} 
      </div>
    </li>`;
  }
  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span> ${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings" data-update-to="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
      </div>

  
    <button class="btn--round btn-bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? `-fill` : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(ing => this._recipeIngredient(ing)).join('')}
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
}

//exporting the object
export default new RecipeView();
