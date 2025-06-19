import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import TopMenuBar from './Components/TopMenuBar'
import NavigationMenu from './Components/NavigationMenu'

import AddMigraine from './Pages/AddMigraine'
import Home from './Pages/Home'
import Info from './Pages/Info'
import Error404 from './Pages/Error404'
import Settings from './Pages/Settings'
import Statistics from './Pages/Statistics'
import TemplateScreen from './Pages/TemplateScreen'
import MigrainLog from './Pages/MigrainLog'
import Tracking from './Pages/Tracking'

const AppRoute = () => {
  // Standard: Drawer closed
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen((prev) => !prev)

  return (
    <>
      <TopMenuBar onMenuClick={toggleDrawer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/template" element={<TemplateScreen />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/add-migraine" element={<AddMigraine />} />
        <Route path="/migrainLog" element={<MigrainLog />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <NavigationMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default AppRoute
