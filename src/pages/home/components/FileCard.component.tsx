import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import DownloadIcon from "@mui/icons-material/Download";
import { GenericItem } from "../../../interfaces/file";
import { DOWNLOAD_URL } from "../../../config";

export interface FileCardProps {
  file: GenericItem;
  getDownloadUrl?: (file: GenericItem) => string;
}

const FileCard = ({ file, getDownloadUrl }: FileCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        "--Card-radius": (theme) => theme.vars.radius.sm,
        bgcolor: "background.componentBg",
        boxShadow: "none",
      }}
    >
      <CardOverflow
        sx={{
          borderBottom: "1px solid",
          borderColor: "neutral.outlinedBorder",
        }}
      >
        <AspectRatio ratio="16/9" color="primary">
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.plainColor",
            }}
          >
            .{file.name.substr(file.name.lastIndexOf(".") + 1)}
          </Typography>
        </AspectRatio>
      </CardOverflow>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {file.name}
          </Typography>
          <Typography level="body3" mt={0.5}>
            Added {file.created}
          </Typography>
        </Box>
        <a href={getDownloadUrl && getDownloadUrl(file)} target="_blank">
          <IconButton variant="plain" color="neutral">
            <DownloadIcon />
          </IconButton>
        </a>
      </Box>
    </Card>
  );
};

export default FileCard;
