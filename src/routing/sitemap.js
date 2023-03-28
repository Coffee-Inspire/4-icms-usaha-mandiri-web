import Stock from "../screens/Stock";
import Customer from "../screens/Customer";
import Supplier from "../screens/Supplier";
import Incoming from "../screens/Incoming";
import IncomingCreate from "../screens/Incoming/IncomingCreate";
import Outgoing from "../screens/Outgoing";
import OutgoingCreate from "../screens/Outgoing/OutgoingCreate";
import Journal from "../screens/Journal";

const sitemap = [
  {
    element: <Stock />,
    path: "/stock",
    // role: ["Administrator", "Normal"]
  },
  {
    element: <Customer />,
    path: "/customer",
  },
  {
    element: <Supplier />,
    path: "/supplier",
  },
  {
    element: <Incoming />,
    path: "/incoming",
  },
  {
    element: <IncomingCreate />,
    path: "/incoming/create",
  },
  {
    element: <Outgoing />,
    path: "/outgoing",
  },
  {
    element: <OutgoingCreate />,
    path: "/outgoing/create",
  },
  {
    element: <Journal />,
    path: "/journal",
  },
  // ? Default routing
  // {
  //   element: <Stock />,
  //   path: "*",
  // },
  {
    element: <>404</>,
    path: "/*",
  },
];

export default sitemap;
