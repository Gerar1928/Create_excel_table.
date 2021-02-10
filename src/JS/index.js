import { setNewRow } from './scripts/create-new-row.js';
import { handleModal, handleForm } from './scripts/create-new-column.js';
import { handleDoubleClick, checkDataTypeEnter, handleRoot } from './scripts/cells-functions.js';
import { dragoverFunc, dragStarFunc, dragEndFunc } from './scripts/drag-and-drop.js';
import { handleDeleteBtn, deleteCell } from './scripts/delete-rows.js';

const newRowBtn = document.getElementById('newRow');
const newColumnBtn = document.getElementById('newColumn');
const deleteBtn = document.getElementById('delete');
const overlay = document.getElementById('overlay');
const newColumn = document.querySelector('form');
const root = document.getElementById('root');

newRowBtn.addEventListener('click', setNewRow);
newColumnBtn.addEventListener('click', handleModal);
deleteBtn.addEventListener('click', deleteCell);
overlay.addEventListener('click', handleModal);
newColumn.addEventListener('submit', handleForm);
root.addEventListener('dblclick', handleDoubleClick);
root.addEventListener('keypress', checkDataTypeEnter);
root.addEventListener('click', handleRoot);
root.addEventListener('dragover', dragoverFunc);
root.addEventListener('dragstart', dragStarFunc);
root.addEventListener('dragend', dragEndFunc);
root.addEventListener('change', handleDeleteBtn);
