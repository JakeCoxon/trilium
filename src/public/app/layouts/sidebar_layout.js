import FlexContainer from "../widgets/flex_container.js";
import GlobalMenuWidget from "../widgets/global_menu.js";
import TabRowWidget from "../widgets/tab_row.js";
import TitleBarButtonsWidget from "../widgets/title_bar_buttons.js";
import StandardTopWidget from "../widgets/standard_top_widget.js";
import SidePaneContainer from "../widgets/side_pane_container.js";
import GlobalButtonsWidget from "../widgets/global_buttons.js";
import SearchBoxWidget from "../widgets/search_box.js";
import SearchResultsWidget from "../widgets/search_results.js";
import NoteTreeWidget from "../widgets/note_tree.js";
import TabCachingWidget from "../widgets/tab_caching_widget.js";
import NotePathsWidget from "../widgets/note_paths.js";
import NoteTitleWidget from "../widgets/note_title.js";
import RunScriptButtonsWidget from "../widgets/run_script_buttons.js";
import NoteTypeWidget from "../widgets/note_type.js";
import NoteActionsWidget from "../widgets/note_actions.js";
import PromotedAttributesWidget from "../widgets/promoted_attributes.js";
import NoteDetailWidget from "../widgets/note_detail.js";
import NoteInfoWidget from "../widgets/collapsible_widgets/note_info.js";
import CalendarWidget from "../widgets/collapsible_widgets/calendar.js";
import AttributesWidget from "../widgets/collapsible_widgets/attributes.js";
import LinkMapWidget from "../widgets/collapsible_widgets/link_map.js";
import NoteRevisionsWidget from "../widgets/collapsible_widgets/note_revisions.js";
import SimilarNotesWidget from "../widgets/collapsible_widgets/similar_notes.js";
import WhatLinksHereWidget from "../widgets/collapsible_widgets/what_links_here.js";
import HistoryNavigationWidget from "../widgets/history_navigation.js";
import SidePaneToggles from "../widgets/side_pane_toggles.js";
import StandardMenuWidget from "../widgets/standard_menu_widget.js";

const RIGHT_PANE_CSS = `
<style>
#right-pane {
    overflow: auto;
}

#right-pane .card {
    border: 0;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
}

#right-pane .card-header {
    background: inherit;
    padding: 3px 10px 3px 10px;
    width: 99%; /* to give minimal right margin */
    background-color: var(--button-background-color);
    border-color: var(--button-border-color);
    border-width: 1px;
    border-radius: 4px;
    border-style: solid;
    display: flex;
    justify-content: space-between;
}

#right-pane .widget-title {
    border-radius: 0;
    padding: 0;
    border: 0;
    background: inherit;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--muted-text-color) !important;
}

#right-pane .widget-header-action {
    color: var(--link-color) !important;
    cursor: pointer;
}

#right-pane .widget-help {
    color: var(--muted-text-color);
    position: relative;
    top: 2px;
}

#right-pane .widget-help.no-link:hover {
    cursor: default;
    text-decoration: none;
}

#right-pane .body-wrapper {
    overflow: auto;
}

#right-pane .card-body {
    width: 100%;
    padding: 8px;
    border: 0;
    height: 100%;
    overflow: auto;
    max-height: 300px;
}

#right-pane .card-body ul {
    padding-left: 25px;
    margin-bottom: 5px;
}

#center-center-container {
    flex: 1;
}
#center-center-pane {
    flex: 1;
}


#left-pane {
    background: hsl(63, 14%, 95%);
    color: #525252;

    /* darkmode sidebar */
    background: hsl(241, 7%, 18%);
    color: hsla(62, 7%, 91%, 0.6);

    padding: 8px;
}

#left-pane ::-webkit-scrollbar-thumb {
    border-color: #606060;
}

#right-pane {
    background: rgb(243, 243, 243);
    padding: 8px;
}
#right-pane .card {
    margin-bottom: 16px;
}

#right-pane .card-header {
    border: 0;
    border-radius: 2px;
    background: #d8d8d8;
}

/* fancy tree */
span.fancytree-custom-icon {
    opacity: 0.6;
}
span.fancytree-expander {
    opacity: 0.2;
}

span.fancytree-node {
    border-radius: 2px;
}

.fancytree-node:not(.fancytree-loading) .fancytree-expander {
    height: 0 !important;
}
span.fancytree-node:hover {
    cursor: pointer;
    background: var(--sidebar-hover-background);
}
span.fancytree-node:hover span.fancytree-title {
    border-color: transparent !important;
}

span.fancytree-focused,
span.fancytree-active,
span.fancytree-focused:hover {
    background: var(--sidebar-active-background);
}
span.fancytree-active span.fancytree-title,
span.fancytree-focused span.fancytree-title {
    background: transparent !important;
    border-color: transparent !important;
    color: inherit !important;
}

.fancytree-node:not(.fancytree-folder) .fancytree-expander:before {
    /*color: inherit;*/
}




.global-buttons {
    border-color: #343434;
}
.global-menu-wrapper {
    border: 0;
}
.global-menu button.btn {
    border: 0;
    background: 0;
    color: inherit;
}

#tabbar-container {
    background: hsla(41, 30%, 96%, 1);
}

.note-tab-row {
    background: transparent;
    height: 36px;
    min-height: 36px;
    padding-top: 2px;
    margin-top: 0;
    margin-left: -6px;
    padding-left: 6px;
}

.note-paths-widget {
    flex: 1;
    border: 0;
    padding-left: 5px;
}

.current-path {
    flex-grow: 0;
}



/* narrow content */


.note-title-container {
    max-width: 800px;
    margin: auto;
}
.note-title {
    margin-left: 0;
    margin-bottom: 16px;
    padding: 0;
    font-size: 32px !important;
}
.note-title:focus {
    outline: none;
}

.note-detail-text {
    padding-left: 16px;
    padding-right: 16px;
}

.note-detail-text-editor > p,
.note-detail-text-editor > h1,
.note-detail-text-editor > h2,
.note-detail-text-editor > h3,
.note-detail-text-editor > h4,
.note-detail-text-editor > blockquote,
.note-detail-text-editor > ul,
.note-detail-text-editor > ol,
.note-detail-text-editor > pre
{
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.note-detail-text-editor > p {
    margin-bottom: 0.6rem;
}

.btn.render-button,
.btn.execute-script-button {
    font-size: 18px;
    border: 0;
}

.note-actions > .btn,
.note-type > .btn,
.note-paths-widget > .dropdown > .btn {
    border: 0;
    background: transparent;
    font-size: 13px;
    color: #555;
}
.note-actions > .btn:focus,
.note-type > .btn:focus,
.note-paths-widget > .dropdown > .btn:focus {
    border: 0;
    background: transparent;
    box-shadow: none;
    background: var(--active-item-background-color);
}
.note-paths-widget, .note-paths-widget a {
    /* todo: this is doing stuff to the dropdown too */
    color: #555;
    font-size: 13px;
}

#action-bar {
    margin-top: 2px;
    margin-bottom: 32px;
}

/* we somehow broke scrolling */
.note-detail {
    position: relative;
    flex: 1;
    height: 1px; /* dumbest thing ive ever seen */
}

.tree-wrapper {
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: -8px;
}
.tree-wrapper .tree {
    overflow-x: hidden;
}
.history-navigation {
    margin: 0;
    font-size: 12px;
    display: flex;
    align-items: center;
}
.history-navigation a:first-of-type {
    margin-right: -4px;
}

body.desktop {
    --tree-font-size: 80% !important;
    --sidebar-hover-background: #393939;
    --sidebar-active-background: #414142;
}


</style>`;

export default class SidebarLayout {
    constructor(customWidgets) {
        this.customWidgets = customWidgets;
    }

    getRootWidget(appContext) {
        appContext.mainTreeWidget = new NoteTreeWidget("main");

        return new FlexContainer('column')
            .setParent(appContext)
            .id('root-widget')
            .css('height', '100vh')
            .child(new FlexContainer('row')
                .collapsible()
                .filling()
                .child(new SidePaneContainer('left')
                    .hideInZenMode()
                    .child(new GlobalMenuWidget())
                    .child(new GlobalButtonsWidget())
                    .child(new SearchBoxWidget())
                    .child(new SearchResultsWidget())
                    .child(new StandardMenuWidget())
                    .child(appContext.mainTreeWidget)
                    .child(...this.customWidgets.get('left-pane'))
                )
                .child(new FlexContainer('column').id('center-pane')
                    .child(new FlexContainer('row').id('tabbar-container')
                        .child(new TabRowWidget())
                        .child(new TitleBarButtonsWidget()))
                    .child(new FlexContainer('row').id('center-center-container')
                        .child(new FlexContainer('column').id('center-center-pane')
                            .child(new FlexContainer('row').id('action-bar')
                                .child(new HistoryNavigationWidget())
                                .child(new TabCachingWidget(() => new NotePathsWidget()))
                                .child(new RunScriptButtonsWidget().hideInZenMode())
                                .child(new NoteTypeWidget().hideInZenMode())
                                .child(new NoteActionsWidget().hideInZenMode()))
                            .child(new FlexContainer('row').class('title-row')
                                .cssBlock('.title-row > * { margin: 5px; }')
                                .child(new NoteTitleWidget())
                            )
                            .child(new TabCachingWidget(() => new PromotedAttributesWidget()))
                            .child(new TabCachingWidget(() => new NoteDetailWidget()))
                            .child(...this.customWidgets.get('center-pane'))
                        )
                        .child(new SidePaneContainer('right')
                            .cssBlock(RIGHT_PANE_CSS)
                            .hideInZenMode()
                            .child(new NoteInfoWidget())
                            .child(new TabCachingWidget(() => new CalendarWidget()))
                            .child(new TabCachingWidget(() => new AttributesWidget()))
                            .child(new TabCachingWidget(() => new LinkMapWidget()))
                            .child(new TabCachingWidget(() => new NoteRevisionsWidget()))
                            .child(new TabCachingWidget(() => new SimilarNotesWidget()))
                            .child(new TabCachingWidget(() => new WhatLinksHereWidget()))
                            .child(...this.customWidgets.get('right-pane'))
                        )
                    )
                )
                .child(new SidePaneToggles().hideInZenMode())
            );
    }
}
