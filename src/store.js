'use strict'
import api from './api.js';
let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

//here will be functions that directly manipulate the store object
function findById(id){
  return this.bookmarks(current => current.id === id);
};


function addBookmark(bookmark){
 // this.bookmarks.push(bookmark);
 
}

function deleteBookmark(id){
  //this.bookmarks = this.bookmarks.filter(current => current.id !== id);
}

////////////////?????????????/////////////////////////////
function toggleAdding(){
  //true or false
}

function toggleFilter(){ //???
 //does this directly modify the store??
 //should this func be in bookmarks.js?
}

function sendError(){

}

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  deleteBookmark,
  toggleAdding,
  toggleFilter,
  sendError
}