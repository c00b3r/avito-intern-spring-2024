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
export default function ItemCard({ name, price, views, likes, imageUrl }: ItemProps) {
  return (
    <div style={{ border: "1px solid black", borderRadius: "8px" }}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>Views: {views}</p>
      <p>Likes: {likes}</p>
    </div>
  );
}
