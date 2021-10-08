let body = document.querySelector('body');
let searchContainer = document.getElementsByClassName('search-container');
let gallery = document.getElementById('gallery');
let cards = document.getElementsByClassName('card');


// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

fetch('https://randomuser.me/api/?results=12') 
    .then(response => response.json())
    .then(data => {
        displayGallery(data)
        clickedModal(data.results)
    })
    .catch(error => (gallery.innerHTML += `<h3>There was an error fetching the data.</h3>`, error))

// ------------------------------------------
//  DISPLAY FUNCTIONS
// ------------------------------------------

//loops though fetched data and displays gallery
function displayGallery(data) {
    data.results.map( item => { 
        gallery.insertAdjacentHTML('beforeend', 
         `<div class="card">
            <div class="card-img-container">
                 <img class="card-img" src=${item.picture.medium} alt="profile picture">
            </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                    <p class="card-text">${item.email}</p>
                    <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
            </div>
        </div>`
        )
    })
 }

//puts selected card in body of HTML 
function displayModalWindow (profile) {
    body.insertAdjacentHTML('beforeend', 
        `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${profile.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${profile.name.first} ${profile.name.last}</h3>
                <p class="modal-text">${profile.email}</p>
                <p class="modal-text cap">${profile.location.city}</p>
                <hr>
                <p class="modal-text">${formatPhoneNumber(profile.phone)}</p>
                <p class="modal-text">${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state} ${profile.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatDob(profile.dob.date)}</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`)

let modalContainer = document.querySelector('.modal-container');
const modalCloseBtn = document.getElementById('modal-close-btn');
modalCloseBtn.addEventListener('click', () => {
    modalContainer.remove()
    });
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function clickedModal (data) {
    let cardArray = [...cards];
        for ( let i = 0; i < data.length; i++) {
            cardArray[i].addEventListener('click', () => {
                let cardData = data[i]
                displayModalWindow(cardData);
        })
    }
}

// ------------------------------------------
//  FORMATING FUNCTIONS
// ------------------------------------------

function formatPhoneNumber(profileNumber) {
  let cleaned = ('' + profileNumber).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };
  return profileNumber
  }

function formatDob(profileDOB) {
    const chars = profileDOB.split('');
    let dobArray = [];
    for ( i = 0; i <= 9; i++) {
        dobArray.push(chars[i]);
    }
    const dobString = dobArray.join('');
    return dobString
}
