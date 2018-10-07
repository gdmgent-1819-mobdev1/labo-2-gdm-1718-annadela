//CLASS MET GEGEVENS PERSONEN
class Profile {
    constructor(chose, foto,naam, voornaam,leeftijd,woonplaats){
    this.chose = chose;
    this.foto = foto;
    this.naam= naam;
    this.voornaam= voornaam;
    this.leeftijd= leeftijd;
    this.woonplaats= woonplaats;

}};

let person;
let resultaat;
let newPerson;
let clickCounter = 0;
let profileCounter=0;
let list;

// HET PLAATSEN IN DE LOCAL STORAGE VAN MENSEN
    function getProfiles (count){
        return new Promise(
            fetch('https://randomuser.me/api/?results='+count)
            .then(function(response){
                return response.json(); 
            })
            .then(function(myJson){
                // console.log(myJson);
                resultaat = myJson.results;

                for(let i=0; i<resultaat.length; i++){
                    // console.log(JSON.stringify(myJson.results[i]));
                    person = new Profile ('none',resultaat[i].picture.large, resultaat[i].name.first, resultaat[i].name.last,resultaat[i].dob.age,resultaat[i].location.city);
                    localStorage.setItem(i + profileCounter,(JSON.stringify(person)));
                };
                resolve();
            }),
            
                function error(error) {
                reject(error);
            }); 
    };
    

//ALLEEN MAAR ALS ER NIETS STAAT IN DE LOCALSTORAGE MAG ER GESCHREVEN WORDEN
    if(!(localStorage.getItem(0))){
        getProfiles(10);
    }else{
        console.log ('geen overschrijving')
    };

//HET INLADEN VAN EEN PROFIEL OP SCHERM
    function loadprofile(key){
        console.log(profileCounter);
        //localStorage.getItem(key);

        console.log(JSON.parse(localStorage.getItem(key))); 
        newPerson = JSON.parse(localStorage.getItem(key)); 
        document.getElementById("picture").src = newPerson.foto;
        let gegevens = document.getElementById("gegevens");
        gegevens.innerHTML= 'naam: ' + newPerson.naam +' '+newPerson.voornaam+'<br> leeftijd: ' + newPerson.leeftijd+'<br> woonplaats: '+newPerson.woonplaats;

    };
    console.log(getProfiles);
    loadprofile(profileCounter);

// COUNTER CHECK CLICKS
    function checkClicks(){
        clickCounter++;

        if(clickCounter > 8){
            clickCounter=0;
            getProfiles(10).then(function(){
                console.log('hallo? test?');
                loadprofile(profileCounter); 
}); 
            
        }else{
            loadprofile(profileCounter);
        };
    };
    function choose (like){
        let person = JSON.parse(localStorage.getItem(profileCounter));
            console.log(person.chose);
            if(like =='liked'){
                person.chose="liked";
            }else{
                person.chose="disliked"
            };
            localStorage.setItem(profileCounter,(JSON.stringify(person)));
            profileCounter++
            checkClicks();
    };

// BIJ KLIK VOLGENDE PERSOON + bestig in localstorage
    document.getElementById('like').addEventListener('click', function() {
        choose('liked'); 
    });

    document.getElementById('dislike').addEventListener('click',function(){
        choose('dislike');
    });


// Lijst met likes en dislikes
document.getElementById('list').addEventListener('click',function(){
    for(let l=0; l<localStorage.length; l++){
        list = JSON.parse(localStorage.getItem(l))
        console.log(list);
        if (!(list.chose==='none')){
        
        let acount = document.getElementById('acounts');
        acount.innerHTML+=list.naam +' '+ list.voornaam +': ' + list.chose+'<br>';
        let littleBtnlike = document.createElement('button');
        let id = littleBtnlike.id='like'+[l];
        let littleBtndislike = document.createElement('button');
        littleBtndislike.id='dislike'+[l];
        littleBtnlike.innerHTML= 'like';
        littleBtndislike.innerHTML= 'dislike';
    }
        // document.getElementById(id).addEventListener('click',function(){
        //     changeOpinion();
        //     console.log('liked')
        // });
       
        
    //     if(list.chose ==="liked"){
    //         acount.appendChild(littleBtndislike);
    //         document.getElementById('like'+[l]).addEventListener('click',function(){
    //             changeOpinion();
    //             console.log('liked')
    //         });
    //     }else{
    //         acount.appendChild(littleBtnlike);
    //         document.getElementById('like'+[l]);
    //         document.getElementById('like'+[l]).addEventListener('click',function(){
    //             changeOpinion();
    //             console.log('dislike')
    //         });
    //     }
    //         function changeOpinion(){
    //             if(littleBtndislike){
    //                 littleBtndislike.innerHTML="like";
    //             }else{
    //                 littleBtnlike.innerHTML="dislike";
    //             }
    //         };
    };
   
});


