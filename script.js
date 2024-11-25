window.onload = () => {
    // Crear tarjetas iniciales
    crearTarjetas(filosofos);

    // Asociar eventos al formulario de creación
    let botonCrearTarjeta = document.querySelector('.create-card-form .create-btn');
    if (botonCrearTarjeta) {
        botonCrearTarjeta.addEventListener('click', crearNuevaTarjeta);
    }

    // Asociar eventos a los botones de ordenación
    let botonOrdenAZ = document.querySelector('.sort-az');
    let botonOrdenZA = document.querySelector('.sort-za');
    if (botonOrdenAZ) {
        botonOrdenAZ.addEventListener('click', ordenarNombreAZ);
    }
    if (botonOrdenZA) {
        botonOrdenZA.addEventListener('click', ordenarNombreZA);
    }

    // Asociar eventos a los botones de Guardar y Cargar Tarjetas
    let botonGuardarTarjetas = document.querySelector('.save-btn');
    let botonCargarTarjetas = document.querySelector('.load-btn');
    if (botonGuardarTarjetas) {
        botonGuardarTarjetas.addEventListener('click', guardarTarjetas);
    }
    if (botonCargarTarjetas) {
        botonCargarTarjetas.addEventListener('click', cargarTarjetas);
    }
};

function crearTarjetas(filosofos) {
    // Obtener el contenedor de tarjetas
    let contenedor = document.querySelector('.cards-container');
    if (!contenedor) {
        console.error('El contenedor ".cards-container" no existe en el DOM.');
        return;
    }

    // Iterar sobre cada filósofo y crear su tarjeta
    filosofos.forEach((filosofo) => {
        // Crear tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        // Crear botón para eliminar tarjeta
        let botonEliminar = document.createElement('div');
        botonEliminar.innerHTML = '&#x2716;'; // Carácter de aspa
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.addEventListener('click', eliminarTarjeta); // Asociar evento
        tarjeta.append(botonEliminar); // Añadir el botón a la tarjeta

        // Crear imagen del filósofo
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add('photo');
        tarjeta.append(imagen);

        // Crear contenedor de información
        let info = document.createElement('div');
        info.classList.add('card-info');

        // Crear título (nombre del filósofo)
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.textContent = filosofo.nombre;
        info.append(titulo);

        // Añadir información del país
        let filaPais = document.createElement('div');
        filaPais.classList.add('info-row');
        let bandera = document.createElement('img');
        bandera.src = filosofo.pais.bandera;
        bandera.alt = `Bandera de ${filosofo.pais.nombre}`;
        let nombrePais = document.createElement('span');
        nombrePais.textContent = filosofo.pais.nombre;
        filaPais.append(bandera, nombrePais);
        info.append(filaPais);

        // Añadir información de la corriente filosófica
        let filaCorriente = document.createElement('div');
        filaCorriente.classList.add('info-row');
        filaCorriente.innerHTML = `
            <span>Corriente: ${filosofo.corriente}</span>
        `;
        info.append(filaCorriente);

        // Añadir información del arma
        let filaArma = document.createElement('div');
        filaArma.classList.add('info-row');
        filaArma.innerHTML = `
            <span>Arma: ${filosofo.arma}</span>
        `;
        info.append(filaArma);

        // Crear contenedor de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');

        // Iterar sobre cada habilidad y añadirla
        filosofo.habilidades.forEach((habilidad) => {
            // Crear contenedor para una habilidad
            let skill = document.createElement('div');
            skill.classList.add('skill');

            // Crear etiqueta de habilidad
            let etiqueta = document.createElement('span');
            etiqueta.textContent = habilidad.habilidad;

            // Crear barra de nivel de habilidad
            let skillBar = document.createElement('div');
            skillBar.classList.add('skill-bar');
            let nivel = document.createElement('div');
            nivel.classList.add('level');
            nivel.style.width = `${habilidad.nivel * 25}%`; // Escala del 0 al 100
            skillBar.append(nivel);

            // Añadir elementos al contenedor de habilidad
            skill.append(etiqueta, skillBar);

            // Añadir habilidad al contenedor de habilidades
            habilidades.append(skill);
        });

        // Añadir habilidades al contenedor de información
        info.append(habilidades);

        // Añadir el contenedor de información a la tarjeta
        tarjeta.append(info);

        // Añadir tarjeta al contenedor en el DOM
        contenedor.append(tarjeta);
    });
}

function eliminarTarjeta(event) {
    // Obtener la tarjeta (elemento padre del botón)
    let tarjeta = event.target.parentElement;

    // Eliminar la tarjeta del DOM
    tarjeta.remove();
}

function ordenarNombreAZ() {
    console.log("Ordenando A->Z");
    let contenedor = document.querySelector('.cards-container');
    if (!contenedor) return;

    let tarjetas = Array.from(contenedor.querySelectorAll('.card'));
    tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').textContent.toLowerCase();
        let nombre2 = tarjetaB.querySelector('h3').textContent.toLowerCase();
        return nombre1.localeCompare(nombre2);
    });

    contenedor.innerHTML = "";
    tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

function ordenarNombreZA() {
    console.log("Ordenando Z->A");
    let contenedor = document.querySelector('.cards-container');
    if (!contenedor) return;

    let tarjetas = Array.from(contenedor.querySelectorAll('.card'));
    tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').textContent.toLowerCase();
        let nombre2 = tarjetaB.querySelector('h3').textContent.toLowerCase();
        return nombre2.localeCompare(nombre1);
    });

    contenedor.innerHTML = "";
    tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

function crearNuevaTarjeta(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Crear un objeto con la información del formulario
    let nuevoFilosofo = {
        nombre: document.querySelector('.create-card-form .nombre').value,
        imagen: document.querySelector('.create-card-form .foto').value,
        pais: {
            nombre: document.querySelector('.create-card-form .pais').value,
            bandera: document.querySelector('.create-card-form .bandera').value
        },
        corriente: document.querySelector('.create-card-form .corriente').value,
        arma: document.querySelector('.create-card-form .arma').value,
        habilidades: [
            {
                habilidad: "Sabiduría",
                nivel: parseInt(document.querySelector('.create-card-form .sabiduria').value) || 0
            },
            {
                habilidad: "Oratoria",
                nivel: parseInt(document.querySelector('.create-card-form .oratoria').value) || 0
            },
            {
                habilidad: "Lógica",
                nivel: parseInt(document.querySelector('.create-card-form .logica').value) || 0
            },
            {
                habilidad: "Innovación",
                nivel: parseInt(document.querySelector('.create-card-form .innovacion').value) || 0
            }
        ]
    };

    // Validar campos obligatorios
    if (!nuevoFilosofo.nombre || !nuevoFilosofo.imagen || !nuevoFilosofo.pais.nombre || !nuevoFilosofo.pais.bandera) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Añadir el nuevo filósofo al array global
    filosofos.push(nuevoFilosofo);

    // Renderizar solo la nueva tarjeta
    crearTarjetas([nuevoFilosofo]);

    // Limpiar los campos del formulario
    document.querySelector('.create-card-form form').reset();
}

function parsearTarjetas(tarjetas) {
    let filosofosParseados = [];
    for (let tarjeta of tarjetas) {
        let filosofo = {};

        // Extraer información básica del filósofo
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;

        // Extraer información del país
        filosofo.pais = {};
        let filaPais = tarjeta.querySelector('.info-row span');
        if (filaPais) {
            filosofo.pais.nombre = filaPais.textContent.trim();
        }
        let bandera = tarjeta.querySelector('.info-row img');
        if (bandera) {
            filosofo.pais.bandera = bandera.src;
        }

        // Extraer información de corriente y arma
        let filaCorriente = tarjeta.querySelector('.info-row:nth-of-type(2) span');
        filosofo.corriente = filaCorriente ? filaCorriente.textContent.replace('Corriente: ', '').trim() : '';

        let filaArma = tarjeta.querySelector('.info-row:nth-of-type(3) span');
        filosofo.arma = filaArma ? filaArma.textContent.replace('Arma: ', '').trim() : '';

        // Extraer habilidades
        filosofo.habilidades = [];
        let habilidades = tarjeta.querySelectorAll('.skill');
        for (let habilidad of habilidades) {
            let habilidadParaGuardar = {};
            habilidadParaGuardar.habilidad = habilidad.querySelector('span').textContent.trim();
            let nivel = habilidad.querySelector('.level').style.width;
            habilidadParaGuardar.nivel = parseInt(nivel) / 25; // Convertir porcentaje a escala 0-4
            filosofo.habilidades.push(habilidadParaGuardar);
        }

        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasParseadas = parsearTarjetas(tarjetas);
    localStorage.setItem('tarjetas', JSON.stringify(tarjetasParseadas));
    alert('Tarjetas guardadas correctamente.');
}

function cargarTarjetas() {
    // Leer las tarjetas guardadas en el localStorage
    let tarjetasGuardadas = localStorage.getItem('tarjetas');
    if (!tarjetasGuardadas) {
        alert('No hay tarjetas guardadas.');
        return;
    }

    // Parsear las tarjetas guardadas y crear nuevas tarjetas en el DOM
    let filosofosGuardados = JSON.parse(tarjetasGuardadas);
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = ""; // Vaciar el contenedor actual
    crearTarjetas(filosofosGuardados);

    alert('Tarjetas cargadas correctamente.');
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]