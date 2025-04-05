import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screen/HomeScreen";
import DetailScreen from "./Screen/DetailScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Tin Tức" }} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Chi Tiết Tin Tức" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
