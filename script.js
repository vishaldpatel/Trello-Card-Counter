// ==UserScript==
// @name         Trello List Counts
// @namespace    https://trello.com/
// @version      1.1
// @description  Add list counts to trello lists.
// @author       Vishal Patel
// @match        https://trello.com/*
// ==/UserScript==

(function() {
    'use strict';

    let TRELLO_URLS_REGEX = /^https:\/\/trello\.com\/b\/.*/;
    let observer = null;

    function updateCounts() {
        document.querySelectorAll('[data-testid="list"]').forEach((t_list) => {
            let list_count = t_list.querySelectorAll('li').length;
            let list_name = t_list.querySelector('[data-testid="list-name"]').nextSibling.value;
            let count_span = '<span style="display: inline-block; position: absolute; right: 0px; padding-left: 5px; padding-right: 5px; background: rgb(120 120 120 / 50%); border-radius: 5px">'+list_count+'</span>';
            t_list.querySelector('h2').innerHTML = list_name+count_span;
        });
    }

    function startObserver() {
        observer = new MutationObserver(mutations => {
            for(let mutation of mutations) {
                // examine new nodes, is there anything to highlight?

                if (mutation.target.nodeName === 'OL' && mutation.target.attributes[1].value === 'list-cards') {
                    updateCounts();
                }
            }
        });

        document.querySelectorAll('[data-testid="list"]').forEach((t_list) => {
            observer.observe(t_list, {childList: true, subtree: true});
        });
    }

    function observeLists() {
        // We only want to observe lists if we are in a Trello board
        const regex = new RegExp(TRELLO_URLS_REGEX);

        if (regex.test(window.location.href)) {
            if (observer !== null) {
                observer.disconnect();
                observer = null;
                setTimeout(() => {
                    updateCounts();
                    startObserver();
                }, 1500);
            } else {
                updateCounts();
                startObserver();
            }

        } else if (observer != null) {
            observer.disconnect();
            observer = null;
        }
    }

    function observeURL() {
        const regex = new RegExp(TRELLO_URLS_REGEX);
        window.addEventListener('pushstate', function () {
            observeLists();
        });
        window.addEventListener('popstate', function () {
            alert('pop');
            observeLists();
        });
    }

    window.onload = () => {
        observeLists(); // First init.
        observeURL(); // If the user moves between boards.
    }

})();
