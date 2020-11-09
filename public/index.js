showMenus();
function showMenus() {
  fetch("/api/menus")
    .then(res =>res.json())
    .then(datos => {
      let menus = "";
      for (let i = 0; i < datos.length; i++) {
        menus += `
            <div class="menu">
             <h3>Menu ${datos[i].numero}</h3>
                <p>Primero: ${datos[i].primero}</p>
                <p>Segundo: ${datos[i].segundo}</p>
                 <p>Postre: ${datos[i].postre}</p>
                <p class="precio">Precio: ${datos[i].precio} €</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = menus;
    });
}

/* GENERAR DINAMICAMENTE TIPOS DE MENUS */
  fetch("/api/menus")
    .then(res =>res.json())
    .then(datos => {

      let tipoMenu = "";
      let numMenu = "";

      for (let i = 0; i < datos.length; i++) {
     /*    if (datos.numero == [i]) { */

        numMenu += `
            <option value="${i}">${datos[i].numero}</option>
        `;
          
        tipoMenu = `
          <div class="row inline">
           <select id="numero"></select>
            <input id="${i}" type="text" placeholder="${datos[i].primero}" />
            <input id="${i}" type="text" placeholder="${datos[i].segundo}" />
            <input id="${i}" type="text" placeholder="${datos[i].postre}" />
            <input id="${i}" type="text" placeholder="${datos[i].precio}" />
            </div>
            <button onclick="editMenu()">EDITAR</button>
        `;
          
        }
        
      
     /*  } */
    /*  document.getElementById("numero").innerHTML = numMenu; */
       document.getElementById("tipoMenu").innerHTML = tipoMenu; 
   
    });
    




let menuNuevo ="";
function addMenu() {
    let numero = document.getElementById("numMenu").value 
    let primero = document.getElementById("primeroMenu").value
    let segundo = document.getElementById("segundoMenu").value
    let postre = document.getElementById("postreMenu").value
    let precio = parseInt(document.getElementById("precioMenu").value)

 let menu = {
    numero,
    primero,
    segundo,
    postre,
    precio
    }

    fetch("/api/nuevoMenu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(menu),
    })

    .then(res => res.json())
      .then(datos => {
      
     
      console.log(datos);
        for (let i = 0; i < datos.length; i++) {
            
          /*         menuNuevo = `
                      <div class="menus">
                       <h3>Menu ${datos[i].numero}</h3>
                          <p>Primero: ${datos[i].primero}</p>
                          <p>Segundo: ${datos[i].segundo}</p>
                           <p>Postre: ${datos[i].postre}</p>
                          <p class="precio">Precio: ${datos[i].precio} €</p>
                      </div>>
                  `;
                }
                document.getElementById("resultado").innerHTML = menuNuevo;
              })
          } */
          
      showMenus();
        }

    });
}


let menuEditar;
function editMenu() {
    let menuEdit = document.getElementById("menuEdit").value

    let estado = document.getElementById('estado');
    selectedOption = estado.options[estado.selectedIndex].value;
  console.log(selectedOption);
  
   let menu = {
    numero,
    primero,
    segundo,
    postre,
    precio
    }
  
    
fetch("/api/editarMenu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menu),
  })
      .then(res => res.json())
      .then(datos => {
      
        console.log(datos);
        for (let i = 0; i < datos.length; i++) {

        menuEditar = `
           <div class="menus">
             <h3>Menu ${datos[i].numero}</h3>
                <p>Primero: ${datos[i].primero}</p>
                <p>Segundo: ${datos[i].segundo}</p>
                 <p>Postre: ${datos[i].postre}</p>
                <p class="precio">Presio: ${datos[i].precio} (IVA incluido)</p>
            </div>>
        `;
      }
      document.getElementById("resultado").innerHTML = menuEditar;
        
    });
}



let menuBorrar;

function deleteMenu() {
  const numero = document.getElementById("numDelete").value
  console.log(numero);
    
    fetch("/api/borrarMenu", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numero}),
  })
    .then( res => res.json())
    .then(datos => {
      
      console.log(datos);
      for (let i = 0; i < datos.length; i++) {
        if (datos[i].numero === numero) {
          menuBorrar = `
          <div class="mensaje">
            <p>El libro  ${datos[i].numero} ha sido eliminado </p>
          </div>
        `;
      }
      document.getElementById("mensaje").innerHTML = menuBorrar;
      showMenus();
          
        }
          
  
        
    });
}



