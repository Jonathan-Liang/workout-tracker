import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import client from '../graphqlClient';
import { useAuth } from '../providers/AuthContext';

const setsQuery = gql`
query sets($exercise: String!, $username: String!){
  sets(exercise: $exercise, username: $username) {
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
    const { username } = useAuth();
    const { data, isLoading, error } = useQuery({
        queryKey: ['sets', exerciseName],
        queryFn: () => client.request(setsQuery, { exercise: exerciseName, username }),
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