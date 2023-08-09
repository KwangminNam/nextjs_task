import NavBar from '../app/components/NavBar'
import { render,screen } from "@testing-library/react"

describe("Check the Maintitle",()=>{
  it('Title shoud be Culture hero task',()=>{
    render(<NavBar/>);
    expect(screen.getByText('Culture hero task')).toBeInTheDocument()
  })
})