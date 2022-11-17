import { Fragment } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import LinearProgress from "@mui/joy/LinearProgress";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { GenericItem } from "../../../interfaces/file";

type Props = {
  items: GenericItem[];
  isLoading?: boolean;
  isRoot?: boolean;
  onClick?: (item: GenericItem) => void;
  goBack?: () => void;
};

function ListDirs({ items, isRoot, isLoading, goBack, onClick }: Props) {
  const showLoading = isLoading && (
    <LinearProgress
      thickness={1}
      sx={{
        gridColumn: "1 / 5",
        "--LinearProgress-thickness": "1px",
        "--LinearProgress-progressThickness": "1px",
      }}
    />
  );

  return (
    <>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          gridColumn: "1/-1",
          bgcolor: "background.componentBg",
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          "& > *": {
            p: 2,
            "&:nth-child(n):not(:nth-last-child(-n+4))": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Typography level="body3" fontWeight="md" noWrap>
          Folder name
        </Typography>
        <Typography level="body3" fontWeight="md" noWrap>
          Date modified
        </Typography>
        <Typography level="body3" fontWeight="md" noWrap>
          Size
        </Typography>
        <Typography level="body3" fontWeight="md" noWrap>
          Users
        </Typography>
        {showLoading}
        {!isRoot && (
          <>
            <Typography
              level="body2"
              startDecorator={<FolderOpenIcon color="primary" />}
              sx={{ alignItems: "flex-start", cursor: "pointer" }}
              onClick={() => {
                goBack && goBack();
              }}
            >
              ..
            </Typography>
            <Typography level="body2"></Typography>
            <Typography
              level="body2"
              sx={{ color: "success.600" }}
            ></Typography>
            <Box>
              <AvatarGroup
                size="sm"
                sx={{ "--AvatarGroup-gap": "-8px", "--Avatar-size": "24px" }}
              >
                <Avatar
                  src="https://i.pravatar.cc/24?img=6"
                  srcSet="https://i.pravatar.cc/48?img=6 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=7"
                  srcSet="https://i.pravatar.cc/48?img=7 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=8"
                  srcSet="https://i.pravatar.cc/48?img=8 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=9"
                  srcSet="https://i.pravatar.cc/48?img=9 2x"
                />
              </AvatarGroup>
            </Box>
          </>
        )}
        {items.map((dir) => (
          <Fragment key={dir.name}>
            <Typography
              onClick={() => onClick && onClick(dir)}
              level="body2"
              startDecorator={<FolderOpenIcon color="primary" />}
              sx={{ alignItems: "flex-start", cursor: "pointer" }}
            >
              {dir.name}
            </Typography>
            <Typography level="body2">{dir.created}</Typography>
            <Typography level="body2" sx={{ color: "success.600" }}>
              {dir.size}
            </Typography>
            <Box>
              <AvatarGroup
                size="sm"
                sx={{ "--AvatarGroup-gap": "-8px", "--Avatar-size": "24px" }}
              >
                <Avatar
                  src="https://i.pravatar.cc/24?img=6"
                  srcSet="https://i.pravatar.cc/48?img=6 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=7"
                  srcSet="https://i.pravatar.cc/48?img=7 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=8"
                  srcSet="https://i.pravatar.cc/48?img=8 2x"
                />
                <Avatar
                  src="https://i.pravatar.cc/24?img=9"
                  srcSet="https://i.pravatar.cc/48?img=9 2x"
                />
              </AvatarGroup>
            </Box>
          </Fragment>
        ))}
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          display: { xs: "inherit", sm: "none" },
          borderRadius: "sm",
          bgcolor: "background.componentBg",
          overflow: "auto",
          "& > *": {
            "&:nth-child(n):not(:nth-last-child(-n+4))": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <List
          aria-labelledby="table-in-list"
          sx={{
            "& .JoyListItemButton-root": { p: "0px" },
          }}
        >
          {!isRoot && (
            <>
              <ListItem>
                <ListItemButton variant="soft" sx={{ bgcolor: "transparent" }}>
                  <ListItemContent sx={{ p: 2 }}>
                    <Box
                      onClick={() => goBack && goBack()}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        level="body2"
                        startDecorator={<FolderOpenIcon color="primary" />}
                        sx={{ alignItems: "flex-start" }}
                      >
                        ...
                      </Typography>
                      <Typography
                        level="body2"
                        sx={{ color: "success.600" }}
                      ></Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Box></Box>
                      <Typography level="body2"></Typography>
                    </Box>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListDivider sx={{ m: 0 }} />
            </>
          )}
          {items.map((dir) => (
            <Fragment key={dir.name}>
              <ListItem>
                <ListItemButton variant="soft" sx={{ bgcolor: "transparent" }}>
                  <ListItemContent sx={{ p: 2 }}>
                    <Box
                      onClick={() => onClick && onClick(dir)}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        level="body2"
                        startDecorator={<FolderOpenIcon color="primary" />}
                        sx={{ alignItems: "flex-start" }}
                      >
                        {dir.name}
                      </Typography>
                      <Typography level="body2" sx={{ color: "success.600" }}>
                        {dir.size}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Box>
                        <AvatarGroup
                          size="sm"
                          sx={{
                            "--AvatarGroup-gap": "-8px",
                            "--Avatar-size": "24px",
                          }}
                        >
                          <Avatar
                            src="https://i.pravatar.cc/24?img=6"
                            srcSet="https://i.pravatar.cc/48?img=6 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=7"
                            srcSet="https://i.pravatar.cc/48?img=7 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=8"
                            srcSet="https://i.pravatar.cc/48?img=8 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=9"
                            srcSet="https://i.pravatar.cc/48?img=9 2x"
                          />
                        </AvatarGroup>
                      </Box>
                      <Typography level="body2">{dir.created}</Typography>
                    </Box>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListDivider sx={{ m: 0 }} />
            </Fragment>
          ))}
        </List>
      </Sheet>
    </>
  );
}

export default ListDirs;
