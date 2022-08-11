const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

/**
 * Get data from Local Storage
 * @param {string} key - Data key. Can be selected-movie-data or selected-seats-movieXX (XX = movie ID).
 * @returns {(Array|Object|null)} Object with selected seats indexes, selected movie or null if the key is not set.
 */
const getData = (key) => {
    const data = localStorage.getItem(key);

    if (data)
        return JSON.parse(data)
    else
        return null;
};

/**
 * Save selected movie infos (index and price) in Local Storage
 * @param {Object} movieData Object with movie data. Eg.: {'index': 0, 'price': '10'}
 */
const setMovieData = (movieData) => {
    localStorage.setItem('selected-movie-data', JSON.stringify(movieData));
};

/**
 * Save selected seats in Local Storage
 * @param {Array} seatsIndexes Array of selected seats
 */
const setSeatsData = (seatsIndexes, movieID) => {
    localStorage.setItem(`selected-seats-movie${movieID}`, JSON.stringify(seatsIndexes));
};

/**
 * Update seat count and total
 */
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    // Copy selected seats into array, Map through array and Return a new array indexes
    // const seatsIndexes = [...selectedSeats].map((seat) => {
    //     return [...seats].indexOf(seat);
    // });

    // setSeatsData(seatsIndexes, movieSelect.selectedIndex);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
};

/**
 * Load data from Local Storage and populate UI
 */
 const populateUI = () => {
    const selectedSeats = getData(`selected-seats-movie${movieSelect.selectedIndex}`);
    const selectedMovie = getData('selected-movie-data');

    if (selectedMovie !== null && Object.keys(selectedMovie).length > 0) {
        movieSelect.selectedIndex = selectedMovie.index;
        ticketPrice = +selectedMovie.price;
    }

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    updateSelectedCount();
};

const loadSeatsData = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsDataStorage = getData(`selected-seats-movie${movieSelect.selectedIndex}`);

    selectedSeats.forEach((seat) => {
        seat.classList.toggle('selected');
    });

    if (seatsDataStorage !== null && seatsDataStorage.length > 0) {
        seats.forEach((seat, index) => {
            if (seatsDataStorage.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

const updateLocalStorage = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndexes = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    setSeatsData(seatsIndexes, movieSelect.selectedIndex);
}

/** Seat click event **/
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
        updateLocalStorage();
    }
});

/** Movie select event **/
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    loadSeatsData();
    updateSelectedCount();
    setMovieData({
        'index': e.target.selectedIndex,
        'price': e.target.value
    });
})

populateUI();