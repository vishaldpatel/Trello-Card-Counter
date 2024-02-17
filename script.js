// ==UserScript==
// @name         Trello List Counts
// @namespace    https://trello.com/
// @version      2024-02-17
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
            let count_span = '<span style="display: inline-block; position: absolute; right: 0px; padding-left: 5px; padding-right: 5px; background: rgb(120 120 120 / 50%); border-radius: 5px">'+list_count+'</span>';
            t_list.querySelector('h2').innerHTML = list_name+count_span;
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
