'use strict'
//api methods in here!!

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/trina/bookmarks';

  //GET
  function getBookmarks(){
    fetch(BASE_URL)
      .then(response => response.json())
      .then(responseJson => console.log(responseJson))
      //now what can I do with responsJson???
    }
    getBookmarks();

  //POST (add)
  function addBookmarks(){

  }
  //PATCH (edit)
  function editBookmarks(){

  }
  //DELETE (delete)
  function deleteBookmarks(){

  }


export default {
  getBookmarks,
  addBookmarks,
  editBookmarks,
  deleteBookmarks
}