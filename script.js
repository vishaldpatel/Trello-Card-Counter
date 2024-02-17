// ==UserScript==
// @name         Trello List Counts
// @namespace    https://trello.com/
// @version      1.1
// @description  Add list counts to trello lists.
// @author       Vishal Patel
// @match        https://trello.com/b/*
// ==/UserScript==

(function() {
    'use strict';

    function updateCounts() {
        document.querySelectorAll('[data-testid="list"]').forEach((t_list) => {
            let list_count = t_list.querySelectorAll('li').length;
            let list_name = t_list.querySelector('[data-testid="list-name"]').nextSibling.value;
            t_list.querySelector('h2').innerText = list_name+" ("+list_count+")";
        });
    }

    function observeLists() {
        let observer = new MutationObserver(mutations => {
            for(let mutation of mutations) {
                // examine new nodes, is there anything to highlight?

                for(let node of mutation.addedNodes) {
                    // we track only elements, skip other nodes (e.g. text nodes)
                    if (!(node instanceof HTMLElement)) continue;
                    updateCounts()
                }
            }
        });

        document.querySelectorAll('[data-testid="list"]').forEach((t_list) => {
            observer.observe(t_list, {childList: true, subtree: true});
        });
    }

    window.onload = () => {
        updateCounts();
        observeLists();
    }

})();
