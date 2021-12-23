import React from "react";
import {Image, StyleSheet, View, Text} from 'react-native';

export default Info = ( { info } ) => {

     return(
          <>
          <View>
               <Image style={styles.image} source={ { uri: Object.values(info.media)[0] } }/>
               <Text>{info.title}</Text>
          </View>
          </>
     );
};

const styles = StyleSheet.create({

     image:{
          height:150,
          width:'100%',
     }
});