import { CustomSelect } from '@/components/Dropdown/Dropdown'
import { StyledOption } from '@/components/Dropdown/Dropdown.styled'
import Popup from '@/components/Popup/Popup'
import { Box } from '@mui/material'
import Head from 'next/head'

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

      <CustomSelect defaultValue={10}>
        <StyledOption value={1}>Test1</StyledOption>
        <StyledOption value={2}>Testsd</StyledOption>
        <StyledOption value={3}>Test1wd</StyledOption>
        <StyledOption value={10}>Test2</StyledOption>
      </CustomSelect>
    </>
  )
}
