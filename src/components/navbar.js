"use client";
import React from 'react'

import {
  Box, 
  Stack,
  Center,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
  GridItem
} from '@chakra-ui/react'

function Navbar() {
  return(
    <Box
      position="flex"
      as="nav"
      w="100%"
      style={{backdropFilter: 'blur(10px'}}
      className="bg-zinc-950"
    >
      <Center padding='1%'> 
        
        <Stack
            display="flex"
            direction={['column', 'row']} 
            spacing='50%'
            justify="center"
            fontSize='6xl'
          >
          <Menu>
            <MenuButton as={Button}>
              Create
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem> */}
              
              
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button}>
              Procedures
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          </Stack>

      </Center>
    </Box>
  )
}

export default Navbar
