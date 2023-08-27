import Reel from "../Reel";
import { ReelState } from "../Reel";
import { ItemConfig } from "../config/ItemConfig";
import { BaseButton } from "./BaseButton";
export let GameManager = null;

export const GameState = {
    SPIN: 0,
    STOP: 1
}

cc.Class({
    extends: cc.Component,
    delayBetweenReel: null,
    properties: {
        Reels: {
            default: [],
            type: [Reel],
        },
        buttonSpin: cc.Button,
        buttonStop: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        GameManager = this;
        this.delayBetweenReel = 0.12;
    },

    start() {
        this.setGameState(GameState.STOP);
    },

    setGameState: function (gameState) {
        cc.log("setGameState:", gameState);
        this.buttonSpin.node.active = false;
        this.buttonStop.node.active = false;
        switch (gameState) {
            case GameState.SPIN:
                this.buttonStop.node.active = true;
                break;
            case GameState.STOP:
                this.buttonSpin.node.active = true;
                break;
        }
        this.gameState = gameState;
    },

    reelSpin: function () {
        this.setGameState(GameState.SPIN);

        // disable button stop for a while
        this.buttonStop.interactable = (false);
        this.scheduleOnce(function () {
            this.buttonStop.interactable = (true);
        }.bind(this), (this.Reels.length - 1) * this.delayBetweenReel + ItemConfig.BOUNCE_TIME);

        let delayTime = 0;
        for (let reel of this.Reels) {
            reel.reelSpin(delayTime);
            delayTime += this.delayBetweenReel;
        };
    },

    stopAllReels: function () {
        this.setGameState(GameState.STOP);
        for (let reel of this.Reels) {
            reel.reelStop();
        };
    },

    checkForStopReel: function () {
        for (let reel of this.Reels) {
            if (reel.reelState == ReelState.SPIN)
                return;
        }
        // all reel has been stopped
        this.setGameState(GameState.STOP);
    },
    // update (dt) {},
});
