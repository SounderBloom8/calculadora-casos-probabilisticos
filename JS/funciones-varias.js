function truncarDecimal(decimal, maxDecimales) {
    return decimal.substring(0, maxDecimales);
}

function NumeroPeriodico(num) {
    // Convertir el número a una cadena
    let str = num.toString();

    // Separar la parte entera de la parte decimal
    let [entero, decimal] = str.split('.');

    // Si no hay parte decimal, devolver el número original
    if (!decimal) {
        return num;
    }

    // Buscar patrones repetitivos en la parte decimal
    for (let i = 1; i <= decimal.length / 2; i++) {
        let pattern = decimal.substring(0, i);
        let regex = new RegExp('^(' + pattern + ')+$');
        if (regex.test(decimal)) {
            // Si se encuentra un patrón repetitivo, truncar el decimal a 3 dígitos
            let decimalTruncado = truncarDecimal(decimal, 3);
            return parseFloat(`${entero}.${decimalTruncado}`);
        }
    }

    // Si no se encuentra un patrón repetitivo, truncar el decimal a 3 dígitos
    let decimalTruncado = truncarDecimal(decimal, 3);
    return parseFloat(`${entero}.${decimalTruncado}`);
}



function agregarSimboloPeriodico(num) {
    // Convertir el número a una cadena
    let str = num.toString();

    // Separar la parte entera de la parte decimal
    let [entero, decimal] = str.split('.');

    // Si no hay parte decimal, retornar el número como está
    if (!decimal) {
        return str;
    }

    // Colocar el símbolo sobre el último dígito de la parte decimal
    let ultimoDigito = decimal[decimal.length - 1];
    let parteAnterior = decimal.slice(0, -1);
    return `${entero}.${parteAnterior}${ultimoDigito}\u0305`;
}


function esNumeroPeriodico(numero) {
    // Convertir el número a una cadena si no lo es
    let numStr = numero.toString();

    // Verificar si hay un punto decimal en el número
    if (!numStr.includes('.')) {
        return false; // Los números enteros no son periódicos
    }

    // Obtener la parte decimal
    let decimalPart = numStr.split('.')[1];

    // Verificar si la parte decimal es periódica
    for (let i = 1; i <= decimalPart.length / 2; i++) {
        let pattern = decimalPart.slice(0, i);
        let repeatedPattern = pattern.repeat(Math.ceil(decimalPart.length / i)).slice(0, decimalPart.length);
        if (repeatedPattern === decimalPart) {
            return true;
        }
    }
    return false;
}