import Home from "../screens/Home";
import Stock from "../screens/Stock";
import Customer from "../screens/Customer";
import Supplier from "../screens/Supplier";
import Incoming from "../screens/Incoming";
import IncomingCreate from "../screens/Incoming/IncomingCreate";
import IncomingDetail from "../screens/Incoming/IncomingDetail";
import Outgoing from "../screens/Outgoing";
import OutgoingDetail from "../screens/Outgoing/OutgoingDetail";
import OutgoingCreate from "../screens/Outgoing/OutgoingCreate";
import Return from "../screens/Return";
import ReturnCreate from "../screens/Return/ReturnCreate";
import Journal from "../screens/Journal";
import User from "../screens/User";
import Category from "../screens/Category";
import PageNotFound from "../screens/Fallback/PageNotFound";

const sitemap = [
  {
    element: <Home />,
    path: "/dashboard",
    permissions: ["Global"],
  },
  {
    element: <Stock />,
    path: "/stock",
    permissions: ["Global"],
  },
  {
    element: <Customer />,
    path: "/customer",
    permissions: ["Global"],
  },
  {
    element: <Supplier />,
    path: "/supplier",
    permissions: ["Global"],
  },
  {
    element: <Incoming />,
    path: "/incoming",
    permissions: ["Global"],
  },
  {
    element: <IncomingDetail />,
    path: "/incoming/detail/:id",
    permissions: ["Global"],
  },
  {
    element: <IncomingCreate />,
    path: "/incoming/create",
    permissions: ["Global"],
  },
  {
    element: <Outgoing />,
    path: "/outgoing",
    permissions: ["Global"],
  },
  {
    element: <OutgoingDetail />,
    path: "/outgoing/detail/:id",
    permissions: ["Global"],
  },
  {
    element: <OutgoingCreate />,
    path: "/outgoing/create",
    permissions: ["Global"],
  },
  {
    element: <Return />,
    path: "/return",
    permissions: ["Global"],
  },
  {
    element: <ReturnCreate />,
    path: "/return/create",
    permissions: ["Global"],
  },
  {
    element: <Journal />,
    path: "/journal",
    permissions: ["Global"],
  },
  {
    element: <User />,
    path: "/user",
    permissions: ["Administrator"],
  },
  {
    element: <Category />,
    path: "/category",
    permissions: ["Global"],
  },
  // ? Default routing
  // {
  //   element: <Stock />,
  //   path: "*",
  // },
  {
    element: <PageNotFound />,
    path: "/*",
    permissions: ["Global"],
  },
];

export default sitemap;
