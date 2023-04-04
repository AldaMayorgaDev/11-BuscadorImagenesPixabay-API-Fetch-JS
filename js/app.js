const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

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
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado =>{
            mostrarImagenes(resultado.hits);
        })
        .catch(error => console.log(error));
}

function mostrarImagenes(imagenes) {
    console.log('imagenes', imagenes);
}