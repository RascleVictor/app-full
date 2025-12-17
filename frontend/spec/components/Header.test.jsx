import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "/src/components/Header";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("Header component", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("affiche Home, Login et Register si pas de token", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.queryByText("Logout")).toBeNull();
    });

    it("affiche Logout si token présent", () => {
        localStorage.setItem("token", "fake-token");

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByText("Logout")).toBeInTheDocument();
        expect(screen.queryByText("Login")).toBeNull();
        expect(screen.queryByText("Register")).toBeNull();
    });

    it("supprime le token et redirige au clic sur Logout", () => {
        const mockNavigate = vi.fn();
        vi.mocked(require("react-router-dom").useNavigate).mockReturnValue(mockNavigate);

        localStorage.setItem("token", "fake-token");

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logoutBtn = screen.getByText("Logout");
        fireEvent.click(logoutBtn);

        expect(localStorage.getItem("token")).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
