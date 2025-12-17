import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Logout from "/src/pages/logout/Logout";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Logout page", () => {
    beforeEach(() => {
        localStorage.setItem("token", "fake-token");
        vi.useFakeTimers();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it("supprime le token et navigue vers / après 1s", () => {
        render(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>
        );

        expect(localStorage.getItem("token")).toBeNull();

        vi.advanceTimersByTime(1000);
        expect(mockNavigate).toHaveBeenCalledWith("/");
        expect(screen.getByText("Logging out...")).toBeInTheDocument();
    });
});
