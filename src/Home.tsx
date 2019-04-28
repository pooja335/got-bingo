import React, { Component } from 'react'
import { AllBoards } from './AllBoards'
import { CreateBoardForm } from './CreateBoardForm'

export class Home extends Component<{}, { showForm: boolean }> {
  state = { showForm: false }

  toggleShowForm = (): void => this.setState({ showForm: !this.state.showForm })

  render() {
    return (
      <>
        {!this.state.showForm && <AllBoards togglePage={this.toggleShowForm} /> }
        {this.state.showForm && <CreateBoardForm togglePage={this.toggleShowForm} /> }
      </>
    )
  }
}
