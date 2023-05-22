import { takeIcon } from "./iconMapper";

const navs = [
  {
    label: "Inventaris",
    icon: takeIcon("inventory"),
    childs: [
      {
        label: "Stok Barang",
        icon: takeIcon("stock"),
        destination: "/stock",
        permissions: ["Global"],
      },
      {
        label: "Pelanggan",
        icon: takeIcon("customer"),
        destination: "/customer",
        permissions: ["Global"],
      },
      {
        label: "Suppliers",
        icon: takeIcon("supplier"),
        destination: "/supplier",
        permissions: ["Global"],
      },
    ],
  },
  {
    label: "Aktivitas Bisnis",
    icon: takeIcon("good"),
    childs: [
      {
        label: "Pembelian",
        icon: takeIcon("stock"),
        destination: "/incoming",
        permissions: ["Global"],
      },
      {
        label: "Penjualan",
        icon: takeIcon("outgoing"),
        destination: "/outgoing",
        permissions: ["Global"],
      },
      {
        label: "Jurnal Transaksi",
        icon: takeIcon("journal"),
        destination: "/journal",
        permissions: ["Global"],
      },
    ],
  },
  {
    label: "Konfigurasi",
    icon: takeIcon("config"),
    childs: [
      {
        label: "Pengguna",
        icon: takeIcon("user"),
        destination: "/user",
        permissions: ["Administrator"],
      },
      {
        label: "Kategori Barang",
        icon: takeIcon("category"),
        destination: "/category",
        permissions: ["Global"],
      },
    ],
  },
];

export default navs;
