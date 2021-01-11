import { render, screen } from "@/utils.ts/test-swr";
import { Clusters } from "./index";
import "whatwg-fetch";
import { clustersData as data } from "@/someData/testData";
import { server, rest } from "@/setupServer";

describe("Clusters", () => {
  it("handles error", async () => {
    server.use(
      rest.get("/api/cluster/", (_req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(<Clusters clusters={null} />);

    const element = await screen.findByText("Ошибка вывода групп");
    expect(element).toBeInTheDocument();
  });
  it("fetch correctly with nullable initial data", async () => {
    render(<Clusters clusters={null} />);

    const items = await screen.findAllByTestId("cluster");
    expect(items).toHaveLength(2);
  });

  it("fetch correctly with correct initial data", async () => {
    render(<Clusters clusters={data} />);

    const items = await screen.findAllByTestId("cluster");
    expect(items).toHaveLength(2);
  });
});
