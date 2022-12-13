import FilesHomePage from "./pages/home/Home.page";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/files/" />} />
      <Route path="/files/*" element={<FilesHomePage />} />
      <Route path="/login" element={<h1>Login Page</h1>} />
    </Routes>
  );
}

export default App;
