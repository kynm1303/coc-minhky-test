export const Utils = Utils || {};

Utils.distance = function (pos1, pos2) {
    var a = pos1.x - pos2.x;
    var b = pos1.y - pos2.y;

    return Math.sqrt(a * a + b * b);
}

Utils.randomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

Utils.setNodeSprite = function (node, spriteFrame) {
    if (node == null) return;
    if (spriteFrame == null) return;

    const nodeSprite = node.getComponent("Sprite");
    if (nodeSprite == null) return;
    nodeSprite.spriteFrame = spriteFrame;
}