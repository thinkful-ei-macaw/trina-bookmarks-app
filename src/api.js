'use strict'

//import bookmarks from "./bookmarks";

//api methods in here!!
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/trina/bookmarks';

  const apiFetch = function(...args){
    let error;
    return fetch(...args)
      .then(result => {
        if (!result.ok) {
          error = {code: result.status};

          if(!result.headers.get('content-type').includes('json')) {
            error.message = result.statusText;
            return Promise.reject(error);
        }
      }
      return result.json();
    })
    .then(data => {
      if (error){
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
  };

  //GET
  function getBookmarks(){
    console.log(apiFetch(BASE_URL))
    return apiFetch(BASE_URL)
    };

  //POST 
  function addBookmarks(bookmark){
    return apiFetch(BASE_URL, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: bookmark
    });
  };

  //PATCH (edit)
  function editBookmarks(id, updateData){
    const newData = JSON.stringify(updateData);
    return apiFetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: newData
    });
  };


  //DELETE (delete)
  function deleteBookmarks(id){
    return apiFetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
  };

  
  

export default {
  getBookmarks,
  addBookmarks,
  editBookmarks,
  deleteBookmarks
}