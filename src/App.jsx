import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Authorized } from "./components/Authorized"
import { ApplicationViews } from "./components/ApplicationViews"


export const App = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Authorized><ApplicationViews/></Authorized>} />
        </Routes>
    )
}