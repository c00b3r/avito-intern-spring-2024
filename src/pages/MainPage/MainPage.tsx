import { NavLink } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="button-container">
      <button>
        <NavLink to={"/advertisements"} style={{ color: "white" }}>
          Страница объявлений
        </NavLink>
      </button>
      <button>
        <NavLink to={"/orders"} style={{ color: "white" }}>
          Страница заказов
        </NavLink>
      </button>
    </div>
  );
}
