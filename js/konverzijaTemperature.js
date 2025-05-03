const rezultat = document.getElementById("rezultat");
const dugmeC=document.getElementById("celzijus");
const dugmeF=document.getElementById("farenhajt");

function pretvoriUCelzijus(){
    const vrednost = document.getElementById("temperatura").value;
    let broj = parseFloat(vrednost);
    let rez = (broj-32)*5/9;
    rezultat.value=rez;
}
function pretvoriUFarenhajt(){
    const vrednost = document.getElementById("temperatura").value;
    let broj = parseFloat(vrednost);
    let rez = (broj * 9 / 5) + 32;
    console.log(rez);
    rezultat.value=rez;
}

dugmeC.addEventListener("click",()=>{
    pretvoriUCelzijus();
});
dugmeF.addEventListener("click",()=>{
    pretvoriUFarenhajt();
});