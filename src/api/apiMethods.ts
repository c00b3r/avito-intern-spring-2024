import { Advertisment } from "../interface";

export const getAllDataOfAdvertisements = async () => {
  const response = await fetch("http://localhost:3000/advertisements");
  const data: Advertisment = await response.json();
  console.log(data);
};
