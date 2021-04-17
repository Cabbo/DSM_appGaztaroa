import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Title>{excursion.nombre}</Card.Title>
                <Card.Image source={require('./imagenes/40Años.png')}/>
                <Text style={{ margin: 10 }}>
                    {excursion.descripcion}
                </Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function DetalleExcursion(props) {
    return (<RenderExcursion excursion={props.excursion} />);
}
export default DetalleExcursion;