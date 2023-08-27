import { redirect } from 'next/navigation'
import { NextPage } from 'next/types'

import { frontendRoutes } from '@/config/frontend/frontend-routes'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const Home: WithAuthentication<NextPage> = () => {
  redirect(frontendRoutes.app.dashboard)
}

Home.requiresAuthentication = true

export default Home
