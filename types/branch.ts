
export type BranchCity =
  | "Medan"
  | "Binjai"
  | "Pematangsiantar"
  | "Tebing Tinggi"
  | "Tanjungbalai"
  | "Sibolga"
  | "Padangsidimpuan"
  | "Gunungsitoli";

export type DocumentationStatus =
  | "complete"
  | "incomplete"
  | "not-started";

export interface Branch {
  id: string;
  code: string;
  name: string;
  city: BranchCity;
  address: string;
  phone: string;
  email: string;
  documentationStatus: DocumentationStatus;
  createdAt: string;
  updatedAt: string;
}
