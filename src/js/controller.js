import * as model from './model.js';
import recipeView from './views/recipeView.js';
import Fraction from 'fractional';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// these two imports are for polyfill (like async/ await and ES classes to work on older browser)
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// import { construct } from 'core-js/fn/reflect';
// import { search } from 'core-js/fn/symbol';

// this will not reload the whole page each time means
// it is not real js but it comes from parcel
if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    // rendering the spinner
    recipeView.renderSpinner();

    // 1) loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

// control search results
const controlSearchResults = async function () {
  try {
    // Render spinner
    resultsView.renderSpinner();

    // 0) update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search Results
    await model.loadSearchResults(query);

    // 3) Render the search Results

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // rendering the pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = async function (goto) {
  try {
    // render NEW results
    resultsView.render(model.getSearchResultsPage(goto));

    // rendering the pagination NEW buttons
    paginationView.render(model.state.search);
  } catch (err) {
    alert(err);
  }
};

const controlServings = function (newSerings) {
  model.updateServings(newSerings);

  // recipeView.render(model.state.recipe);

  // only change the text in the whole recipe
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // Add/Delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // render update bookmarke
  recipeView.update(model.state.recipe);

  // renderBookmar
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // render spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // show success message
    addRecipeView.successMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // we can also use history API for going back and forward
    // history.back()

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    // render the new uploaded recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(`❤ ${err}`);
    addRecipeView.renderError(err.message);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const newFeautre = function () {
  console.log('welocme to the pizza store');
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHanlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeautre();
};
init();
