/////////////Ordenar array "Parcelas" por menor precio/////////

let preciosParcelas = [];
let filtroPrecio = document.getElementById("filtroPrecio").addEventListener("click", ordenarPrecio)
let loteEliminado;


function ordenarPrecio () { 
  
  dropMenuBtn.setAttribute("style","display:none")
  container.innerHTML = "";
  let ordenadosPrecios = parcelas.map(element => element);
  console.log("ordenados menor a mayor precio")
  console.log(ordenadosPrecios.sort((a, b ) => a.$contado - b.$contado))
  crearTabla(ordenadosPrecios)
  
}


/////////////Ordenar array "Parcelas" por manzana/////////


let manzanasParcelas = [];
let filtroManzana = document.getElementById("filtroManzana").addEventListener("click", ordenarManzana)

function ordenarManzana () {   
  dropMenuBtn.setAttribute("style","display:none")
  container.innerHTML = "";
  let ordenadosManzana = parcelas.map(element => element);
  console.log("ordenados menor a mayor n° manzana")
  console.log(ordenadosManzana.sort((a, b) => a.manzana - b.manzana))
  
  crearTabla(ordenadosManzana)
 
}


/////////////Ordenar array "Parcelas" por Barrio/////////

let barriosParcelas = [];
let filtroBarrio = document.getElementById("filtroBarrio").addEventListener("click", ordenarBarrio)

function ordenarBarrio( ) {   
  dropMenuBtn.setAttribute("style","display:none")
  container.innerHTML = "";
  let ordenadosBarrio = parcelas.sort(function(a, b){
    let aParcela = a.barrio.toLowerCase();
    let bParcela = b.barrio.toLowerCase();
    if (aParcela < bParcela) {
        return -1;
      }    
      else if (aParcela > bParcela){
        return 1;
      }   
      return 0;
  });
  
  console.log("ordenados alfabéticamete por Barrio");
  console.log(ordenadosBarrio);

  crearTabla(ordenadosBarrio);
}
  
//////////////Buscar y resetar///////////////////////////////

let buscador = document.getElementById("busquedaNombre");
let btnBuscar = document.getElementById("button-addon2");
let btnReset = document.getElementById("button-reset");

let arrayBuscar = []



btnBuscar.addEventListener("click", () => {
  let search = buscador.value.trim().toLowerCase();
  const buscadosBarrio = parcelas.filter((lote) => lote.barrio.toLowerCase().includes(search));
  container.innerHTML = "";
  crearTabla(buscadosBarrio)
})


btnReset.addEventListener("click", () => {
  container.innerHTML = "";
  crearTabla(parcelas);
})


buscador.addEventListener('keydown', ({key}) => { 
  
  if (key === "Backspace" || key === "Delete") { 
    const search = buscador.value.trim().toLowerCase();
    const buscados = parcelas.filter((lote) => lote.barrio.toLowerCase().includes(search));
    container.innerHTML = "";
    crearTabla(buscados);
  } else  {
    crearTabla(parcelas);
  }
     
})




buscador.addEventListener("keydown",function (e) {
  if (e.keyCode === 13) {
      validate(e);
  }
});


function validate(e) {
    const search = buscador.value.trim().toLowerCase();
    const buscados = parcelas.filter((lote) => lote.barrio.toLowerCase().includes(search));
    dropMenuBtn.setAttribute("style","display:none")
    container.innerHTML = "";
    crearTabla( buscados )
  }


///////////Filtro por estado//////////

let estadoElegido = document.getElementById("estado")
let estadosParcelas = [];

estadoElegido.addEventListener("click", () => {
  dropMenuBtn.setAttribute("style","display:none")
  const porEstado = parcelas.filter((lote) => lote.estado.includes(estadoElegido.value));

  switch(estadoElegido.value) {
    case 'disponible':
      container.innerHTML ="";
      console.log("lotes disponibles")
      crearTabla(porEstado)
      break;
    case 'reservado':
      container.innerHTML ="";
      console.log("lotes reservados")
      crearTabla(porEstado)
      break;
    case 'vendido':
      container.innerHTML ="";
      console.log("lotes vendidos")
      crearTabla(porEstado)
      break;
    default: 

  }

})

////////////////////////eliminar primer parcela/


let btnEliminarUltimo = document.getElementById("btnEliminarUltimo").addEventListener ("click", ()=>{

  loteEliminado = parcelas.pop()
  console.log(loteEliminado)  
  container.innerHTML ="";
  crearTabla(parcelas)
  dropMenu.style.display = "";
})

let btnEliminarPrimero = document.getElementById("btnEliminarPrimero").addEventListener ("click", ()=>{

  loteEliminado = parcelas.shift()
  console.log(loteEliminado)  
  container.innerHTML ="";
  crearTabla(parcelas)
  dropMenu.style.display = "";
})

