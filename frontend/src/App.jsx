import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Add } from "./pages/Add";
import { Toaster } from "react-hot-toast";
import { Expenses } from "./pages/Expenses";
function App() {
  return <>
  <Toaster position="top-right" />
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/all" element={<Expenses/>} />
      </Routes>
      </BrowserRouter>
      </>
}
export default App;
