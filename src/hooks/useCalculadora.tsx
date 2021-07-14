import { useRef, useState } from "react";

enum Operadores{
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setnumero] = useState('0');

    const UltimaOperacion = useRef<Operadores>()

    const limpiar = ()  => {
        setnumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = (numeroTexto: string) => {
        
        //No aceptar doble punto
        if (numero.includes('.') && numeroTexto == '.') return;
        
        if ( numero.startsWith('0') || numero.startsWith('-0') ) {
            //Punto decimal
            if ( numeroTexto === '.') {
                setnumero ( numero + numeroTexto);
            
                //Evaluar si es otro vero, y hay un punto
            }else if (numeroTexto === '0' && numero.includes('.') ) {
                setnumero( numero + numeroTexto );

            //Evaluar si es diferente de cero y no tiene un punto
            }else if ( numeroTexto !== '0' && ! numero.includes('.')) {
                setnumero( numeroTexto );

            //Evitar 0000.0
            }else if ( numeroTexto === '0' && ! numero.includes('.')) {
                setnumero( numero );
            }else{
                setnumero( numero + numeroTexto);
            }

        }else{
            setnumero( numero + numeroTexto);
        }
    }

    const positivoNegativo = () =>{
        if(numero.includes('-') ) {
            setnumero( numero.replace('-','') );
        }else{
            setnumero( '-' + numero);
        }    
    }

    const btnDelete = () => {
        
        let negativo = '';
        let numeroTemp = numero;
        if ( numero.includes('-') ) {
            negativo = '-';
            numeroTemp = numero.substr(1)
        }
        
        if (numeroTemp.length > 1 ) {
            setnumero( negativo + numeroTemp.slice(0,-1) );
        }else{
            setnumero('0');  
        }
    }

    const cambiarNumPorAnterior = () => {
        if ( numero.endsWith('.') ) {
            setNumeroAnterior( numero.slice(0,-1) );
        } else{
            setNumeroAnterior( numero );
        }
        setnumero('0');
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        UltimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        UltimaOperacion.current = Operadores.multiplicar;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        UltimaOperacion.current = Operadores.restar;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        UltimaOperacion.current = Operadores.sumar;
    }

    const calcular = () => {
        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch (UltimaOperacion.current) {
            case Operadores.sumar:
                setnumero( `${ num1 + num2 }` );
                break;
               
            case Operadores.restar:
                setnumero( `${ num2 - num1 }` );
                break;    
        
            case Operadores.multiplicar:
                setnumero( `${ num1 * num2 }` );
                break;     

            case Operadores.dividir:
            setnumero( `${ num2 / num1 }` );
            break;     
        }
        
        setNumeroAnterior('0');
    }

   return{
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnSumar,
    btnRestar,
    btnMultiplicar,
    armarNumero,
    calcular
   } 
}
