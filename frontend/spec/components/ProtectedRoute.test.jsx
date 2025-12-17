import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "/src/components/ProtectedRoute.jsx";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        Navigate: ({ to }) => <div>Redirected to {to}</div>,
    };
});

describe("ProtectedRoute component", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("redirige vers /login si aucun token", () => {
        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText("Redirected to /login")).toBeInTheDocument();
        expect(screen.queryByText("Protected Content")).toBeNull();
    });

    it("rend le composant enfant si token présent", () => {
        localStorage.setItem("token", "fake-token");

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText("Protected Content")).toBeInTheDocument();
        expect(screen.queryByText("Redirected to /login")).toBeNull();
    });
});
