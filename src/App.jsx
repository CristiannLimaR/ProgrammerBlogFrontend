import { Button } from "@/components/ui/button"
import { DashboardPage } from "./pages/DashboardPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
