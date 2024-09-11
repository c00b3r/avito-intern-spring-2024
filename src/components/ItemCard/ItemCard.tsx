import { FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ItemProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  views: number;
  likes: number;
  imageUrl?: string;
}
export default function ItemCard({ name, price, views, likes, imageUrl, id }: ItemProps) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/advertisements/${id}`);
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <h3 style={{ margin: "8px 0", textAlign: "center" }}>{name}</h3>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>{price}₽</p>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <RemoveRedEye />
          <span>{views}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FavoriteBorder />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
}
