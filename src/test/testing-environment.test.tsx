import { render, screen } from "@testing-library/react";

function TestMessage() {
  return <p>Bellbird Books testing environment</p>;
}

describe("testing environment", () => {
  it("renders a React component", () => {
    render(<TestMessage />);

    expect(
      screen.getByText("Bellbird Books testing environment"),
    ).toBeInTheDocument();
  });
});
