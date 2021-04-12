import { createCheckbox } from './set-initial-rows.js';
import { handleModal } from './create-new-column.js';
import { addDataToLocalStorage } from './cells-functions.js';

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

const createNewRow = (table) => {
    const numOfRows = document.querySelector('table').children.length;
    const lastRowCells = [...document.querySelectorAll('tr')[numOfRows - 1].children];
    const newRow = document.createElement('tr');
    const newCheckbox = createCheckbox();
    const setNewCellsAttrs = addLastCellsAttrs(newRow);
    lastRowCells.forEach(setNewCellsAttrs);
    table.append(newRow);
    newRow.firstChild.appendChild(newCheckbox);
    addDataToLocalStorage();
};

const setNewRow = () => {
    const table = document.querySelector('table');
    const hasRows = table.children.length;

    hasRows
        ? createNewRow(table)
        : handleModal();
};

export { setNewRow };
