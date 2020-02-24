'use strict'
import bookmarks from './bookmarks.js';

//create main function here that calls all other important functions



function main(){
//do all the things in here!!
bookmarks.render();
bookmarks.bindEventListeners();
}

$(main);