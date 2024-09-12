import { useEffect, useState } from "react";
import { Order } from "../../interface";
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import OrderCard from "../../components/OrderCard/OrderCard";
import Pagination from "../../components/Pagination/Pagination";

export default function OrdersPage() {
  const [dataOrders, setDataOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<"" | number>("");
  const [sortPriceDescending, setSortPriceDescending] = useState(false);
  const [sortPriceAscending, setSortPriceAscending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<number>,
  ) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const startIndex = (page - 1) * limit;
  const paginatedOrders = dataOrders.slice(startIndex, startIndex + limit);

  useEffect(() => {
    const getOrders = async (statusOrder: number | "") => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/orders?status=${statusOrder}`);
        if (response.ok) {
          const data: Order[] = await response.json();
          let sortedData = data;
          if (sortPriceDescending) {
            sortedData = data.sort((a, b) => b.total - a.total);
          }
          if (sortPriceAscending) {
            sortedData = data.sort((a, b) => a.total - b.total);
          }
          setDataOrders(sortedData);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    getOrders(status);
  }, [sortPriceAscending, sortPriceDescending, status]);

  if (loading) {
    return <p>Загрузка заказов...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки данных.</p>;
  }
  return (
    <Box sx={{ padding: "5px", display: "flex", width: "1250px", height: "100%" }}>
      <Box sx={{ width: "75%" }}>
        <Typography variant="h4" sx={{ marginBottom: "16px" }}>
          Ваши заказы
        </Typography>
        <Grid2 container spacing={2}>
          {paginatedOrders.length === 0 ? (
            <p>Нет заказов</p>
          ) : (
            paginatedOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order.id}>
                <OrderCard order={order} />
              </Grid>
            ))
          )}
        </Grid2>
        <Pagination
          page={page}
          limit={limit}
          onClickButtonBack={() => handlePageChange(page - 1)}
          onClickButtonNext={() => handlePageChange(page + 1)}
          onChangeLimitHandler={handleLimitChange}
          totalItems={dataOrders.length}
        />
      </Box>
      <Box
        sx={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Фильтр заказов
        </Typography>
        <Select
          labelId="select-status"
          id="select-status"
          value={status}
          label="Статус"
          onChange={(e) => {
            setStatus(Number(e.target.value));
          }}
          sx={{
            width: "100%",
            color: "gray",
          }}
        >
          <MenuItem value={0}>Создан</MenuItem>
          <MenuItem value={1}>Оплачен</MenuItem>
          <MenuItem value={2}>В пути</MenuItem>
          <MenuItem value={3}>Доставлен на точку</MenuItem>
          <MenuItem value={4}>Получен</MenuItem>
          <MenuItem value={5}>Архивирован</MenuItem>
          <MenuItem value={6}>Возврат</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setStatus("");
          }}
          sx={{ alignSelf: "center", marginTop: "16px" }}
        >
          Сбросить фильтры
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSortPriceDescending(!sortPriceDescending);
          }}
          sx={{ alignSelf: "center", marginTop: "16px" }}
        >
          Сортировать по сумме (по убыванию)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSortPriceAscending(!sortPriceAscending);
          }}
          sx={{ alignSelf: "center", marginTop: "16px" }}
        >
          Сортировать по сумме (по возрастанию)
        </Button>
      </Box>
    </Box>
  );
}
