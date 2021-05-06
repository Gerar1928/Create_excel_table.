import { createCheckbox } from './set-initial-rows.js';
import { handleModal } from './create-new-column.js';
import { setPagButtons, rowsArr } from './pagination.js';

const addLastCellsAttrs = (newRow) => {
    return (cell) => {
        const cellClass = cell.classList.item(0);
        const cellAtrr = cell.getAttribute('contenteditable');
        const tableData = document.createElement('td');
        if (cellClass && cellAtrr) {
            tableData.classList.add(cellClass);
            tableData.setAttribute('contenteditable', 'false');
        }
        newRow.append(tableData);
    };
};

const createNewRow = (tableBody) => {
    const numOfRows = document.querySelector('table').children.length;
    const newRow = document.createElement('tr');
    const newCheckbox = createCheckbox();
    const setNewCellsAttrs = addLastCellsAttrs(newRow);

    if (document.querySelector('tbody').childElementCount) {
        const lastRowCells = [...document.querySelectorAll('tr')[numOfRows - 1].children];
        lastRowCells.forEach(setNewCellsAttrs);
    } else {
        [...rowsArr[0].children].forEach(setNewCellsAttrs);
    }

    tableBody.appendChild(newRow);
    newRow.firstChild.appendChild(newCheckbox);
    rowsArr.push(newRow);
    setPagButtons();
};

const setNewRow = () => {
    const tableBody = document.querySelector('tbody');
    const table = document.querySelector('table');
    const hasRows = table.children.length;

    hasRows
        ? createNewRow(tableBody)
        : handleModal();
};

export { setNewRow };
