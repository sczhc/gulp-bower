'use strict';

function init() {
    console.log('Init');
}

document.addEventListener('load', (e) => {
    console.log(e);
    init();
});