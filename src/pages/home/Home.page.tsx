import { useEffect, useState } from "react";
import axios from "axios";
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
import { useTypedDispatch } from "../../store/hooks";
import { loadFiles } from "../../store/entities/files";

export default function FilesHomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fileDescription, setFileDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(loadFiles("/"));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

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
            <ListDirs />
            <ListFiles />
          </Box>
        </Layout.Main>
        <DetailSidebar open={fileDescription} setOpen={setFileDescription} />
      </Layout.Root>
    </CssVarsProvider>
  );
}
