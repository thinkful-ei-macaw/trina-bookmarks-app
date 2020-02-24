'use strict'
import api from './api.js'

//store obj is populated on server
//for reference only
const store = {
  bookmarks:[
    {
      id:'',
      title:'',
      url:'',
      description:'',
      expanded:''
    }
  ],
  adding: false,
  error: null,
  filter: 0
}

//push to server
let bookmarks = [];



//here will be functions that directly manipulate the store object

function addBookmark(){
  //add obj to bookmarks[]
  // Will I need separate funcs. for each of 6 properties?
  //use fetch api
}

function deleteBookmark(){
  //remove obj from bookmarks[]
  //use delete api
}

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
  addBookmark,
  deleteBookmark,
  toggleAdding,
  toggleFilter,
  sendError
}