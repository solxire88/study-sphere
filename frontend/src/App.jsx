import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import StudentHome from "./pages/StudentHome";
import EducatorHome from "./pages/EducatorHome";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NotAuthorized from "./pages/NotAuthorized";
import NotFound from "./pages/NotFound";
import HomeRedirect from "./pages/HomeRedirect";
import EducatorClasses from "./pages/EducatorClasses";
import NewClass from "./pages/NewClass";
import StudentClasses from "./pages/StudentClasses";
import StudentExplore from "./pages/StudentExplore";
import ClassDetails from "./pages/ClassDetails";
import CourseDetailsEducator from "./pages/CourseDetailsEducator"; // Import the new page

function logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeRedirect />} /> {/* Always redirects to HomeRedirect */}
        <Route path="/login" element={<AuthPage />} />

        {/* Student Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentHome />}>
            <Route index element={<Navigate to="classes" replace />} />
            <Route path="classes" element={<StudentClasses />} />
            <Route path="explore" element={<StudentExplore />} />
            <Route path="class/:id" element={<ClassDetails />} /> {/* New route */}
          </Route>
        </Route>

        {/* Educator Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["educator"]} />}>
          <Route path="/educator" element={<EducatorHome />}>
            <Route index element={<Navigate to="classes" replace />} />
            <Route path="classes" element={<EducatorClasses />} />
            <Route path="new-class" element={<NewClass />} />
            <Route path="class/:id" element={<CourseDetailsEducator />} /> {/* New route */}
          </Route>
        </Route>

        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;