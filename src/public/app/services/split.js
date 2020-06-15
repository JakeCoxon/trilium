import options from "./options.js";

let instance1, instance2;

function setupSplit(left, right) {
    if (instance1) {
        instance1.destroy();
        instance1 = null;
    }
    if (instance2) {
        instance2.destroy();
        instance2 = null;
    }

    if (!left && !right) {
        $("#center-pane").css('width', '100%');

        return;
    }

    const leftPaneWidth = options.getInt('leftPaneWidth') || 0;
    const rightPaneWidth = options.getInt('rightPaneWidth') || 0;

    if (left) {
        instance1 = Split(['#left-pane', '#center-pane'], {
            sizes: [leftPaneWidth, 100 - leftPaneWidth],
            gutterSize: 5,
            onDragEnd: sizes => {
                // const a = $('#left-pane').css('width');
                // $('#left-pane').css('width', a);
                // $('#center-pane').css('width', `calc(100% - ${a})`);
                options.save('leftPaneWidth', Math.round(sizes[0]));
            }
        });
    }
    if (right) {
        instance2 = Split(['#center-center-pane', '#right-pane'], {
            sizes: [100 - rightPaneWidth, rightPaneWidth],
            gutterSize: 5,
            onDragEnd: sizes => {
                options.save('rightPaneWidth', Math.round(sizes[1]));
            }
        });
        console.log({instance2})
    }
}

export default {
    setupSplit
};