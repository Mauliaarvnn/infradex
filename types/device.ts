
export type DeviceCategory =
  | "server"
  | "router"
  | "switch"
  | "firewall"
  | "access-point"
  | "computer"
  | "laptop"
  | "printer"
  | "ups"
  | "other";

export type DeviceStatus =
  | "active"
  | "maintenance"
  | "inactive";

export type DeviceCondition =
  | "good"
  | "minor-damage"
  | "major-damage";

export interface Device {
  id: string;
  code: string;
  name: string;
  category: DeviceCategory;
  brand: string;
  model: string;
  serialNumber: string;
  branchId: string;
  location: string;
  purchaseDate: string;
  status: DeviceStatus;
  condition: DeviceCondition;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
