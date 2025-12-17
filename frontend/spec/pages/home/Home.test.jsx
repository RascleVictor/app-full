import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "/src/pages/home/Home.jsx";

describe("Home page", () => {
    it("affiche le titre et le texte de bienvenue", () => {
        render(<Home />);
        expect(screen.getByText("Welcome to DevSecOps App")).toBeInTheDocument();
        expect(screen.getByText("This is the home page of your secure fullstack application.")).toBeInTheDocument();
    });
});
