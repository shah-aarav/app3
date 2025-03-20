import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SleepScreen from './src/screens/SleepScreen';
import DietScreen from './src/screens/DietScreen';
import WorkScreen from './src/screens/WorkScreen';
import FitnessScreen from './src/screens/FitnessScreen';
import CalendarScreen from './src/screens/CalendarScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Sleep':
                iconName = 'moon';
                break;
              case 'Diet':
                iconName = 'coffee';
                break;
              case 'Work':
                iconName = 'briefcase';
                break;
              case 'Fitness':
                iconName = 'activity';
                break;
              default:
                iconName = 'circle';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0f172a',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sleep" component={SleepScreen} />
        <Tab.Screen name="Diet" component={DietScreen} />
        <Tab.Screen name="Work" component={WorkScreen} />
        <Tab.Screen name="Fitness" component={FitnessScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}