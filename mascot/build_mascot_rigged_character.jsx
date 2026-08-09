// Adobe Illustrator ExtendScript (.jsx) - CreatorsFree Mascot Rigged Character
// Programmatically builds all 13 separate named layers in Adobe Illustrator 2026 for After Effects rigging.

#target illustrator

function buildRiggedMascot() {
    var doc = app.documents.add(DocumentColorSpace.RGB, 1000, 1000);
    
    var layerNames = [
        "Head_Back", "Ear_Left", "Ear_Right", "Head_Front",
        "Eyebrow_Left", "Eyebrow_Right", "Eye_Left", "Eye_Right",
        "Nose", "Mouth_Neutral", "Mouth_Smile", "Mouth_Open", "Torso",
        "Arm_Upper_Left", "Arm_Lower_Left", "Hand_Left",
        "Arm_Upper_Right", "Arm_Lower_Right", "Hand_Right",
        "Leg_Upper_Left", "Leg_Lower_Left", "Foot_Left",
        "Leg_Upper_Right", "Leg_Lower_Right", "Foot_Right", "Accessory"
    ];

    for (var i = 0; i < layerNames.length; i++) {
        var newLayer = doc.layers.add();
        newLayer.name = layerNames[i];
    }

    $.writeln("CreatorsFree Mascot Character Rigged ExtendScript Executed Successfully!");
}

buildRiggedMascot();
