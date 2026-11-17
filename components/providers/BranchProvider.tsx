
"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { dummyBranches } from "@/data/branches";
import type { Branch } from "@/types/branch";

interface BranchContextType {
  branches: Branch[];
  setBranches: Dispatch<SetStateAction<Branch[]>>;
}

const BranchContext = createContext<BranchContextType | undefined>(
  undefined
);

interface BranchProviderProps {
  children: ReactNode;
}

export function BranchProvider({ children }: BranchProviderProps) {
  const [branches, setBranches] = useState<Branch[]>(dummyBranches);

  return (
    <BranchContext.Provider value={{ branches, setBranches }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranches() {
  const context = useContext(BranchContext);

  if (!context) {
    throw new Error(
      "useBranches harus digunakan di dalam BranchProvider."
    );
  }

  return context;
}
