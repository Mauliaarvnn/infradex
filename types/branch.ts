
export type BranchCity = string;

export type DocumentationStatus =
  | "complete"
  | "incomplete"
  | "not-started";

export interface BranchAddress {
  street: string;
  number: string;
  village: string;
  district: string;
  postalCode: string;
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  city: BranchCity;
  address: BranchAddress;
  phone: string;
  email: string;
  documentationStatus: DocumentationStatus;
  createdAt: string;
  updatedAt: string;
}
