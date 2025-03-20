import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';

const categories = ['sleep', 'diet', 'work', 'fitness'] as const;

export default function HomeScreen({ navigation }: any) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const ProgressCircle = ({ category }: { category: typeof categories[number] }) => (
    <TouchableOpacity
      style={styles.progressCircle}
      onPress={() => navigation.navigate(category.charAt(0).toUpperCase() + category.slice(1))}
    >
      <View style={styles.circle}>
        <Icon name={getIconName(category)} size={24} color="#0f172a" />
      </View>
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );

  const getIconName = (category: string) => {
    switch (category) {
      case 'sleep':
        return 'moon';
      case 'diet':
        return 'coffee';
      case 'work':
        return 'briefcase';
      case 'fitness':
        return 'activity';
      default:
        return 'circle';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello, User</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <ProgressCircle key={category} category={category} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.calendarCard}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text style={styles.calendarDate}>{format(currentTime, 'MMM')}</Text>
        <Text style={styles.calendarDay}>{format(currentTime, 'd')}</Text>
      </TouchableOpacity>

      <Text style={styles.currentTime}>
        {format(currentTime, 'h:mm a')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 30,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  progressCircle: {
    alignItems: 'center',
    width: '23%',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  categoryText: {
    color: '#0f172a',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendarDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textTransform: 'uppercase',
  },
  calendarDay: {
    fontSize: 36,
    fontWeight: '300',
    color: '#0f172a',
  },
  currentTime: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0f172a',
    textAlign: 'center',
  },
});