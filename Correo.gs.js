function validarMembresia2(e) {
    var form = FormApp.getActiveForm();
    var rut = "";
    let correo = "";
    var formResponse = e.response;
    if (formResponse == undefined || formResponse == null) {
        console.log("No hay respuestas en el formulario.");
        return;
    }
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
        var itemResponse = itemResponses[j];
        Logger.log(itemResponse.getItem().getTitle());
        if (itemResponse.getItem().getTitle() == "correo") {
            correo = itemResponse.getResponse();
            correo = correo.toString().trim();
        }
        if (itemResponse.getItem().getTitle() == "rut") {
            rut = itemResponse.getResponse();
            rut = rut.toString().trim();
        }
    }
    // Obtener la hoja de cálculo que contiene los datos de los miembros
    var spreadsheet = SpreadsheetApp.openById(
        "1W-HPBWzzYG0X0CaVgketo4dqssueRdXqc2cj8CRIv9g"
    );
    var sheet = spreadsheet.getSheetByName("Hoja 1");
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();
    var mensaje = "Su respuesta sera enviada al correo.";
    let resultado = false;
    const lista = data.map((element) => {
        if (element[0] == rut.toString().trim()) {
            resultado = true;
        }
    });
    if (resultado) {
        var precioInscripcion = 1000;
        mensajecorreo = ''
        var mensajecorreo = "Estimado/a \n\n" +
            "¡Gracias por tu interes en este seminario! El precio de la inscripción es $" + precioInscripcion + ".\n" +
            "Por favor, completa tu inscripción realizando el pago a la cuenta xdxd.\n\n" +
            "La inscripción junto con el baucher deben ser incluidos en el siguiente formulario: \n" +
            '"https://www.ejemplo.com" \n\n' +
            "Saludos,\n \n \n \n" +
            'Recuerde no responder este correo, ya que ha sido generado automáticamente';

        form
            .setConfirmationMessage(mensaje)
            .setAllowResponseEdits(true)
            .setAcceptingResponses(true);

        MailApp.sendEmail(correo,
            "Respuesta Formulario",
            mensajecorreo);


    } else {
      var precioInscripcion = 8500;
        mensajecorreo = ''
        var mensajecorreo = "Estimado/a \n\n" +
            "¡Gracias por tu interes en este seminario! El precio de la inscripción es $" + precioInscripcion + " Debido a que no pertenece a ninguna asociación.\n" +
            "Por favor, completa tu inscripción realizando el pago a la cuenta xdxd.\n\n" +
            "La inscripción junto con el baucher deben ser incluidos en el siguiente formulario: \n" +
            '"https://www.ejemplo.com" \n\n' +
            "Saludos,\n \n \n \n" +
            'Recuerde no responder este correo, ya que ha sido generado automáticamente';
        form
            .setConfirmationMessage(mensaje)
            .setAllowResponseEdits(true)
            .setAcceptingResponses(true);
        MailApp.sendEmail(correo,
            "Respuesta Formulario",
            mensajecorreo);
    }
}
function onSubmitTrigger(e) {
    validarMembresia2(e);
}