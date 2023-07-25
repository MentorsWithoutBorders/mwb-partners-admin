import Head from 'next/head'

import Dropdown from '@/components/Input/DropDown/DropDown'
import ProjectDropDown from '@/components/Input/ProjectDropDown/ProjectDropDown'

export default function Home() {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const projects = [
    { title: 'The Shawshank Redemption', value: 'project1' },
    { title: 'The Godfather', value: 'project2' },
    { title: 'The Godfather: Part II', value: 'project3' },
    { title: 'The Dark Knight', value: 'project4' }
  ]

  return (
    <>
      <Head>
        <title>Mentors Without Borders</title>
        <meta name="description" content="MWB: Mentors Without Borders" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>Mentors Without Borders</>
        <ProjectDropDown
          data={projects}
          onValueChange={(selectedValue) => console.log(selectedValue)}
        />
      </main>
    </>
  )
}
