//funcion para denifir las clases de los objetos 
class Parcela {
    constructor(id, barrio, lote, manzana, mts, $contado, estado) {
        this.id = id;
        this.barrio = barrio;
        this.lote = lote;
        this.manzana = manzana;
        this.mts = mts;
        this.$contado = $contado;
        this.estado = estado;
    }
}

//recorrer el array imprimiendo html de cada uno de los objetos
let container = document.getElementById("tbContainer")
let modalContainer = document.getElementById("modal-container");

const crearTabla = (array) => {
    
    array.forEach((lote) => {
        
        container.innerHTML +=  `
        <tr>
            <th class="table-light" scope="row">${lote.barrio}</th>
            <td class="table-light">${lote.lote}</td>
            <td class="table-light">${lote.manzana}</td>
            <td class="table-light">${lote.mts}</td>
            <td class="table-light">$${lote.$contado}</td>
            <td class="table-light">${lote.estado}</td>
            <td class="table-light"><button type="button" class="btn btn-success" id="btnCotizar" onclick="cotizar(${lote.id})">cotizar</button></td>
        </tr>`
    })
    
}    
crearTabla(parcelas)

//acciones extras






//function para pasar los datos al cotizador
let parcelaEnCotizador = [];
      
const cotizar = (loteId) => {
       
    const loteAcotizar = parcelas.find((lote) => lote.id === loteId)
    
    parcelaEnCotizador.push({
        lote:  loteAcotizar.lote,
        manzana: loteAcotizar.manzana,
        precio: parseInt(loteAcotizar.$contado),
        estado: loteAcotizar.estado
    })

    if( loteAcotizar.estado == "vendido"){
        alert("no")
        // let modal4 = document.getElementById("exampleModal4")
        // modal4.innerHTML= " ";
        // modal4.innerHTML =
        // ` `
    } else { 
        console.log(`El lote elegido es: `)
        console.log(parcelaEnCotizador)
        
        actualizarCotizador();
        modalContainer.classList.toggle('modal-active')
        const modalCerrar = document.getElementById('modal-cerrar')
        modalCerrar.addEventListener('click', () => {
            modalContainer.classList.toggle('modal-active')
        })
        
        const btnAtras = document.getElementById('btnAtras')
        btnAtras.addEventListener('click', () => {
            modalContainer.classList.toggle('modal-active')
        })
    }
}
/////////////////////Función que muestra el interés respecto al tipo de financiación////////////////////////////

//defino las clases
class Plan {
constructor (id, nombrePlan, cuotas, interes, tasa) {
    this.id = id;
    this.nombrePlan = nombrePlan;
    this.cuotas = cuotas;
    this.interes = interes;
    this.tasa = parseFloat(tasa)
}
//calculo la tasa de interes
interesesTasa() {
    this.tasa = this.cuotas * this.interes /100
}
}

//array de planes
let planes = [];


//creo nuevos objetos de planes y los agrego al array
const plan1 = new Plan (1, "Raices", 60, 10);
const plan2 = new Plan (2, "Tronco", 72, 14);
const plan3 = new Plan (3, "Copa", 120, 18);

planes.push(plan1, plan2, plan3)

//recorro array para mostrar la tasa de interes por tipo de plan
for (const Plan of planes){
    Plan.interesesTasa();
    console.log(`El interes del plan ${Plan.nombrePlan} es ${Plan.tasa} % anual`)
}


////////////////

let dropMenuBtn = document.getElementById("dropdownMenu2")
let dropMenu = document.getElementById("dropdown-menu")

dropMenuBtn.addEventListener("click", ()=>{
    if(dropMenu.style.display == "") {
        dropMenu.style.display = "block";

    }else if(dropMenu.style.display == "block"){
        dropMenu.style.display = "";
    }
})




//============== AGREGAR PARCELA AL COTIZADOR ==============//
    
//function actualizarCotizador () {
const actualizarCotizador = () => {
        
  parcelaEnCotizador.forEach((lote) =>{ 
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.className = ("modal-active");
    modal.id = ("modal-active");

    modal.innerHTML =
    `<div class="modal-body">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title success">Cotizador</h5>
                        
                        <button type="button" class="btn-close" data-bs-dismiss="modal" id="modal-cerrar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">N° de Lote</label>
                            <input type="text" class="form-control" id="formGroupExampleInput" value="${lote.lote}" readonly>
                            <label for="formGroupExampleInput" class="form-label">Manzana</label>
                            <input type="text" class="form-control" id="formGroupExampleInput0" value="${lote.manzana}" readonly>
                            </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Precio a financiar</label>
                                    <input type="number" class="form-control" id="formGroupExampleInput2" value="${lote.precio}" readonly>
                                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="dolarizar()">USD</button>
                                </div>
                                <div class="form-floating">
                                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onclick=planDetails()>
                                        <option class="Raices" value="${planes[0].nombrePlan}">${planes[0].nombrePlan}</option>
                                        <option class="Tronco" value="${planes[1].nombrePlan}">${planes[1].nombrePlan}</option>
                                        <option class="Copa" value="${planes[2].nombrePlan}">${planes[2].nombrePlan}</option>
                                    </select>
                                    <div id="detallesPlan"> 
                                        <label for="formGroupExampleInput3" class="form-label">Cantidad de meses del plan</label>
                                        <input type="number" class="form-control" id="formGroupExampleInput3" value="60" readonly>
                                        <label for="formGroupExampleInput3" class="form-label">Interés anual del plan</label>
                                        <input type="number" class="form-control" id="formGroupExampleInput4" value="10" readonly>
                                    </div>

                                    <label for="floatingSelect">Seleccione el Plan</label>
                                    <br></br>
                                    
                                    <button type="button" class="btn btn-success" id="btnSimular" onclick=simularCuotas() data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Simular cuotas
                                    </button>
                                    <button type="button" class="btn btn-secondary" id="btnAtras">atras</button>
                                    <br></br>
                                    <img src="images/lote1.jpg"  alt="">
                                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    modalContainer.appendChild(modal);
    })
}





//////////////////////Función para pasar al cotizador los datos segun el plan elegido///////////////////

let precioLoteIngresado, interesPlanElegido, cuotasPlanIngresado

const planDetails = () => {
       
    //verifico el plan elegido
    let planElegido = document.getElementById("floatingSelect").value
    let planIngresado = planes.filter(Plan => Plan.nombrePlan  === planElegido);
    console.log(planIngresado)
    
    //encontrar la cantidad de cuotas del plan ingresado
    let inputCuotas= document.getElementById("formGroupExampleInput3");
    let mesesPlan =  planIngresado.find(Plan => Plan.cuotas)
    inputCuotas.value = mesesPlan.cuotas
    console.log(inputCuotas.value)
    
    //busco el indice del interes del plan elegido y muestro en consola
    let interesPlan = document.getElementById("formGroupExampleInput4");
    let interesPlanElegido = planIngresado.find(Plan => Plan.interes)
    interesPlan.value = interesPlanElegido.interes
     
    
}

//////////////////////Función que calcula el valor de las cuotas respecto al lote y plan elegido///////////////////
//verifico el producto elegido

let tbContainer2 = document.getElementById("tbContainer2");
let IVA = 1.21

function simularCuotas(){

    //busco el indice del precio $contado del lote elegido e imprimo en consola
    precioLoteIngresado = document.getElementById("formGroupExampleInput2").value
    console.log(precioLoteIngresado )

    //verifico el plan elegido
    let planElegido = document.getElementById("floatingSelect").value
    let planIngresado = planes.filter(Plan => Plan.nombrePlan  === planElegido);
    console.log(planIngresado)

    //busco el indice del interes del plan elegido y muestro en consola
    interesPlanElegido = planIngresado.find(Plan => Plan.interes)
    console.log(interesPlanElegido.interes)

    //encontrar la cantidad de cuotas del plan ingresado
    cuotasPlanIngresado =  planIngresado.find(Plan => Plan.cuotas)
    console.log(cuotasPlanIngresado.cuotas)

    //calculo el interés
    console.log(planIngresado)
    let importe = precioLoteIngresado
    let tasaInteresMensual = (interesPlanElegido.interes/100) /12
    console.log(tasaInteresMensual) 

    ////////////////////////////////////////////////////////////////////////

    

    //calculo el monto a financiar
    let cuota = Math.round( importe / (( (1 - ( 1 + tasaInteresMensual) ** - cuotasPlanIngresado.cuotas)) / tasaInteresMensual))
    console.log(cuota)
   
    tbContainer2.innerHTML= " ";
    tbContainer2.innerHTML +=
    `<tr>
        <td class="table-light" scope="row">${cuotasPlanIngresado.cuotas}</td>
        <td class="table-light">$${cuota}</td>
        <td class="table-light">${interesPlanElegido.interes}%</td>
        <td class="table-light"></td>
        <td class="table-light"></td>
        <td class="table-light">$${importe}</td>
    </tr>
    `


    ////////////////////guardar plan////////////////////

    let guardarPlan = document.getElementById("guardarPlan")
    let formGroupExampleInput = document.getElementById("formGroupExampleInput")
    let formGroupExampleInput0 = document.getElementById("formGroupExampleInput0")


    guardarPlan.addEventListener("click", () =>{
        
        let cotizados = document.getElementById("cotizados");
        
        cotizados.innerHTML =`
        <table class="table table-hover table-bordered table-warning">
              <thead class="table-dark rounded ">
                  <tr>
                      <th scope="col" class="table-light" scope="row">N° cuota</td>
                      <th scope="col" class="table-light">Valor cuota</td>
                      <th scope="col" class="table-light">Intereses</td>
                      <th scope="col" class="table-light">Impuesto</td>
                      <th scope="col" class="table-light">Capital</td>
                      <th scope="col" class="table-light">Saldo Insoluto</td>
                  </tr>
              </thead>
              <p>Lote ${formGroupExampleInput.value} Manzana ${formGroupExampleInput0.value} </p>
              <tbody >
                <tr>
                    <td class="table-light" scope="row">${cuotasPlanIngresado.cuotas}</td>
                    <td class="table-light">$${cuota}</td>
                    <td class="table-light">${interesPlanElegido.interes}%</td>
                    <td class="table-light"></td>
                    <td class="table-light"></td>
                    <td class="table-light">$${importe}</td>
                </tr>
              </tbody>
          </table>
      
        `;
        
    });
}



////////////////////////////cuotas amortización ///////////////////////////////////////////////////////////////
let modalActive = document.getElementById("#modal-active");
let staticBackdrop = document.getElementById("staticBackdrop");
let containerModal = document.getElementById("modal-container");
let container2 = document.getElementById("container");

var columnas = [ 'No.',  'Mensualidad', 'Intereses', 'Impuestos', 'Capital', 'Insoluto' ]






////////////cambiar theme mode con Jquery//////////
let table = document.getElementsByClassName("table-light");


$(document).ready(function(){
    
    $('#flexSwitchCheckDefault').click(function(){
         
            let element = document.body;         
            
                element.classList.toggle("dark"); 
                console.log("prueba")
                container.classList.toggle("table-dark"); 
                table.classList.toggle("table-dark");
            
        
    })
  
}); 

///////////////////Consumiendo API////////////////

$.get("https://v6.exchangerate-api.com/v6/b3999cd76f3eda5856244288/latest/USD", (response) => {
    data = response
    console.log(data)

        $("#exchange").append(
            `<p>Valor dolar $${data.conversion_rates.ARS}</p>`
        )
   
})


const dolarizar = (()=> {
    
    fetch("https://v6.exchangerate-api.com/v6/b3999cd76f3eda5856244288/latest/USD")
        .then( (response) => 
            response.json())
        .then((data) => {
            let precioArs = document.getElementById("formGroupExampleInput2").value
            let cambio = data.conversion_rates.ARS
            let conversion = parseInt(precioArs/cambio)

            $("#modal-body3").html(" ")
            $("#modal-body3").append(
                `<p>Precio del lote en dólares $${conversion}</p>
                <p>Valido hasta ${data.time_last_update_utc}</p>`
            )
        })
        .catch ((err) => console.log(err))
        
}) 
    


////////////Animación bienvenida//////////////////


$(document).ready(()=>{
    $("#bienvenidos").fadeOut(3000);
    $("#bienvenidos")
        .slideUp(2000)
        .delay(2000);
        
        $("<section>")
        .slideDown(2000)
        .delay(2000);
})

////////////// Modal boton///////////////////

//abrir y cerrar modal de cotizaciones

$("#nav-link").click( () => {
    $("#menu").fadeIn(800);
    $("#menu").css({
        "height": "100%",
        "width": "300px",
        "position": "fixed",
        "z-index": "1",
        "top": "0",
        "right": "0",
        "background-color": "grey",
        "overflow-x": "hidden",
        "padding-top": "60px"
    })
})

$("#closebtn").click( () => {
    $("#menu").fadeOut(800);
})


