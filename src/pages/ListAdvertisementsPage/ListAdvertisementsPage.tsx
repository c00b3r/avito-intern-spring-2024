import React, { useEffect, useState } from "react";
import { Advertisment } from "../../interface";
import { Button, Grid2, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import "./ListAdvertisementsPage.css";
import ItemCard from "../../components/ItemCard/ItemCard";
import AdvertisementForm from "../../components/ModalForms/AdvertisementCreateForm";

export default function ListAdvertisementsPage() {
  const [allDataOfAdvertisements, setAllDataOfAdvertisements] = useState<Advertisment[]>([]);
  const [dataOfAdvertisements, setDataOfAdvertisements] = useState<Advertisment[]>([]);
  const [page, setPage] = useState(1);
  const [limitOfAdvertisements, setLimitOfAdvertisements] = useState(10);
  const [valueSearchInput, setValueSearchInput] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // TODO: сделать поиск нормальным, &q= не работает
  // вынести пагинацию в отдельный компонент
  const fetchDataOfAdvertisements = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3000/advertisements`);
      if (response.ok) {
        const data: Advertisment[] = await response.json();
        setAllDataOfAdvertisements(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const onClickButtonNext = () => {
    setPage(page + 1);
  };
  const onClickButtonBack = () => {
    setPage(page - 1);
  };
  const onChangeLimitHandler = (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<number>,
  ) => {
    setLimitOfAdvertisements(Number(e.target.value));
    setPage(1);
  };
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearchInput(e.target.value);
  };
  const onClickSearchHandler = () => {
    setSearchParam(valueSearchInput);
    setPage(1);
  };

  useEffect(() => {
    fetchDataOfAdvertisements();
  }, []);

  useEffect(() => {
    const filterAndPaginateData = () => {
      let filtered = allDataOfAdvertisements;

      if (searchParam) {
        const regex = new RegExp(searchParam.trim(), "i");
        filtered = filtered.filter((advertisement) => regex.test(advertisement.name));
      }

      const startIndex = (page - 1) * limitOfAdvertisements;
      const paginated = filtered.slice(startIndex, startIndex + limitOfAdvertisements);

      setDataOfAdvertisements(paginated);
    };
    filterAndPaginateData();
  }, [page, limitOfAdvertisements, searchParam, allDataOfAdvertisements]);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>Ошибка получения данных.</p>;
  }

  return (
    <div className="advertisements-container">
      <div className="search-container" style={{ display: "flex", gap: "5px", alignSelf: "end" }}>
        <Button variant="contained" size="medium" onClick={handleOpenModal}>
          Создать объявление
        </Button>
        <Modal open={openModal} onClose={handleCloseModal}>
          <AdvertisementForm handleCloseModal={handleCloseModal} />
        </Modal>
        <input
          type="text"
          placeholder="Поиск по объявлениям"
          value={valueSearchInput}
          onChange={(e) => onChangeSearchInput(e)}
        />
        <Button onClick={onClickSearchHandler}>Поиск </Button>
      </div>
      {dataOfAdvertisements.length === 0 ? (
        <p>Нет заказов</p>
      ) : (
        <Grid2
          container
          spacing={{ xs: 1, md: 2 }}
          columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          margin={"10px"}
          justifyContent={dataOfAdvertisements.length < 4 ? "center" : "flex-start"}
          alignItems="stretch"
        >
          {dataOfAdvertisements.map((advertisementItem) => (
            <Grid2
              key={advertisementItem.id}
              size={{ xs: 12, sm: 4, md: 4 }}
              style={{ minWidth: "300px", maxWidth: "400px" }}
            >
              <ItemCard {...advertisementItem} />
            </Grid2>
          ))}
        </Grid2>
      )}

      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <Button variant="outlined" size="small" disabled={page === 1} onClick={onClickButtonBack}>
          ←
        </Button>
        <p>{page}</p>
        <Select
          value={limitOfAdvertisements}
          name="selectCount"
          id="select"
          onChange={(e) => onChangeLimitHandler(e)}
        >
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="30">30</MenuItem>
          <MenuItem value="40">40</MenuItem>
        </Select>
        <Button
          variant="outlined"
          size="small"
          disabled={dataOfAdvertisements.length < limitOfAdvertisements}
          onClick={onClickButtonNext}
        >
          →
        </Button>
      </div>
    </div>
  );
}
