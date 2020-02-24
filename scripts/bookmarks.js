'use strict'
import store from './store.js'
//these functions affect the visual page display!!!


// template generators
function generateMainHtml(){
  return ``;
}
function generateExtendedHtml(){
  return ``;
}
function generateCreateNewHtml(){
  return ``;
}

function render(){
//update DOM according to store changes
}


//event handlers
function handleExpandView(){
  //click on bookmark item to 
  generateExtendedHtml();
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