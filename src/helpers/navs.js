import { takeIcon } from "./iconMapper";

const navs = [
  {
    label: "Inventory",
    icon: takeIcon("inventory"),
    childs: [
      {
        label: "Stocks",
        icon: takeIcon("stock"),
        destination: "/stock",
      },
      {
        label: "Customers",
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
    label: "Goods",
    icon: takeIcon("good"),
    childs: [
      {
        label: "Incomings",
        icon: takeIcon("stock"),
        destination: "/incoming",
      },
      {
        label: "Outgoings",
        icon: takeIcon("outgoing"),
        destination: "/outgoing",
      },
      {
        label: "Journal",
        icon: takeIcon("journal"),
        destination: "/journal",
      },
    ],
  },
  {
    label: "Config",
    icon: takeIcon("config"),
    childs: [
      {
        label: "Users",
        icon: takeIcon("user"),
        destination: "/user",
      },
      {
        label: "Categories",
        icon: takeIcon("category"),
        destination: "/category",
      },
    ],
  },
];

export default navs;
