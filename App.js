import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect, useState} from 'react';

import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import api from './api/foodService';
import Recipe from './Components/recipe';
// import foodService from './api/foodService';
// import fetchCookFood from './api/foodService';

function HomeScreen() {

  const [foodServ, setFoodService] = useState([]);
    
  useEffect(() => {
    // closure: permite acceder al ámbito de una función exterior desde una función interior.
    (async () => {
      const foodServ = await api.fetchCookFood();
      setFoodService(foodServ);
      //  console.log(foodServ);
    })();    
    
  },[]);
    
  return (
    <>
      <View style={styles.HomeScreen}>
        {
          foodServ.length > 0 ? (
             <Recipe foodServ={foodServ}/>
            ) : ( 
              <Text>Home ! !</Text> 
            )
        }
      </View>
    </>
  );
  
} // end HomeScreen

/////////////////////////////////////////    C a l c u l a t o r       /////////////////
// Calculadora de carne segun la cantidad de personas.
// (5 personas por kilo)
// CantPersonas / 5 / 0.6 = TotalCarne
//
// Calculadora de carbon para el asado.
// CantPersonas / 5 / 0.28 = TotalCarbon

function CalculatorScreen() {

  //beef
  const [number, setNumber] = useState(0);
  const [total, setTotal] = useState(number/5/0.6);
  const totalPounds = (total * 2.204662).toFixed(2);

  //Coal
  const [totalCoal, setTotalCoal] = useState(number/5/0.2);
  const totalCoalPounds = (totalCoal * 2.204662).toFixed(1);

  function MoreMeat(){

    const newTotal = number/5/0.6;
    const newTotalCoal = number/5/0.28;

    ///  .toFixed round number #.##
    setTotal((newTotal).toFixed(2));
    setTotalCoal((newTotalCoal).toFixed(2));
  }

  return (
    <>
    <View style={styles.CalculatorScreen}>
      <View style={styles.InfoCalc}>
        <Text style={styles.importantInfo2}>Beef Calculator</Text>

        <TextInput style={styles.NumInvites} 
          type='number' 
          keyboardType='numeric' 
          placeholder='Number of invites'
          onChangeText={v => {
            setNumber(Number.parseInt(v));
          } }
        />

        <Text style={styles.importantInfo2}> Beef for BBQ </Text>
        <Text style={styles.importantInfo}> {'Kilos: '+total} </Text>
        <Text style={styles.importantInfo}> {'Pounds: '+totalPounds} </Text>
        <Text style={styles.importantInfo2}> Coal for BBQ </Text>
        <Text style={styles.importantInfo}> {'Kilos : '+totalCoal} </Text>
        <Text style={styles.importantInfo}> {'Pounds : '+totalCoalPounds} </Text>
        <TouchableOpacity style={styles.buttonCalc}
          onPress={MoreMeat}
        ><Text style={styles.textButton}>Calculate</Text></TouchableOpacity>
      </View>
    </View>
    </>
  );
  
}/// end Calculator

const Tab = createBottomTabNavigator();

export default function App() {

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 4000);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calculator" component={CalculatorScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}// end App

/////////////////////////////////////////      S T Y L E S   ////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  preventAutoHideAsync:{
    height: 40,
    width: 40,
  },
  
  CalculatorScreen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#B7CAD8',
  },

  HomeScreen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#B7CAD8'
  },

  CalculatorMeat:{
    flex: 1,
    justifyContent: 'center'
  },

  buttonCalc:{
    width:200,
    backgroundColor:'#f00',
    alignItems: 'center',
    marginHorizontal: 18,
    justifyContent: 'space-around',
    marginVertical: 10,
    borderRadius: 5,
    shadowColor:'#f00',
    shadowOffset: {width:5, height:5},
    shadowOpacity: 0.2,
  },

  textButton:{
    color:'#fff',
    margin:12,
    fontWeight: '600',
    fontSize: 18,
  },

  NumInvites:{
    backgroundColor:'#D5E3ED',
    borderWidth:1,
    margin: 10,
    fontWeight:'500',
    fontSize:20,
    height:40,
    width:200,
    alignItems:'center',
    borderRadius: 5,
    padding:10 ,
  },

  InfoCalc:{
    height:'50%',
    width:'75%',
    padding:10,
    justifyContent:'center',
    alignItems:'center',
  },

  importantInfo:{
    fontWeight:'bold',
    padding: 5,
    color: '#5B5B5B',

  },

  importantInfo2:{
    fontSize:20,
    fontWeight:'700',
    padding: 5,
    color: '#4D4D4D',
  },

});
