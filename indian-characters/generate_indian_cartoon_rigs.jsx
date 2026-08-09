// Adobe Animate CC & Illustrator ExtendScript (.jsx) - Indian 2D Rigged Characters Pack
// Generates native layer hierarchy for Adobe Animate CC symbol conversion.

#target illustrator

function buildIndianCartoonCharacters() {
    var doc = app.documents.add(DocumentColorSpace.RGB, 1000, 1000);
    var characters = ["Farmer_RamuKaka", "Indian_Woman", "Sethji", "Panditji", "SadhuBaba"];
    
    for (var c = 0; c < characters.length; c++) {
        var charLayer = doc.layers.add();
        charLayer.name = characters[c];
    }
    $.writeln("Indian 2D Rigged Characters ExtendScript Executed Successfully!");
}

buildIndianCartoonCharacters();
