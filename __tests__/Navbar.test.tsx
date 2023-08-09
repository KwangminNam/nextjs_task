import NavBar from "../app/components/NavBar";
import { render, screen } from "@testing-library/react";

describe("Check the Maintitle", () => {
  it("Title shoud be Culture hero task", () => {
    const title = "Culture hero task";
    render(<NavBar />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it("Nav links should be present", () => {
    render(<NavBar />);
    const links = screen.getAllByRole("listitem");
    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });
});
