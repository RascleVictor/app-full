import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "/src/components/Header";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});


describe("Header component", () => {
    beforeEach(() => {
        localStorage.clear();
        mockNavigate.mockClear();
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
        localStorage.setItem("token", "fake-token");

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Logout"));

        expect(localStorage.getItem("token")).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});