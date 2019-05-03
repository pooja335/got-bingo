import React, { FC, useState } from 'react'
import { AllBoards } from './AllBoards'
import { CreateBoardForm } from './CreateBoardForm'

export const Home: FC = () => {
  const [showForm, setShowForm] = useState(false)
  const toggleShowForm = (): void => setShowForm(!showForm)

  return (
    <>
      {!showForm && <AllBoards togglePage={toggleShowForm} /> }
      {showForm && <CreateBoardForm togglePage={toggleShowForm} /> }
    </>
  )
}
