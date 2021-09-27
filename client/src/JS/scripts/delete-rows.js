import { rowsArr } from './pagination.js';

const deleteCell = () => {
    const deleteBtn = document.getElementById('delete');
    const checkedCheckboxes = [...document.querySelectorAll('[type="checkbox"]')]
        .filter(checkbox => checkbox.checked)
        .forEach(checkbox => {
            if (checkbox.className === 'select-all') {
                [...document.querySelector('table').children].forEach(row => row.remove());
                rowsArr.splice(0, rowsArr.length);
                document.querySelectorAll('.page-number').forEach(btn => btn.remove());
            } else {
                const rowIndex = rowsArr.indexOf(checkbox.parentElement.parentElement);
                checkbox.parentElement.parentElement.remove();
                rowsArr.splice(rowIndex, 1);
                document.querySelector('tbody').innerHTML = '';

                if (rowsArr.length < 9) {
                    for (let i = 0; i < rowsArr.length; i++) {
                        document.querySelector('tbody').append(rowsArr[i]);
                    }
                } else {
                    for (let i = 0; i < 9; i++) {
                        document.querySelector('tbody').append(rowsArr[i]);
                    }
                }
            }
        });
        deleteBtn.classList.remove('active');
};

const handleDeleteBtn = () => {
    const deleteBtn = document.getElementById('delete');
    const checkedCheckboxes = [...document.querySelectorAll('[type="checkbox"]')].filter(checkbox => checkbox.checked);
    checkedCheckboxes.length !== 0
        ? deleteBtn.classList.add('active')
        : deleteBtn.classList.remove('active');
};

export { deleteCell, handleDeleteBtn };
