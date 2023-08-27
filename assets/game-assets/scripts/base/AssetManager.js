export let AssetManager = null;
cc.Class({
    extends: cc.Component,

    properties: {
        spin_sym_bomb: cc.SpriteFrame,
        spin_sym_bottle: cc.SpriteFrame,
        spin_sym_box: cc.SpriteFrame,
        spin_sym_hat: cc.SpriteFrame,
        spin_sym_horse: cc.SpriteFrame,
        spin_sym_horseshoe: cc.SpriteFrame,
        spin_sym_money: cc.SpriteFrame,
        spin_sym_pipe: cc.SpriteFrame,
        spin_sym_rope: cc.SpriteFrame,
        spin_sym_scatter: cc.SpriteFrame,
        spin_sym_wheel: cc.SpriteFrame,
        spin_sym_wild: cc.SpriteFrame,
        sym_bomb: cc.SpriteFrame,
        sym_bottle: cc.SpriteFrame,
        sym_box: cc.SpriteFrame,
        sym_hat: cc.SpriteFrame,
        sym_horse: cc.SpriteFrame,
        sym_horseshoe: cc.SpriteFrame,
        sym_money: cc.SpriteFrame,
        sym_pipe: cc.SpriteFrame,
        sym_rope: cc.SpriteFrame,
        sym_scatter: cc.SpriteFrame,
        sym_wheel: cc.SpriteFrame,
        sym_wild: cc.SpriteFrame,

        btn_spin_default: cc.SpriteFrame,
        btn_stop_default: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        AssetManager = this;
        
    },

    start () {
        
    },

    // update (dt) {},
});
