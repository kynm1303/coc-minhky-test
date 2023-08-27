export const BaseButton = cc.Class({
    extends: cc.Component,

    properties: {
        Enable: true,
        Bg: cc.Sprite,
        disabledSprite: cc.SpriteFrame,
        hoverSprite: cc.SpriteFrame,
        normalSprite: cc.SpriteFrame,
        pressedSprite: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setEnabled(this.Enable);
    },

    onMouseDown: function (event) {
        event.stopPropagation();
        this.Bg.spriteFrame = this.pressedSprite;
    },
    
    onMouseUp: function (event) {
        event.stopPropagation();
        this.Bg.spriteFrame = this.normalSprite;
    },
    
    onMouseEnter: function (event) {
        event.stopPropagation();
        this.Bg.spriteFrame = this.hoverSprite;
    },

    onMouseLeave: function (event) {
        event.stopPropagation();
        this.Bg.spriteFrame = this.normalSprite;
    },

    setEnabled: function (isEnable) {
        if (isEnable) {
            this.node.on("mousedown", this.onMouseDown, this);
            this.node.on("mouseenter", this.onMouseEnter, this);
            this.node.on("mouseleave", this.onMouseLeave, this);
            this.node.on("mouseup", this.onMouseUp, this);
            this.Bg.spriteFrame = this.normalSprite;
        } else {
            this.node.off("mousedown", this.onMouseDown, this);
            this.node.off("mouseenter", this.onMouseEnter, this);
            this.node.off("mouseleave", this.onMouseLeave, this);
            this.node.off("mouseup", this.onMouseUp, this);
            this.Bg.spriteFrame = this.disabledSprite;
        }
    },

    start () {

    },

    // update (dt) {},
});
