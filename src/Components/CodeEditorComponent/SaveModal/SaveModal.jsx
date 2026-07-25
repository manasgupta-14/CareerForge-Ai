import { useState } from "react";
import { X } from "lucide-react";

import "./SaveModal.css";

const SaveModal = ({ defaultTitle, onCancel, onConfirm }) => {

    const [title, setTitle] = useState(defaultTitle || "");

    const handleConfirm = () => {
        onConfirm(title.trim() || "Untitled");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleConfirm();
        if (e.key === "Escape") onCancel();
    };

    return (
        <div className="save-modal-overlay" onClick={onCancel}>

            <div
                className="save-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="save-modal-header">
                    <h3>Save Snippet</h3>
                    <button
                        className="save-modal-close"
                        onClick={onCancel}
                        type="button"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="save-modal-body">
                    <label htmlFor="snippet-title">Title</label>
                    <input
                        id="snippet-title"
                        type="text"
                        value={title}
                        autoFocus
                        placeholder="e.g. Landing Page Hero"
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="save-modal-footer">
                    <button
                        className="save-modal-btn save-modal-btn-cancel"
                        onClick={onCancel}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="save-modal-btn save-modal-btn-confirm"
                        onClick={handleConfirm}
                        type="button"
                    >
                        Save
                    </button>
                </div>

            </div>

        </div>
    );
};

export default SaveModal;
