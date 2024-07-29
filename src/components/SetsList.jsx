import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import client from '../graphqlClient';

const setsQuery = gql`
query set($exercise: String){
  sets(exercise: $exercise) {
    documents {
      _id
      exercise
      reps
      weight
    }
  }
}
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['sets', exerciseName],
        queryFn: () => client.request(setsQuery, { exercise: exerciseName }),
    });

    if (isLoading) {
        return <ActivityIndicator />
    }

    return (
        <FlatList 
            data={data?.sets.documents} 
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={( { item } ) => (
                <Text
                    style={{
                        backgroundColor: 'white',
                        marginVertical: 5,
                        padding: 10,
                        borderRadius: 5,
                        overflow: 'hidden'
                    }}    
                >
                    {item.reps} x {item.weight}
                </Text>
            )}
        />
    )
}

export default SetsList