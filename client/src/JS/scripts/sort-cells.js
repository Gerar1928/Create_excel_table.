import { rowsArr } from './pagination.js';

const appendSortedColumn = (sortableCells) => {
    [...document.querySelectorAll('tr:not(.first-row)')].forEach(row => {
        row.remove();
    });

    if (rowsArr.length < 9) {
        for (let i = 0; i < rowsArr.length; i++) {
            document.querySelector('tbody').append(sortableCells[i]);
        }
    } else {
        for (let i = 0; i < 9; i++) {
            document.querySelector('tbody').append(sortableCells[i]);
        }
    }
};

const sortNumbers = (sortOrder, index) => {
    if (sortOrder === 'asc') {
        return (a, b) => {
            return +a.children[index].textContent - +b.children[index].textContent;
        };
    } else if (sortOrder === 'desc') {
        return (a, b) => {
            return +b.children[index].textContent - +a.children[index].textContent;
        };
    }
};

const sortLowestToHighest = (index) => {
    const sortableCells = rowsArr;
    const setSortNumber = sortNumbers('asc', index);
    sortableCells.sort(setSortNumber);
    appendSortedColumn(sortableCells);
};

const sortHighestToLowest = (index) => {
    const sortableCells = rowsArr;
    const setSortNumber = sortNumbers('desc', index);
    sortableCells.sort(setSortNumber);
    appendSortedColumn(sortableCells);
};

const sortLetters = (index) => {
    return (a, b) => {
    if (a.children[index].textContent > b.children[index].textContent)
        return 1;
    if (a.children[index].textContent < b.children[index].textContent)
        return -1;
    return 0;
    };
};

const sortAZ = (index) => {
    const sortableCells = rowsArr;
    const setSortLetters = sortLetters(index);
    sortableCells.sort(setSortLetters);
    appendSortedColumn(sortableCells);
};

const sortZA = (index) => {
    const sortableCells = rowsArr;
    const setSortLetters = sortLetters(index);
    sortableCells.reverse(setSortLetters);
    appendSortedColumn(sortableCells);
};

const setColumnsAscDesc = (header) => {
    if (header.classList.contains('sorted-asc')) {
        header.classList.remove('sorted-asc');
        header.classList.add('sorted-desc');
    } else if (header.classList.contains('sorted-desc')) {
        header.classList.remove('sorted-desc');
        header.classList.add('sorted-asc');
    }

    return header;
};

const sortCells = (ev) => {
    return (header, index) => {
        if (ev.target === header) {
            if (ev.ctrlKey && header.getAttribute('data-draggable') === 'true') {
                header.setAttribute('draggable', 'true');
            } else if (header.classList.contains('sort-by-number')) {
                if (header.classList.contains('sorted-asc')) {
                    sortLowestToHighest(index);
                    setColumnsAscDesc(header);
                } else if (header.classList.contains('sorted-desc')) {
                    sortHighestToLowest(index);
                    setColumnsAscDesc(header);
                }
            } else if (header.classList.contains('sort-by-text') || header.classList.contains('sort-by-url') || header.classList.contains('sort-by-email')) {
                if (header.classList.contains('sorted-asc')) {
                    sortAZ(index);
                    setColumnsAscDesc(header);
                } else if (header.classList.contains('sorted-desc')) {
                    sortZA(index);
                    setColumnsAscDesc(header);
                }
            }
        }
    };
};

export { sortCells };
