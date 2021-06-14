import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponente';
import { useNetInfo } from "@react-native-community/netinfo";


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

const Connection = () => {
    // returns a hook with the NetInfoState type.
    const netInfo = useNetInfo();
    if (netInfo.isConnected) {
        return (
            <Text>Device is connected to {netInfo.type} but has no Internet connection.</Text>
        )
    } else {
        return (
            <Text>Device is not connected. Check {netInfo.type} connection.</Text>
        )
    }
};

function RenderItem(props) {

    //const item = props.item;

    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    }

    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
                <Connection />
            </View>
        );
    }

    else {

        const item = props.item;

        if (item != null) {
            return (
                <Card>
                    <Card.Image source={{ uri: item.imagen }}>
                        <Card.Title style={styles.cardTitleStyle}>{item.nombre}</Card.Title>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }

}



class Home extends Component {

    render() {


        return (
            <ScrollView>
                <RenderItem
                    item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
                    isLoading={this.props.cabeceras.isLoading}
                    errMess={this.props.cabeceras.errMess}
                />
                <RenderItem
                    item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem
                    item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]}
                    isLoading={this.props.actividades.isLoading}
                    errMess={this.props.actividades.errMess}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardTitleStyle: {
        color: 'chocolate',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
});

export default connect(mapStateToProps)(Home);