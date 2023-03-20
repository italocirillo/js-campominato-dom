// Dichiaro variabili
const quadratoGrande = document.querySelector(".quadrato-grande");
const bottonePlay = document.querySelector(".play");
// Bottone play cliccato
bottonePlay.addEventListener("click", bottoneCliccato);
// Vettore con numeri bombe
const vettoreBombe = [];



///////////////////////////
// FUNZIONI

// Funzione che crea la griglia
/**
 * Description
 * @param {number} numeroQuadrati   //Questo numero dice la griglia di quanto n * n deve essere
 * @param {Element} griglia         //Griglia in cui inserire i quadrati
 * @returns {Element} quadrato      //Ritorna il quadrato e lo inserisce nella griglia
 */
function creaGriglie(numeroQuadrati, griglia){
    // Genero bombe
    const numeroBombe=16;
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
        quadrato.addEventListener("click",quadratoCliccato);
    }
    return griglia;
}

// Funzione bottone play cliccato
function bottoneCliccato() {
    // Pulisco la griglia
    quadratoGrande.innerHTML="";
    const selettoreDifficolta = document.getElementById("selettore-difficolta");
    const quantitaQuadrati = parseInt(selettoreDifficolta.value);
    creaGriglie(quantitaQuadrati,quadratoGrande);
}

// Funzione cella quadrato cliccata
function quadratoCliccato() {
    const numeroQuadrato = parseInt(this.querySelector("span").textContent);
    if(vettoreBombe.includes(numeroQuadrato)){
        this.classList.toggle("rosso");
    }else{
        this.classList.toggle("azzurro");
    }
    console.log(numeroQuadrato);
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