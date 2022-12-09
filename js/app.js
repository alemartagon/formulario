/*MODO OSCURO JS*/
/*Si clicamos en el botón del sol, borrarémos la clase css dark-mode del div 
con id page y se aplicará el estilo active al sol*/
document.getElementById('id-sun').onclick = function(){
    document.getElementById('page').classList.remove('dark-mode')
    document.getElementById('id-moon').classList.remove('active')
    this.classList.add('active')
  }
  /*Si clicamos en el botón de la luna, añadiremos la clase css dark-mode del div 
  con id page y se aplicará el estilo active a la luna*/
  document.getElementById('id-moon').onclick = function(){
    document.getElementById('page').classList.add('dark-mode')
    document.getElementById('id-sun').classList.remove('active')
    this.classList.add('active')
  }


// Esta función sirve para mostrar un mensaje de error en el elemento indicado
function mostrarError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

// Esta función es la que se ejecuta al enviar el formulario, realiza las acciones de validación
function validarFormulario() {
    // Recogemos los valores del formulario al enviarlo
    var nombre = document.contactForm.name.value;
    var email = document.contactForm.email.value;
    var telefono = document.contactForm.mobile.value;
    var dni = document.contactForm.dni.value;
    var fechaNacimiento = document.contactForm.fechaNacimiento.value;
    var pais = document.contactForm.country.value;
    var genero = document.contactForm.gender.value;
    var hobbies = [];
    var checkboxes = document.getElementsByName("hobbies[]");
    for(var i=0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            // Rellenamos la variable hobbies con los valores
            hobbies.push(checkboxes[i].value);
        }
    }
    
	// Definimos las variables de error con el valor por defecto a true
    var errorNombre = errorMail = errorTelefono = errorDNI = errorPais = errorGenero = errorFechaNacimiento = true;
    
    // Validar nombre
    if(nombre == "") {
        mostrarError("errorNombre", "Introduce un nombre");
    } else {
        var expRegular = /^[a-zA-Z\s]+$/;                
        if(expRegular.test(nombre) === false) {
            mostrarError("errorNombre", "Introduce un nombre válido");
        } else {
            mostrarError("errorNombre", "");
            errorNombre = false;
        }
    }
    
    // Validar correo electrónico
    if(email == "") {
        mostrarError("errorMail", "Introduce el correo electrónico");
    } else {
        // Expresión regular para validar el DNI
        var expRegular = /^\S+@\S+\.\S+$/;
        if(expRegular.test(email) === false) {
            mostrarError("errorMail", "Introduce un correo electrónico válido");
        } else{
            mostrarError("errorMail", "");
            errorMail = false;
        }
    }
    
    // Validar número de teléfono
    if(telefono == "") {
        mostrarError("errorTelefono", "Introduce el número de teléfono");
    } else {
        var expRegular = /^[1-9]\d{8}$/;
        if(expRegular.test(telefono) === false) {
            mostrarError("errorTelefono", "Introduce un teléfono válido");
        } else{
            mostrarError("errorTelefono", "");
            errorTelefono = false;
        }
    }

    // Validar DNI
    if(dni == "") {
        mostrarError("errorDNI", "Introduce el DNI");
    } else {
        var expRegular = /^[1-9]\d{9}$/;
        if(expRegular.test(dni) === false) {

            //calculamos la diferencia de la división para saber la posición
            dni=dni.toUpperCase();
            var numero = dni.substring(0,dni.length-1);
            var resto = numero % 23;
            var letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E", "T"];
            letras = letras.join("");
            var encontrado = letras.charAt(resto);
            var letra_dni = dni.substring(dni.length-1);

            if (letra_dni !== encontrado) {
                mostrarError("errorDNI", "Por favor, introduce un DNI válido");
            } else{
                mostrarError("errorDNI", "");
                errorDNI = false;
            }
            
        } else{
            mostrarError("errorDNI", "");
            errorDNI = false;
        }
    }

	// Calcular edad desde variable fechaNacimiento
	function calcularEdad(fecha) {
		var hoy = new Date();
		var cumpleanos = new Date(fecha);
		var edad = hoy.getFullYear() - cumpleanos.getFullYear();
		var m = hoy.getMonth() - cumpleanos.getMonth();

		if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
			edad--;
		}

		return edad;
	}

    // Validar fecha de nacimiento
    if(fechaNacimiento == "") {
        mostrarError("errorFechaNacimiento", "Seleccione la fecha de nacimiento");
    } else if(calcularEdad(fechaNacimiento) < "18"){   
		mostrarError("errorFechaNacimiento", "Tienes que ser mayor de edad");
	}
    else {
        mostrarError("errorFechaNacimiento", "");
        errorFechaNacimiento = false;
    }
    
    // Validar país
    if(pais == "Elige una opción") {
        mostrarError("errorPais", "Seleccione el país");
    } else {
        mostrarError("errorPais", "");
        errorPais = false;
    }
    
    // Validar género
    if(genero == "") {
        mostrarError("errorGenero", "Seleccione el género");
    } else {
        mostrarError("errorGenero", "");
        errorGenero = false;
    }
    
    // Impedir que se envíe el formulario si hay algún error
    if((errorNombre || errorMail || errorTelefono || errorPais || errorGenero || errorDNI || errorFechaNacimiento) == true) {
       return false;
    } else {
        // Creación de un string a partir de datos de entrada para la vista previa
        var datosPrevios = "You've entered the following details: \n" +
                          "Full Name: " + nombre + "\n" +
                          "Email Address: " + email + "\n" +
                          "Mobile Number: " + telefono + "\n" +
                          "Country: " + pais + "\n" +
                          "Gender: " + genero + "\n";
        if(hobbies.length) {
            datosPrevios += "Hobbies: " + hobbies.join(", ");
        }
        // Mostrar datos de entrada en un cuadro de diálogo antes de enviar el formulario
        alert(datosPrevios);
    }
};
