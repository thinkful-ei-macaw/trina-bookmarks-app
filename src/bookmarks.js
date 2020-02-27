'use strict';
import store from './store.js';
import api from './api.js';



// template generators
function generateMainHtml(){
  return `
  <h1> My Bookmarks</h1>
<div class = "add-filter">
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
 <li>SOS</li>
</ul>
`};



//in <ul> above, I want to loop through store.bookmarks and display each as an <li>

function generateExpandedHtml(){   // bookmarks.expanded: TRUE, adding: false, error: null, filter: 0
  return `
  <h1> My Bookmarks</h1>
<div class = "add-filter">
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
</ul>`
};

function generateCreateNewHtml(){        //adding: TRUE, error: null, filf]ter: 0
  return `
  <h1>My Bookmarks</h1>
<form class="create-bookmark" method="post">
  <fieldset class="url-title">
    <label for="add-url">URL:</label>
    <input type="url" id="add-url" name="url" required>
    <label for="add-title">Title:</label>
    <input type="text" id="add-title" name="title" required>
  </fieldset>
  <fieldset id="add-rating">
    <input type="radio" id="1-star" value="1" name="rating" required>
    <label for="1=star">1 Star</label>
    <input type="radio" id="2-stars" value="2" name="rating" required>
    <label for="2-stars">2-Stars</label>
    <input type="radio" id="3-stars" value="3" name="rating" required>
    <label for="3-stars">3 Stars</label>
    <input type="radio" id="4-stars" value="4" name="rating" required>
    <label for="4-stars">4 Stars</label>
    <input type="radio" id="5-stars" value="5" name="rating" required>
    <label for="5-stars">5 Stars</label>
  </fieldset>
  <textarea name="desc" id="add-description" placeholder="Enter description" cols="30" rows="20S"></textarea>
  <fieldset>
    <button type="button" class="cancel-button">Cancel</button>
    <button type="submit" class="create-button">Create</button>
  </fieldset>
</form>`;
}

function generateBookmarkElem(bookmark){
  let bookmarkTitle = `<span>${bookmark.name}</span>`;
  //check the rating value of the bookmark, it's below the set filter, don't displat it
  //otherwise:
  return `
  <li>${bookmarkTitle}</li>'
  `;
}

function generateBookmarkStr(bookmarkList){
  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElem(bookmark));
  return bookmarks.join('');
}

//updates the dom based on changes made to the store!
function render(){
  let bookmarks = [...store.bookmarks];
  const bookmarkStr = generateBookmarkStr(bookmarks);



  // also check for value of error, filter, and expanded!
  if (store.adding === false){
       $('main').html(generateMainHtml());   
  } else if (store.adding === true) {
       $('main').html(generateCreateNewHtml());
  }
  console.log('renderig...');
  console.log(`Bookmarks: ${store.bookmarks}`)
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
  // store.filter = $('.add-rating').val();
  // render();
  // return;
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

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

//add inputed data to the store....
function handleCreateClick(){
  $('main').on('submit','.create-bookmark', function (event){
    event.preventDefault();
    //Store inputs in variable-- how to I capture all inputs? (title, url, etc?)
    let formElement = $('.create-bookmark')[0];
    const newEntry = serializeJson(formElement);
    console.log(newEntry);
    //add the inputs to the server
    api.addBookmarks(newEntry)
    .then((newBookmark) => {
      //also add them to the bookmark array
      store.addBookmark(newBookmark);
      store.adding = false;
      console.log(store.bookmarks);
      render()
    })
    .catch((error) => {
      store.sendError(error.message);
    })
  });
};

function handleCancelClick(){
  //click cancel button to return to main page
  $('main').on('click', '.cancel-button', function(event){
   store.adding = false;
   render(); 
   console.log('cancel click handled');
  }); 
  return;
};

function handleDeleteClick(){
  //click to remove bookmark 
}

  render();
  handleExpandView();
  handleSetFilter();
  handleAddNewClick();
  handleCreateClick();
  handleCancelClick();
  handleDeleteClick();

export default {
  render,
  handleExpandView,
  handleSetFilter,
  handleAddNewClick,
  handleCreateClick,
  handleCancelClick,
  handleDeleteClick
}