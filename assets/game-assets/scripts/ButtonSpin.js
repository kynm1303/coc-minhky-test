import { BaseButton } from "./base/BaseButton";
import { GameManager } from "./base/GameManager";
import { Utils } from "./utils/utils";

const ButtonState = {
    SPIN: 0,
    STOP: 1,
}

cc.Class({
    extends: BaseButton,

    properties: {
    },

    start () {
    },

    onMouseUp: function (event) {
        this._super(event);
        GameManager.reelSpin();
    },

    // update (dt) {},
});
