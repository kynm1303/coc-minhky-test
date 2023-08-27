import Item from "./Item";
import { GameManager } from "./base/GameManager";
import { ItemConfig } from "./config/ItemConfig";

export const ReelState = cc.Enum({
    SPIN: 0,
    STOP: 1,
})

export default Reel = cc.Class({
    extends: cc.Component,
    index: 0,
    initSize: null,
    reelState: null,
    spawnInterval: null,
    spinDelay: null,
    spinTimeMax: null,

    properties: {
        ItemPrefab: cc.Prefab,
        DesPos: cc.Node,
        StartPos: cc.Node,
        Mask: cc.Node,
        FirstPos: cc.Node,
        SecondPos: cc.Node,
        ThirdPos: cc.Node,
    },

    start() {
        this.initSize = 6;
        this.spinTimeMax = 1.5;
        this.spawnInterval = 155 / ItemConfig.SCROLL_SPEED;
        this.spinDelay = 0;
        this.reelState = ReelState.STOP;
        this.initItems();
        this.init3Items();
    },

    initItems() {
        this.items = [];
        for (let i = 0; i < this.initSize; i++) {
            this.createItem();
        }
    },

    /**
    * @returns {Item}
    */
    createItem: function () {
        cc.log("createItem");

        const gameObject = cc.instantiate(this.ItemPrefab);
        gameObject.active = false;
        this.Mask.addChild(gameObject);

        const item = gameObject.getComponent(Item);
        item.setItemActive(false);
        this.items.push(item);

        return item;
    },

    /**
    * @returns {Item}
    */
    getItem: function () {
        let item = this.items.find((item) => item.itemActive == false);
        if (item == null) {
            item = this.createItem();
        }
        return item;
    },

    /**
    * @returns {Item}
    */
    spawnItem: function () {
        cc.log("Spawn Object");
        const newItem = this.getItem();
        newItem.desPos = this.DesPos.getPosition();
        newItem.setItemActive(true);
        newItem.loadRandomConfig();
        
        newItem.node.setPosition(this.StartPos.getPosition());
        newItem.node.active = true;

        return newItem;
    },

    spin3Items: function () {
        this.currentItems.forEach(item => {
            item.itemBounce(ItemConfig.BOUNCE_TIME, this.spinDelay, 40);
            this.scheduleOnce(function (item) {
                item.desPos = this.DesPos.getPosition();
                item.spin();
            }.bind(this, item), this.spinDelay + ItemConfig.BOUNCE_TIME);
        });
        this.currentItems = [];
    },

    setReelState: function (reelState) {
        cc.log("setReelState: ", ReelState[reelState]);
        switch (reelState) {
            case ReelState.SPIN:
                this.currentTime = this.spawnInterval - this.spinDelay - ItemConfig.BOUNCE_TIME;
                this.spin3Items();
                this.stopCallback = this.reelStop.bind(this);
                this.scheduleOnce(this.stopCallback, this.spinTimeMax + this.spinDelay * 3);
                break;
            case ReelState.STOP:
                // change state from SPIN to STOP
                if (this.reelState == ReelState.SPIN) {
                    this.handle3Items();
                }
                this.unschedule(this.stopCallback);
                break;
        }
        this.reelState = reelState;
    },

    handle3Items: function () {
        let activeItems = this.items.filter((item) => item.itemActive == true);
        activeItems.sort((item1, item2) => item2.node.getPosition().y - item1.node.getPosition().y);

        activeItems[0].desPos = this.FirstPos.getPosition();
        activeItems[0].spin(false);
        this.currentItems.push(activeItems[0]);

        activeItems[1].desPos = this.SecondPos.getPosition();
        activeItems[1].spin(false);
        this.currentItems.push(activeItems[1]);

        activeItems[2].desPos = this.ThirdPos.getPosition();
        activeItems[2].spin(false);
        this.currentItems.push(activeItems[2]);
    },

    init3Items: function () {
        this.currentItems = [];

        let newItem = this.spawnItem();
        this.currentItems.push(newItem);
        newItem.node.setPosition(this.FirstPos.getPosition());

        newItem = this.spawnItem();
        this.currentItems.push(newItem);
        newItem.node.setPosition(this.SecondPos.getPosition());

        newItem = this.spawnItem();
        this.currentItems.push(newItem);
        newItem.node.setPosition(this.ThirdPos.getPosition());
    },

    reelSpin: function (delay) {
        if (this.reelState == ReelState.SPIN) return;
        this.spinDelay = delay;
        this.setReelState(ReelState.SPIN);
    },

    reelStop: function () {
        this.setReelState(ReelState.STOP);
        GameManager.checkForStopReel();
    },

    update(dt) {
        if (this.reelState == ReelState.SPIN) {
            if (this.currentTime > this.spawnInterval) {
                const newItem = this.spawnItem();
                newItem.spin();
                this.currentTime = 0;
            }
            this.currentTime += dt;
        }
    },

    onRestore: function () {
        this.DesPos = this.node.getChildByName('DesPos');
        this.StartPos = this.node.getChildByName('StartPos');
        this.Mask = this.node.getChildByName('Mask');
        this.FirstPos = this.node.getChildByName('FirstPos');
        this.SecondPos = this.node.getChildByName('SecondPos');
        this.ThirdPos = this.node.getChildByName('ThirdPos');
    },
});