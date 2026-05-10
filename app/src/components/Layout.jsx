import { Outlet } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <TopAppBar />
      <main className="pt-20 pb-28 px-5 md:px-16 max-w-[1440px] mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
