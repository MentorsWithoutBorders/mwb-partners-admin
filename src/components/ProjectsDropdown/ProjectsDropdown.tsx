import { CommonDropdown } from '@/components/Dropdown/Dropdown'
import { StyledOption } from '@/components/Dropdown/Dropdown.styled'
import {
  Container,
  CreateProjectInput,
  IconContainer
} from './ProjectsDropdown.styled'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useState } from 'react'

export default function ProjectsDropdown() {
  const [value, setValue] = useState<string | null>(null)
  const [createProject, setCreateProject] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>('')

  const handleChange = (_: any, value: unknown) => {
    if (value === 'create') {
      setCreateProject(true)
    } else {
      setValue(value as string)
    }
  }

  return (
    <Container>
      {createProject && (
        <Box display="flex" alignItems="center" gap={1} position={'relative'}>
          <CreateProjectInput
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <IconContainer
            onClick={() => {
              setCreateProject(false)
              setProjectName('')
            }}
          >
            <CloseIcon color="inherit" fontSize="small" />
          </IconContainer>
        </Box>
      )}

      {!createProject && (
        <CommonDropdown value={value} onChange={handleChange}>
          <StyledOption value="create">
            <Box display="flex" alignItems="center" gap={0.5}>
              <AddIcon color="inherit" fontSize="small" />
              Create New Project
            </Box>
          </StyledOption>
          <Divider />

          <StyledOption value={null}>All Projects</StyledOption>
          <StyledOption value={1}>Test1</StyledOption>
          <StyledOption value={2}>Testsd</StyledOption>
          <StyledOption value={3}>Test1wd</StyledOption>
        </CommonDropdown>
      )}
    </Container>
  )
}
