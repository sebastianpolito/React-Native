import React from 'react'
import { styles } from '../theme/appTheme';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    texto: string;
    color?: string;
    ancho?: boolean
    accion: (numeroTexto: string) => void; 
}

export const BotonCalculadora = ({ texto, color= '#2D2D2D' , ancho = false, accion }:Props) => {
    return (
        <TouchableOpacity
            onPress={ () => accion ( texto )}
        >
            <View style={{
                ...styles.boton,
                backgroundColor: color,
                width: ( ancho ) ? 180 : 80
                
                }}>
            <Text style={{
                ...styles.botonTexto,
                color: ( color === '#9B9B9B' ) ? 'black' : 'white'
            
            }}>{texto}</Text>
        </View>
    </TouchableOpacity>
    )
}

