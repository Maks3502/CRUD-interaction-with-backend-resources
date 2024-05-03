const moviesTable = document.getElementById("moviesTable");

// Завантажте дані JSON
fetch('data.json')
    .then(response => response.json())
    .then(moviesData => {
        // Відобразіть дані в таблиці
        displayMovies(moviesData);
        
        // Додайте обробники подій для кнопок редагування та видалення
        moviesTable.addEventListener("click", function(event) {
            if (event.target.classList.contains("edit-btn")) {
                // Реагування на кнопку редагування
                const movieId = event.target.getAttribute("data-id");
                editMovie(movieId, moviesData);
            } else if (event.target.classList.contains("delete-btn")) {
                // Реагування на кнопку видалення
                const movieId = event.target.getAttribute("data-id");
                deleteMovie(movieId, moviesData);
            }
        });
    });

function displayMovies(moviesData) {
    const tbody = moviesTable.querySelector("tbody");
    tbody.innerHTML = ""; // Очистити попередні дані

    moviesData.movies.forEach(movie => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${movie.id}">Редагувати</button>
                <button class="delete-btn" data-id="${movie.id}">Видалити</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Функція для видалення фільму
function deleteMovie(id, moviesData) {
    moviesData.movies = moviesData.movies.filter(movie => movie.id !== parseInt(id));
    displayMovies(moviesData);
}

// Функція для редагування фільму
function editMovie(id, moviesData) {
    // Тут можна реалізувати логіку редагування фільму
    alert(`Редагуємо фільм з id ${id}`);
}
