import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import DefaultUserPhotoImg from '@assets/userPhotoDefault.png'

export function HomeHeader() {

  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <HStack
      alignItems="center"
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
    >
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : DefaultUserPhotoImg}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
}