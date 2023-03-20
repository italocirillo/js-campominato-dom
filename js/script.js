// Dichiaro variabili
const quadratoGrande = document.querySelector(".quadrato-grande");
const bottonePlay = document.querySelector(".play");
// Bottone play cliccato
bottonePlay.addEventListener("click", bottoneCliccato);




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
    for(let i=0;i<numeroQuadrati;i++){
        const quadrato = document.createElement("div");
        quadrato.classList.add("col");
        quadrato.style.width = `calc(100% / ${Math.sqrt(numeroQuadrati)})`;
        quadrato.style.height = `calc(100% / ${Math.sqrt(numeroQuadrati)})`;
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
    this.classList.toggle("azzurro");
    console.log(numeroQuadrato);
}
