import { OrderType } from '@/components/Table/interfaces'

export const fetchMentorsAPI = (
  page: number = 1,
  rowsPerPage: number = 10,
  order: OrderType,
  orderBy: string | undefined,
  searchText: string | undefined,
  searchBy: string | undefined,
  fromDate: string | undefined,
  toDate: string | undefined
) => {
  // TODO implement API part
  console.log('fetching mentors')
  console.log(
    page,
    rowsPerPage,
    order,
    orderBy,
    searchText,
    searchBy,
    fromDate,
    toDate
  )
  return {
    results: [
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e8852',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a99753',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf31616163234',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e8855',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a99756',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf31616163237',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e8858',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a99759',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf316161632310',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
        name: 'Mentor 2',
        email: 'm2@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'd4c98320-22ee-4b77-9c2f-81337b94e885',
        name: 'Mentor 1',
        email: 'm1@test.fake',
        courses: 20,
        students: 100,
        hours: 20
      },
      {
        id: 'eab5a0d4-3fc0-4915-8a7e-df771c9a9975',
        name: 'Edmond Pruteanu',
        email: 'edmondpr@gmail.com',
        phoneNumber: '+40 742805664',
        courses: 20,
        students: 100,
        hours: 20
      }
    ],
    count: 87
  }
}

export const fetchMentorAPI = (id: number) => {
  console.log('Fetching data based on id')

  return {
    data: {
      id: 'dfffbad3-0cad-493e-a66d-cf3161616323',
      name: 'Mentor 2',
      email: 'm2@test.fake',
      courses: 20,
      students: 100,
      hours: 20
    }
  }
}
