import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import TopMenuBar from './Components/TopMenuBar'
import NavigationMenu from './Components/NavigationMenu'

import Home from './Pages/Home'
import Error404 from './Pages/Error404'
import TemplateScreen from './Pages/TemplateScreen'

const AppRoute = () => {
  // Standard: Drawer closed
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen((prev) => !prev)

  return (
    <>
      <TopMenuBar onMenuClick={toggleDrawer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template" element={<TemplateScreen />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <NavigationMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default AppRoute
