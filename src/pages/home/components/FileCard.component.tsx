import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export interface FileCardProps {
  name: string;
  created: Date;
}

const FileCard = (file: FileCardProps) => {
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
            .zip
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
        <IconButton variant="plain" color="neutral">
          <EditOutlinedIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default FileCard;
