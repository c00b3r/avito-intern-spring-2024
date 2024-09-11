import { useLoaderData } from "react-router-dom";
import { Advertisment } from "../../interface";

export default function AdvertisementPage() {
  const currentAdvertisement = useLoaderData() as Advertisment;
  console.log(currentAdvertisement);
  return <div>AdvertisementPage</div>;
}
