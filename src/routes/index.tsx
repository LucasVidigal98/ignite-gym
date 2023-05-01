import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

const linking = {
  prefixes: [
    'ignite-gym://'
  ],
  config: {
    screens: {
      exercise: {
        path: 'exercise/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId
        }
      },
      home: 'home/',
      NotFound: 'notFound/'
    }
  }
}

export function Routes() {

  const theme = DefaultTheme;
  const { colors } = useTheme();

  const { user, isLoadingUser } = useAuth();

  theme.colors.background = colors.gray[700];

  if (isLoadingUser) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}