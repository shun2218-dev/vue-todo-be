import { User } from './../types/db/index.d';
type ExcludeKey = keyof User;
export const exclude = (user: User, keys: ExcludeKey[]): Omit<User, ExcludeKey> => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.some((_key) => key === _key))
  );
};
