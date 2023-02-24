// ** React Imports
import { useEffect } from 'react'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

const Home = () => {

  useEffect(() => {
      const homeRoute = '/dashboards/record/common'

      // Redirect user to Home URL
      window.location.href = homeRoute
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
