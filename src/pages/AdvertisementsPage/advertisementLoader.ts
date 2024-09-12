import { LoaderFunctionArgs } from "react-router-dom";
import { Advertisment } from "../../interface";

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`http://localhost:3000/advertisements/${params.id}`);
  const data: Advertisment = await response.json();
  return data;
}
