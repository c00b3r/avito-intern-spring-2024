import React, { useEffect, useState } from "react";
import { Advertisment } from "../../interface";
import { Button, Grid2 } from "@mui/material";
import "./ListAdvertisementsPage.css";
import ItemCard from "../../components/ItemCard/ItemCard";

export default function ListAdvertisementsPage() {
  const [dataOfAdvertisements, setDataOfAdvertisements] = useState<Advertisment[]>([]);
  const [page, setPage] = useState(1);
  const [limitOfAdvertisements, setLimitOfAdvertisements] = useState(10);
  const [startElement, setStartElement] = useState(0);
  const [valueSearchInput, setValueSearchInput] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // TODO: сделать поиск нормальным, &q= не работает
  const fetchDataOfAdvertisements = async (
    start: number = 0,
    limit: number = 0,
    name: string = "",
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/advertisements?_start=${start}&_limit=${limit}&name=${name}`,
      );
      if (response.ok) {
        const data: Advertisment[] = await response.json();
        setDataOfAdvertisements(data);
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
    setStartElement(startElement + limitOfAdvertisements);
  };
  const onClickButtonBack = () => {
    setPage(page - 1);
    setStartElement(startElement - limitOfAdvertisements);
  };
  const onChangeLimitHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitOfAdvertisements(Number(e.target.value));
    setPage(1);
    setStartElement(0);
  };
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearchInput(e.target.value);
  };
  const onClickSearchHandler = () => {
    setSearchParam(valueSearchInput);
    setStartElement(0);
    fetchDataOfAdvertisements(0, limitOfAdvertisements, valueSearchInput);
  };

  useEffect(() => {
    fetchDataOfAdvertisements(startElement, limitOfAdvertisements, searchParam);
  }, [page, startElement, limitOfAdvertisements, searchParam]);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p>Ошибка получения данных.</p>;
  }

  return (
    <div className="advertisements-container">
      <div className="search-container" style={{ display: "flex", gap: "5px", alignSelf: "end" }}>
        <Button variant="contained" size="medium">
          Создать объявление
        </Button>
        <input
          type="text"
          placeholder="Поиск по объявлениям"
          value={valueSearchInput}
          onChange={(e) => onChangeSearchInput(e)}
        />
        <Button onClick={onClickSearchHandler}>Поиск </Button>
      </div>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columnSpacing={{ xs: 3, sm: 3, md: 3 }}
        margin={"10px"}
      >
        {dataOfAdvertisements.map((advertisementItem) => (
          <Grid2 key={advertisementItem.id} size={{ xs: 1, sm: 1, md: 4 }}>
            <ItemCard {...advertisementItem} />
          </Grid2>
        ))}
      </Grid2>

      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <button disabled={page === 1} onClick={onClickButtonBack}>
          ←
        </button>
        <p>{page}</p>
        <select
          name="selectCount"
          id="select"
          onChange={(e) => onChangeLimitHandler(e)}
          value={limitOfAdvertisements}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
        </select>
        <button
          disabled={dataOfAdvertisements.length < limitOfAdvertisements}
          onClick={onClickButtonNext}
        >
          →
        </button>
      </div>
    </div>
  );
}
