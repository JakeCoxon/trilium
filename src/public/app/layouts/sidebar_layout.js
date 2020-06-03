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
import SidePaneToggles from "../widgets/side_pane_toggles.js";

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


#left-pane {
    background: hsl(63, 14%, 95%);
    color: #525252;

    /* darkmode sidebar */
    /*background: hsla(-119, 5%, 26%, 1);
    color: hsla(62, 7%, 91%, 0.4);*/

    padding: 8px;
}

.global-menu-wrapper {
    border: 0;
}
.global-menu button.btn {
    border: 0;
    background: 0;
}
.note-tab-row {
    background: hsla(41, 30%, 96%, 1);
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
    max-width: 600px;
    margin: auto;
}
.note-title {
    margin-left: 0;
    margin-bottom: 16px;
}

.note-detail-text-editor > p,
.note-detail-text-editor > h1,
.note-detail-text-editor > h2,
.note-detail-text-editor > h3,
.note-detail-text-editor > h4,
.note-detail-text-editor > blockquote,
.note-detail-text-editor > ul,
.note-detail-text-editor > ol
{
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.note-detail-text-editor > p {
    margin-bottom: 0.6rem;
}

.fancytree-node:not(.fancytree-folder) .fancytree-expander:before {
    color: inherit;
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
                    .child(appContext.mainTreeWidget)
                    .child(...this.customWidgets.get('left-pane'))
                )
                .child(new FlexContainer('column').id('center-pane')
                    .child(new FlexContainer('row')
                        .child(new TabRowWidget())
                        .child(new TitleBarButtonsWidget()))
                    // .child(new StandardTopWidget()
                    //     .hideInZenMode())
                    .child(new FlexContainer('row')
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
                .child(new SidePaneToggles().hideInZenMode())
            );
    }
}
