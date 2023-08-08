import { Box } from '@mui/material'
import Head from 'next/head'

import Popup from '@/components/Popup/Popup'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mentors Without Borders</title>
        <meta name="description" content="MWB: Mentors Without Borders" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Mentors Without Borders</main>

      <Popup title="Test">
        <div></div>
      </Popup>
    </>
  )
}
