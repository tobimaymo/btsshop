
let valor1, valor2, precioalbum;
const lista = (n1, espacio ,n2) => + n1 + espacio + n2
const sumar = (n1, n2) => + n1 + n2
precioalbum = 6000

operador = Number(prompt("Ingresa la operacion que quieras hacer \n1 Comprar \n2 Salir"));
while(valor1 != 2){
    valor1 = String(prompt("Ingresa el Album que quieras comprar \nProof \nButter \nBe \nDynamite \nMap of The Soul: 7 \nMap of The Soul: Persona \nLove Yourself Answer \nLove Yourself Tear \nLove Yourself Her \nYou Never Walk Alone \nWings \nTMBMIL Young Forever \nTMBMIL Pt 2 \nTMBMIL Pt 1 \nDark&Wild \nSkool Luv Affair \nO!RUL8,2 \n2 Cool 4 Skool"))
    valor2 = String(prompt("Ingresa el Album que quieras comprar \nProof \nButter \nBe \nDynamite \nMap of The Soul: 7 \nMap of The Soul: Persona \nLove Yourself Answer \nLove Yourself Tear \nLove Yourself Her \nYou Never Walk Alone \nWings \nTMBMIL Young Forever \nTMBMIL Pt 2 \nTMBMIL Pt 1 \nDark&Wild \nSkool Luv Affair \nO!RUL8,2 \n2 Cool 4 Skool"))
    espacio = "\r\n"
    switch(operador){
        case 1:
            alert("su lista de compra es \r\n"+ valor1 + espacio + valor2)
            alert("el precio final es de $"+ sumar(precioalbum, precioalbum))
        break;
    }
    break;
}