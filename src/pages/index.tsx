import Router from 'next/router'
import { NextPage } from 'next/types'
import { useEffect } from 'react'

import { frontendRoutes } from '@/config/frontend/frontend-routes'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const Home: WithAuthentication<NextPage> = () => {
  useEffect(() => {
    Router.push(frontendRoutes.app.dashboard)
  }, [])

  return null
}

Home.requiresAuthentication = true

export default Home
