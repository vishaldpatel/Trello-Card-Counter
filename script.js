// ==UserScript==
// @name         Trello List Counts
// @namespace    https://trello.com/
// @version      1.0
// @description  Add list counts to trello lists.
// @author       Vishal Patel
// @match        https://trello.com/b/*
// ==/UserScript==

(function() {
    'use strict';

    function addCounts() {
        document.querySelectorAll('[data-testid="list"]').forEach((t_list) => {
            let list_count = t_list.querySelectorAll('li').length;
            let list_name = t_list.querySelector('h2').innerText;
            t_list.querySelector('h2').innerText = list_name+" ("+list_count+")";
        });
    }

    window.setTimeout(function() {
        addCounts();
        //showCardNumbers();
    },2000);

})();
