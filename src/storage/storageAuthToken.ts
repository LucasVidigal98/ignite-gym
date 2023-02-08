import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from './storageConfig';

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet() {
  return AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
}

export function storageAuthTokenRemove() {
  return AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}