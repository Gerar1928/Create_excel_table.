import { sortCells } from './sort-cells.js';
import { setDragAttrToRows } from './drag-and-drop.js';

const addDataToLocalStorage = () => {
    const tableContent = {
        row: [...document.querySelector('table').children].map((row, rowIndex) => {
            return {
                id: rowIndex,
                cells: [...row.children].filter(cell => cell.getAttribute('contenteditable'))
                    .map(cell => {
                        return {
                            text: cell.textContent,
                        };
                    }),
            };
        }),
    };

    localStorage.setItem('tableContent', JSON.stringify(tableContent));
};

const isNumber = (ev, num) => {
    const re = /^[0-9]+$/;
    if (!re.test(num)) {
        ev.preventDefault();
    }
};

const isEmail = (ev, email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(email)) {
        alert(`${email} is not a valid email address. Please try again`);
        ev.innerText = '';
    } else {
        const anchorTag = document.createElement('a');
        anchorTag.textContent = email;
        anchorTag.setAttribute('href', `mailto:${email}`);
        ev.append(anchorTag);
        ev.firstChild.remove();
    }
};

const isUrl = (ev, url) => {
    const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (!re.test(url)) {
        alert(`${url} is not a valid URL. Please try again`);
        ev.innerText = '';
    } else {
        const anchorTag = document.createElement('a');
        anchorTag.textContent = url;
        anchorTag.setAttribute('href', `${url}`);
        ev.append(anchorTag);
        ev.firstChild.remove();
    }
};

const checkDataTypeEnter = (ev) => {
    if (ev.key === 'Enter') {
        if (ev.target.className === 'email') {
            isEmail(ev.target, ev.target.innerText);
        } else if (ev.target.className === 'url') {
            isUrl(ev.target, ev.target.innerText);
        }
        ev.target.setAttribute('contenteditable', 'false');
    } else if (ev.target.className === 'number') {
        isNumber(ev, ev.key);
    }
};

const handleDoubleClick = (ev) => {
    if (ev.target.contentEditable === 'false') {
        ev.target.setAttribute('contenteditable', 'true');
    }
};

const handleRoot = (ev) => {
    if (ev.target.parentElement.className === 'first-row') {
        const firstRow = [...document.querySelectorAll('tr')[0].children];
        const setSortCells = sortCells(ev);
        firstRow.forEach(setSortCells);
    } else {
        setDragAttrToRows(ev);
    }
};

export {
    handleDoubleClick, checkDataTypeEnter, handleRoot, addDataToLocalStorage,
    };
