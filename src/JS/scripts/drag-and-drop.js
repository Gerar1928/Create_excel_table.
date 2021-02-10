import { addDataToLocalStorage } from './cells-functions.js';

const createArrOfFirstcells = (row) => row.children[0];

const addDragAttrToRows = (ev) => {
    return (cell) => {
        if (ev.target === cell) {
            if (ev.ctrlKey) {
                cell.parentElement.setAttribute('draggable', 'true');
            }
        }
    };
};

const setDragAttrToRows = (ev) => {
    const allRows = [...document.querySelectorAll('tr:not(.first-row)')];
    const firstCells = allRows.map(createArrOfFirstcells);
    const setEvArg = addDragAttrToRows(ev);
    firstCells.forEach(setEvArg);
};

const insertColumn = (ev, draggable) => {
    const fRow = document.querySelector('.first-row');
    if (fRow.contains(ev.target)) {
        if (ev.target === fRow.firstChild) {
            if (ev.target.className !== 'select-all') {
                fRow.insertBefore(draggable, fRow.children[1]);
            }
        } else if (ev.target === fRow.lastChild) {
            fRow.append(draggable);
        } else {
            if (ev.target.className !== 'select-all') {
                fRow.insertBefore(draggable, ev.target);
            }
        }
    }
};

const moveRows = (ev, draggable) => {
    const table = document.querySelector('table');
    if (table.contains(ev.target)) {
        if (ev.target.className !== 'select-all') {
            if (ev.target.parentElement.className === 'first-row') {
                table.insertBefore(draggable, table.children[1]);
            } else if (table.lastChild.contains(ev.target)) {
                table.append(draggable);
            } else if (ev.target.parentElement.id !== 'root') {
                table.insertBefore(draggable, ev.target.parentElement);
            }
        }
    }
};

const dragColumn = () => {
    const draggable = document.querySelector('[draggable="true"]');

    if (draggable.getAttribute('data-draggable') === 'true') {
        const fRow = document.querySelector('.first-row');

        const draggableIndex = [...fRow.children].indexOf(draggable);
        const allRows = [...document.querySelectorAll('tr:not(.first-row)')];

        const columnElements = allRows.map(element => {
            return {
                text: element.children[draggableIndex].textContent,
                classNam: element.children[draggableIndex].className,
            };
        });

        localStorage.setItem('cellElements', JSON.stringify(columnElements));

        allRows.forEach(element => element.children[draggableIndex].remove());
    }
};

const dropColumn = () => {
    const draggable = document.querySelector('[draggable="true"]');

    if (draggable.getAttribute('data-draggable') === 'true') {
        const fRow = document.querySelector('.first-row');

        const draggableIndex = [...fRow.children].indexOf(draggable);

        const columnElements = JSON.parse(localStorage.getItem('cellElements'));

        [...document.querySelectorAll('tr:not(.first-row)')].forEach((element, index) => {
            const td = document.createElement('td');
            td.classList.add(columnElements[index].classNam);
            td.textContent = columnElements[index].text;
            td.setAttribute('contenteditable', 'false');

            element.insertBefore(td, element.children[draggableIndex]);
        });
    }

    addDataToLocalStorage();
};

const dragoverFunc = (ev) => {
    const draggable = document.querySelector('[draggable="true"]');
    draggable.getAttribute('data-draggable') === 'true'
        ? insertColumn(ev, draggable)
        : moveRows(ev, draggable);
};

const dragStarFunc = () => {
    dragColumn();
};

const dragEndFunc = (ev) => {
    dropColumn();
    ev.target.setAttribute('draggable', 'false');
};

export {
    setDragAttrToRows, dragoverFunc, dragStarFunc, dragEndFunc,
    };
