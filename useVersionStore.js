import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useVersionStore = create(
  persist(
    (set, get) => ({
      versioner: [],
      user: { navn: null, email: null },

      // søgequery til filtering i Uploads / SearchUser
      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q ?? "" }),

          addVersion: (version) =>
            set((state) => ({
              versioner: [...state.versioner, version],
            })),

          removeVersion: (id) =>
            set((state) => ({
              versioner: state.versioner.filter((v) => v.id !== id),
            })),

          updateVersion: (id, patch) =>
            set((state) => ({
              versioner: state.versioner.map((v) => (v.id === id ? { ...v, ...patch } : v)),
            })),

      versionSum: () => get().versioner.reduce((acc, v) => acc + (v.antal || 0), 0),

      saveData: (versioner) => {
        set({ versioner });
      },

      setUser: (user) => set({ user: { navn: user?.navn ?? null, email: user?.email ?? null } }),
      clearUser: () => set({ user: { navn: null, email: null } }),

      // Persisted selection: array af version ids (valgte)
      selectedIds: [],
      // Erstat hele arrayet
      setSelectedIds: (ids) => set({ selectedIds: Array.isArray(ids) ? ids : [] }),
      // helpers
      addSelectedId: (id) => set((s) => ({ selectedIds: Array.from(new Set([...s.selectedIds, id])) })),
      removeSelectedId: (id) => set((s) => ({ selectedIds: s.selectedIds.filter((x) => x !== id) })),
      clearSelectedIds: () => set({ selectedIds: [] }),
    }),

    {
      name: "version-storage",
      // kun brug localStorage i browser
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : undefined
      ),
    }
  )
);

export default useVersionStore;