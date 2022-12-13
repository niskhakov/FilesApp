import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalStyles } from "@mui/system";
import { CssVarsProvider } from "@mui/joy/styles";
import type { Theme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";

// custom
import filesTheme from "../../theme";
import Layout from "../../components/Layout";

import HeaderLayout from "./components/HeaderLayout.component";
import SidenavLayout from "./components/SidenavLayout.component";
import SideDrawerLayout from "./components/SidedrawerLayout.component";
import ListDirs from "./components/ListDirs.component";
import ListFiles from "./components/ListFiles.component";
import DetailSidebar from "./components/DetailSidebar.component";
import { useTypedDispatch, useTypedSelector } from "../../store/hooks";
import {
  getCurrentPath,
  getParentPath,
  goBack,
  isLoading,
  isRoot,
  loadFiles,
  selectFiles,
} from "../../store/entities/files";
import { GenericItem } from "../../interfaces/file";

export default function FilesHomePage() {
  let params = useParams();
  let navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fileDescription, setFileDescription] = useState(false);

  const dispatch = useTypedDispatch();
  const listFiles = useTypedSelector(selectFiles);
  const pathIsRoot = useTypedSelector(isRoot);
  const pathIsLoading = useTypedSelector(isLoading);
  const parentPath = useTypedSelector(getParentPath);
  const currentPath = useTypedSelector(getCurrentPath);
  const dirs = listFiles.filter((file) => file.type == "dir");
  const files = listFiles.filter((file) => file.type == "file");

  const path = "/" + params["*"];
  console.log("useParams:", path, "redux:", currentPath);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadFiles(path));
    };
    fetchData().catch(console.error);
  }, [path]);

  const onClickDir = (dir: GenericItem) => {
    navigate("/files" + dir.path.replace("disk:", ""));
    // dispatch(loadFiles(dir.path));
  };
  const onGoBackDir = () => {
    navigate("/files" + parentPath);
    // dispatch(goBack());
  };

  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      <SideDrawerLayout open={drawerOpen} setOpen={setDrawerOpen} />
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(64px, 200px) minmax(450px, 1fr)",
            md: "minmax(160px, 300px) minmax(600px, 1fr)",
            xl: "minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)",
          },
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <HeaderLayout setOpen={setDrawerOpen} />
        <SidenavLayout />
        <Layout.Main>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 2,
            }}
          >
            <ListDirs
              items={dirs}
              onClick={onClickDir}
              goBack={onGoBackDir}
              isRoot={pathIsRoot}
              isLoading={pathIsLoading}
            />
            <ListFiles items={files} />
          </Box>
        </Layout.Main>
        <DetailSidebar open={fileDescription} setOpen={setFileDescription} />
      </Layout.Root>
    </CssVarsProvider>
  );
}
