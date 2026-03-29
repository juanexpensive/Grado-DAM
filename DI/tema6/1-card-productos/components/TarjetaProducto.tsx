import React from "react";
import {Pressable, Text, StyleSheet, View, Image} from "react-native";

type Props = {
    name : string
    price : number
    image : any
    onAddToCart: () => void;
}

export function TarjetaProducto ({name, price, image, onAddToCart}: Props){
    return (
        <View
        style={{
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  backgroundColor: "#d8d8d8ff",
}}>
        
        
        <View style={styles.card}>
            <Image style={styles.img} source={{uri: image}}/>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.name}>${price.toFixed(2)}</Text>
            <Pressable
                style = {styles.button}
                onPress={onAddToCart}
            >
                <Text style = {styles.buttonText}>Añadir al carrito</Text>
            </Pressable>
      </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 350,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#F5F5F0",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10,
  },
    button: {
        backgroundColor: "#4169e1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
  name: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 20
  },
 carrito: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
  },
});
