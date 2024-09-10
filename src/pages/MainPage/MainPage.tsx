import { Outlet } from "react-router-dom";
import "./MainPage.css";
import NavBar from "../../components/NavBar/NavBar";

export default function MainPage() {
  return (
    <div className="main-container">
      <NavBar />
      <Outlet />
    </div>
  );
}
