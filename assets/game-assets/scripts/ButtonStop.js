// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseButton } from "./base/BaseButton";
import { GameManager } from "./base/GameManager";

cc.Class({
    extends: BaseButton,

    properties: {
    },

    onMouseUp: function (event) {
        this._super(event);
        GameManager.stopAllReels();
    },

    start () {

    },

    // update (dt) {},
});