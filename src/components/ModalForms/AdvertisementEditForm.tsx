/* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdvertisementEditFormProps {
  id: string;
  image: string | undefined;
  name: string;
  cost: number;
  description: string | undefined;
  createdAt: string;
  views: number;
  likes: number;
  handleCloseModal: () => void;
}

//TODO: дублирование кода, объединить две формы в одну

const AdvertisementEditForm = forwardRef<HTMLDivElement, AdvertisementEditFormProps>(
  ({ id, image, name, cost, description, createdAt, views, likes, handleCloseModal }, ref) => {
    const [imageValue, setImageValue] = useState(image);
    const [titleValue, setTitleValue] = useState(name);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [costValue, setCostValue] = useState<number>(Number(cost));
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateForm = () => {
      if (!titleValue || !descriptionValue || costValue === null) {
        return false;
      }
      return true;
    };

    const onClickEditButton = async () => {
      if (!validateForm()) {
        setError("Заполните все поля.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            name: titleValue,
            price: costValue,
            createdAt: createdAt,
            views: views,
            likes: likes,
            imageUrl: imageValue,
            description: descriptionValue,
          }),
        });
        if (response.ok) {
          handleCloseModal();
          navigate("/advertisements");
        } else {
          setError("Ошибка при изменений объявления");
        }
      } catch (error) {
        console.log(error);
        setError("Ошибка сети");
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
          Редактировать объявление
        </Typography>
        <TextField
          id="filled-image-input"
          label="Изображение"
          variant="filled"
          size="small"
          defaultValue={imageValue}
          onChange={(e) => setImageValue(e.target.value)}
          autoFocus
        />
        <TextField
          id="filled-title-input"
          label="Название"
          variant="filled"
          size="small"
          defaultValue={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <TextField
          id="filled-description-input"
          label="Описание"
          variant="filled"
          size="small"
          defaultValue={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
        <TextField
          id="filled-cost-input"
          label="Стоимость"
          variant="filled"
          size="small"
          defaultValue={costValue}
          onChange={(e) => setCostValue(Number(e.target.value))}
        />
        {error && (
          <Typography color="error" alignSelf={"center"} fontWeight={"bold"}>
            {error}
          </Typography>
        )}
        <Button variant="contained" size="small" onClick={onClickEditButton}>
          Изменить объявление
        </Button>
      </Box>
    );
  },
);

AdvertisementEditForm.displayName = "AdvertisementEditForm";
export default AdvertisementEditForm;
