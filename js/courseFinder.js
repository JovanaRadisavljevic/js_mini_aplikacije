const kursevi = [
  {
    id: 1,
    name: "JavaScript za početnike",
    price: 29.99,
    description: "Nauči osnove JavaScripta kroz praktične primere i mini projekte.",
    details: [
      "20 časova video materijala",
      "Interaktivni kvizovi",
      "Završni projekat"
    ]
  },
  {
    id: 2,
    name: "Napredni Python",
    price: 39.99,
    description: "Ovladavanje naprednim konceptima u Pythonu: dekoratori, generatori, OOP.",
    details: [
      "24 predavanja",
      "Rad sa bibliotekom Pandas",
      "Mentorski sastanci"
    ]
  },
  {
    id: 3,
    name: "Uvod u C#",
    price: 34.99,
    description: "Kurs pokriva osnove C# jezika i .NET platforme uz rad u Visual Studio-u.",
    details: [
      "30 sati materijala",
      "Rad na projektu",
      "Kviz posle svake sekcije"
    ]
  },
  {
    id: 4,
    name: "Web razvoj sa PHP-om",
    price: 24.99,
    description: "Praktičan uvod u backend programiranje koristeći PHP i MySQL.",
    details: [
      "Osnove MySQL-a",
      "Izrada dinamičkog sajta",
      "Upravljanje bazom podataka"
    ]
  },
  {
    id: 5,
    name: "Programiranje u Javi",
    price: 44.99,
    description: "Kurs pokriva sintaksu Jave, OOP principe i razvoj desktop aplikacija.",
    details: [
      "Klase i objekti",
      "GUI aplikacije sa Swing-om",
      "Završni ispit"
    ]
  },
  {
    id: 6,
    name: "HTML & CSS kompletan vodič",
    price: 19.99,
    description: "Izrada modernih web stranica od nule uz responzivni dizajn.",
    details: [
      "HTML5 osnove",
      "CSS Grid i Flexbox",
      "Responzivni dizajn"
    ]
  },
  {
    id: 7,
    name: "React.js za početnike",
    price: 49.99,
    description: "Izgradi SPA aplikacije koristeći React, JSX i hooks koncepte.",
    details: [
      "Hooks u Reactu",
      "Komponente i Props",
      "Rad sa API-jem"
    ]
  },
  {
    id: 8,
    name: "Rust za sistemske programere",
    price: 54.99,
    description: "Bezbedno i efikasno programiranje uz Rust – idealno za napredne korisnike.",
    details: [
      "Borrow checker",
      "Rad sa memorijom",
      "Višenitno programiranje"
    ]
  }
];



const prikaziKurseve = ()=>{
    const katalogKursevaDiv = document.getElementById("katalogKurseva");

    for (const kurs of kursevi) {
        const singleKurs = document.createElement('div');
        singleKurs.classList.add('singleKurs');
        singleKurs.id=kurs.id;

        //1. nacin
        /*singleKurs.innerHTML=`
            <h2>${kurs.name}</h2>
            <p>&euro; ${kurs.price}</p>
            <p>${kurs.description}</p>
        `;*/

        //2. nacin
        const kursName = document.createElement('h2');
        kursName.innerText=kurs.name;
        kursName.classList="kursName";
        singleKurs.append(kursName);

        const kursPrice = document.createElement('p');
        kursPrice.innerText= kurs.price;
        singleKurs.append(kursPrice);

        const kursDescription = document.createElement('p');
        kursDescription.innerText=kurs.description;
        singleKurs.append(kursDescription);

        const dugme = document.createElement('button');
        dugme.innerText='Vise informacija';
        dugme.classList.add('dugme');
        singleKurs.append(dugme);
        //dodaj osluskivac na dugme
        dugme.addEventListener('click', ()=>{
            prikaziKurs(event,kurs);
        });

        katalogKursevaDiv.appendChild(singleKurs);
    }
}

document.getElementById("dugmePretraga").addEventListener("click",()=>{
  const unetText= document.getElementById("pretragaText").value;
  if(unetText=="" || unetText.trim()=="")
    return alert("Greska morate uneti parametar za pretragu");
  if(!postojiKurs(unetText))
    return alert("Ne postoji trazeni kurs");

  //kurs postoji -> svim divovima koji ne sadrze taj teskt stavi klasu hidden
  /*for (const kurs of kursevi) {
     if(!kurs.name.toLowerCase().includes(kursName.toLowerCase())){
      OVO NE MOZE JER OVDE PROLAZIM KROZ LISTU KURSEVA A NE LISTU DIVOVA KURSEVA
    }
  }*/
 const nasloviElementi = document.getElementsByClassName("kursName");
 for (const jedanNaslovElement of nasloviElementi) {
  const text = jedanNaslovElement.innerText.toLowerCase();
  const roditelj = jedanNaslovElement.parentNode;

  if (!text.includes(unetText.toLowerCase())) {
      roditelj.classList.add("hidden");
    } else {
      roditelj.classList.remove("hidden");
    }
 }

});

function postojiKurs(kursName){
  for (const kurs of kursevi) {
    if(kurs.name.toLowerCase().includes(kursName.toLowerCase())){
      return true;
    }
  }
  return false;
}

var poslednjeKliknutoDugme = null;

const prikaziKurs = (event , kurs)=>{
  console.log(event.currentTarget.parentNode);//vraca roditelja od buttona tj div u kome se button nalazi
  if(poslednjeKliknutoDugme!=null){
    poslednjeKliknutoDugme.classList.remove("highlighted");
  }
  event.currentTarget.parentNode.classList.add("highlighted");
  poslednjeKliknutoDugme = event.currentTarget.parentNode;
  
  //uzmi div u koji treba da smestis podatke
  const kursInfoDiv = document.getElementById("kursInfo");
  //obrisi prethodni div
  kursInfoDiv.innerHTML="";
  //obrisi klasu hidden
  kursInfoDiv.classList="";

  //napravi nalsov
  const naslov = document.createElement("h1");
  naslov.innerText=kurs.name;
  //ul => li
  const ulElement = document.createElement("ul");
  //li
  for (const detalj of kurs.details) {
      const jedanLiElement = document.createElement("li");
      jedanLiElement.innerText=detalj;
      //dodaj li u ul
      ulElement.append(jedanLiElement);
  }
  kursInfoDiv.append(naslov,ulElement);
}

prikaziKurseve();
