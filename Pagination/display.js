document.addEventListener('DOMContentLoaded', () => {
    const rowsPerPage = 10;
    let currentPage = 1;
    let products = [];

    fetch('http://192.168.1.117:8080/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayTable(products, currentPage, rowsPerPage);
            setupPagination(products, rowsPerPage);
        });

    function displayTable(items, page, rows) {
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';
        page--;

        let start = rows * page;
        let end = start + rows;
        let paginatedItems = items.slice(start, end);

        for (let item of paginatedItems) {
            let row = `<tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.rating}</td>
                <td>${item.brand}</td>
                <td>${item.category}</td>
            </tr>`;
            tableBody.innerHTML += row;
        }
    }

    function setupPagination(items, rows) {
        const paginationWrapper = document.querySelector('.pagination');
        paginationWrapper.innerHTML = '';
        let pageCount = Math.ceil(items.length / rows);
        for (let i = 1; i < pageCount + 1; i++) {
            let btn = paginationButton(i, items);
            paginationWrapper.appendChild(btn);
        }
    }

    function paginationButton(page, items) {
        let button = document.createElement('li');
        button.classList.add('page-item');
        button.innerHTML = `<a href="#" class="page-link">${page}</a>`;

        if (currentPage == page) button.classList.add('active');

        button.addEventListener('click', function () {
            currentPage = page;
            displayTable(items, currentPage, rowsPerPage);

            let currentBtn = document.querySelector('.pagination li.active');
            currentBtn.classList.remove('active');

            button.classList.add('active');
        });

        return button;
    }
});
