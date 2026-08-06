import { Trash2 } from "lucide-react";

import "./ConsolePanel.css";

const ConsolePanel = ({ logs, onClear }) => {

    return (
        <div className="console-panel">

            <div className="console-panel-header">
                <span>Console</span>
                <button
                    className="console-clear-btn"
                    onClick={onClear}
                    type="button"
                >
                    <Trash2 size={14} />
                    Clear
                </button>
            </div>

            <div className="console-panel-body">

                {logs.length === 0 && (
                    <div className="console-empty">
                        Run your code to see output here.
                    </div>
                )}

                {logs.map((log, index) => (
                    <div
                        key={index}
                        className={`console-line console-line-${log.type}`}
                    >
                        {log.message}
                    </div>
                ))}

            </div>

        </div>
    );
};

export default ConsolePanel;
