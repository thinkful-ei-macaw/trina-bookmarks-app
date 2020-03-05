'use strict';
import store from './store.js';
import api from './api.js';


//////////////////////////////////template generators/////////////////////////

//Initial startup page with an 'add' button and filter selector
//the code inside the <ul> fetches data from the server and displays is as <li>'s
function generateMainHtml(bookmarkStr){
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
 ${bookmarkStr}
</ul>
`};

//Expanded displays additional details of the selected bookmark
//such as the url, and desctiption
//should not display a whole new page, rather a different <li> get inserted into <ul>
//I think I can accomplish this in the generateBookmarkElem() and do away with this completely
// bookmarks.expanded: TRUE, adding: false, error: null, filter: 0
function generateExpandedHtml(){
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

//New page that displays forms allowing users to create a new bookmark
//adding: TRUE, error: null, filter: 0
function generateCreateNewHtml(){        
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
  <fieldset class="create-boomkark" id="bottom-buttons">
    <button type="button" class="cancel-button">Cancel</button>
    <button type="submit" class="create-button">Create</button>
  </fieldset>
</form>`;
}

//create bookmark list element that gets displayed on the page
//check the bookmark's expanded value and create two version of <li> for T or F
function generateBookmarkElem(bookmark){
  let bookmarkTitle = `<span>${bookmark.title}.....Rating: ${bookmark.rating}</span>`;
  //need to check the rating value of the bookmark, it's below the set filter, don't displat it
  //otherwise:
  return `
  <li class="list-item" id=${bookmark.id}>
    <h2>${bookmark.title}</h2>
    <p>${bookmark.rating}</p>
    <button class="delete-button">Delete</button>
  </li>
  `;
}

//I don't completely understand what this is for...
//joins something togther..
function generateBookmarkStr(bookmarkList){
  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElem(bookmark));
  return bookmarks.join('');
}

//updates the dom based on changes made to the store!
//see console log statements for store properties to check for
//bookmarks vs store.bookmarks ?????
function render(){
  let bookmarks = [...store.bookmarks];
  console.log(bookmarks)
  const bookmarkStr = generateBookmarkStr(bookmarks);
  // also check for value of error, filter, and expanded!
  if (store.adding === false){
       $('main').html(generateMainHtml(bookmarkStr));   
  } else if (store.adding === true)  {
       $('main').html(generateCreateNewHtml());
  };
  console.log('renderig...');
  console.log(`Bookmarks: ${store.bookmarks, bookmarks}`)
  console.log(`adding: ${store.adding}`);
  console.log(`error: ${store.error}`);
  console.log(`filter: ${store.filter}`);
  console.log(`expanded:${store.bookmarks.expanded}`)
  return;
};

/////////////////////////////EVENT HANDLERS////////////////////////////
//....these should update the store properties but 
//should not directly manipulate the dom... That's what render() is for!!


//when a list item (bookmark) is clicked
//set bookmarks.expanded to TRUE!
    //then render will call the expandedHtml template fn
function handleExpandView(){
  $('main').on('click', '.list-item', function(event){
    store.expanded = true;
    render();
    console.log('list-item was clicked')
    });
}

//When a filter value is selected, 
//set the filter property to that value!
    //then render (or generate bookmarkStr) will sort through the bookmark ratings and display accordingly
function handleSetFilter(){
  let rating = $('.min-rating').val();
  store.bookmarks.rating = rating;
  render();
}

//when the add buttom is clicked, adding property is set to true
    //then render will call the generateCreateNew fn
function handleAddNewClick(){
  $('main').on('click', '.add-button', function(event){
    store.adding = true;
    render();
    console.log('add click handled');
  });
};

//converts the user input into a JSON object (I think)
function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

//when the user clicks 'Create' after typing in some data:
function handleCreateClick(){
  $('main').on('submit','.create-bookmark', function (event){
    event.preventDefault();
    //Store the inputs into a variable and convert in to JSON
    let formElement = $('.create-bookmark')[0];
    const newEntry = serializeJson(formElement);
    console.log(newEntry);
    //add the inputs to the server
    api.addBookmarks(newEntry)
    .then((newBookmark) => {
      //also add them to the bookmark array defined in store module
      store.addBookmark(newBookmark);
      //then set adding prop back to false since we are now done adding
      store.adding = false;
      console.log('store.bookmarks:', store.bookmarks);
      render()
    })
    .catch((error) => {
      store.sendError(error.message);
    })
  });
};

//when the user clicks 'cancel'
//adding gets changed to false
    //and render with call the mainHtml fn
function handleCancelClick(){
  $('main').on('click', '.cancel-button', function(event){
   store.adding = false;
   render(); 
   console.log('cancel click handled');
  }); 
  return;
};

//when delete is clicked, 
//call api.deletetookmarks to remove is from server
//and remove it from store.bookmarks 
function handleDeleteClick(){

}

function getBookmarkId(bookmark){
  return $(bookmark)
  .closest('.list-item')
  .attr('.bookmark-id');
}


  function bindEventListenders() {
    handleExpandView();
    handleSetFilter();
    handleAddNewClick();
    handleCreateClick();
    handleCancelClick();
    handleDeleteClick(); 
    getBookmarkId();
  }
  
export default {
  render,
  bindEventListenders
};