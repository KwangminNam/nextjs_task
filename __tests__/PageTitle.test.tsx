import { render, screen } from "@testing-library/react";
import PageTitle from "@/app/components/PageTitle";

describe("Check page title", () => {
  it("Check the heading tag.", () => {
    render(<PageTitle title="글 제목" />);
    const h2 = screen.getByRole("heading", {
      level: 2
    });
    expect(h2).toBeInTheDocument();
  });
});
