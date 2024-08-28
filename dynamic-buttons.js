////////////////////// VOICEFLOW DYNAMIC BUTTONS WITH AIRTABLE ////////////////////////////
/* 
    1) API BLOCK (GET):
        GET https://api.airtable.com/v0/{table_id}/{table_name}
        headers:
            Authorization: Bearer {secret_key}
        Capture response:
            records (capture all records in the DB)
            APPLY TO {variable} (variable = the variable that store records)

    2) JAVASCRIPT BLOCK
    3) CUSTOM ACTION
        NOTE: the name of the custom action block is "choice" for button, AND activate stop on action
*/

// JAVASCRIPT CODE:

function transformarTexto(texto) {
    var palabras = texto.toLowerCase().split('_');
    for (var j = 0; j < palabras.length; j++) {
        palabras[j] = palabras[j].charAt(0).toUpperCase() + palabras[j].slice(1);
    }
    return palabras.join(' ');
}

var categoriasProcesadas = new Set(); // Usamos un Set para evitar duplicados

// Iteramos sobre cada registro en la variable donde se almaceno records
for (var i = 0; i < {variable}.length; i++) {
    var categoria = transformarTexto({variable}[i].fields.NAME_ROW || "Categoría no disponible");

    // Verificamos si la categoría ya ha sido procesada
    if (!categoriasProcesadas.has(categoria)) {
        categoriasProcesadas.add(categoria); // Añadimos la categoría al Set para evitar duplicados
    }
}

// Convertimos el Set en un array, lo ordenamos alfabéticamente y lo unimos en una cadena
var categoriasArray = Array.from(categoriasProcesadas).sort();
var readableString = categoriasArray.join(', ');

// Devolver la cadena final
readableString;


dynamic_button = { 
    layout: "choice",
    buttons: []
};

const makeButton = (name, sku) => ({
    "name": name,
    "request": {
        "type": "seleccion",
        "payload": {
            sku: sku
        }
    }
});

let array = readableString.split(', ');

for (let i = 0; i < categoriasArray.length; i++) {
    dynamic_button.buttons.push(makeButton(array[i], 'c-' + i));
}

botonesJSON = JSON.stringify(dynamic_button);

/* NOTE: change: 
            {variable} = variable that store records
            NAME_ROW = name of the column from which you extracted the information
*/

//////////////////////// JSON STRUCTURE FOR VOICEFLOW BUTTONS /////////////////////////
/* 
{
    "buttons": [
        {
            "name": "Hola",
            "request": {
                "type": "path-z0j33nv4",
                "payload": {
                    "label": "Hola",
                    "actions": []
                }
            }
        }
    ]
}
*/