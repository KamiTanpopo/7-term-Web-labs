function newCharacter(){
    fetch("https://randomuser.me/api/?results=2")
        .then((results) => {
            return results.json();
        })
        .then((response) => {
            const character = response.results[0];
            const person = new Person(
                character.picture,
                character.name.first,
                character.name.last,
                character.cell,
                character.location.city,
                character.phone);
            person.characters();
        });
}

class Person {
    constructor(picture, firstname, lastname, cell, city, phone) {
        this.picture = picture;
        this.firstname = firstname;
        this.lastname = lastname;
        this.cell = cell;
        this.city = city;
        this.phone = phone;
    }
    characters() {
        const character = document.createElement('div');
        character.id = 'character';

        const picture = document.createElement('img');
        picture.src = this.picture.large;
        character.appendChild(picture);

        const name = document.createElement('p');
        name.className = "text";
        name.innerHTML = `<b>Name:</b> ${this.firstname} ${this.lastname}`;
        character.appendChild(name);

        const cell = document.createElement('p');
        cell.className = "text";
        cell.innerHTML = `<b>Cell:</b> ${this.cell}`
        character.appendChild(cell);

        const city = document.createElement('p');
        city.className = "text";
        city.innerHTML = `<b>City:</b> ${this.city}`;
        character.appendChild(city);

        const phone = document.createElement('p');
        phone.className = "text";
        phone.innerHTML = `<b>Phone:</b> ${this.phone}`;
        character.appendChild(phone);

        document.getElementById('characters').appendChild(character);
    }
}
