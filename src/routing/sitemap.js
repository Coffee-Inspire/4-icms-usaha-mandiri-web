import Stock from "../screens/Stock";
import Customer from "../screens/Customer";
import Supplier from "../screens/Supplier";
import Incoming from "../screens/Incoming";
import IncomingCreate from "../screens/Incoming/IncomingCreate";
import IncomingDetail from "../screens/Incoming/IncomingDetail";
import Outgoing from "../screens/Outgoing";
import OutgoingCreate from "../screens/Outgoing/OutgoingCreate";
import Journal from "../screens/Journal";
import User from "../screens/User";

import PageNotFound from "../screens/PageNotFound";

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
    element: <IncomingDetail />,
    path: "/incoming/detail/:id",
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
  {
    element: <User />,
    path: "/user",
  },
  // ? Default routing
  // {
  //   element: <Stock />,
  //   path: "*",
  // },
  {
    element: <PageNotFound />,
    path: "/*",
  },
];

export default sitemap;
