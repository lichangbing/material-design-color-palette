var onRun = function(context) {
    // Require library files
    @import 'lib/colors.js'
    @import 'lib/functions.js'

    var doc = context.document;

    // Get current canvas
    var page = doc.currentPage();
    var artboard = doc.currentPage().currentArtboard();
    var canvas = artboard ? artboard : page;

    // Delete 'All Colors'
    COLORS.pop();

    var choice = createSelect('Select a primary color', COLORS, 0);
    var choiceCode = choice[0];
    var colorIndex = choice[1];

    if (isSelected(choiceCode)) {
        var primaryColorName = COLORS[colorIndex];
        var primaryColorSet = COLOR_SETS[colorIndex];

        var secondChoice = createSelect('Select an accent color', COLORS, 0);
        var secondChoiceCode = secondChoice[0];
        var secondColorIndex = secondChoice[1];

        if (isSelected(secondChoiceCode)) {
            var accentColorName = COLORS[secondColorIndex];
            var accentColorSet = COLOR_SETS[secondColorIndex];

            var swatchesGroup = createGroup({
                parent: canvas,
                name: primaryColorName + ' x ' + accentColorName,
                x: 0, y: 0,
                width: 400, height: 200
            });

            var swatches = [];

            // Dark Primary Color, Primary Color, Light Primary Color
            swatches.push(primaryColorSet[7], primaryColorSet[5], primaryColorSet[1]);
            // Text / Icons
            if (swatches[1][1]  === 1) {
                swatches.push(['#FFFFFF', 0]);
            } else {
                swatches.push(['#212121', 1]);
            }
            // Accent Color
            if (accentColorSet[11]) {
                swatches.push(accentColorSet[11]);
            } else {
                swatches.push(accentColorSet[5]);
            }
            // Primary Text, Secondary Text, Divider Color
            swatches.push(['#212121', 1], ['#727272', 1], ['#B6B6B6', 1]);

            swatches.forEach(function (colorSet, i) {
                addSwatch(colorSet[0], i, colorSet[1]);
            });
        }
    }
};
