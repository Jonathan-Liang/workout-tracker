import { Stack, Slot } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Exercises' }}></Stack.Screen>
    </Stack>
  );
}