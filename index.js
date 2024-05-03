const moviesTable = document.getElementById("moviesTable");


fetch('data.json')
    .then(response => response.json())
    .then(moviesData => {
       
        displayMovies(moviesData);
        
        
        moviesTable.addEventListener("click", function(event) {
            if (event.target.classList.contains("edit-btn")) {
                
                const movieId = event.target.getAttribute("data-id");
                editMovie(movieId, moviesData);
            } else if (event.target.classList.contains("delete-btn")) {
                
                const movieId = event.target.getAttribute("data-id");
                deleteMovie(movieId, moviesData);
            }
        });
    });

function displayMovies(moviesData) {
    const tbody = moviesTable.querySelector("tbody");
    tbody.innerHTML = ""; 

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


function deleteMovie(id, moviesData) {
    moviesData.movies = moviesData.movies.filter(movie => movie.id !== parseInt(id));
    displayMovies(moviesData);
}

// Функція для редагування фільму
function editMovie(id, moviesData) {
    // Тут можна реалізувати логіку редагування фільму
    alert(`Редагуємо фільм з id ${id}`);
}
