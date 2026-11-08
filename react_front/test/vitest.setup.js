import React from "react";
import matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from "vitest";

expect.extend(matchers)

// CKEditor 4 s'appuie sur un vrai iframe/document, non supporté par happy-dom/jsdom.
// On le remplace par un textarea simple qui expose la même interface (initData/onChange).
// Comme dans ckeditor4-react, les handlers sont ceux reçus au montage de l'éditeur.
vi.mock("ckeditor4-react", () => ({
    CKEditor: function MockCKEditor(props) {
        const handlers = React.useRef(props);
        return React.createElement("textarea", {
            "data-testid": "mock-ckeditor",
            defaultValue: props.initData,
            onChange: (e) => handlers.current.onChange?.({ editor: { getData: () => e.target.value } })
        });
    }
}));