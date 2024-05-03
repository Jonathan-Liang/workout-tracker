import { StyleSheet, Text, View } from 'react-native';

export default function ExerciseListItem({ item }) {
  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseDescription}>
        <Text style={styles.subValue}>{item.muscle.toUpperCase()}</Text> | <Text style={styles.subValue}>{item.equipment.toUpperCase()}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 3,

    // logic for shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
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
  }
});