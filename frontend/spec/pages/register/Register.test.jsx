import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "/src/pages/register/Register";
import axiosInstance from "/src/api/axiosInstance.js";
import { MemoryRouter } from "react-router-dom";

vi.mock("/src/api/axiosInstance.js");

describe("Register page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("affiche le formulaire avec les champs username, email et password", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    it("met à jour les champs quand on tape dedans", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@test.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "12345678" } });

        expect(screen.getByPlaceholderText("Username").value).toBe("john");
        expect(screen.getByPlaceholderText("Email").value).toBe("john@test.com");
        expect(screen.getByPlaceholderText("Password").value).toBe("12345678");
    });

    it("affiche un message de succès après inscription", async () => {
        axiosInstance.post.mockResolvedValue({ data: "User registered successfully" });

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@test.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "12345678" } });

        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        await waitFor(() => {
            expect(screen.getByText("User registered successfully")).toBeInTheDocument();
        });
    });

    it("affiche un message d'erreur si inscription échoue", async () => {
        axiosInstance.post.mockRejectedValue({ response: { data: { error: "Email already exists" } } });

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "john" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@test.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "12345678" } });

        fireEvent.click(screen.getByRole("button", { name: /register/i }));

        await waitFor(() => {
            expect(screen.getByText("Email already exists")).toBeInTheDocument();
        });
    });
});
