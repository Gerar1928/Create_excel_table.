import { addHeaderAttrs, dataAttrs, setInitialRows } from './set-initial-rows.js';

const handleModal = () => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const isModalOn = modal.classList.contains('active');
    const isOverlayOn = overlay.classList.contains('active');

    if (isModalOn && isOverlayOn) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
};

const addNewCells = (text, type) => {
    return (row, index) => {
        const newCell = document.createElement('td');
        if (index === 0) {
            const setHeaderAttrs = addHeaderAttrs(text, type);
            row.appendChild(setHeaderAttrs(newCell));
        } else {
            const setDataAttrs = dataAttrs;
            row.appendChild(setDataAttrs(newCell, type));
        }
    };
};

const setNewColumn = (text, type) => {
    const rows = [...document.querySelectorAll('tr')];
    const setNewCellsAttrs = addNewCells(text, type);
    rows.forEach(setNewCellsAttrs);
    handleModal();
};

const handleForm = (ev) => {
    ev.preventDefault();

    const type = document.querySelector('[name="types"]').value;
    const text = document.querySelector('[name="header"]').value;
    const hasRows = document.querySelector('table').children.length;

    hasRows
        ? setNewColumn(text, type)
        : setInitialRows(text, type);

    document.querySelector('form').reset();
};

export { handleModal, handleForm };
