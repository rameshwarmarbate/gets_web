import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import Person3RoundedIcon from "@mui/icons-material/Person3Rounded";

const MENU_LIST = [
  { icon: HomeRoundedIcon, name: "Home", url: "/" },
  { icon: DashboardRoundedIcon, name: "Dashboard", url: "/dashboard" },
  { icon: ShoppingCartRoundedIcon, name: "Orders", url: "/orders" },
  { icon: Person3RoundedIcon, name: "Salesperson", url: "/salespersons" },
  { icon: GroupRoundedIcon, name: "Customers", url: "/customers" },
];

export { MENU_LIST };
