import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Modal from "../Modal";

describe("Modal", () => {
    it("renders sr-only title when open", () => {
        render(
            <Modal isOpen={true} onClose={() => {}} title="Test Modal">
                <div>Content</div>
            </Modal>,
        );
        const title = screen.getByText("Test Modal");
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("sr-only");
    });

    it("does not render when closed", () => {
        render(
            <Modal isOpen={false} onClose={() => {}} title="Hidden">
                <div>Content</div>
            </Modal>,
        );
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("calls onClose when Escape is pressed", async () => {
        const onClose = vi.fn();
        const user = userEvent.setup();
        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <div>Content</div>
            </Modal>,
        );
        await user.keyboard("{Escape}");
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is clicked", async () => {
        const onClose = vi.fn();
        const user = userEvent.setup();
        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <div>Content</div>
            </Modal>,
        );
        await user.click(screen.getByRole("presentation"));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when clicking inside the dialog", async () => {
        const onClose = vi.fn();
        const user = userEvent.setup();
        render(
            <Modal isOpen={true} onClose={onClose} title="Test Modal">
                <button>Inside</button>
            </Modal>,
        );
        await user.click(screen.getByRole("button", { name: "Inside" }));
        expect(onClose).not.toHaveBeenCalled();
    });
});
