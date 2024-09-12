import { useEffect, useState } from "react";
import { Order } from "../../interface";
import { Box, Grid, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import OrderCard from "../../components/OrderCard/OrderCard";

export default function OrdersPage() {
  const [dataOrders, setDataOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/orders");
      if (response.ok) {
        const data: Order[] = await response.json();
        setDataOrders(data);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <p>Загрузка заказов...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки данных.</p>;
  }
  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        Ваши заказы
      </Typography>
      <Grid2 container spacing={2}>
        {dataOrders.length === 0 ? (
          <p>Нет заказов</p>
        ) : (
          dataOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <OrderCard order={order} />
            </Grid>
          ))
        )}
      </Grid2>
    </Box>
  );
}
