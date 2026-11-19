
"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { dummyDevices } from "@/data/devices";
import type { Device } from "@/types/device";

interface DeviceContextType {
  devices: Device[];
  setDevices: Dispatch<SetStateAction<Device[]>>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(
  undefined
);

interface DeviceProviderProps {
  children: ReactNode;
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  const [devices, setDevices] = useState<Device[]>(dummyDevices);

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error(
      "useDevices harus digunakan di dalam DeviceProvider."
    );
  }

  return context;
}
