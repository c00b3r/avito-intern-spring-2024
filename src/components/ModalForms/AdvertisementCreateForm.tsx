/* eslint-disable react/prop-types */ //добавил типизацию пропсов в forwardRed, ESkint все равно ругается
import { Box, Button, TextField, Typography } from "@mui/material";
import { forwardRef, useState } from "react";

interface AdvertisementFormProps {
  handleCloseModal: () => void;
}

const AdvertisementForm = forwardRef<HTMLDivElement, AdvertisementFormProps>(
  ({ handleCloseModal }, ref) => {
    const [imageValue, setImageValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [costValue, setCostValue] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const validateForm = () => {
      if (!titleValue || !descriptionValue || costValue === null) {
        return false;
      }
      return true;
    };

    const onClickCreateButton = async () => {
      if (!validateForm()) {
        setError("Заполните все поля.");
        return;
      }

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
          setCostValue("");
          handleCloseModal();
        } else {
          setError("Ошибка при создании объявления");
        }
      } catch (error) {
        console.log(error);
        setError("Ошибка сети.");
      }
    };
    return (
      <Box
        ref={ref}
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
          id="filled-image-input"
          label="Изображение"
          variant="filled"
          size="small"
          value={imageValue}
          onChange={(e) => setImageValue(e.target.value)}
          autoFocus
        />
        <TextField
          id="filled-title-input"
          label="Название"
          variant="filled"
          size="small"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <TextField
          id="filled-description-input"
          label="Описание"
          variant="filled"
          size="small"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
        <TextField
          id="filled-cost-input"
          label="Стоимость"
          variant="filled"
          size="small"
          value={costValue}
          onChange={(e) => setCostValue(e.target.value)}
        />
        {error && (
          <Typography color="error" alignSelf={"center"} fontWeight={"bold"}>
            {error}
          </Typography>
        )}
        <Button variant="contained" size="small" onClick={onClickCreateButton}>
          Создать объявление
        </Button>
      </Box>
    );
  },
);

AdvertisementForm.displayName = "AdvertisementForm";

export default AdvertisementForm;
