import { useToast } from "native-base";
import { AppError } from "./AppError";

export function handlerError(
  error: any,
  defaultMessage: string
) {
  const toast = useToast();

  const isAppError = error instanceof AppError;

  return toast.show({
    title: isAppError ? error.message : defaultMessage,
    placement: 'top',
    bgColor: 'red.500'
  });
}