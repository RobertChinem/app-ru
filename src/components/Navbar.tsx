import Home from 'icons/Home'
import ListBullet from 'icons/ListBullet'
import UserGroup from 'icons/UserGroup'
import WalletIcon from 'icons/Wallet'
import { ReactNode } from 'react'

const routes: Array<{ icon: ReactNode; route: string }> = [
  {
    icon: <Home />,
    route: 'today'
  },
  {
    icon: <ListBullet />,
    route: 'all'
  },
  {
    icon: <WalletIcon />,
    route: 'wallet'
  },
  {
    icon: <UserGroup />,
    route: 'meet'
  }
]
function Navbar({
  route,
  setRoute
}: {
  route: string
  setRoute: (route: string) => void
}) {
  const currentRoute = route
  return (
    <div className="grid h-full grid-flow-col gap-4 bg-gray-100">
      {routes.map(({ route, icon }, index) => (
        <div key={index}>
          <button
            className={`flex h-full w-full items-center justify-center p-4 ${
              currentRoute !== route ? 'text-gray-400' : ''
            }`}
            onClick={() => setRoute(route)}
          >
            {icon}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Navbar
