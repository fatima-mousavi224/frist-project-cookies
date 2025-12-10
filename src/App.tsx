import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";

 
function App() {
  return (
    <div className="bg-[#fcf9f7]">
    

        <BrowserRouter>
        <Routes>
          <Route index element={<Layout />}/>

        </Routes>
        </BrowserRouter>
     
    </div>
  );
}

export default App;