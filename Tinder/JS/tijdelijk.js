let resultaat = myJson.results;
for(let i=0; i<resultaat.length; i++){
    // console.log(myJson.results[i].picture.large);
    let hoofdDiv = document.getElementById('container');
    let personDiv = document.createElement('div');
    personDiv.className='person';
    hoofdDiv.appendChild(personDiv);

    let profile = document.createElement('img');
    profile.src=resultaat[i].picture.large;
    personDiv.appendChild(profile);

    let naam = document.createElement('h2');
    naam.className='name';
    naam.innerHTML=resultaat[i].name.title + ". " + resultaat[i].name.first + " " + resultaat[i].name.last;
    personDiv.appendChild(naam);

    let leeftijd = document.createElement('p');
    leeftijd.className='leeftijd';
    leeftijd.innerHTML=resultaat[i].dob.age + " years old <br> Lifes in " + resultaat[i].location.city;
    personDiv.appendChild(leeftijd);
};