import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import { KeyboardEvent, useState } from 'react'

import {
  Container,
  CreateProjectInput,
  IconContainer
} from './ProjectsDropdown.styled'

import { CommonDropdown } from '@/components/Dropdown/Dropdown'
import { StyledOption } from '@/components/Dropdown/Dropdown.styled'
import { createProjectAPI } from '@/lib/mentors/mentors-client'

const DUMMY_DATA = [
  {
    id: '1',
    name: 'Project 1'
  },
  {
    id: '2',
    name: 'Project 2'
  },
  {
    id: '3',
    name: 'Project 3'
  }
]

export default function ProjectsDropdown() {
  const [projects, setProjects] = useState<typeof DUMMY_DATA>(DUMMY_DATA)
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [createProject, setCreateProject] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (_: any, value: unknown) => {
    if (value === 'create') {
      setCreateProject(true)
    } else {
      setSelectedProject(value as string)
    }
  }

  const handleCreateProject = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return
    setIsLoading(true)

    const DUMMY_PARTNER_ID = '1'

    try {
      await createProjectAPI(DUMMY_PARTNER_ID, projectName)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      handleCloseCreateProject()
    }
  }

  const handleCloseCreateProject = () => {
    setCreateProject(false)
    setProjectName('')
  }

  return (
    <Container>
      {createProject && (
        <Box display="flex" alignItems="center" gap={1} position={'relative'}>
          <CreateProjectInput
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyUp={handleCreateProject}
            disabled={isLoading}
            autoFocus
          />

          <IconContainer
            onClick={handleCloseCreateProject}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <CloseIcon color="inherit" fontSize="small" />
            )}
          </IconContainer>
        </Box>
      )}

      {!createProject && (
        <CommonDropdown value={selectedProject} onChange={handleChange}>
          <StyledOption value="create">
            <Box display="flex" alignItems="center" gap={0.5}>
              <AddIcon color="inherit" fontSize="small" />
              Create New Project
            </Box>
          </StyledOption>

          <Divider />

          <StyledOption value="all">All Projects</StyledOption>
          {projects.map((project) => (
            <StyledOption key={project.id} value={project.id}>
              {project.name}
            </StyledOption>
          ))}
        </CommonDropdown>
      )}
    </Container>
  )
}
