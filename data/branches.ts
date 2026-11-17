
import type { Branch } from "@/types/branch";

type BranchSeed = Pick<Branch, "code" | "name" | "city">;

const branchSeeds: BranchSeed[] = [
  // MEDAN
  { code: "BR001", name: "KC Medan Pusat", city: "Medan" },
  { code: "BR002", name: "KC Iskandar Muda", city: "Medan" },
  { code: "BR003", name: "KC Setia Budi", city: "Medan" },
  { code: "BR004", name: "KC Gatot Subroto", city: "Medan" },
  { code: "BR005", name: "KC Krakatau", city: "Medan" },
  { code: "BR006", name: "KC Belawan", city: "Medan" },
  { code: "BR007", name: "KC Marelan", city: "Medan" },
  { code: "BR008", name: "KC Tembung", city: "Medan" },
  { code: "BR009", name: "KC Padang Bulan", city: "Medan" },
  { code: "BR010", name: "KC Johor", city: "Medan" },
  { code: "BR011", name: "KC Amplas", city: "Medan" },
  { code: "BR012", name: "KC Petisah", city: "Medan" },
  { code: "BR013", name: "KC Sunggal", city: "Medan" },
  { code: "BR014", name: "KC Helvetia", city: "Medan" },
  { code: "BR015", name: "KC Polonia", city: "Medan" },

  // BINJAI
  { code: "BR016", name: "KC Binjai Kota", city: "Binjai" },
  { code: "BR017", name: "KC Tanah Tinggi", city: "Binjai" },
  { code: "BR018", name: "KC Kebun Lada", city: "Binjai" },
  { code: "BR019", name: "KC Rambung", city: "Binjai" },
  { code: "BR020", name: "KC Berngam", city: "Binjai" },
  { code: "BR021", name: "KC Limau Sundai", city: "Binjai" },
  { code: "BR022", name: "KC Timbang Langkat", city: "Binjai" },

  // PEMATANGSIANTAR
  { code: "BR023", name: "KC Siantar Kota", city: "Pematangsiantar" },
  { code: "BR024", name: "KC Siantar Martoba", city: "Pematangsiantar" },
  { code: "BR025", name: "KC Siantar Marihat", city: "Pematangsiantar" },
  { code: "BR026", name: "KC Siantar Sitalasari", city: "Pematangsiantar" },
  { code: "BR027", name: "KC Siantar Barat", city: "Pematangsiantar" },
  { code: "BR028", name: "KC Siantar Selatan", city: "Pematangsiantar" },
  { code: "BR029", name: "KC Parluasan", city: "Pematangsiantar" },

  // TEBING TINGGI
  { code: "BR030", name: "KC Tebing Tinggi Kota", city: "Tebing Tinggi" },
  { code: "BR031", name: "KC Bandar Sono", city: "Tebing Tinggi" },
  { code: "BR032", name: "KC Bulian", city: "Tebing Tinggi" },
  { code: "BR033", name: "KC Pasar Gambir", city: "Tebing Tinggi" },
  { code: "BR034", name: "KC Rambung", city: "Tebing Tinggi" },
  { code: "BR035", name: "KC Bagelen", city: "Tebing Tinggi" },

  // TANJUNGBALAI
  { code: "BR036", name: "KC Tanjungbalai Kota", city: "Tanjungbalai" },
  { code: "BR037", name: "KC Datuk Bandar", city: "Tanjungbalai" },
  { code: "BR038", name: "KC Sei Tualang Raso", city: "Tanjungbalai" },
  { code: "BR039", name: "KC Teluk Nibung", city: "Tanjungbalai" },
  { code: "BR040", name: "KC Sirantau", city: "Tanjungbalai" },
  { code: "BR041", name: "KC Kapias Pulau Buaya", city: "Tanjungbalai" },

  // SIBOLGA
  { code: "BR042", name: "KC Sibolga Kota", city: "Sibolga" },
  { code: "BR043", name: "KC Aek Habil", city: "Sibolga" },
  { code: "BR044", name: "KC Pancuran Gerobak", city: "Sibolga" },
  { code: "BR045", name: "KC Pasar Belakang", city: "Sibolga" },
  { code: "BR046", name: "KC Angin Nauli", city: "Sibolga" },
  { code: "BR047", name: "KC Aek Manis", city: "Sibolga" },

  // PADANGSIDIMPUAN
  { code: "BR048", name: "KC Padangsidimpuan Kota", city: "Padangsidimpuan" },
  { code: "BR049", name: "KC Sadabuan", city: "Padangsidimpuan" },
  { code: "BR050", name: "KC Batunadua", city: "Padangsidimpuan" },
  { code: "BR051", name: "KC Hutaimbaru", city: "Padangsidimpuan" },
  { code: "BR052", name: "KC Pijorkoling", city: "Padangsidimpuan" },
  { code: "BR053", name: "KC Sihitang", city: "Padangsidimpuan" },
  { code: "BR054", name: "KC Sitamiang", city: "Padangsidimpuan" },
  { code: "BR055", name: "KC Wek I", city: "Padangsidimpuan" },
  { code: "BR056", name: "KC Wek II", city: "Padangsidimpuan" },

  // GUNUNGSITOLI
  { code: "BR057", name: "KC Gunungsitoli Kota", city: "Gunungsitoli" },
  { code: "BR058", name: "KC Saombo", city: "Gunungsitoli" },
  { code: "BR059", name: "KC Ilir", city: "Gunungsitoli" },
  { code: "BR060", name: "KC Mudik", city: "Gunungsitoli" },
  { code: "BR061", name: "KC Moawo", city: "Gunungsitoli" },
  { code: "BR062", name: "KC Dahana", city: "Gunungsitoli" },
  { code: "BR063", name: "KC Fodo", city: "Gunungsitoli" },
  { code: "BR064", name: "KC Ombolata", city: "Gunungsitoli" },
];


const documentationStatuses: Branch["documentationStatus"][] = [
  "complete",
  "incomplete",
  "not-started",
];

export const dummyBranches: Branch[] = branchSeeds.map(
  (branch, index) => {
    const sequence = index + 1;

    const date = `2026-01-${String(
      (index % 28) + 1
    ).padStart(2, "0")}`;

    return {
      id: branch.code.toLowerCase(),
      code: branch.code,
      name: branch.name,
      city: branch.city,

      // Alamat dummy dengan struktur terpisah
      address: {
        street: `Kawasan Contoh ${branch.name.replace("KC ", "")}`,
        number: String(sequence),
        village: "Kelurahan Contoh",
        district: "Kecamatan Contoh",
        postalCode: "00000",
      },

      // Nomor telepon dummy
      phone: `0812000000${String(sequence).padStart(2, "0")}`,

      email: `branch${String(sequence).padStart(3, "0")}@example.invalid`,

      documentationStatus:
        documentationStatuses[index % documentationStatuses.length],

      createdAt: date,
      updatedAt: date,
    };
  }
);
