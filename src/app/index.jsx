import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

const url = 'https://targahna.us-east-a.ibm.stepzen.net/api/call-chest/graphql';

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
    }
  }
`;

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return request({
        url, 
        document: exercisesQuery,
        requestHeaders: {
          Authorization:
            'apikey targahna::local.net+1000::3e9cb05304a69df2a4ee63c6ddb7d310bf559cde38b692d3065b83bd15f0ae3e'
        },
      });
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>
  }
  console.log(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => item.name + index} 
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});
