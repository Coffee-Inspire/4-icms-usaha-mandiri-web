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
      },
      {
        label: "Pelanggan",
        icon: takeIcon("customer"),
        destination: "/customer",
      },
      {
        label: "Suppliers",
        icon: takeIcon("supplier"),
        destination: "/supplier",
      },
    ],
  },
  {
    label: "Aktivitas Dagang",
    icon: takeIcon("good"),
    childs: [
      {
        label: "Pembelian",
        icon: takeIcon("stock"),
        destination: "/incoming",
      },
      {
        label: "Penjualan",
        icon: takeIcon("outgoing"),
        destination: "/outgoing",
      },
      {
        label: "Jurnal Transaksi",
        icon: takeIcon("journal"),
        destination: "/journal",
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
      },
      {
        label: "Kategori Barang",
        icon: takeIcon("category"),
        destination: "/category",
      },
    ],
  },
];

export default navs;
