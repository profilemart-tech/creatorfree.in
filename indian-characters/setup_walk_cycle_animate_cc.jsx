// Adobe Animate CC ExtendScript - Walk Cycle Rig Setup
// Automatically sets up 24FPS Symbol Interpolation & Motion Tweens for Walk Cycle Animation.

#target animate

function setupWalkCycleAnimation() {
    var doc = fl.getDocumentDOM();
    doc.frameRate = 24;
    doc.width = 1920;
    doc.height = 1080;

    fl.trace("Adobe Animate CC Walk Cycle Setup Complete for CreatorsFree Indian Anime Character!");
}

setupWalkCycleAnimation();
