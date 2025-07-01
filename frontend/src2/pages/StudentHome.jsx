import { Outlet } from "react-router-dom"
import StudentNavbar from "../components/StudentNavbar"

export default function StudentHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <StudentNavbar />
      <div className="flex-1 p-4">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  )
}
