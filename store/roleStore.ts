import { create } from "zustand";

interface IRoleStore {
    isOwner: boolean;
    isEditor: boolean;
    setOwner: (state: boolean) => void;
    setEditor: (state: boolean) => void;
}

export const useRoleStore = create<IRoleStore>((set) => ({
    isEditor: false,
    isOwner: false,
    setEditor: (state) => set({ isEditor: state }),
    setOwner: (state) => set({ isOwner: state }),
}));
