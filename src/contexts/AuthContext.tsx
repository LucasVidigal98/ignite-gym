import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { storageRemove, storageUserGet, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUser: boolean;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  function updateUserAndToken(userData: UserDTO, token: string) {
    try {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(userData);

    } catch (error) {
      throw error;
    }
  }

  async function storageUserAndToken(userData: UserDTO, token: string, refreshToken: string) {
    try {
      setIsLoadingUser(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token, refreshToken);

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data?.user && data?.token && data?.refresh_token) {
        await storageUserAndToken(data.user, data.token, data.refresh_token);
        updateUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUser(true);
      setUser({} as UserDTO);
      await storageRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUser(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (userLogged && userLogged) {
        updateUserAndToken(userLogged, token as string);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, isLoadingUser, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

