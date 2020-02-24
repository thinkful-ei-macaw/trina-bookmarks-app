'use strict'
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
let bookmarks = [],



//here will be functions that directly manipulate the store object