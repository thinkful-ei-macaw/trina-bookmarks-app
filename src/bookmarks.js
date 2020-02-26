'use strict'
import store from './store.js';
import api from './api.js';



// template generators
function generateMainHtml(){
  return `
  <h1> My Bookmarks</h1>
<div>
  <button type="button" class="add-button">+ADD</button>
  <select id="min rating">
    <option value "select>Filter by rating</option>
    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
    <option value="5">5+</option>
    </option>
  </select>
</div>

<ul>
  <li class ="expand">Title...Rating</li>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
  <li>Title...Rating</li>
</ul>`};

function generateExpandedHtml(){   // bookmarks.expanded: TRUE, adding: false, error: null, filter: 0
  return `
  <h1> My Bookmarks</h1>
<div>
  <button type="button" class="add-button" >+ADD</button>
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
    <button type="button" class="cancel-button">Cancel</button>
    <button type="submit" class="create-button">Create</button>
  </fieldset>
</form>`;
}

//updates the dom based on changes made to the store!
function render(){
  // also check for value of error, filter, and expanded!
  if (store.adding === false){
       $('main').html(generateMainHtml());   
  } else if (store.adding === true) {
       $('main').html(generateCreateNewHtml());
  }
  console.log('renderig...')
  console.log(`adding: ${store.adding}`);
  console.log(`error: ${store.error}`);
  console.log(`filter: ${store.filter}`);
  return;
};

//EVENT HANDLERS....these should update data in the store but should
//not directly manipulate the dom... That's what render is for!!

//should expand individual bookmark item when it's clicked on 
function handleExpandView(){
 
  return;
}

//Set filter value to <select> input
function handleSetFilter(){
  //change filter then render
}

//opens the 'add bookmark page'
function handleAddNewClick(){
  $('main').on('click', '.add-button', function(event){
    store.adding = true;
    render();
    console.log('add click handled');
  });
  return;
};

//add inputed data to the store....
function handleCreateNewClick(){
  $('main').on('click','.create-button', function (event){
    event.preventDefault();
  });
  return;
}

function handleCancelClick(){
  //click cancel button to return to main page
  $('main').on('click', '.cancel-button', function(event){
   store.adding = false;
   render(); 
   console.log('cancel click handled');
  }); 
  return;
}

function handleDeleteClick(){
  //click to remove bookmark 
}

  render();
  handleExpandView();
  handleSetFilter();
  handleAddNewClick();
  handleCreateNewClick();
  handleCancelClick();
  handleDeleteClick();

export default {
  render,
  handleExpandView,
  handleSetFilter,
  handleAddNewClick,
  handleCreateNewClick,
  handleCancelClick,
  handleDeleteClick
}