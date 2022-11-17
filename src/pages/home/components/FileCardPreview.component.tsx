import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { FileCardProps } from "./FileCard.component";

interface PreviewFileCardProps extends FileCardProps {
  src: string;
}

const FileCardPreview = (file: PreviewFileCardProps) => {
  return (
    <Card
      sx={{
        "--Card-radius": (theme) => theme.vars.radius.sm,
        boxShadow: "none",
      }}
    >
      <CardCover>
        <img alt="" src={file.src} />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))",
        }}
      />
      <CardContent
        sx={{
          mt: "auto",
          flexGrow: 0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography textColor="#fff">{file.name}</Typography>
          <Typography level="body3" mt={0.5} textColor="rgba(255,255,255,0.72)">
            Added {file.created}
          </Typography>
        </Box>
        <IconButton variant="plain" color="neutral" sx={{ color: "#fff" }}>
          <EditOutlinedIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FileCardPreview;
