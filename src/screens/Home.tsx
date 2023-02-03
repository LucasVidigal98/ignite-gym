import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouteProps } from "@routes/app.routes";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const [groupeSelected, setGroupSelected] = useState('Costas');
  const [exercises, setExercises] = useState(['1', '2', '3', '4']);
  const [groups, setGroups] = useState(['Costas', 'Ombros', 'Pernas', 'Biceps', 'Tornosa']);

  const navigation = useNavigation<AppNavigatorRouteProps>();

  function handleOpenExercisesDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupeSelected.toLocaleLowerCase() === item.toLocaleLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />


      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={(() => (
            <ExerciseCard onPress={handleOpenExercisesDetails} />
          ))}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}