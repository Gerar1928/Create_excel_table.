const rowsArr = [];

const setLimitOfRows = () => {
    const tableBody = document.querySelector('tbody');
    if (tableBody.childElementCount >= 9) {
        tableBody.innerHTML = '';
    }
};

const setPagButtons = () => {
    const buttonsArr = [];
    setLimitOfRows();
    for (let i = 1; i <= Math.ceil(rowsArr.length / 9); i++) {
        const button = document.createElement('button');
        button.classList.add('page-number');
        button.textContent = i;
        buttonsArr.push(button);
    }
    document.getElementById('page-buttons').innerHTML = '';
    buttonsArr.forEach(button => document.getElementById('page-buttons').appendChild(button));
};

const handlePagination = (e) => {
    if (e.target.classList.contains('page-number')) {
        if (document.querySelector('table').childElementCount) {
            let pageNumber = +e.target.textContent;
            document.querySelector('tbody').innerHTML = '';
            pageNumber--;
            const start = 9 * pageNumber;
            const end = start + 9;
            const pageRows = rowsArr.slice(start, end);
            pageRows.forEach(row => document.querySelector('tbody').appendChild(row));
        } else {
            e.target.remove();
        }
    }
};

export {
        setPagButtons, rowsArr, handlePagination,
    };
