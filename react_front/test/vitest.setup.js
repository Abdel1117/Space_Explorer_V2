import React from "react";
import matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from "vitest";

expect.extend(matchers)

// CKEditor 4 s'appuie sur un vrai iframe/document, non supporté par happy-dom/jsdom.
// On le remplace par un textarea simple qui expose la même interface (initData/onChange).
vi.mock("ckeditor4-react", () => ({
    CKEditor: ({ initData, onChange }) =>
        React.createElement("textarea", {
            "data-testid": "mock-ckeditor",
            defaultValue: initData,
            onChange: (e) => onChange({ editor: { getData: () => e.target.value } })
        })
}));