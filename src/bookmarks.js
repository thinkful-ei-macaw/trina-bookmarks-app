'use strict'
import store from './store.js'
//these functions affect the visual page display!!!


// template generators
function generateMainHtml(){
  return `
  <h1> My Bookmarks</h1>
<div>
  <button type="button">+ADD</button>
  <select id="min rating">
    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
    <option value="5">5+</option>
    </option>
  </select>
</div>

<ul>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
</ul>`;
}

function generateExpandedHtml(){   // bookmarks.expanded: TRUE, adding: false, error: null, filter: 0
  return `
  <h1> My Bookmarks</h1>
<div>
  <button type="button">+ADD</button>
  <select id="min rating">
    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
    <option value="5">5+</option>
    </option>
  </select>
</div>

<ul>
  <li>
    <div class="expanded-bookmark">
      <h2>Title</h2>
      <button>
        <a href="url-here">Visit Site</a>
      </button>
      <p>
        Here is the description!
      </p>
    </div>
  </li>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
</ul>`;
}
function generateCreateNewHtml(){        //adding: TRUE, error: null, filf]ter: 0
  return `
  <h1>My Bookmarks</h1>
<form action="" method="">
  <fieldset>
    <label for="add-url">URL:</label>
    <input type="text" id="add-url">
    <label for="add-title">Title:</label>
    <input type="text" id="add-title">
  </fieldset>
  <fieldset id="add-rating">
    <input type="radio" id="1-star">
    <label for="1=star">1 Star</label>
    <input type="radio" id="2-stars">
    <label for="2-stars">2-Stars</label>
    <input type="radio" id="3-stars">
    <label for="3-stars">3 Stars</label>
    <input type="radio" id="4-stars">
    <label for="4-stars">4 Stars</label>
    <input type="radio" id="5-stars">
    <label for="5-stars">5 Stars</label>
  </fieldset>
  <textarea name="add-description" id="add-description" placeholder="Enter description" cols="30" rows="20S"></textarea>
  <fieldset>
    <button type="button">Cancel</button>
    <button type="submit">Create</button>
  </fieldset>
</form>`;
}

function render(){
  let bookmarks = [];
//update DOM according to store changes
$('main').html(generateMainHtml());
return;
}

//event handlers
function handleExpandView(){
  //click on bookmark item to 
  generateExpandedHtml();
}

function handleSetFilter(){
  //re-render bases on filter value
  store.toggleFilter;
}

function handleAddNewClick(){
  //click 'add' button to 
  generateCreateNewHtml();
}

function handleCreateNewClick(){
  //click create button to 
  store.addBookmark();
}

function handleCancelClick(){
  //click cancel button to return to main page
  generateMainHtml();
}

function handleDeleteClick(){
  //click to remove bookmark 
  store.deleteBookmark();
}

function bindEventListeners(){
  handleExpandView();
  handleSetFilter();
  handleAddNewClick();
  handleCreateNewClick();
  handleCancelClick();
  handleDeleteClick();
}

export default {
  render,
  bindEventListeners,
}