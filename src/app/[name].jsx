import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {gql} from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import client from '../graphqlClient';
import NewSetInput from '../components/NewSetInput';

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }
`

export default function ExerciseDetailScreen() {
  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises', name],
    queryFn: () => client.request(exerciseQuery, { name }),
  });

  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

  const exercise = data?.exercises[0]; 

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>
  }

  if (!exercise) {
    return <Text>Exercise not found</Text>
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{title: exercise.name}} />

      <View style={styles.panel}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseDescription}>
          <Text style={styles.subValue}>{exercise.muscle.toUpperCase()}</Text> | <Text style={exercise.subValue}>{exercise.equipment.toUpperCase()}</Text>
        </Text>
      </View>

      <View style={styles.panel}>
        <Text 
          style={styles.instructions} 
          numberOfLines={isInstructionExpanded ? 0 : 3}
        >
          {exercise.instructions}
        </Text>
        <Text 
          onPress={() => setIsInstructionExpanded(!isInstructionExpanded)} 
          style={styles.seeMore}
        >
          {isInstructionExpanded ? "See less" : "See more"}
        </Text>
      </View>

      <NewSetInput />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20, 
    fontWeight: '500'
  },
  exerciseDescription: {
    color: 'dimgray'
  },
  subValue: {
    textTransform: 'capitalize'
  },
  instructions: {
    fpmtSize: 16,
    lineHeigh: 20,
  },
  seeMore: {
    alignSelf: 'center',
    padding: 5,
    fontWeight: '500',
    color: 'gray'
  }
});