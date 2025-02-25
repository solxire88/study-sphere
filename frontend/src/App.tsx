import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import AuthPage from "./pages/Auth"
import StudentHome from "./pages/StudentHome"
import EducatorHome from "./pages/EducatorHome"

function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/student" element={<StudentHome />} />
          <Route path="/educator" element={<EducatorHome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  )
}

export default App

