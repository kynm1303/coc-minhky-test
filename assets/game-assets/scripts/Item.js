import { AssetManager } from "./base/AssetManager";
import { ResManager } from "./base/ResController";
import { ItemConfig } from "./config/ItemConfig";
import { Utils } from "./utils/utils";
// import { ItemConfig } from "./config/ItemConfig";

export const ItemState = {
    SPIN: 0,
    STOP: 1
}

export default Item = cc.Class({
    extends: cc.Component,
    itemState: null,
    desPos: null,
    itemActive: false,
    properties: {
        clearSprite: cc.Sprite,
        blurSprite: cc.Sprite,
        cellBorder: cc.Node,
        debugLabel: cc.Label,
    },

    onLoad() {
        this.setItemState(ItemState.STOP);
        this.debugLabel.string = this.node.uuid.toString();
    },

    start() {
    },

    setItemState: function (itemState) {
        this.blurSprite.node.active = (false);
        this.clearSprite.node.active = (false);
        this.cellBorder.active = (false);
        switch (itemState) {
            case ItemState.SPIN:
                this.blurSprite.node.active = (true);
                break;
            case ItemState.STOP:
                this.clearSprite.node.active = (true);
                break;
            default:
                this.blurSprite.node.active = (true);
                this.clearSprite.node.active = (true);
                this.cellBorder.active = (true);
        }
        this.itemState = itemState;
    },

    spin: function (isDestroy) {
        this.setItemState(ItemState.SPIN);
        this.node.stopAllActions();
        const speed = ItemConfig.SCROLL_SPEED;
        const duration = Utils.distance(this.desPos, this.node.getPosition()) / speed;
        if (isDestroy == null) isDestroy = true;
        let callFunc = null;
        if (isDestroy) {
            callFunc = cc.callFunc(this.spinEndCallback.bind(this))
        } else {
            callFunc = cc.callFunc(function () { 
                this.itemBounce(ItemConfig.BOUNCE_TIME, 0, -40, function () {
                    this.setItemState(ItemState.STOP) 
                }.bind(this), true)
            }.bind(this));
        }

        this.node.runAction(
            cc.sequence(
                cc.moveTo(duration, this.desPos),
                callFunc
            )
        );
    },

    setItemActive: function (isActive) {
        this.itemActive = isActive;
        // this.debugLabel.string = isActive.toString();
    },

    itemBounce: function (bounceTime, delay, delta, callback, isBounceBack) {
        const posTo = this.node.getPosition();
        posTo.y += delta;
        let callFunc = (callback == null) ? cc.callFunc() : cc.callFunc(callback);
        let bounceBack = (isBounceBack) ? cc.moveTo(bounceTime, this.node.getPosition()) : cc.callFunc();
        this.node.runAction(
            cc.sequence(
                cc.delayTime(delay),
                cc.moveTo(bounceTime, posTo),
                bounceBack,
                callFunc,
            )
        )
    },

    getResByType: function (index) {
        return ItemConfig.res[index];
    },

    loadRandomConfig: function () {
        const index = Utils.randomInt(0, ItemConfig.res.length);
        const res = this.getResByType(index);
        this.clearSprite.spriteFrame = AssetManager[res.clear];
        this.blurSprite.spriteFrame = AssetManager[res.spin];
    },

    spinEndCallback: function () {
        this.setItemActive(false);
        this.node.active = false;
    },
});