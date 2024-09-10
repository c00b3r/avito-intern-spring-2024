import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Stack direction={"row"} spacing={2} padding={"5px"}>
        <Button variant="contained">
          <NavLink to={"/advertisements"} style={{ color: "white" }}>
            Объявления
          </NavLink>
        </Button>
        <Button variant="contained">
          <NavLink to={"/orders"} style={{ color: "white" }}>
            Заказы
          </NavLink>
        </Button>
      </Stack>
    </div>
  );
}
