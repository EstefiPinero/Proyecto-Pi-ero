

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
const parcela1 = new Parcela (1, "El Arrabal", 1, 135, 233, 2330000, "disponible");
const parcela2 = new Parcela (2, "El Ombu", 2, 125, 278, 2780000, "reservado");
const parcela3 = new Parcela (3, "El Quebracho", 3, 109, 253, 2530000, "vendido");

parcelas.push(parcela1, parcela2, parcela3);


let parcelaEnCotizador = [];

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
      
const cotizar = (loteId) => {
    
    
    const loteAcotizar = parcelas.find((lote) => lote.id === loteId)
    
    parcelaEnCotizador.push({
        lote:  loteAcotizar.lote,
        precio: loteAcotizar.$contado,
        
    })
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
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" id="modal-cerrar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                                    <label for="formGroupExampleInput" class="form-label">N° de Lote</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" value="${lote.lote}">
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Precio a financiar</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput2" value="${lote.precio}">
                                </div>
                                <div class="form-floating">
                                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option class="Raices" value="">${planes[0].nombrePlan}</option>
                                    <option class="Tronco" value="">${planes[1].nombrePlan}</option>
                                    <option class="Copa" value="">${planes[2].nombrePlan}</option>
                                </select>
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


//============== AGREGAR PARCELA AL COTIZADOR ==============//

//recorro array para mostrar la tasa de interes por tipo de plan
for (const Plan of planes){
    Plan.interesesTasa();
    console.log(`El interes del plan ${Plan.nombrePlan} es ${Plan.tasa} % anual`)
}


//////////////////////Función que calcula el valor de las cuotas respecto al lote y plan elegido///////////////////
let inputLote = document.getElementById("formGroupExampleInput")
let inputPrecio = document.getElementById("formGroupExampleInput2")

//solicito al usuario que indique el producto elegido
function simularCuotas(){
    let loteElegido = inputLote
    let loteIngresado = parcelas.filter(Parcela => Parcela.lote === loteElegido);
    console.log(loteIngresado)

    //busco el indice del precio $contado del lote elegido e imprimo en consola
    //let precioLoteIngresado = loteIngresado.find(Parcela => Parcela.$contado);
    let precioLoteIngresado = inputPrecio;
    console.log(precioLoteIngresado )

    //solicito al usuario que indique el plan elegido
    //let planElegido = planes[0].nombrePlan
    let planElegido = document.getElementById("floatingSelect").value
    let planIngresado = planes.filter(Plan => Plan.nombrePlan  === planElegido);
    console.log(planIngresado)

    //busco el indice del interes del plan elegido y muestro en consola
    let interesPlanElegido = planIngresado.find(Plan => Plan.interes)
    console.log(interesPlanElegido.interes)

    //encontrar la cantidad de cuotas del plan ingresado
    let cuotasPlanIngresado =  planIngresado.find(Plan => Plan.cuotas)
    console.log(cuotasPlanIngresado.cuotas)


    console.log(planIngresado)
    const importe = precioLoteIngresado
    const tasaInteresMensual = (interesPlanElegido.interes/100) /12
    console.log(tasaInteresMensual)

    // const factor = Math.pow(tasaInteresMensual+1, cuotasPlanIngresado.cuotas)
    //console.log(factor)

    const cuota = Math.round( importe / (( (1 - ( 1 + tasaInteresMensual) ** - cuotasPlanIngresado.cuotas)) / tasaInteresMensual))
    console.log(cuota)
    alert("Costo total del lote: $ "+ importe + " ,financiado en: "+ cuotasPlanIngresado.cuotas + " meses, interés anual de: "+ interesPlanElegido.interes +" %, valor de cuota: $ " + cuota)


}


