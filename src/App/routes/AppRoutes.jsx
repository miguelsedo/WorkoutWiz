import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { RutinaCreator } from "../pages/RutinaCreator"
import { InformacionPersonal } from "../pages/InformacionPersonal"
import { RutinasGuardadas } from "../pages/RutinasGuardadas"
import { TrainingPage } from "../pages/TrainingPage"
import { TrainingPageEdit } from "../pages/TrainingPageEdit"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/routine-creator" element ={<RutinaCreator/>}/>
        <Route path="/rutinas-guardadas" element ={<RutinasGuardadas/>}/>
        <Route path="/informacion-personal" element ={<InformacionPersonal/>}/>
        <Route path="/rutina/:id/:userID" element ={<TrainingPage/>}/>
        <Route path="/rutina-edit/:id/:userID" element ={<TrainingPageEdit/>}/>
        <Route path="/*" element={<Navigate to="/"/>}/>      
    </Routes>
  )
}
