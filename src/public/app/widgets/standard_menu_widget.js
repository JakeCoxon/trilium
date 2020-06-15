import BasicWidget from "./basic_widget.js";
import HistoryNavigationWidget from "./history_navigation.js";
import protectedSessionService from "../services/protected_session.js";

const TPL = `
<div class="standard-menu-widget">
    <style>
    .standard-menu-widget {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-top: 4px;
    }
    
    .standard-menu-widget button {
        padding: 1px 5px 1px 5px;
        font-size: smaller;
        margin-bottom: 2px;
        margin-top: 2px;
        margin-right: 8px;
        border-color: transparent !important;

        text-align: left;
        background: transparent !important;
        color: inherit !important;
    }
    
    .standard-menu-widget button:hover {
        border-color: transparent !important;

        background: var(--sidebar-hover-background) !important;
    }

    .standard-menu-widget button.btn-sm .bx {
        position: relative;
        top: 1px;
    }
    
    #plugin-buttons {
      display: flex;
      flex-direction: column;
    }
    </style>

    <div style="display: flex; flex-direction: column">
        <button class="btn btn-sm jump-to-note-dialog-button" data-command="jumpToNote">
            <span class="bx bx-crosshair"></span>
            Jump to note
        </button>
    
        <button class="btn btn-sm recent-changes-button" data-command="showRecentChanges">
            <span class="bx bx-history"></span>
    
            Recent changes
        </button>
    
        <button class="btn btn-sm enter-protected-session-button"
                title="Enter protected session to be able to find and view protected notes">
            <span class="bx bx-log-in"></span>
    
            Enter protected session
        </button>
    
        <button class="btn btn-sm leave-protected-session-button"
                title="Leave protected session so that protected notes are not accessible any more."
                style="display: none;">
            <span class="bx bx-log-out"></span>
    
            Leave protected session
        </button>
    </div>
    
    <div id="plugin-buttons"></div>
</div>`;

export default class StandardMenuWidget extends BasicWidget {
    doRender() {
        this.$widget = $(TPL);

        this.$widget.find(".jump-to-note-dialog-button").on('click', () => this.triggerCommand('jumpToNote'));
        this.$widget.find(".recent-changes-button").on('click', () => this.triggerCommand('showRecentChanges'));

        this.$enterProtectedSessionButton = this.$widget.find(".enter-protected-session-button");
        this.$enterProtectedSessionButton.on('click', protectedSessionService.enterProtectedSession);

        this.$leaveProtectedSessionButton = this.$widget.find(".leave-protected-session-button");
        this.$leaveProtectedSessionButton.on('click', protectedSessionService.leaveProtectedSession);

        return this.$widget
    }

    protectedSessionStartedEvent() {
        this.$enterProtectedSessionButton.hide();
        this.$leaveProtectedSessionButton.show();
    }
}