import { render, screen } from "@testing-library/react";
// import { ToolTip } from "./index";

// describe("Tooltip", () => {
//   it("render component with notNullable id", () => {
//     const name = "React";
//     const id = 1;

//     render(<ToolTip id={id} name={name} />);

//     expect(document?.querySelector("a")?.getAttribute("href"))?.toBe(
//       `/control/${id}`
//     );
//     expect(screen.getByText(name)).toBeInTheDocument();
//   });

//   it("render component with Nullable id", () => {
//     const name = "React";
//     const id = 0;

//     render(<ToolTip id={id} name={name} />);
//     expect(screen.queryByText(name)).not.toBeInTheDocument();
//   });
// });
