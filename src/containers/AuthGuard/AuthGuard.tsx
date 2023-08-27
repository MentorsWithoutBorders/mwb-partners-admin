import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

import LoadingPage from '@/components/LoadingPage/LoadingPage'
import { frontendRoutes } from '@/config/frontend/frontend-routes'

type AuthGuardProps = {
  requiresAuthentication?: boolean
  children: ReactNode
}

export default function AuthGuard({
  requiresAuthentication,
  children
}: AuthGuardProps) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!requiresAuthentication) {
      if (status === 'authenticated') {
        router.replace(frontendRoutes.app.dashboard)
      }
    } else {
      if (status === 'unauthenticated') {
        router.replace(frontendRoutes.auth.signin)
      }
    }
  }, [requiresAuthentication, router, status])

  if (status === 'loading') {
    return <LoadingPage />
  }

  if (!requiresAuthentication) {
    if (status === 'authenticated') {
      return <LoadingPage />
    }

    if (status === 'unauthenticated') {
      return children
    }
  }

  if (status === 'authenticated') {
    return children
  }

  return
}
