'use client'
import Navbar from "@/components/navbar"
import OpsList from "@/components/others/opsList"
import {Box, Text, Button, useColorModeValue} from '@chakra-ui/react'
import NextLink from 'next/link'

import store from "@/redux/store"
import { Provider } from "react-redux"

const LinkItem=({ href, path, children })=>{
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink 
        href={href}
        p={2}
        bg={active?'glassTeal':undefined}
        color={active? '#202023' : inactiveColor}
      >
      {children}

  
    </NextLink>
  )
}

const handleClick = (e) =>{
  e.preventDefault();
}

export default function Home (props){
  const { path } = props
  return (
  <Box>
    <Box className="max-w-screen-lg mx-auto content-center mt-20" >
    <Box className="grid grid-cols-2 gap-20">
      <Button onClick={handleClick} className="w-full h-0 shadow-lg rounded-md aspect-w-1 aspect-h-1 rounded-xl transition ease-in-out delay-100 bg-white-500 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-500 duration-300 text-center"><LinkItem href="/edit" path={path}><Text color='black'>Create</Text></LinkItem></Button>
      <Button onClick={handleClick} className="w-full h-0 shadow-lg rounded-md aspect-w-1 aspect-h-1 rounded-xl transition ease-in-out delay-100 bg-white-500 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-500 duration-300 text-center"><LinkItem href="/procedure" path={path}><Text color='black'>My Procedures</Text></LinkItem></Button>
    </Box>
  </Box>
  </Box>
  )
}


