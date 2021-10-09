/////////////Ordenar array "Parcelas" por menor precio/////////

let preciosParcelas = [];
let filtroPrecio = document.getElementById("filtroPrecio").addEventListener("click", ordenarPrecio)

function ordenarPrecio () { 
  container.innerHTML = ""
  let ordenadosPrecios = parcelas.map(element => element);
  console.log("ordenados menor a mayor precio")
  console.log(ordenadosPrecios.sort((a, b ) => a.$contado - b.$contado))

  crearTabla(ordenadosPrecios)
}


/////////////Ordenar array "Parcelas" por manzana/////////


let manzanasParcelas = [];
let filtroManzana = document.getElementById("filtroManzana").addEventListener("click", ordenarManzana)

function ordenarManzana () {   
  container.innerHTML = ""
  let ordenadosManzana = parcelas.map(element => element);
  console.log("ordenados menor a mayor n° manzana")
  console.log(ordenadosManzana.sort((a, b) => a.manzana - b.manzana))
  
  crearTabla(ordenadosManzana)
 
}


/////////////Ordenar array "Parcelas" por Barrio/////////

let barriosParcelas = [];
let filtroBarrio = document.getElementById("filtroBarrio").addEventListener("click", ordenarBarrio)

function ordenarBarrio( ) {   
  container.innerHTML = ""
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
  const search = buscador.value.trim().toLowerCase();
  const buscados = parcelas.filter((lote) => lote.barrio.toLowerCase().includes(search));
  container.innerHTML = "";
  crearTabla( buscados )
})


btnReset.addEventListener("click", () => {
  container.innerHTML = "";
  crearTabla(parcelas);
})


buscador.addEventListener("keydown",function (e) {
  if (e.keyCode === 13) {
      validate(e);
  }
});

function validate(e) {
  const search = buscador.value.trim().toLowerCase();
  const buscados = parcelas.filter((lote) => lote.barrio.toLowerCase().includes(search));
  container.innerHTML = "";
  crearTabla( buscados )
}