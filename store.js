'use strict';
import api from './api.js';
let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

//here will be functions that directly manipulate the store object
function findById(id){
  return this.bookmarks.find(current => current.id === id);
};


function addBookmark(newBookmark){
  let obj = {...newBookmark, expanded: false}
  this.bookmarks.push(obj);
}

function deleteBookmark(id){
  this.bookmarks = this.bookmarks.filter(current => current.id !== id);
}

// function editBookmark(id, newData){
//   let current = this.findById(id);
//   Object.assign(current, newData);
// }

function filterBookmarks(){ 
  return this.bookmarks.filter(bookmark => bookmark >= this.filter)
}

function sendError(error){
  this.error = error;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  deleteBookmark,
  //editBookmark,
  filterBookmarks,
  sendError
}