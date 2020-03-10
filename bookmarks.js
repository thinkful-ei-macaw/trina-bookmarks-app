'use strict';
import store from './store.js';
import api from './api.js';


//////////////////////////////////template generators/////////////////////////

//Initial startup page with an 'add' button and filter selector
//the code inside the <ul> fetches data from the server and displays is as <li>'s
function generateMainHtml(items){
  return `
  <h1> My Bookmarks</h1>
<div class = "add-filter">
  <button type="button" class="add-button">+ADD</button>
  <select id="min-rating">
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
${items}
</ul>
`};

//Expanded displays additional details of the selected bookmark
//such as the url, and desctiption
//should not display a whole new page, rather a different <li> get inserted into <ul>
//I think I can accomplish this in the generateBookmarkItem() and do away with this completely
// bookmarks.expanded: TRUE, adding: false, error: null, filter: 0


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
function generateBookmarkItem(bookmark){
  if (bookmark.expanded === true){
    return `
    <li class="list-item" data-id=${bookmark.id}>
      <h2 class="click-to-expand">${bookmark.title}</h2>
      <p>${bookmark.rating}</p>
      <p>${bookmark.desc}</p>
      <button class="url-button">
      <a href="${bookmark.url}">Visit site</a>
      </button>
      <button class="delete-button">Delete</button>
    </li>
    `;
  } else {
    return `
    <li class="list-item" data-id=${bookmark.id}>
      <h2 class="click-to-expand">${bookmark.title}</h2>
      <p>Rating: ${bookmark.rating}</p>
    </li>
    `;
  };
};

//maps over each <li> created and joins them together
function generateBookmarkList(bookmarkItem){
  const list = bookmarkItem.map((bookmark) => generateBookmarkItem(bookmark));
  return list.join('');
}

//gets the id of element that was clicked on and toggles expand for that item*********************************************
// function whatToExpand(e){
//   let itemId = getBookmarkId(e.currentTarget);
//   store.bookmarks.forEach(bookmark => {
//     if (bookmark.id === itemId){
//       store.toggleExpand;
//     }
//   })
// }

//updates the dom based on changes made to the store!
function render(){
  let bookmarks = store.filterBookmarks() //[...store.bookmarks];
  let items = generateBookmarkList(bookmarks);
  //need to add error functions........
  if (store.adding === true){
    $('main').html(generateCreateNewHtml());
  } else {
    $('main').html(generateMainHtml(items));
  }
  //console.log('rendering...');
  //console.log('filter is:', store.filter)
  // console.log(`Bookmarks:${store.bookmarks}`)
  // console.log(`adding: ${store.adding}`);
  // console.log(`error: ${store.error}`);
  return;
};

/////////////////////////////EVENT HANDLERS////////////////////////////
//....these should update the store properties but 
//should not directly manipulate the dom... That's what render() is for!!


//when a list item (bookmark) is clicked
//set bookmarks.expanded to TRUE!
    //then render will call the expandedHtml template fn ********************************************************
function handleExpandView(){
  $('main').on('click', '.list-item', function(event){
    let bookmark = getBookmarkId(event.currentTarget)
    store.toggleExpand(bookmark);
    render();
   });
}

//When a filter value is selected, ******************************************************************************
//set the filter property to that value!
    //then render (or generate bookmarkStr) will sort through the bookmark ratings and display accordingly
function handleSetFilter(){
  $('main').on('change', '#min-rating', function(event){
    store.filter = $('#min-rating').val();
    store.filterBookmarks();
    render();
  });
}

//when the add buttom is clicked, adding property is set to true
    //then render will call the generateCreateNew fn
function handleAddNewClick(){
  $('main').on('click', '.add-button', function(event){
    store.adding = true;
    render();
  });
};

//converts the user input into a JSON object
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
    //Store the inputs into a variable and convert it to JSON
    let formElement = $('.create-bookmark')[0];
    const newEntry = serializeJson(formElement);
    //add the inputs to the server
    api.addBookmarks(newEntry)
    .then((newBookmark) => {
      //also adds them to the bookmark array defined in store module
      store.addBookmark(newBookmark);
      //then set adding prop back to false since we are now done adding
        //and render will generate the main page
      store.adding = false;
      render()
    })
    .catch((error) => {
      store.sendError(error.message);
    })
  });
};

//when the user clicks 'cancel'
//adding prop gets changed to false
    //and render will call the mainHtml fn
function handleCancelClick(){
  $('main').on('click', '.cancel-button', function(event){
   store.adding = false;
   render(); 
  }); 
  return;
};

//when delete is clicked, 
//call api.deletetookmarks to remove it from server
//and remove it from store.bookmarks 
function handleDeleteClick(){
  $('main').on('click', '.delete-button', event => {
    //event.preventDefault();
    let id = getBookmarkId(event.target);
    api.deleteBookmarks(id)
      .then(function() {
        store.deleteBookmark(id);
        render();
      })
      .catch((error) => {
        store.sendError(error.message)
        render();
      })
  })
}

//this is to identify a specific bookmark
function getBookmarkId(bookmark){
  return $(bookmark)
  .closest('.list-item')
  .data('id');
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