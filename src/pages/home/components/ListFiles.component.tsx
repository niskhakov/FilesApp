import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { GenericItem } from "../../../interfaces/file";
import FileCard from "./FileCard.component";
import FileCardPreview from "./FileCardPreview.component";
import { DOWNLOAD_URL } from "../../../config";

type Props = {
  items: GenericItem[];
};

const ListFiles = ({ items }: Props) => {
  const getDownloadUrl = (file: GenericItem) => {
    return DOWNLOAD_URL + file.path;
  };
  const respectPreview = (file: GenericItem) => {
    const Component = file.preview ? FileCardPreview : FileCard;
    return (
      <Component
        file={file}
        key={file.name}
        src={file.preview ?? ""}
        getDownloadUrl={getDownloadUrl}
      />
    );
  };

  return <>{items.map((file) => respectPreview(file))}</>;
};

export default ListFiles;
