/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var RotateWorldTestScene = TestScene.extend({
    runThisTest:function () {
        var layer = RotateWorldMainLayer.create();
        this.addChild(layer);
        this.runAction(cc.RotateBy.create(4, -360));
        director.runScene(this);
    }
});

var SpriteLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    onEnter:function () {
        this._super();

        var x, y;

        var size = director.getWinSize();
        x = size.width;
        y = size.height;

        var sprite = cc.Sprite.create(s_pathGrossini);
        var spriteSister1 = cc.Sprite.create(s_pathSister1);
        var spriteSister2 = cc.Sprite.create(s_pathSister2);

        sprite.scale = 1.5;
        spriteSister1.scale = 1.5;
        spriteSister2.scale = 1.5;

        sprite.x = x / 2;
        sprite.y = y / 2;
        spriteSister1.x = 40;
        spriteSister1.y = y / 2;
        spriteSister2.x = x - 40;
        spriteSister2.y = y / 2;

        var rot = cc.RotateBy.create(16, -3600);

        this.addChild(sprite);
        this.addChild(spriteSister1);
        this.addChild(spriteSister2);

        sprite.runAction(rot);

        var jump1 = cc.JumpBy.create(4, cc.p(-400, 0), 100, 4);
        var jump2 = jump1.reverse();

        var rot1 = cc.RotateBy.create(4, 360 * 2);
        var rot2 = rot1.reverse();

        spriteSister1.runAction(cc.Repeat.create(cc.Sequence.create(jump2, jump1), 5));
        spriteSister2.runAction(cc.Repeat.create(cc.Sequence.create(jump1.clone(), jump2.clone()), 5));

        spriteSister1.runAction(cc.Repeat.create(cc.Sequence.create(rot1, rot2), 5));
        spriteSister2.runAction(cc.Repeat.create(cc.Sequence.create(rot2.clone(), rot1.clone()), 5));
    }
});

SpriteLayer.create = function () {
    return new SpriteLayer();
};

var TestLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    onEnter:function () {
        this._super();

        var x, y;

        var size = director.getWinSize();
        x = size.width;
        y = size.height;

        //cc.MutableArray *array = [UIFont familyNames];
        //for( cc.String *s in array )
        //	NSLog( s );
        var label = cc.LabelTTF.create("cocos2d", "Tahoma", 64);

        label.x = x / 2;
        label.y = y / 2;

        this.addChild(label);
    }
});

TestLayer.create = function () {
    return new TestLayer();
};

var RotateWorldMainLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    onEnter:function () {
        this._super();
        var x, y;

        var size = director.getWinSize();
        x = size.width;
        y = size.height;

        var blue = cc.LayerColor.create(cc.color(0, 0, 255, 255));
        var red = cc.LayerColor.create(cc.color(255, 0, 0, 255));
        var green = cc.LayerColor.create(cc.color(0, 255, 0, 255));
        var white = cc.LayerColor.create(cc.color(255, 255, 255, 255));

        blue.scale = 0.5;
        blue.x = -x / 4;
        blue.y = -y / 4;
        blue.addChild(SpriteLayer.create());

        red.scale = 0.5;
        red.x = x / 4;
        red.y = -y / 4;

        green.scale = 0.5;
        green.x = -x / 4;
        green.y = y / 4;
        green.addChild(TestLayer.create());

        white.scale = 0.5;
        white.x = x / 4;
        white.y = y / 4;

        this.addChild(blue, -1);
        this.addChild(white);
        this.addChild(green);
        this.addChild(red);

        var rot = cc.RotateBy.create(8, 720);

        blue.runAction(rot);
        red.runAction(rot.clone());
        green.runAction(rot.clone());
        white.runAction(rot.clone());
    }
});

RotateWorldMainLayer.create = function () {
    return new RotateWorldMainLayer();
};
