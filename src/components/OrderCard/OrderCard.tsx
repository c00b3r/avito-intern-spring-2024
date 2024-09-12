import { useState } from "react";
import { Order } from "../../interface";
import { Box, Button, Card, CardActions, CardContent, Collapse, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface OrderCardPros {
  order: Order;
}

type completeOrder = 4 | 5 | 6;

export default function OrderCard({ order }: OrderCardPros) {
  const [open, setOpen] = useState(false);
  const [localOrder, setLocalOrder] = useState(order);

  const canselOrderHandler = async (orderId: string, status: completeOrder) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });
      if (response.ok) {
        setLocalOrder({ ...localOrder, status });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleItems = () => {
    setOpen(!open);
  };

  const renderStatus = (status: number) => {
    const statuses: { [key: number]: string } = {
      0: "Создан",
      1: "Оплачен",
      2: "В пути",
      3: "Доставлен на точку",
      4: "Получен",
      5: "Архивирован",
      6: "Возврат",
    };
    return statuses[status] || "Неизвестный статус";
  };
  return (
    <Card sx={{ marginBottom: "16px", padding: "16px", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">Номер заказа: {localOrder.id}</Typography>
        <Typography>
          Дата создания: {new Date(localOrder.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>Статус: {renderStatus(localOrder.status)}</Typography>
        <Typography>Сумма заказа: {localOrder.total}₽</Typography>
        <Typography>Количество товаров: {localOrder.items.length}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleItems}
          sx={{ width: "174px" }}
        >
          {open ? "Скрыть товары" : "Показать товары"}
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={[4, 5, 6].includes(localOrder.status)}
          onClick={() => canselOrderHandler(localOrder.id, 4)}
        >
          Завершить заказ
        </Button>
        <Button
          variant="contained"
          color="warning"
          disabled={[4, 5, 6].includes(localOrder.status)}
          onClick={() => canselOrderHandler(localOrder.id, 5)}
        >
          Архивировать
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={[4, 5, 6].includes(localOrder.status)}
          onClick={() => canselOrderHandler(localOrder.id, 6)}
        >
          Возврат
        </Button>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: "16px" }}>
          {order.items.map((item, index) => (
            <NavLink
              to={`/advertisements/${item.id}`}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                color: "gray",
              }}
              key={index}
            >
              {item.name} - {item.count} шт.
            </NavLink>
          ))}
        </Box>
      </Collapse>
    </Card>
  );
}
