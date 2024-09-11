import { useLoaderData, useNavigate } from "react-router-dom";
import { Advertisment } from "../../interface";
import { Box, Button, Card, CardContent, Modal, Typography } from "@mui/material";
import { useState } from "react";
import AdvertisementEditForm from "../../components/ModalForms/AdvertisementEditForm";

export default function AdvertisementPage() {
  const currentAdvertisement = useLoaderData() as Advertisment;
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const navigate = useNavigate();

  const onClickEditHandler = () => {
    handleOpenModal();
  };

  const onClickDeleteHandler = async () => {
    const response = await fetch(
      `http://localhost:3000/advertisements/${currentAdvertisement.id}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      navigate("/advertisements");
    }
  };

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
        <Button variant="contained" size="medium" onClick={onClickEditHandler}>
          Редактировать
        </Button>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box>
            <AdvertisementEditForm
              id={currentAdvertisement.id}
              image={currentAdvertisement.imageUrl}
              name={currentAdvertisement.name}
              cost={Number(currentAdvertisement.price)}
              description={currentAdvertisement.description}
              createdAt={currentAdvertisement.createdAt}
              views={currentAdvertisement.views}
              likes={currentAdvertisement.likes}
              handleCloseModal={handleCloseModal}
            />
          </Box>
        </Modal>
        <Button variant="contained" size="medium" color="error" onClick={onClickDeleteHandler}>
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
