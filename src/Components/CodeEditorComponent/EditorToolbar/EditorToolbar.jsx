import { Play, Save, RotateCcw, FolderOpen } from "lucide-react";

import "./EditorToolbar.css";

const EditorToolbar = ({ label, onRun, onSave, onReset }) => {

    return (
        <div className="editor-toolbar">

            <div className="editor-toolbar-label">
                <FolderOpen size={18} />
                <span>{label}</span>
            </div>

            <div className="editor-toolbar-actions">

                {onRun && (
                    <button
                        className="toolbar-btn toolbar-btn-run"
                        onClick={onRun}
                        type="button"
                    >
                        <Play size={16} />
                        Run
                    </button>
                )}

                <button
                    className="toolbar-btn toolbar-btn-save"
                    onClick={onSave}
                    type="button"
                >
                    <Save size={16} />
                    Save
                </button>

                <button
                    className="toolbar-btn toolbar-btn-reset"
                    onClick={onReset}
                    type="button"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>

            </div>

        </div>
    );
};

export default EditorToolbar;
