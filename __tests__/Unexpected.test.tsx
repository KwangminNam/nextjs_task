import Unexpected from "@/app/components/Unexpected";
import { render, screen } from "@testing-library/react";

describe("Check the unexpected title", () => {
  it("Check fontSize if page is 404", () => {
    const errorTitle = "404";
    render(<Unexpected title={errorTitle} />);
    const titleEl = screen.getByText(errorTitle);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveStyle({
      fontSize: "32px;"
    });
  });
  it("Check fontSize if page is NOT 404", () => {
    const emptyListTitle = "등록된 게시글이 없습니다.";
    render(<Unexpected title={emptyListTitle} />);
    const titleEl = screen.getByText(emptyListTitle);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveStyle({
      fontSize: "18px;"
    });
  });
});
