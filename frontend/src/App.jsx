import { BrowserRouter as Router, Route, Routes, Navigate, UNSAFE_RouteContext } from "react-router-dom"
import AuthPage from "./pages/Auth"
import StudentHome from "./pages/StudentHome"
import EducatorHome from "./pages/EducatorHome"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import NotAuthorized from "./pages/NotAuthorized"
import NotFound from "./pages/NotFound"
import HomeRedirect from "./pages/HomeRedirect"

function logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}



function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<AuthPage />} />

          <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
            <Route path="/student" element={<StudentHome />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={["educator"]} />}>
            <Route path="/educator" element={<EducatorHome />} />
          </Route>

          <Route path='/not-authorized' element={<NotAuthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
  )
}

export default App

