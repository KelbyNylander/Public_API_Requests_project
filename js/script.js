let searchContainer = document.getElementsByClassName('search-container');
let gallery = document.getElementById('gallery');



fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => displayGallery(data))
    

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
    return data
 }


    function sayHi () {
        console.log('hi');
    };

let cards = document.getElementsByClassName('card');

//let cardArray = [...cards];

//let cardArray = Array.from(cards);

//let cardArray = [].slice.call(cards);

// let cardArray = []
// for (i=0; i<cards.length; i++) {
//     console.log(cards[i]);
//     cardArray.push(cards[i]);
// };

console.log(cards);
console.log(cardArray);
console.log(cardArray.length);

//gallery.addEventListener( 'click', sayHi);