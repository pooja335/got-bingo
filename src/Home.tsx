import React, { FC } from 'react'
import { CreateBoardForm } from './CreateBoardForm'
import { AllBoards } from './AllBoards'

export const Home: FC = () => {
  return (
    <>
      <CreateBoardForm />
      <AllBoards />
    </>
  )
}

