import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "/src/pages/login/Login";
import axiosInstance from "/src/api/axiosInstance.js";
import { MemoryRouter } from "react-router-dom";

vi.mock("/src/api/axiosInstance.js");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Login page", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it("affiche le formulaire avec les champs username et password", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("met à jour les champs quand on tape dedans", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(usernameInput, { target: { value: "john" } });
        fireEvent.change(passwordInput, { target: { value: "123456" } });

        expect(usernameInput.value).toBe("john");
        expect(passwordInput.value).toBe("123456");
    });

    it("stocke le token et navigue sur succès", async () => {
        axiosInstance.post.mockResolvedValue({ data: { token: "fake-token" } });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe("fake-token");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("affiche le message d'erreur si login échoue", async () => {
        axiosInstance.post.mockRejectedValue({ response: { data: { error: "Invalid credentials" } } });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrong" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
            expect(localStorage.getItem("token")).toBeNull();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });
});
