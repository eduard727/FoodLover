import React from "react";
import { FlatList, StyleSheet, Text, View, Image} from "react-native";
import Info from "./recipeInfo";

export default Recipe = ({ foodServ }) => {

     return (
          <View style={styles.list}>
               {/* {foodServ.map(Food => 
                    <Text key={Food.key}>{Food.title}</Text>
               )} */}
               <FlatList data={foodServ} renderItem = {({item}) => (
                     <Text> {item.title} </Text>
                    // <Info info={item}/>
               )}/>
          </View>
     );
};

const styles = StyleSheet.create({
     list:{
          backgroundColor: '#eee',
          flex:1,
          width: '100%',
          paddingTop: 50,
          paddingHorizontal:10,
     },
     img:{
          height:100,
          width:'100%'
     }
});