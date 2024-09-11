import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface AdvertisementFormProps {
  handleCloseModal: () => void;
}

export default function AdvertisementForm({ handleCloseModal }: AdvertisementFormProps) {
  const [imageValue, setImageValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [costValue, setCostValue] = useState<number | null>(null);
  const onClickCreateButton = async () => {
    try {
      const response = await fetch("http://localhost:3000/advertisements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: titleValue,
          price: costValue,
          createdAt: new Date().toISOString(),
          views: 0,
          likes: 0,
          imageUrl: imageValue,
          description: descriptionValue,
        }),
      });
      if (response.ok) {
        setImageValue("");
        setTitleValue("");
        setDescriptionValue("");
        setCostValue(null);
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderBlock: "none",
        borderInline: "none",
        borderRadius: "8px",
      }}
    >
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h2"
        style={{ alignSelf: "center" }}
      >
        Создать новое объявление
      </Typography>
      <TextField
        id="filled-password-input"
        label="Изображение"
        variant="filled"
        size="small"
        defaultValue={imageValue}
        onChange={(e) => setImageValue(e.target.value)}
      />
      <TextField
        id="filled-password-input"
        label="Название"
        variant="filled"
        size="small"
        defaultValue={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <TextField
        id="filled-password-input"
        label="Описание"
        variant="filled"
        size="small"
        defaultValue={descriptionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />
      <TextField
        id="filled-password-input"
        label="Стоимость"
        variant="filled"
        size="small"
        defaultValue={costValue}
        onChange={(e) => setCostValue(Number(e.target.value))}
      />
      <Button variant="contained" size="small" onClick={onClickCreateButton}>
        Создать объявление
      </Button>
    </Box>
  );
}
