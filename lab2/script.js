//--- Task 1 ---

function validateForm() {
    let isNotValid = false;
    const nameRegex = /[А-Я][а-я]+\s+[А-Я]\.\s+[А-Я]\./;
    const IDcardRegex =  /^[А-ЯІЇЄ|A-Z]{1,2}\s[№][0-9]{1,6}$/;
    const facultyRegex = /[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{4}/;
    const birthdateRegex = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/;
    const addressRegex = /^[м][.][ ][a-zA-Zа-яА-ЯІіЇїҐґЄє-]+/;

    const nameElem = document.getElementById('name');
    const name = nameElem.value
    if ( !nameRegex.test(name)) {
        alert("Введіть правильне ПІБ");
        isNotValid = true
        nameElem.style.border = '2px solid red'
    } else {
        nameElem.style.border = '2px solid green'
    }

    const IDcardElem = document.getElementById('IDcard');
    const IDcard = IDcardElem.value
    if (IDcard == null || IDcard.length != 10 || !IDcardRegex.test(IDcard)) {
        if (!isNotValid) {
            alert("Введіть правильну ID-card");
        }
        IDcardElem.style.border = '2px solid red'
        isNotValid = true
    } else {
        IDcardElem.style.border = '2px solid green'
    }
    
    const facultyElem = document.getElementById('faculty');
    const faculty = facultyElem.value
    if (faculty == null || faculty.length != 4 || !facultyRegex.test(faculty)) {
        if (!isNotValid) {
            alert("Введіть правильний факультет");
        }
        facultyElem.style.border = '2px solid red'
        isNotValid = true
    } else {
        facultyElem.style.border = '2px solid green'
    }

    const birthdateElem = document.getElementById('birthdate');
    const birthdate = birthdateElem.value
    if (birthdate == null || birthdate.length != 10 || !birthdateRegex.test(birthdate)) {
        if (!isNotValid) {
            alert("Введіть правильну дату народження");
        }
        birthdateElem.style.border = '2px solid red'
        isNotValid = true
    }else {
        birthdateElem.style.border = '2px solid green'
    }

    const addressElem = document.getElementById('address');
    const address = addressElem.value
    if (address == null || address.length < 4 || !addressRegex.test(address)) {
        if (!isNotValid) {
            alert("Введіть правильну адресу");
        }
        addressElem.style.border = '2px solid red'
        isNotValid = true
    } else {
        addressElem.style.border = '2px solid green'
    }
    
    if(!isNotValid){
        document.getElementById('name-value').innerHTML = name;
        document.getElementById('IDcard-value').innerHTML = IDcard;
        document.getElementById('faculty-value').innerHTML = faculty;
        document.getElementById('birthdate-value').innerHTML = birthdate;
        document.getElementById('address-value').innerHTML = address;   
        
        const responseBlock = document.getElementById('response-block');
        responseBlock.style.display = 'block'

    }
    
    return false;
}

//--- Task 2 ---
let clickedBefore = false;
function createTable(){
    if(!clickedBefore){
        let counter = 1;
        for(let i=0; i<6; i++){
            const row = document.createElement('tr');
            for(let j=0; j<6; j++){ 
                const element = document.createElement('td');
                element.innerHTML = counter;
                element.id = counter;
                row.appendChild(element);
                counter++;
            }
            document.querySelector('table').appendChild(row);
        }
        clickedBefore = true;
    }
    let element = document.getElementById(9);
    element.onmouseover = () =>{
        element.style.backgroundColor = generateRandomColor();
    }
    element.onmouseup = () =>{
        element.style.backgroundColor = document.getElementById('color').value;
    }
    element.ondblclick = () =>{
        let col = element.id % 6;
        for (let i=1; i<=6; i+=2){
            let newElement = document.getElementById(col+i*6);
            newElement.style.backgroundColor = document.getElementById('color').value;
        }
    }
}
function generateRandomColor(){
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
