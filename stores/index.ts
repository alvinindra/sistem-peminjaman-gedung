import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type GeneralStoreProps = {
  profile: any;
  setProfile: (profile: any) => void;
};

export const useGeneralStore = create<GeneralStoreProps>(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: any) => set({ profile }),
    }),
    {
      name: 'general-storage', // name of the item in the storage (must be unique)
    }
  ) as unknown as StateCreator<GeneralStoreProps>
);
