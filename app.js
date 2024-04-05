const movies = {
  "movies": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "genre": "Drama",
      "director": "Frank Darabont",
      "year": 1994
    },
    {
      "id": 2,
      "title": "The Godfather",
      "genre": "Crime",
      "director": "Francis Ford Coppola",
      "year": 1972
    },
    {
      "id": 3,
      "title": "Pulp Fiction",
      "genre": "Crime",
      "director": "Quentin Tarantino",
      "year": 1994
    },
    {
      "id": 4,
      "title": "The Dark Knight",
      "genre": "Action",
      "director": "Christopher Nolan",
      "year": 2008
    },
    {
      "id": 5,
      "title": "Inception",
      "genre": "Action",
      "director": "Christopher Nolan",
      "year": 2010
    }
  ]
};


const jsonMovies = JSON.stringify(movies);

async function makeRequest(method, url, data = null) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}


async function getMovies() {
  try {
    const movies = await makeRequest('GET', '/movies');
    console.log(movies);

  } catch (error) {
    console.error('Error:', error);
  }
}


async function addMovie(title, genre, director, year) {
  const newMovie = {
    title: title,
    genre: genre,
    director: director,
    year: year
  };
  await makeRequest('POST', '/movies', newMovie);
  console.log('New movie added successfully!');
}


async function updateMovie(id, updatedData) {
  await makeRequest('PUT', `/movies/${id}`, updatedData);
  console.log(`Movie with ID ${id} updated successfully!`);
}


async function partiallyUpdateMovie(id, updatedData) {
  await makeRequest('PATCH', `/movies/${id}`, updatedData);
  console.log(`Partial update for movie with ID ${id} applied successfully!`);
}


async function deleteMovie(id) {
  await makeRequest('DELETE', `/movies/${id}`);
  console.log(`Movie with ID ${id} deleted successfully!`);
}

getMovies(); 

const newMovieData = {
  title: "The Matrix",
  genre: "Science Fiction",
  director: "Lana Wachowski, Lilly Wachowski",
  year: 1999
};
addMovie(newMovieData.title, newMovieData.genre, newMovieData.director, newMovieData.year);


const updatedData = {
  title: "The Godfather: Part II",
  year: 1974
};
updateMovie(2, updatedData);


const partiallyUpdatedData = {
  director: "Quentin Tarantino (Writer and Director)"
};
partiallyUpdateMovie(3, partiallyUpdatedData);


deleteMovie(5);


document.getElementById('getMoviesBtn').addEventListener('click', async function(event) {
  event.preventDefault(); 
  await getMovies(); 
});


document.getElementById('addMovieForm').addEventListener('submit', async function(event) {
  event.preventDefault(); 
  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value;
  const director = document.getElementById('director').value;
  const year = document.getElementById('year').value;
  await addMovie(title, genre, director, year); 
});