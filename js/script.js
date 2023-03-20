// Dichiaro variabili
const quadratoGrande = document.querySelector(".quadrato-grande");
const bottonePlay = document.querySelector(".play");
// Bottone play cliccato
bottonePlay.addEventListener("click", bottoneCliccato);
// Variabili Globali
const numeroBombe = 16;
const vettoreBombe = [];
const numeriGiàCliccati = [];
let quadratiTotali = 0;
let giocoFinito=false;
// Elementi html
const quadratoCliccato=document.getElementById("quadrato-cliccato");
const punteggio=document.getElementById("punteggio");
const statoVincitaa=document.getElementById("stato-vincita");
const avvisoASchermo=document.querySelector(".avviso-a-schermo");


///////////////////////////
// FUNZIONI

// Funzione che crea la griglia
/**
 * Description
 * @param {number} numeroQuadrati   //Questo numero dice la griglia di quanto n * n deve essere
 * @param {Element} griglia         //Griglia in cui inserire i quadrati
 * @returns {Element} quadrato      //Ritorna il quadrato e lo inserisce nella griglia
 */
function creaGriglie(numeroQuadrati, griglia, numeroBombe){
    // Genero bombe
    generaBombe(numeroBombe,numeroQuadrati);
    
    // Genero quadrari
    for(let i=0;i<numeroQuadrati;i++){
        console.clear();
        console.log(generaBombe(numeroBombe,numeroQuadrati));
        const quadrato = document.createElement("div");
        quadrato.classList.add("col");
        // Regolo altezza e larghezza quadrati
        quadrato.style.width = `calc(100% / ${Math.sqrt(numeroQuadrati)})`;
        quadrato.style.height = `calc(100% / ${Math.sqrt(numeroQuadrati)})`;
        // Aggiungo il numero del quadrato
        quadrato.innerHTML = `<span>${i+1}</span>`;
        griglia.append(quadrato);
        quadrato.addEventListener("click",gioca);
    }
    return griglia;
}

// Funzione bottone play cliccato
function bottoneCliccato() {
    // Pulisco la griglia
    quadratoGrande.innerHTML="";
    numeriGiàCliccati.length=0;
    giocoFinito=false;
    quadratoCliccato.innerHTML=0;
    punteggio.innerHTML=0;
    statoVincitaa.innerHTML="Inizio";
    avvisoASchermo.classList.remove("d-block");
    const selettoreDifficolta = document.getElementById("selettore-difficolta");
    const quantitaQuadrati = parseInt(selettoreDifficolta.value);
    quadratiTotali = quantitaQuadrati;
    creaGriglie(quantitaQuadrati,quadratoGrande,numeroBombe);
}

// Funzione cella quadrato cliccata
function gioca() {
    const quadrati = document.querySelectorAll(".col");
    const numeroQuadrato = parseInt(this.querySelector("span").textContent);
    // OUTPUT
    // Stampo il punteggio
    punteggio.innerHTML = numeriGiàCliccati.length+1;
    // Stampo il numero del quadrato cliccato
    if(giocoFinito === false){
        quadratoCliccato.innerHTML = numeroQuadrato;
        statoVincitaa.innerHTML="GIOCANDO";
    } 
    // Verifico che l'utente non abbia vinto e proseguo
    if(numeriGiàCliccati.length+1<(quadratiTotali - numeroBombe)){
        if(!numeriGiàCliccati.includes(numeroQuadrato) && giocoFinito === false){
            // Vedo se il numero è una bomba oppure un numero normale 
            if(vettoreBombe.includes(numeroQuadrato)){
                this.classList.add("rosso");
                for(let i=0;i<vettoreBombe.length;i++){
                    quadrati[vettoreBombe[i]-1].classList.add("rosso");
                    giocoFinito = true;
                }
                statoVincitaa.innerHTML="HAI PERSO";
                avvisoASchermo.innerHTML="HAI PERSO";
                avvisoASchermo.classList.add("d-block");
                avvisoASchermo.classList.add("rosso");
            }else{
                this.classList.add("azzurro");
                numeriGiàCliccati.push(numeroQuadrato); 
            }
        }
    }else{
        this.classList.add("azzurro");
        numeriGiàCliccati.push(numeroQuadrato); 
        statoVincitaa.innerHTML="HAI VINTO";
        avvisoASchermo.innerHTML="HAI VINTO";
        avvisoASchermo.classList.add("d-block");
        avvisoASchermo.classList.add("verde");
        giocoFinito = true;
    }
}

// Funzione che genera numeri casuali
/**
 * Description
 * @param {number} numeriDaGenerare     Quanti numeri devi generare
 * @param {number} rangeDiNumeri        Da che numero fino a che numero vuoi generare
 * @returns {vettore} vettoreNumeri     Restituisce il vettore riempito da i numeri casuali che ti servono
 */
function generaBombe(numeriDaGenerare,rangeDiNumeri){
    vettoreBombe.length = 0;
    let numeroCasuale = 0;
    // Riempo il vettore fino ad arrivare al range 
    while(vettoreBombe.length<numeriDaGenerare){
        numeroCasuale = Math.floor(Math.random() * (rangeDiNumeri - 1 + 1) + 1);
        if(!vettoreBombe.includes(numeroCasuale)){
            vettoreBombe.push(numeroCasuale);
        }
    }
   return vettoreBombe;
}