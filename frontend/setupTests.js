import "@testing-library/jest-dom/extend-expect";

import "./setupServer";
import { cache } from "swr";

afterEach(() => {
	cache.clear();
});
