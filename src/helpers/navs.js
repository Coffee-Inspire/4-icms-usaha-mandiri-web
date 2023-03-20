import { take } from "./iconMapper";

const navs = [
  {
    label: "Inventory",
    icon: take("inventory"),
    childs: [
      {
        label: "Stocks",
        icon: take("stock"),
        destination: "/stock",
      },
      {
        label: "Customers",
        icon: take("customer"),
        destination: "/customer",
      },
      {
        label: "Suppliers",
        icon: take("supplier"),
        destination: "/supplier",
      },
    ],
  },
  {
    label: "Goods",
    icon: take("good"),
    childs: [
      {
        label: "Incomings",
        icon: take("stock"),
        destination: "/incoming",
      },
      {
        label: "Outgoings",
        icon: take("outgoing"),
        destination: "/outgoing",
      },
      {
        label: "Journal",
        icon: take("journal"),
        destination: "/journal",
      },
    ],
  },
  {
    label: "Config",
    icon: take("config"),
    childs: [
      {
        label: "Users",
        icon: take("user"),
        destination: "/user",
      },
      {
        label: "Categories",
        icon: take("category"),
        destination: "/category",
      },
    ],
  },
];

export default navs;
