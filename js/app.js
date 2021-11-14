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
        
        // <td class="">${lote.id}</td>
        container.innerHTML +=  `
        <tr>
            <th class="" scope="row">${lote.barrio}</th>
            <td class="">${lote.lote}</td>
            <td class="">${lote.manzana}</td>
            <td class="">${lote.mts}</td>
            <td class="">$${lote.$contado}</td>
            <td class="">${lote.estado}</td>
            <td class=""><button type="button" class="btn btn-success" id="btnCotizar" onclick="cotizar(${lote.id})">cotizar</button></td>
        </tr>`
    })
    
}    
crearTabla(parcelas)


//function para pasar los datos al cotizador
let parcelaEnCotizador = [];

      
const cotizar = (loteId) => {
       
    const loteAcotizar = parcelas.find((lote) => lote.id === loteId)
    
    parcelaEnCotizador.push({
        id: loteAcotizar.id,
        lote:  loteAcotizar.lote,
        manzana: loteAcotizar.manzana,
        precio: parseInt(loteAcotizar.$contado),
        estado: loteAcotizar.estado
    })

    if( loteAcotizar.estado == "vendido"){
        alert("este lote fue vendido, no se puede cotizar")
  
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

//////////////////acciones extras

let dropMenuBtn = document.getElementById("dropdownMenu2")
let dropMenu = document.getElementById("dropdown-menu")

dropMenuBtn.addEventListener("click", ()=>{
    if(dropMenu.style.display == "") {
        dropMenu.style.display = "block";

    }else if(dropMenu.style.display == "block"){
        dropMenu.style.display = "";
    }
})

// $("body").click( () => {
//     dropMenu.style.display = "";
// })

//============== AGREGAR PARCELA AL COTIZADOR ==============//
    
//function actualizarCotizador () {
const actualizarCotizador = () => {
        
  parcelaEnCotizador.forEach((lote) =>{ 
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.className = ("modal-active");
    modal.id = ("modal-active");

    modal.innerHTML =
    `<div class=" modal-body">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title success">Cotizador</h5>
                        
                        <button type="button" class="btn-close" data-bs-dismiss="modal" id="modal-cerrar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body modalLight" id="mdlCotiz">
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">Id N:°</label>
                            <input type="text" class="form-control" id="formGroupExampleInputId" value="${lote.id}" readonly
                            <label for="formGroupExampleInput" class="form-label">N° de Lote</label>
                            <input type="text" class="form-control" id="formGroupExampleInput" value="${lote.lote}" readonly>
                            <label for="formGroupExampleInput" class="form-label">Manzana</label>
                            <input type="text" class="form-control" id="formGroupExampleInput0" value="${lote.manzana}" readonly>
                            </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Precio a financiar</label>
                                    <input type="number" class="form-control" id="formGroupExampleInput2" value="${lote.precio}" readonly>
                                    <p>
                                    <button class="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onclick="dolarizar()">
                                      USD
                                    </button>
                                  </p>
                                  <div class="collapse" id="collapseExample">
                                    <div class="card card-body" id="card">
                                       
                                    </div>
                                  </div>
                                    
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
    
    //busco el indice del interes del plan elegido 
    let interesPlan = document.getElementById("formGroupExampleInput4");
    let interesPlanElegido = planIngresado.find(Plan => Plan.interes)
    interesPlan.value = interesPlanElegido.interes
     
}

//////////////////////Función que calcula el valor de las cuotas respecto al lote y plan elegido///////////////////

let tbContainer2 = document.getElementById("tbContainer2");
let modalFooter = document.getElementById("modal-footer")

let cantidadCuotas, tasaInteresMensual, cuotaMensualidad, interesesCuotas, capitalA,  capitalV,
primerInteres, primerCapitalA, primerCapitalV

var dataReset = function () {
    primerInteres = 0; primerCapitalA = 0,  primerCapitalV = 0; 


    //busco el indice del precio $contado del lote elegido 
    precioLoteIngresado = document.getElementById("formGroupExampleInput2").value
    console.log(precioLoteIngresado )

    //verifico el plan elegido
    let planElegido = document.getElementById("floatingSelect").value
    let planIngresado = planes.filter(Plan => Plan.nombrePlan  === planElegido);
    console.log(planIngresado)

    //busco el indice del interes del plan elegido 
    interesPlanElegido = planIngresado.find(Plan => Plan.interes)
    console.log(interesPlanElegido.interes)

    //encontrar la cantidad de cuotas del plan ingresado
    cuotasPlanIngresado =  planIngresado.find(Plan => Plan.cuotas)
    cantidadCuotas = cuotasPlanIngresado.cuotas
    console.log(cantidadCuotas)

}

//calculo la tasa de interés mensual
function calcularTasaInteres () {
    tasaInteresMensual = (interesPlanElegido.interes/100) /12
    console.log(tasaInteresMensual) 
    return tasaInteresMensual
} 

//calculo el valor de las cuotas
function PagoMensual () {
    let denominador = Math.pow((1 + calcularTasaInteres()), cantidadCuotas) - 1
    cuotaMensualidad = (calcularTasaInteres() + (calcularTasaInteres() / denominador)) * precioLoteIngresado
    console.log(cuotaMensualidad)
    return cuotaMensualidad
}

function calcularTotalPrestamo () {
    let totalPrestamo = 0
    for ( let i = 0; i < cantidadCuotas; i++ ) {
        totalPrestamo += cuotaMensualidad
    }
    return totalPrestamo
}

//calculo el monto de interes mensual por cuota
  function intereses () {
    if ( primerInteres === 0 ) {
      interesesCuotas = tasaInteresMensual * precioLoteIngresado
      primerInteres = interesesCuotas
    } else {
      interesesCuotas = tasaInteresMensual * capitalV
    }
    return interesesCuotas
  }
  
//capital Amortizado
  function capitalAmortizado () {
    if ( primerCapitalA === 0 ) {
      capitalA = cuotaMensualidad - primerInteres
      primerCapitalA = capitalA
    } else {
      capitalA = cuotaMensualidad - intereses() 
    }
    return capitalA
  }
  
//capital vivo
  function capitalVivo () {
    if ( primerCapitalV === 0 ) {
        capitalV = precioLoteIngresado - primerCapitalA
        primerCapitalV = capitalV
    } else {
        capitalV -= capitalAmortizado()
    }
    return capitalV
  }

  ///////////////////////SIMULADOR DE CUOTAS/////////////////////////////////////////////////////////
  let body = document.getElementById("body")
  let mdlCotiz = document.getElementById("mdlCotiz");
  let modalContent = document.getElementById("modal-content")


function simularCuotas(){

    dataReset ()
    PagoMensual()
    calcularTotalPrestamo()
//  --------------------------------------cuotas amortización----------------------------------------
    let columnas = [ 'N° cuota',  'Valor cuota', 'Intereses', 'Capital amortizado', 'Capital Vivo' ]
    
    tbContainer2.textContent = "";
    tbContainer2.innerHTML =
            `<tr>
            <td class=""></td>
            <td class=""></td>
            <td class=""></td>
            <td class=""></td>
            <td class="">$${precioLoteIngresado}</td>
            </tr>
            `
   
    for ( let i = 0; i < cantidadCuotas; i++ ) {
        let interesesCuotas = intereses(),  capitalA = capitalAmortizado(), capitalV = capitalVivo();
        let fila = document.createElement('tr');
        
        for ( let k = 0; k < columnas.length; k++ ) {
            

            let celda = document.createElement('td')
            let texto
            
            switch ( columnas[k] ) {
                case 'N° cuota':
                texto = (i + 1)
                break;
                case 'Valor cuota':
                texto = `$${cuotaMensualidad.toFixed(2)}`
                break
                case 'Intereses':
                texto = `$${interesesCuotas.toFixed(2)}`
                break
                case 'Capital amortizado' :
                texto = `$${capitalA.toFixed(2)}`
                break
                case 'Capital Vivo':
                texto = `$${Math.abs(capitalV.toFixed(2))}`
                break
                default:
                break
            }
            var textoCelda = document.createTextNode(texto)
            celda.appendChild(textoCelda)
            fila.appendChild(celda)
            tbContainer2.appendChild(fila)
            
        }
      
    }

}


///////////////////Consumiendo API////////////////

$.get("https://v6.exchangerate-api.com/v6/d2afb7a3730cf9978034581e/latest/USD", (response) => {
    data = response
    console.log(data)

        $("#exchange").append(
            `<p>Valor dolar $${data.conversion_rates.ARS}</p>`
        )
   
})

let card = document.getElementById("card")

const dolarizar = (()=> {
    
    fetch("https://v6.exchangerate-api.com/v6/d2afb7a3730cf9978034581e/latest/USD")
        .then( (response) => 
            response.json())
        .then((data) => {
            let precioArs = document.getElementById("formGroupExampleInput2").value
            let cambio = data.conversion_rates.ARS
            let conversion = parseInt(precioArs/cambio)

            $(".card").html(" ")
            $(".card").append(
                `<p>Precio del lote en dólares $${conversion.toFixed(2)}</p>
                <p>Valido hasta ${data.time_last_update_utc}</p>`
            )
        })
        .catch ((err) => console.log(err))
        
}) 



////////////////////GUARDAR RESUMEN PLAN////////////////////

    let guardarPlan = document.getElementById("guardarPlan")
    let formGroupExampleInput = document.getElementById("formGroupExampleInput")
    let formGroupExampleInput0 = document.getElementById("formGroupExampleInput0")


//Guarda en LocalStorge como JSON los datos del plan
var baseDeDatos = [];
var guardadoLocal

function guardado() {
    // $('#exampleModal').modal('hide');
    // $('#exampleModalToggle').modal('show');
    let prestamoConInteres = cuotaMensualidad * cantidadCuotas;
    let interesesAcumulados = prestamoConInteres - precioLoteIngresado;
    $(document).ready(function () {
       
        class AgregarData {
            constructor(idLoteCotizado, loteCotizado, manzanaCotizada, cantCuotas, valorCuota, totalInteres, totalPrestamoInicial, totalPrestamoIntereses) {
                this.idLoteCotizado = idLoteCotizado;
                this.loteCotizado = loteCotizado;
                this.manzanaCotizada = manzanaCotizada;
                this.cantCuotas = cantCuotas;
                this.valorCuota = valorCuota;
                this.totalInteres = totalInteres;
                this.totalPrestamoInicial = totalPrestamoInicial;
                this.totalPrestamoIntereses = totalPrestamoIntereses;
            }
        }
        //verifica si existe la base de datos y decide si la crea o la actualiza
        if (localStorage.getItem("cotización") === null) {
            
            // Agrega datos actuales al array baseDeDatos
            baseDeDatos.push(new AgregarData($("#formGroupExampleInputId").val(),$("#formGroupExampleInput").val(), $("#formGroupExampleInput0").val(),`${cantidadCuotas}`,`${cuotaMensualidad.toFixed(2)}`, `${interesesAcumulados.toFixed(2)}`, `${precioLoteIngresado}`, `${prestamoConInteres.toFixed(2)}`))
            // Guarda datos actuales en LocalStorage
            localStorage.setItem(`cotización`, JSON.stringify(baseDeDatos)); 
        } else {
            //Carga la base de datos
            guardadoLocal = JSON.parse(localStorage.getItem("cotización")); 
            //Agrega datos actuales en LocalStorage
            guardadoLocal.push(new AgregarData($("#formGroupExampleInputId").val(),$("#formGroupExampleInput").val(), $("#formGroupExampleInput0").val(),`${cantidadCuotas}`,`${cuotaMensualidad.toFixed(2)}`, `${interesesAcumulados.toFixed(2)}`, `${precioLoteIngresado}`, `${prestamoConInteres.toFixed(2)}`))
            //Guarda datos actualizados en LocalStorage
            localStorage.setItem(`cotización`, JSON.stringify(guardadoLocal)); 
        }
        
    });
    
}    


//Guardar lote y plan cotizados en carrito "Mis Cotizaciones"

function carrito() {  
    var guardadoLocal = JSON.parse(localStorage.getItem("cotización"));
    let cotizados = document.getElementById("cotizados");
        
        cotizados.innerHTML = ""
    //Recorre el array
    guardadoLocal.forEach(element => {
        
        cotizados.innerHTML +=` 
        <table class="table table-hover table-bordered table-warning">
            <thead class="table-dark rounded">
                <tr>
                    <th scope="col" class="" scope="row">N° cuotas</td>
                    <th scope="col" class="">Valor cuota</td>
                    <th scope="col" class="">Total Interes</td>
                    <th scope="col" class="">Total Préstamo inicial</td>
                    <th scope="col" class="">Total con intereses</td>
                </tr>
            </thead>
            <p id="idLoteCotizado">Id N°:${element.idLoteCotizado} </p>
            <p> Lote ${element.loteCotizado} Manzana ${element.manzanaCotizada} </p>
            <tbody id="tbCotizados" class="table-light">
                <tr>
                    <td class="" scope="row">${element.cantCuotas}</td>
                    <td class="">$${element.valorCuota}</td>
                    <td class="">$${element.totalInteres}</td>
                    <td class="">$${element.totalPrestamoInicial}</td>
                    <td class="">$${element.totalPrestamoIntereses}</td>
                </tr>
            </tbody>
        </table>
        
        `;
    })
    
    $('#contadorN').html(guardadoLocal.length)
    
    console.log(guardadoLocal.length)
    
}

if (localStorage.getItem('cotización')) {
    carrito();
}

// Borra el lote cotizado

var i = -1;
function borrarCotizacion(i) {
    var guardadoLocal = JSON.parse(localStorage.getItem("cotización"));
    i++
    baseDeDatos.indexOf( guardadoLocal);
    guardadoLocal.splice(i, 1);
    localStorage.setItem(`cotización`, JSON.stringify(guardadoLocal));
    $('#contadorN').html(guardadoLocal.length)

    if (guardadoLocal.length === 0) {
        localStorage.clear();
        $("#menu").fadeOut(800);
    } else {
        carrito();
    }
}


////////////cambiar theme mode con Jquery//////////

$(document).ready(function theme(){
    
    $('#flexSwitchCheckDefault').click(function(){
         
        let element = document.body;         
        
        element.classList.toggle("dark"); 
        container.classList.toggle("table-dark"); 
        tbContainer2.classList.toggle("table-dark");
        mdlCotiz.classList.replace("modal-body", "dark")
   
    });           
}); 


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
        "width": "400px",
        "position": "fixed",
        "z-index": "1",
        "top": "0",
        "right": "0",
        "background-color": "seagreen",
        "overflow-x": "hidden",
        "padding": "10px"
    })
})

$("#closebtn").click( () => {
    $("#menu").fadeOut(800);
})


