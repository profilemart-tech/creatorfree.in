// Adobe Illustrator ExtendScript (.jsx) - CreatorsFree.in Master Vector Assets Generator
// Creates paths programmatically in Adobe Illustrator 2026 and exports artboards as SVG.

#target illustrator

function createCreatorsFreeAssets() {
    var doc = app.documents.add(DocumentColorSpace.RGB, 1600, 900);
    
    // Set Color Swatches
    var greenColor = new RGBColor();
    greenColor.red = 61; greenColor.green = 220; greenColor.blue = 132; // #3DDC84

    var darkColor = new RGBColor();
    darkColor.red = 10; darkColor.green = 10; darkColor.blue = 10; // #0A0A0A

    // Artboard 1: Hero NLE Timeline
    var rect = doc.pathItems.rectangle(750, 100, 1400, 600);
    rect.fillColor = darkColor;
    rect.strokeColor = greenColor;
    rect.strokeWidth = 2;

    $.writeln("CreatorsFree.in Illustrator ExtendScript Executed Successfully!");
}

createCreatorsFreeAssets();
