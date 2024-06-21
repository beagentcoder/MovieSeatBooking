//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Avengers", price: 10 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

const selectMovieEl = document.getElementById("selectMovie");

const movieNameEl = document.getElementById("movieName");

const moviePriceEl = document.getElementById("moviePrice");

const totalPriceElem = document.getElementById("totalPrice");

const allSeatCont = document.querySelectorAll("#seatCont .seat");

//   const seatContainerEl = document.querySelector('#seatCont');

const selectedSeatsHolder = document.querySelector("#selectedseatsHolder");

const continueBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");

moviesList.forEach((movie) => {
  const option = document.createElement("option");
  option.value = movie.price;
  option.textContent = `${movie.movieName} $${movie.price}`;
  selectMovieEl.appendChild(option);
});

// Add event listener to update movie details on selection
selectMovieEl.addEventListener("change", () => {
  const selectedOption = selectMovieEl.options[selectMovieEl.selectedIndex];
  movieNameEl.textContent = selectedOption.textContent.split("$")[0];
  moviePriceEl.textContent = selectedOption.value;
  updateTotalPrice();
});

function updateTotalPrice() {
  let selectedSeats = document.querySelectorAll(".seat.selected").length;
  // selectedSeats= selectedSeats-1;
  const moviePrice = Number(moviePriceEl.textContent);
  totalPriceElem.textContent = selectedSeats * moviePrice;
}

let initialSeatValue = 0;
allSeatCont.forEach((seat) => {
  const attr = document.createAttribute("data-seatid");
  attr.value = ++initialSeatValue;
  seat.setAttributeNode(attr);
});

const seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
let takenSeats = [];

const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");
seatContEl.forEach((seat) => {
  seat.addEventListener("click", () => {
    let seatId = JSON.parse(seat.dataset.seatid);
    let isSelected = seat.classList.contains("selected");
    if (seat.classList.contains('occupied')) {
      return; // Prevent action if seat is already occupied
  }
    // seat.classList.toggle("selected");
    if (!isSelected) {
      seat.classList.add("selected");
      takenSeats.push(seatId);
      takenSeats = [...new Set(takenSeats)];
    } else if (isSelected) {
      seat.classList.remove("selected");
      takenSeats = takenSeats.filter((id) => id !== seatId);
    }
    updateTotalPrice();
    // console.log(takenSeats);
    updateSeats();
  });
});

function updateSeats() {
  selectedSeatsHolder.innerHTML = ``;

  takenSeats.forEach((seat) => {
    const seatHolder = document.createElement("div");
    seatHolder.classList.add("selectedSeat");
    selectedSeatsHolder.appendChild(seatHolder);

    seatHolder.innerHTML = seat;
  });

  if (!takenSeats.length) {
    const spanEl = document.createElement("span");
    spanEl.classList.add("noSelected");
    spanEl.innerHTML = `NO SEAT SELECTED`;
    selectedSeatsHolder.appendChild(spanEl);
  }

  seatCount();
}
function seatCount() {
  const numberOfSeatEl = document.getElementById("numberOfSeat");
  numberOfSeatEl.innerHTML = takenSeats.length;
}

function updatePrice(price, seats) {
  const totalPriceEl = document.getElementById("totalPrice");
  let total = seats * price;
  totalPriceEl.innerHTML = `$ ${total}`;
}

// continue button event handlers

continueBtn.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  if (selectedSeats.length === 0) {
    alert("Oops no seat Selected");
  } else {
    alert("Yayy! Your Seats have been booked");
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");      
      seat.removeEventListener('click', () => {});
    });

    takenSeats = [];
    updateSeats();
    selectedSeatsHolder.textContent = "No seat Selected";
    totalPriceElem.textContent = 0;
  }
});
//  cancel button event handlers

cancelBtn.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  takenSeats = [];
  updateSeats();
  selectedSeatsHolder.textContent = "No seat Selected";
  totalPriceElem.textContent = 0;
});
