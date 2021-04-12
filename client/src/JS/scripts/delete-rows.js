const deleteCell = () => {
    const deleteBtn = document.getElementById('delete');
    const checkedCheckboxes = [...document.querySelectorAll('[type="checkbox"]')]
        .filter(checkbox => checkbox.checked)
        .forEach(checkbox => checkbox.className === 'select-all'
            ? document.querySelectorAll('tr').forEach(row => row.remove())
            : checkbox.parentElement.parentElement.remove());
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
