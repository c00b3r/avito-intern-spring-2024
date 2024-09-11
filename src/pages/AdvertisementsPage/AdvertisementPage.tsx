import { useLoaderData } from "react-router-dom";
import { Advertisment } from "../../interface";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function AdvertisementPage() {
  const currentAdvertisement = useLoaderData() as Advertisment;
  console.log(currentAdvertisement);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "1250px",
        margin: "auto",
      }}
    >
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="contained" size="medium">
          Редактировать
        </Button>
        <Button variant="contained" size="medium" color="error">
          Удалить
        </Button>
      </Box>
      <Box
        display="flex"
        gap={3}
        sx={{
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          component="img"
          src={currentAdvertisement.imageUrl}
          sx={{
            width: "400px",
            height: "400px",
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
            {currentAdvertisement.name}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              marginTop: 1,
              fontSize: "1.1rem",
              overflowY: "auto",
              maxHeight: "150px",
              maxWidth: "600px",
            }}
          >
            {currentAdvertisement.description ?? "Нет описания"}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
            {currentAdvertisement.price}₽
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
