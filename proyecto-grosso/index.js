
// Variables para elementos de autenticación y usuario
let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let botonLimpiarStorage;
let usuario;
let formulario;


function inicializarElementos(){
    botonIdentificacion = document.querySelector("#botonID")
    formularioIdentificacion = document.getElementById(
        "formularioIdentificacion"
    );
    inputUsuario = document.getElementById("inputUsuario");
    contenedorIdentificacion = document.getElementById(
    "contenedorIdentificacion"
);
contenedorUsuario = document.getElementById("contenedorUsuario");
textoUsuario = document.getElementById("textoUsuario");

botonLimpiarStorage = document.getElementById("limpiarStorage");
}

function inicializarEventos () {
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
    botonLimpiarStorage.onclick = eliminarStorage;
}

function eliminarStorage() {
    localStorage.clear();
    usuario = "";
}

function actualizarUsuarioStorage() {
    localStorage.setItem("usuario", usuario);
}

function obtenerUsuarioStorage() {
    let usuarioAlmacenado = localStorage.getItem("usuario");
    if (usuarioAlmacenado) {
    usuario = usuarioAlmacenado;
    mostrarTextoUsuario();
    }
  }

function identificarUsuario(event) {
    event.preventDefault();
    usuario = inputUsuario.value;
    formularioIdentificacion.reset();
    actualizarUsuarioStorage();
    mostrarTextoUsuario();
}

function mostrarTextoUsuario() {
    contenedorIdentificacion.hidden = true;
    contenedorUsuario.hidden = false;
    textoUsuario.innerHTML += ` ${usuario}`;
  }

  function mostrarFormularioIdentificacion() {
    contenedorIdentificacion.hidden = false;
    contenedorUsuario.hidden = true;
    textoUsuario.innerHTML = ``;
  }

  inicializarElementos();
  inicializarEventos();
  obtenerUsuarioStorage();

//AGREGANDO PRODUCTOS AL CARRITO

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach(addToCardButton => {
    addToCardButton.addEventListener('click', addToCardClicked)
});

const botonComprar = document.querySelector('.comprarButton');
botonComprar.addEventListener('click', botonComprarClicked)

const contenedorCarrito = document.querySelector('.shoppingCartItemsContainer');

function addToCardClicked (event){
    const button = event.target;
    const item = button.closest('.card');
    
    const itemTitle = item.querySelector('.card-title').textContent
    const itemPrice = item.querySelector('.item-price').textContent
    const itemImage = item.querySelector('.item-image').src;
    


addItemToShoppingCard(itemTitle, itemPrice, itemImage);
}

//no duplicar producto en carrito
function addItemToShoppingCard (itemTitle, itemPrice, itemImage){
    const elementsTitle = contenedorCarrito.getElementsByClassName('shoppingCartItemTitle');
    for (let i = 0; i < elementsTitle.length; i++){
        if(elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity')
        elementQuantity.value++;
        $('.toast').toast('show');
        actualizadorPrecioCarrito();
        return;
        }

        
    }
    
    const shoppingCardRow = document.createElement('div');
    const contenidoShoppingCard = `
    <div class="row shoppingCartItem">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <img src=${itemImage} class="shopping-cart-image">
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                value="1">
                            <button class="btn btn-danger buttonDelete" type="button">X</button>
                        </div>
                    </div>
    </div>`;

    shoppingCardRow.innerHTML = contenidoShoppingCard
    contenedorCarrito.append(shoppingCardRow);

    shoppingCardRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);

    shoppingCardRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanger)
    actualizadorPrecioCarrito()
}

function actualizadorPrecioCarrito() {
    let total = 0;
    const totalCompra = document.querySelector('.shoppingCartTotal');
    
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    
shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
    '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemCuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(shoppingCartItemCuantityElement.value)
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;

    })

    totalCompra.innerHTML = `$${total}`
}

function removeShoppingCartItem (event){
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();

    actualizadorPrecioCarrito();
}

function quantityChanger (event){
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null; 

    actualizadorPrecioCarrito();
}

function botonComprarClicked(){
    contenedorCarrito.innerHTML = '';
    actualizadorPrecioCarrito();
}
    
