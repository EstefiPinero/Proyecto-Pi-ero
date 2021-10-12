

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

//creo nuevos objetos de parcelas
// const parcela1 = new Parcela (1, "El Arrabal", 1, 135, 233, 2330000, "disponible");
// const parcela2 = new Parcela (2, "El Ombu", 2, 125, 278, 2780000, "reservado");
// const parcela3 = new Parcela (3, "El Quebracho", 3, 109, 253, 2530000, "vendido");

//parcelas.push(parcela1, parcela2, parcela3);



//recorrer el array imprimiendo html de cada uno de los objetos
let container = document.getElementById("tbContainer")
let modalContainer = document.getElementById("modal-container");

const crearTabla = (array) => {
    
    array.forEach((lote) => {
        
        container.innerHTML +=  `
        <tr>
        <th scope="row">${lote.barrio}</th>
        <td>${lote.lote}</td>
        <td>${lote.manzana}</td>
        <td>${lote.mts}</td>
        <td>$${lote.$contado}</td>
        <td>${lote.estado}</td>
        <td><button type="button" class="btn btn-success" id="btnCotizar" onclick="cotizar(${lote.id})">cotizar</button></td>
        </tr>`
    })
    
}    
crearTabla(parcelas)

//function para pasar los datos al cotizador
let parcelaEnCotizador = [];
      
const cotizar = (loteId) => {
    
    
    const loteAcotizar = parcelas.find((lote) => lote.id === loteId)
    
    parcelaEnCotizador.push({
        lote:  loteAcotizar.lote,
        precio: parseInt(loteAcotizar.$contado),
        
    })
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
//============== AGREGAR PARCELA AL COTIZADOR ==============//
    
//function actualizarCotizador () {
const actualizarCotizador = () => {
        
  parcelaEnCotizador.forEach((lote) =>{ 
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.className = ("modal-active");

    modal.innerHTML =
    `<div class="modal-body">
        <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cotizador</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" id="modal-cerrar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                                    <label for="formGroupExampleInput" class="form-label">N° de Lote</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" value="${lote.lote}">
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Precio a financiar</label>
                                    <input type="number" class="form-control" id="formGroupExampleInput2" value="${lote.precio}">
                                </div>
                                <div class="form-floating">
                                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onchange=planDetails()>
                                        <option class="Raices" value="${planes[0].nombrePlan}">${planes[0].nombrePlan}</option>
                                        <option class="Tronco" value="${planes[1].nombrePlan}">${planes[1].nombrePlan}</option>
                                        <option class="Copa" value="${planes[2].nombrePlan}">${planes[2].nombrePlan}</option>
                                    </select>
                                    <div id="detallesPlan"> 
                                        <label for="formGroupExampleInput3" class="form-label">Cantidad de meses del plan</label>
                                        <input type="number" class="form-control" id="formGroupExampleInput3" value="">
                                        <label for="formGroupExampleInput3" class="form-label">Interés anual del plan</label>
                                        <input type="number" class="form-control" id="formGroupExampleInput4" value="">
                                    </div>

                                    <label for="floatingSelect">Seleccione el Plan elegido</label>
                                    <br></br>
                                    <button type="button" class="btn btn-secondary" id="btnSimular" onclick=simularCuotas()>Simular cuotas</button>
                                    <button type="button" class="btn btn-primary" id="btnAtras">atras</button>
                                </div>
                        </div>
                    
                </div>
            </div>
        </div>
    </div>`

    modalContainer.appendChild(modal);
    })
}




//////////////////////Función que calcula el valor de las cuotas respecto al lote y plan elegido///////////////////

let precioLoteIngresado, interesPlanElegido, cuotasPlanIngresado

// const planDetails = () => {
//     console.log("probando")
    
//     //verifico el plan elegido
//     let planElegido = document.getElementById("floatingSelect").value
//     let planIngresado = planes.filter(Plan => Plan.nombrePlan  === planElegido);
//     console.log(planIngresado)
    
//     //encontrar la cantidad de cuotas del plan ingresado
//     let mesesPlan = document.getElementById("formGroupExampleInput3").value;
//     mesesPlan =  planIngresado.find(Plan => Plan.cuotas)

//     console.log(mesesPlan)
    
//     //busco el indice del interes del plan elegido y muestro en consola
//     let interesPlan = document.getElementById("formGroupExampleInput4").value;
//     interesPlanElegido = planIngresado.find(Plan => Plan.interes)
//     interesPlan = interesPlanElegido
     
    
// }


//verifico el producto elegido
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
    const importe = precioLoteIngresado
    const tasaInteresMensual = (interesPlanElegido.interes/100) /12
    console.log(tasaInteresMensual)


    //calculo el monto a financiar
    const cuota = Math.round( importe / (( (1 - ( 1 + tasaInteresMensual) ** - cuotasPlanIngresado.cuotas)) / tasaInteresMensual))
    console.log(cuota)
    alert("Costo total del lote: $ "+ importe + " ,financiado en: "+ cuotasPlanIngresado.cuotas + " meses, interés anual de: "+ interesPlanElegido.interes +" %, valor de cuota: $ " + cuota)


}


