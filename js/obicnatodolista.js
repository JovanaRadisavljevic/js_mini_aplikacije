const dugme = document.querySelector("#dugme");
let zadaci = JSON.parse(localStorage.getItem("zadaci")) || [];

dugme.addEventListener("click",(e)=>{
    e.preventDefault();
    const opisElement = document.getElementById("opis");
    const datumElement = document.getElementById("datum");

    const opis = opisElement.value;
    const datum = datumElement.value;

    //ako je prazno ne moze da doda
    if(!opis || !datum ){
        alert("Sva polja moraju biti popunjena!");
        return;
    }
    //napravi objekat
    let zadatak = {
        opis: opis,
        datum: datum
    };

    zadaci.push(zadatak);
    //sacuvaj novu listu
    const novaJSONlista = JSON.stringify(zadaci);
    localStorage.setItem("zadaci",novaJSONlista);

    //prikaziPodatke
    prikaziPodatke();
   
});
function prikaziPodatke(){
    const elementLista = document.getElementById("sviZadaci");
    elementLista.innerHTML = "";

    //napravi html kod za zadatak, DODAJ ZADATAK 
    zadaci.forEach((task,index) => {
        const zadatakElement = document.createElement("zadatak");
        zadatakElement.innerHTML=`
        <div id="zadatak">
                <p id="opis">${task.opis}</p>
                <div class="datumObrisi">
                    <p id="datum">${task.datum}</p>
                    <button id="obrisi">Obrisi</button>
                </div>
        </div>
        `;
        //dodaj action listener na obrisi
        zadatakElement.querySelector("#obrisi").addEventListener("click",()=>{
            //uzmi listu i iz nje izbaci element sa datim indexom
            zadaci.splice(index,1);
            //sacuvaj listu
            const novaJSONlista = JSON.stringify(zadaci);
            localStorage.setItem("zadaci",novaJSONlista);
            //ponovo pozovi f-ju za prikaz podataka
            prikaziPodatke();
            alert("Obrisan zadatak");
            
        });
        elementLista.appendChild(zadatakElement);
        
    });
}
prikaziPodatke();