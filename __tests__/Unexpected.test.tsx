import Unexpected from "@/app/components/Unexpected";
import { render,screen } from "@testing-library/react"

describe("Check the unexpected title",()=>{
  it('Title shoud be Culture hero task',()=>{
    render(<Unexpected title="404"/>);
    const titleEl = screen.getByText('404');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveStyle({
      fontSize:'32px;'
    })
  })
})