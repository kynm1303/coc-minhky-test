export const ResManager = {};

const resBasePath = "textures/";

ResManager.res = {
    spin_sym_bomb: "spin-sym-bomb.png",
    spin_sym_bottle: "spin-sym-bottle.png",
    spin_sym_box: "spin-sym-box.png",
    spin_sym_hat: "spin-sym-hat.png",
    spin_sym_horse: "spin-sym-horse.png",
    spin_sym_horseshoe: "spin-sym-horseshoe.png",
    spin_sym_money: "spin-sym-money.png",
    spin_sym_pipe: "spin-sym-pipe.png",
    spin_sym_rope: "spin-sym-rope.png",
    spin_sym_scatter: "spin-sym-scatter.png",
    spin_sym_wheel: "spin-sym-wheel.png",
    spin_sym_wild: "spin-sym-wild.png",
    sym_bomb: "sym-bomb.png",
    sym_bottle: "sym-bottle.png",
    sym_box: "sym-box.png",
    sym_hat: "sym-hat.png",
    sym_horse: "sym-horse.png",
    sym_horseshoe: "sym-horseshoe.png",
    sym_money: "sym-money.png",
    sym_pipe: "sym-pipe.png",
    sym_rope: "sym-rope.png",
    sym_scatter: "sym-scatter.png",
    sym_wheel: "sym-wheel.png",
    sym_wild: "sym-wild.png",
}

ResManager.loadResource = function (node, path) {
    cc.loader.loadRes(resBasePath + path, cc.SpriteFrame, function (err, spriteFrame) {
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
} 