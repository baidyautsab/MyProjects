document.addEventListener('DOMContentLoaded', () => {
    // Define the number of rows to display per page
    const rowsPerPage = 7;
    let currentPage = 1;  // Initialize the current page to the first page
    let products = [];  // Initialize an empty array to hold the products data

    // Fetch the products data from the JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;  // Store the fetched data in the products array
            displayTable(products, currentPage, rowsPerPage);  // Display the first page of products
            setupPagination(products, rowsPerPage);  // Setup pagination based on the products data
        });

    // Function to display the products in the table for the current page
    function displayTable(items, page, rows) {
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';  // Clear the table body
        page--;  // Adjust page number to be zero-based

        // Calculate the start and end indices for slicing the products array
        let start = rows * page;
        let end = start + rows;
        let paginatedItems = items.slice(start, end);  // Get the subset of items for the current page

        // Loop through the paginated items and create table rows for each product
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
            tableBody.innerHTML += row;  // Append each row to the table body
        }
    }

    // Function to setup the pagination controls
    function setupPagination(items, rows) {
        const paginationWrapper = document.querySelector('.pagination');
        paginationWrapper.innerHTML = '';  // Clear existing pagination controls
        let pageCount = Math.ceil(items.length / rows);  // Calculate the total number of pages

        // Create a pagination button for each page
        for (let i = 1; i < pageCount + 1; i++) {
            let btn = paginationButton(i, items);  // Create a pagination button
            paginationWrapper.appendChild(btn);  // Append the button to the pagination wrapper
        }
    }

    // Function to create a pagination button
    function paginationButton(page, items) {
        let button = document.createElement('li');  // Create a new list item element
        button.classList.add('page-item');  // Add the 'page-item' class to the button
        button.innerHTML = `<a href="#" class="page-link">${page}</a>`;  // Set the button's inner HTML

        // Highlight the button if it corresponds to the current page
        if (currentPage == page) button.classList.add('active');

        // Add an event listener to the button to handle page changes
        button.addEventListener('click', function () {
            currentPage = page;  // Update the current page
            displayTable(items, currentPage, rowsPerPage);  // Display the table for the selected page

            // Remove the 'active' class from the previously active button
            let currentBtn = document.querySelector('.pagination li.active');
            currentBtn.classList.remove('active');

            // Add the 'active' class to the clicked button
            button.classList.add('active');
        });

        return button;  // Return the created button
    }
});
