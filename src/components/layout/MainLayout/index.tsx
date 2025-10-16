import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"

const MainLayout = () => {
    return (

        <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        <Outlet />
      </main>
    </div>
    )
}

export default MainLayout