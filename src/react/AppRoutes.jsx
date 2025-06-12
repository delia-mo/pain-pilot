import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Error404 from './Pages/Error404'
import TemplateScreen from './Pages/TemplateScreen'

const AppRoute = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/template" element={<TemplateScreen />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoute
