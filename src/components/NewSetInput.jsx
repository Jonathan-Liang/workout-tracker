import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../graphqlClient';

const mutationDocument = gql`
    mutation MyMutation($newSet: NewSet!) {
        insertSet(
            document: $newSet,
            collection: "sets", 
            database: "workouts", 
            dataSource: "Clooster"
        ) {
            insertedId
        }
    }
`;

const NewSetInput = ({ exerciseName }) => {
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const queryClient = useQueryClient();

    const { mutate, error, isError, isPending } = useMutation({
        mutationFn: (newSet) => {
            return client.request(mutationDocument, { newSet });
        },
        onSuccess: () => {
            setReps('');
            setWeight('');
            queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] })
        },
    })

    const addSet =() => {
        console.warn('add set', reps, weight);

        const newSet = {
            exercise: exerciseName,
            reps: Number.parseInt(reps),
        };
        
        if (Number.parseFloat(weight)) {
            newSet.weight = Number.parseFloat(weight)
        }

        mutate(newSet);
    }

    console.log(error);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput 
                    value={reps} 
                    onChangeText={setReps} 
                    placeholder="Reps" 
                    style={styles.input}
                    keyboardType='numeric'
                />
                <TextInput 
                    value={weight} 
                    onChangeText={setWeight} 
                    placeholder="Weight" 
                    style={styles.input}
                    keyboardType='numeric'
                />
                <Button title={isPending ? 'Adding...' : 'Add'} onPress={addSet} />
            </View>
            {isError && <Text style = {{color: 'red'}}>Failed to add set</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10, 
        borderRadius: 5,
        gap: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        flex: 1,
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    }
});

export default NewSetInput;