/**
 * 这个游戏参考flappybird，如你所见，里面的变量名都没有改
 * 我的这坨代码就像屎一样，如果你对本游戏感兴趣，可以去http://game.webxinxin.com/flappybird/下载原版学习
 * yzzz
 */



function timeDelay(time) {
var timeDelay=new Worker("../js/timeDelay.js");


}

var game = new Phaser.Game(645, 1135, Phaser.CANVAS, 'game');
game.States = {};

game.States.boot = function() {
    this.preload = function() {
        if(typeof(GAME) !== "undefined") {
            this.load.baseURL = GAME + "/";
        }
        if(!game.device.desktop){
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }
        game.load.image('loading', '../images/game1/preloader.gif');
    };
    this.create = function() {
        game.state.start('preload');
    };
};

game.States.preload = function() {
    this.preload = function() {
        var preloadSprite = game.add.sprite(34, game.height/2, 'loading');
        game.load.setPreloadSprite(preloadSprite);
        game.load.image('background', '../images/game1/bg1.jpg');
        game.load.image('ground', '../images/game1/ground.png');
        game.load.image('title', '../images/game1/title.png');
        game.load.spritesheet('bird', '../images/game1/bird.png', 180 , 180, 10);
        //学姐身体
        game.load.spritesheet('pipe3', '../images/game1/pipes3.png', 125 , 290, 8);
        game.load.spritesheet('okBody', '../images/game1/okBody.png', 151 , 97, 19);
        game.load.image('btn', '../images/game1/start-button.png');
        game.load.image('index', '../images/game1/go_back.png');
        game.load.spritesheet('pipe', '../images/game1/pipes.png', 150, 256, 2);
        game.load.spritesheet('pipe2', '../images/game1/pipes2.png', 150, 357, 2);
        game.load.bitmapFont('flappy_font', '../images/game1/flappyfont.png', '../images/game1/flappyfont.fnt');
        game.load.audio('fly_sound', '../images/game1/flap.mp3');
        //添加BGM
        game.load.audio('BGM1', '../images/game1/NyanCat.mp3');
        game.load.audio('score_sound', '../images/game1/score.wav');
        game.load.audio('hit_pipe_sound', '../images/game1/pipe-hit.wav');
        game.load.audio('hit_ground_sound', '../images/game1/ouch.wav');
        game.load.image('ready_text', '../images/game1/get-ready.png');
        game.load.image('play_tip', '../images/game1/instructions.png');
        game.load.image('game_over', '../images/game1/gameover.png');
        game.load.image('score_board', '../images/game1/scoreboard.png');
    };
    this.create = function() {
        game.state.start('menu');
    };
};

game.States.menu = function() {
    this.create = function() {
        var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        var ground = game.add.tileSprite(0, game.height-120, game.width, 120, 'ground');
        bg.autoScroll(-10 ,0);
        ground.autoScroll(-100 ,0);
        var titleGroup = game.add.group();

        titleGroup.create(0, 0, 'title');
        var bird = titleGroup.create(190, 140, 'bird');
        bird.animations.add('fly');
        bird.animations.play('fly', 12, true);
        titleGroup.x = 50;
        titleGroup.y = 100;
        //补间动画，标题上下浮动
        game.add.tween(titleGroup).to({y: 120}, 1000, null, true, 0, Number.MAX_VALUE, true);
        var btn = game.add.button(game.width/2, game.height/2, 'btn', function() {
            game.state.start('play');
        });
        var bntIndex = game.add.button(game.width/2, game.height/2+80, 'index', function() {
            window.location.href="index";
        });
        //锚点0.5，0。5表示根据图片中心居中
        btn.anchor.setTo(0.5, 0.5);
        bntIndex.anchor.setTo(0.5, 0.5);
    };
    this.render = function(){
        //屏幕上显示一些调试文字
        game.debug.text('谢邀', 10, 15);
        game.debug.text('素材来自网络，侵删', 10, 30);
        game.debug.text('本游戏仅用于学习Phaser引擎', 10, 45);
        game.debug.text('感谢Kritz献声', 10, 60);
        game.debug.text('1.4', 10, 75);
    }
};

game.States.play = function() {



    this.create = function() {
        this.bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        //?????????????
        this.pipeGroup = game.add.group();
        this.bonusGroup = game.add.group();
        //pipe物理
        this.pipeGroup.enableBody = true;


        this.ground = game.add.tileSprite(0, game.height-120, game.width, 120, 'ground');
        this.bird = game.add.sprite(50, 150, 'bird');
        this.bird.animations.add('fly');
        this.bird.animations.play('fly', 12, true);
        this.bird.anchor.setTo(0.71, 0.32);
        //添加物理碰撞

        game.physics.enable(this.bird,Phaser.Physics.ARCADE);
        //经测试告诉碰撞必须用矩形，否则穿模
        this.bird.body.setSize(50,50,100,25);
        //重力0，
        this.bird.body.gravity.y = 0;
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true;
        this.soundFly = game.add.sound('fly_sound');
        this.soundScore = game.add.sound('score_sound');
        this.soundHitPipe = game.add.sound('hit_pipe_sound');
        this.soundHitGround = game.add.sound('hit_ground_sound');
        this.soundBGM1 = game.add.sound('BGM1');
        this.scoreText = game.add.bitmapText(game.world.centerX - 20, 30, 'flappy_font', '0', 36);
        this.readyText = game.add.image(game.width/2, game.height/2-30, 'ready_text');
        this.playTip = game.add.image(game.width/2, 300, 'play_tip');
        this.readyText.anchor.setTo(0.5, 0);
        this.playTip.anchor.setTo(0.5, 0);
        this.hasStarted = false;
        //本来障碍物是按时间循环生产的，做了改进。
        // game.time.events.loop(2000, this.generatePipes, this);

        game.time.events.stop(false);
        game.input.onDown.addOnce(this.startGame, this);
    };

    this.render = function(){
        //game.debug.body用来显示每个物体的物理轮廓，具体显示为绿色的形状
        //对组中的每个物体开启物理轮廓
        // this.pipeGroup.forEach(function(pipe){
        //     game.debug.body(pipe);
        // });
        // this.bonusGroup.forEach(function(okBody){
        //     game.debug.body(okBody);
        // });
        // //对单个物体开启物理轮廓
        // game.debug.body(this.bird);
        // game.debug.body(this.ground);
        // game.debug.body(this.pipeGroup);

        //屏幕上显示一些调试文字
        // game.debug.text('素材来自网络，侵删', 10, 30);
        // game.debug.text('本游戏仅用于学习Phaser引擎', 10, 55);
    }


    this.update = function() {
        game.physics.arcade.collide(this.bird, this.ground, this.hitGround, null, this);
        if(!this.hasStarted) return;

        game.physics.arcade.overlap(this.bird,this.bonusGroup, this.getOKBody, null, this);
        game.physics.arcade.collide(this.bird, this.pipeGroup, this.hitPipe, null, this);
        if(!this.bird.inWorld) this.hitCeil();
        if(this.bird.angle < 30) this.bird.angle += 0.58;
        this.pipeGroup.forEachExists( this.checkScore, this);
        //让猫猫头居中.现在用速度控制，以后想换PId控制加速度，让运动轨迹好看。
        var distance=300-this.bird.x;
        if(this.bird.x<300){
            this.bird.body.velocity.x=(3+0.5*distance);
        }
    };
    this.generatePipes = function() {
        var gap = 200+200*Math.random();//上下间隙
        var topPipeY =-100+200*Math.random();
        var bottomPipeY = topPipeY + gap + 300;


        if(this.resetPipe(topPipeY, bottomPipeY)) return;
        var topPipe;
        var bottomPipe;

        var ran = Math.round(10*Math.random());
            console.log(ran);

        switch (ran) {
            case 0:

                this.createOkBody();

                 // break;
            case 1:

                // break;
            case 2:
                var pipe3 = this.pipeGroup.create(game.width, topPipeY+300, 'pipe3');
                pipe3.name="flag";
                pipe3.animations.add('head');
                pipe3.animations.play('head', 12, true);
                pipe3.body.setSize(70,250,25,10);
                pipe3.body.immovable=true;
                break;
            case 3:
                // break;
            case 4:
                // break;
            case 5:
                // break;
            case 6:
                console.log("ran");
                topPipe=game.add.sprite(game.width, topPipeY, 'pipe', 0, this.pipeGroup);
                topPipe.name="flag";
                bottomPipe=game.add.sprite(game.width, bottomPipeY, 'pipe', 1, this.pipeGroup);
                topPipe.body.setSize(100,250,30,10);
                bottomPipe.body.setSize(100,250,30,10);
                topPipe.body.immovable=true;
                bottomPipe.body.immovable=true;
                break;
            case 7:
                // break;
            case 8:
                // break;
            case 9:
                // break;
            case 10:
                topPipe=game.add.sprite(game.width, topPipeY, 'pipe2', 0, this.pipeGroup);
                topPipe.name="flag";
                bottomPipe=game.add.sprite(game.width, bottomPipeY, 'pipe2', 1, this.pipeGroup);
                topPipe.body.setSize(75,230,25,10);
                bottomPipe.body.setSize(75,230,20,114);
                topPipe.body.immovable=true;
                bottomPipe.body.immovable=true;
                break;
           default:;
        }
        //不懂，开启之后会重叠
        // this.pipeGroup.setAll('checkWorldBounds', true);
        this.pipeGroup.setAll('outOfBoundsKill', true);

        //障碍速度
        this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed-15*this.score);
        //多线程
        // timeDelay(5000);
    };
    //找到合适的身体会有奖励分，并且重力降低
    this.createOkBody = function()  {

        this.bonusGroup.enableBody = true;
        this.bonusGroup.setAll('outOfBoundsKill', true);
        this.bonusGroup.setAll('body.velocity.x', -100);
        var okBody = this.bonusGroup.create(game.width, 1000*Math.random(), 'okBody');
        okBody.animations.add('bodyrun');
        okBody.animations.play('bodyrun', 20, true);
        okBody.name="okBody";
    }
    this.startGame = function() {

        this.soundBGM1.play();
        this.gameSpeed = 200;
        this.gameIsOver = false;
        this.hasStarted = true;
        this.score = 0;
        this.bird.body.gravity.y = 1150;
        this.readyText.destroy();
        this.playTip.destroy();
        //初始障碍物，保证分数能改变
        this.generatePipes();
        this.bg.autoScroll(-this.gameSpeed/10, 0);
        this.ground.autoScroll(-this.gameSpeed, 0);
        game.input.onDown.add(this.fly, this);
        game.time.events.start();
    };
    this.stopGame = function() {

        this.bg.stopScroll();
        this.ground.stopScroll();
        this.pipeGroup.forEachExists(function(pipe) {
            pipe.body.velocity.x = 0;
        }, this);


        this.bonusGroup.forEachExists(function(pipe) {
            pipe.body.velocity.x = 0;
        }, this);

        this.bird.animations.stop('fly', 0);
        game.input.onDown.remove(this.fly, this);
        game.time.events.stop(true);
    };
    this.fly = function() {
        this.bird.body.velocity.y = -500;
        game.add.tween(this.bird).to({angle: -15}, 100+0.5*this.score, null, true, 0, 0, false);
        this.soundFly.play();
    };
    this.hitCeil = function() {
        this.soundHitPipe.play();
        this.gameOver(true);
    };
    this.hitPipe = function() {
        this.soundHitPipe.play();
        // this.gameOver();
    };
    this.hitGround = function() {
        // this.hasHitGround = true;
        // this.soundHitGround.play();
        // this.gameOver(true);
    };
    //奖励
    this.getOKBody = function() {
        // if(this.bird.body.gravity.y>=500)
        // this.bird.body.gravity.y-=500;
        // this.bg.autoScroll(-this.gameSpeed/10-this.score, 0);
        // this.ground.autoScroll(-this.gameSpeed-10*this.score, 0);
        // this.gameSpeed-=20;
        this.scoreText.text= (this.score+=10);
        this.bonusGroup.getByName("okBody").destroy();
    };
    this.gameOver = function(show_text) {
        this.hasStarted=false;
        this.soundBGM1.stop();
        this.gameIsOver = true;
        this.stopGame();
        if(show_text) this.showGameOverText();
    };
    this.showGameOverText = function() {
        this.scoreText.destroy();
        game.bestScore = game.bestScore || 0;
        if(this.score > game.bestScore) game.bestScore = this.score;
        this.gameOverGroup = game.add.group();
        var gameOverText = this.gameOverGroup.create(game.width/2, 0, 'game_over');
        var scoreboard = this.gameOverGroup.create(game.width/2, 70, 'score_board');
        var currentScoreText = game.add.bitmapText(game.width/2 + 60, 70+70, 'flappy_font', this.score+'', 40, this.gameOverGroup);
        var bestScoreText = game.add.bitmapText(game.width/2 + 60, 70+90+60, 'flappy_font', game.bestScore+'', 40, this.gameOverGroup);
        game.add.button(game.width/2-139, game.height/2+100, 'index', function() {
            window.location.href="index";
        });
        var replayBtn = game.add.button(game.width/2, game.height/2, 'btn', function() {
            game.state.start('play');
        }, this, null, null, null, null, this.gameOverGroup);
        gameOverText.anchor.setTo(0.5, 0);
        scoreboard.anchor.setTo(0.5, 0);
        replayBtn.anchor.setTo(0.5, 0);
        this.gameOverGroup.y = 30;
    };
    this.resetPipe = function(topPipeY, bottomPipeY) {
        var i = 0;
        this.pipeGroup.forEachDead(function(pipe) {
            if(pipe.y <= 0) {
                pipe.reset(game.width, topPipeY);
                pipe.hasScored = false;
            } else {
                pipe.reset(game.width, bottomPipeY);
            }
            pipe.body.velocity.x = -this.gameSpeed;
            i++;
        }, this);
        return i == 2;
    };
    this.checkScore = function(pipe) {
        if(!pipe.hasScored && pipe.name=="flag"  &&pipe.x <= 30 ) {
            pipe.hasScored = true;
            this.scoreText.text = ++this.score;
            this.generatePipes();
            this.soundScore.play();
            //加速猫猫头速度
            this.bird.body.gravity.y += 40;
            //加速背景滚动
            this.bg.autoScroll(-this.gameSpeed/10-this.score, 0);
            this.ground.autoScroll(-this.gameSpeed-10*this.score, 0);
            return true;
        }
        return false;
    };
};

game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('menu', game.States.menu);
game.state.add('play', game.States.play);

game.state.start('boot');