'use strict';
import api from './api.js';

//set variables that correspond to the store properties
let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

////////These functions manipulate data in the bookmarks array//////// 

//This should get the unique id given to each bookmark pushed to server
function findById(id){
  return this.bookmarks.find(current => current.id === id);
};

//capture everything passed in into an obj then push obj to bookmarks[]
function addBookmark(newBookmark){
  let obj = {...newBookmark, expanded: false}
  this.bookmarks.push(obj);
  //console.log(obj, 'was added to STORE')
}

function toggleExpand(bookmark){
  bookmarks.expanded = !bookmarks.expanded;
}

//remove 
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
  toggleExpand,
  deleteBookmark,
  //editBookmark,
  filterBookmarks,
  sendError
}