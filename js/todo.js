const dugmeDodajTask =  document.getElementById("dodajTask");
let taskovi = JSON.parse(localStorage.getItem('taskovi')) || [];


function sacuvajTaskove() {
    const taskoviJSON = JSON.stringify(taskovi);
    localStorage.setItem("taskovi", taskoviJSON);
}
function dodajTask() {

    const naslovElement = document.getElementById("taskNaslov");  
    const opisElement = document.getElementById("taskOpis");
    const datumElement = document.getElementById("taskDatum");
 

    const naslov = naslovElement.value.trim();
    const opis = opisElement.value.trim();
    const datum = datumElement.value;

    if(!naslov || !opis || !datum) {
        alert("Sva polja moraju biti popunjena!");
        return;
    }
    let novitask = {
        naslov: naslov,
        opis: opis,
        datum: datum,
        status: "planirano",
    };
 
    taskovi.push(novitask);
    sacuvajTaskove();
    console.log(taskovi);
    razvrstajTaskove();  // <-- OVO DODAJEŠ

    // Po želji očisti input polja:
    naslovElement.value = "";
    opisElement.value = "";
    datumElement.value = "";
 
}
function pomeriTask(index){
     let trenutnitask = taskovi[index];
     if(trenutnitask.status === "planirano") {
        trenutnitask.status = "utoku";
    }else if(trenutnitask.status === "utoku") {
        trenutnitask.status = "zavrseno";  }
    else if(trenutnitask.status === "zavrseno") {
        alert("Ovaj task je već završen!");
    }
         
    razvrstajTaskove();
}
function obrisiTask(index) {
    if(confirm("Da li ste sigurni da želite da obrišete ovaj task?")) {
        taskovi.splice(index, 1);
        sacuvajTaskove();
        razvrstajTaskove();
    }
}
function razvrstajTaskove(){
     const divPlanirano = document.getElementById("planirano");
     const divUtoku = document.getElementById("utoku");
     const divZavrseno= document.getElementById("zavrseno");
   
    divPlanirano.innerHTML = "";
    divUtoku.innerHTML = "";
    divZavrseno.innerHTML = "";


    taskovi.forEach( (task,index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.addEventListener("click", () =>{ pomeriTask(index)});

        taskElement.innerHTML = `
        <h3>${task.naslov}</h3>
        <p>${task.opis}</p>
        <p>${task.datum}</p>
        <button class="obrisiBtn">Obriši</button>
        `;

        taskElement.querySelector(".obrisiBtn").addEventListener("click", () => {obrisiTask(index)});
        if(task.status === "planirano") {          
            divPlanirano.appendChild(taskElement);
        }
        else if(task.status === "utoku") {
            divUtoku.appendChild(taskElement);
        } else if(task.status === "zavrseno") {
            divZavrseno.appendChild(taskElement);
        }
    })
   
}

//dugmeDodajTask.addEventListener("click", ()=> {dodajTask})

dugmeDodajTask.addEventListener("click", () => {
    dodajTask();
});

razvrstajTaskove();

