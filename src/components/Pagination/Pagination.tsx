import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface PaginationProps {
  page: number;
  limit: number;
  onClickButtonBack: () => void;
  onClickButtonNext: () => void;
  onChangeLimitHandler: (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<number>,
  ) => void;
  totalItems: number;
}

export default function Pagination({
  page,
  limit,
  onClickButtonBack,
  onClickButtonNext,
  onChangeLimitHandler,
  totalItems,
}: PaginationProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
      <Button variant="outlined" size="small" disabled={page === 1} onClick={onClickButtonBack}>
        ←
      </Button>
      <p>{page}</p>
      <Select value={limit} name="selectCount" id="select" onChange={onChangeLimitHandler}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
      </Select>
      <Button
        variant="outlined"
        size="small"
        disabled={page * limit >= totalItems}
        onClick={onClickButtonNext}
      >
        →
      </Button>
    </div>
  );
}
