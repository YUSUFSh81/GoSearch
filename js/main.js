import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults  } from "./dataFunctions.js";
import { buildSearchResults, clearStatsLine, setStatsLine, deleteSearchResults } from "./searchResults.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // set the focus
    setSearchFocus();

    // TODO: 3 listeners clear the text
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);

    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
};

const submitTheSearch = (event) => {
    event.preventDefault();
    // delete the search results
    deleteSearchResults();
    // process the search
    processTheSearch();
    // set the focus
    setSearchFocus();
};

const processTheSearch = async () => {
    // TODO: clear the stats line
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) {
        // TODO: build search results
        buildSearchResults(resultArray);
    }
    // TODO: set stats line
    setStatsLine(resultArray.length);
}

 