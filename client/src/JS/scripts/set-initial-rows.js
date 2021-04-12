import { handleModal } from './create-new-column.js';
import { addDataToLocalStorage } from './cells-functions.js';

const selectAllBoxes = () => {
    const mainCheckbox = document.querySelector('.select-all');

    mainCheckbox.addEventListener('change', () => {
        if (mainCheckbox.checked) {
            const allCheckboxes = [...document.querySelectorAll('[type="checkbox"]:not(.select-all)')];
            allCheckboxes.forEach(checkbox => checkbox.checked = true);
        } else {
            const allCheckboxes = [...document.querySelectorAll('[type="checkbox"]:not(.select-all)')];
            allCheckboxes.forEach(checkbox => checkbox.checked = false);
        }
    });
};

const appendRowsToTable = (row) => {
    const table = document.querySelector('table');
    table.append(row);

    return table;
};

const dataAttrs = (cell, type) => {
    cell.classList.add(type);
    cell.setAttribute('contenteditable', 'false');

    return cell;
};

const headerAttrs = (text, type, cell) => {
    cell.textContent = text;
    cell.classList.add(`sort-by-${type}`, 'sorted-asc');
    cell.setAttribute('data-draggable', 'true');
    cell.setAttribute('contenteditable', 'false');

    return cell;
};

const addHeaderAttrs = (text, type) => (cell) => headerAttrs(text, type, cell);

const createCheckbox = () => {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');

    return checkBox;
};

const setInitialCheckboxes = (row, index) => {
    const newCheckbox = createCheckbox();
    if (index === 0) {
        newCheckbox.classList.add('select-all');
    }
    row.firstChild.appendChild(newCheckbox);

    return row;
};

const setInitialCells = (row) => {
    for (let i = 0; i <= 1; i++) {
        const tableData = document.createElement('td');
        row.appendChild(tableData);
    }
    return row;
};

const setInitialRows = (text, type) => {
    const newRows = [];

    for (let i = 0; i <= 1; i++) {
        const tableRow = document.createElement('tr');
        if (i === 0) {
            tableRow.classList.add('first-row');
        }
        newRows.push(tableRow);
    }
    newRows.forEach(setInitialCells);
    newRows.forEach(setInitialCheckboxes);

    const setHeaderAttrs = addHeaderAttrs(text, type);

    setHeaderAttrs(newRows[0].lastChild);

    const setDataAttrs = dataAttrs;

    setDataAttrs(newRows[1].lastChild, type);
    newRows.forEach(appendRowsToTable);
    handleModal();
    selectAllBoxes();
    addDataToLocalStorage();
};

export {
        createCheckbox, addHeaderAttrs, dataAttrs, setInitialRows,
    };
