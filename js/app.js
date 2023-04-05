const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv= document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
};

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    //Validar si se ingreso un termino de busqueda
    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de búsqueda.', 'error');
        return;
    }


    //Consumiendo 
    buscarImagenes(terminoBusqueda);
}



function mostrarAlerta(mensaje, tipo) {
    const existeAlerta = document.querySelector('.alerta');
    if (!existeAlerta) {
        const alerta = document.createElement('P');
        alerta.classList.add('bg-red-100', 'border-re-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');
        alerta.innerHTML = `
            <strong class= "font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}


function buscarImagenes(termino) {
    const key = '35081655-7fb11484196eccb9d0ca3cf47';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado =>{
            //console.log(resultado)
            totalPaginas = calcularPaginas(resultado.totalHits);
            //console.log('totalPaginas', totalPaginas)
            mostrarImagenes(resultado.hits);
        })
        .catch(error => console.log(error));
}
/* Generador que va a registrar la cantidad de elementos de acuerdo a las paginas*/
function *crearPaginador(total){
    for (let i = 1; i <= total; i++){
        yield i;
    }
}
function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registrosPorPagina));
}
function mostrarImagenes(imagenes) {
    console.log('imagenes', imagenes);

    //Limpiar resultados previos
    limpiarHTML(resultado);

    //Mostrar los resultados de la busqueda.

        //1.- Iterar sobre el arreglo de imagenes y construir HTML
        imagenes.forEach(imagen =>{
            //Destruction el objeto imagen
            const {previewURL, likes, views, largeImageURL} = imagen;

            //Construyendo HTML
            resultado.innerHTML += `
                <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4 ">
                    <div class="bg-white ">
                        <img class="w-full h-40" src="${previewURL}" >
                        <div class="p-4">
                            <div class="flex flex-row"> 
                                <p class="font-bold inline-block">${likes} </p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <span class="font-light"> Me Gusta</span>
                         </div>
                           
                         <div class="flex flex-row"> 
                            <p class="font-bold">${views}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="font-light"> Vistas</span>
                        </div>

                            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                        </div>
                    </div>
                </div>
            `;
        })

        //Limpiar el paginador previo
        limpiarHTML(paginacionDiv);
        imprimirPaginador();
}

function limpiarHTML(selector){
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);

    while(true){
        const {value, done} = iterador.next();
        if(done) return;

        //Caso contrario, genera un boton por cada elemento en el generador
        const boton = document.createElement('A');
        boton.href ='#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente','center', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold','mb-4', 'uppercase', 'rounded');

        paginacionDiv.appendChild(boton);

    }
}