import { useState } from "react";
import { Order } from "../../interface";
import { Box, Button, Card, CardActions, CardContent, Collapse, Typography } from "@mui/material";

interface OrderCardPros {
  order: Order;
}

export default function OrderCard({ order }: OrderCardPros) {
  const [open, setOpen] = useState(false);

  const handleToggleItems = () => {
    setOpen(!open);
  };

  const renderStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Создан";
      case 1:
        return "Оплачен";
      case 2:
        return "В пути";
      case 3:
        return "Доставлен на точку";
      case 4:
        return "Получен";
      case 5:
        return "Архивирован";
      case 6:
        return "Возврат";
      default:
        return "Неизвестный статус";
    }
  };
  return (
    <Card sx={{ marginBottom: "16px", padding: "16px", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">Номер заказа: {order.id}</Typography>
        <Typography>Дата создания: {new Date(order.createdAt).toLocaleDateString()}</Typography>
        <Typography>Статус: {renderStatus(order.status)}</Typography>
        <Typography>Сумма заказа: {order.total}₽</Typography>
        <Typography>Количество товаров: {order.items.length}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleToggleItems}>
          {open ? "Скрыть товары" : "Показать все товары"}
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={order.status !== 0}
          onClick={() => console.log("Завершить заказ")}
        >
          Завершить заказ
        </Button>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: "16px" }}>
          {order.items.map((item, index) => (
            <Typography key={index}>
              {item.name} - {item.count} шт.
            </Typography>
          ))}
        </Box>
      </Collapse>
    </Card>
  );
}
