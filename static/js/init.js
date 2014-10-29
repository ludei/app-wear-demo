/**
 * Created by Ludei on 23/05/14.
 */

(function () {

    window.wereable = window.wereable || {};

    wereable.status = {
        WEATHER     : 0,
        HEART       : 1,
        DEPARTURES  : 2
    };

    wereable.currentStatus = wereable.status.WEATHER;


    function createCanvas() {

        // game size
        var size = {sW:420, sH:420 };
        // director
        var director= new CAAT.Director().
            initialize(size.sW,size.sH, document.getElementsByTagName("canvas")[0]).
            setClear(false);

        if ( navigator.isCocoonJS ) {
            director.enableResizeEvents( CAAT.Foundation.Director.RESIZE_STRETCH );
        } else {
            director.enableResizeEvents( CAAT.Foundation.Director.RESIZE_PROPORTIONAL );
        }

        var container = document.getElementById("container");
        var canvas = document.getElementsByTagName("canvas")[0];
        container.style.width = canvas.width + "px";
        container.style.height = canvas.height + "px";

        return director;
    }

    function createWeatherDemoScreen (director , appScene, mainContainer){

        //// container
        var weatherContainer = new CAAT.Foundation.ActorContainer()
            .setFillStyle('#f1AAAA')
            .setGlobalAnchor(0,0.5)
            .setScale(1,1)
            .setBounds(0 ,mainContainer.height/2,mainContainer.width/3,mainContainer.height)
            .enableEvents(false);

        mainContainer.addChild(weatherContainer);

        //// bg images
        var imagesContainer = new CAAT.Foundation.ActorContainer()
            .setGlobalAnchor(0,0.5)
            .setScale(1,1)
            .setFillStyle('#f1AAAA')
            .setBounds(0,mainContainer.height/2,weatherContainer.width,weatherContainer.height)
            .enableEvents(false);
        weatherContainer.addChild(imagesContainer);

        var createBackgroundImage = function (name){

            return new CAAT.Actor().
                setBackgroundImage( director.getImage(name), false ).
                setGlobalAnchor(0.5,0.5).
                enableEvents(false).
                setSize(imagesContainer.width,imagesContainer.height).
                setLocation(imagesContainer.width * 0.5, imagesContainer.height * 0.5).
                setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);

        };

        var bgImags = [];
        bgImags.push(createBackgroundImage("weather_bg1"));
        bgImags.push(createBackgroundImage("weather_bg2"));
        bgImags.push(createBackgroundImage("weather_bg3"));

        for(var i = 0; i<bgImags.length; i++){
            imagesContainer.addChild(bgImags[i]);
        }

        var zOrder = 10;
        var currentImageShown = 0;
        var changeImageWithAlpha = function ( bgImags ){

            bgImags[currentImageShown].setAlpha(0);
            imagesContainer.setZOrder(bgImags[currentImageShown],zOrder);
            zOrder++;

            var ab = new CAAT.Behavior.AlphaBehavior().
                setDelayTime(0, 1000).
                setValues(0, 1);

            bgImags[currentImageShown].addBehavior(ab);

            currentImageShown ++;
            if(currentImageShown>=bgImags.length)currentImageShown = 0;

        };

        setInterval(function(){
            changeImageWithAlpha(bgImags)
        }, 4 * 1000);

        //// location texts
        var tContainer = new CAAT.Foundation.ActorContainer()
            .setBackgroundImage( director.getImage('txtbackground'), false )
            .setGlobalAnchor(0.5,1)
            .setScale(1,1)
            .setBounds(weatherContainer.width/2 ,weatherContainer.height * 1.5,weatherContainer.width * 0.9,weatherContainer.height * 0.35)
            .setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE)
            .enableEvents(false);
        weatherContainer.addChild(tContainer);

        var font_time = UtilModule.createFont('"Roboto-light"',96,"#fff");
        var lt1 = new CAAT.Foundation.UI.TextActor().
            setFont(font_time).
            setText(UtilModule.getTime(false)).
            calcTextSize(director).
            enableEvents(false).
            setLineWidth(1).
            setLocation(48, -120).
            cacheAsBitmap();

        var font_zone = UtilModule.createFont('"Nexa-thin"',28,"#fff");
        var lt2 = new CAAT.Foundation.UI.TextActor().
            setFont(font_zone).
            setText('California').
            calcTextSize(director).
            enableEvents(false).
            setLineWidth(1).
            setLocation(52, -70).
            cacheAsBitmap();

        weatherContainer.addChild(lt1);
        weatherContainer.addChild(lt2);

        //// temperature
        var temperature = new CAAT.Actor().
            setBackgroundImage( director.getImage('degrees'), false ).
            setGlobalAnchor(0,0.5).
            enableEvents(false).
            setLocation(30,tContainer.height/2).
            setSize(director.getImage('degrees').width, director.getImage('degrees').height).
            setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);
        tContainer.addChild(temperature);

        //// sun image
        var sun1 = new CAAT.Actor().
            setBackgroundImage( director.getImage('sun'), false ).
            setGlobalAnchor(0.5,0.5).
            enableEvents(false).
            setLocation(tContainer.width * 0.78, tContainer.height * 0.50).
            setSize(director.getImage('sun').width,director.getImage('sun').height).
            setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);
        tContainer.addChild(sun1);

        //// show elements when appScene is activated
        appScene.activated = function () {
            lt1.moveTo(48, 15, 200, 300, new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
            lt2.moveTo(52, 130, 200, 300, new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
            tContainer.moveTo(weatherContainer.width/2 ,weatherContainer.height - 20,500,500,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
        };

        //// update time
        setInterval(function (){
            lt1.setText(UtilModule.getTime(false));
        },5 * 1000);

    }

    function createLudeiLogoDemoScreen (director , mainContainer){

        var offsetX = director.width;

        //// container
        var logoContainer = new CAAT.Foundation.ActorContainer()
            .setBackgroundImage( director.getImage('background'), false )
            .setGlobalAnchor(0,0.5)
            .setScale(1,1)
            .setBounds(offsetX ,mainContainer.height/2,mainContainer.width/3,mainContainer.height)
            .enableEvents(false);

        mainContainer.addChild(logoContainer);

        //// logo
        var logo = new CAAT.Actor().
            setBackgroundImage( director.getImage('logo'), false ).
            setGlobalAnchor(0.5,0.5).
            enableEvents(false).
            setLocation(logoContainer.width * 0.5, logoContainer.height * 0.35).
            setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);

        var sW = logoContainer.width * 0.5;
        var sH = (sW/director.getImage('logo').width) * director.getImage('logo').height;
        logo.setSize(sW,sH);

        logoContainer.addChild(logo);

        //// logo behavior
        var cb = new CAAT.Behavior.ContainerBehavior()
            .setCycle(true)
            .setDelayTime(0,1200);

        var sb1= new CAAT.Behavior.ScaleBehavior().
            setDelayTime(0,800).
            setValues( 0.6, 0.8, 0.6, 0.8 ).
            setInterpolator(
            new CAAT.Behavior.Interpolator().createExponentialOutInterpolator(2,true));

        var sb2= new CAAT.Behavior.ScaleBehavior().
            setDelayTime(800,400).
            setValues( 0.6, 0.7, 0.6, 0.7 ).
            setInterpolator(
            new CAAT.Behavior.Interpolator().createExponentialOutInterpolator(2,true));

        cb.addBehavior(sb1);
        cb.addBehavior(sb2);
        logo.addBehavior(cb);

        //// bpm container
        var bContainer = new CAAT.Foundation.ActorContainer()
            .setBackgroundImage( director.getImage('txtbackground'), false )
            .setGlobalAnchor(0.5,1)
            .setScale(1,1)
            .setBounds(logoContainer.width/2 ,logoContainer.height - 20,logoContainer.width * 0.9,logoContainer.height * 0.25)
            .setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE)
            .enableEvents(false);

        logoContainer.addChild(bContainer);

        //// signal
        var signal = new CAAT.Actor().
            setBackgroundImage( director.getImage('signal'), false ).
            setGlobalAnchor(0.5,0.5).
            enableEvents(false).
            setLocation(bContainer.width * 0.88,0).
            setSize(director.getImage('signal').width,director.getImage('signal').height).
            setScale(0.9,0.9).
            setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);

        bContainer.addChild(signal);

        //// bpm text

        var font_nexa_bold= new CAAT.Module.Font.Font().
            setFont('"Nexa-bold"').
            setFontSize(60,"px").
            setFillStyle( "#4b4547" ).
            createDefault(2);

        var font_nexa_light_1= new CAAT.Module.Font.Font().
            setFont('"Nexa-light"').
            setFontSize(20,"px").
            setFillStyle( "#919191" ).
            createDefault(1);

        var bpm1 = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_bold).
            setText('67').
            calcTextSize(director).
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(bContainer.width * 0.57,20).
            cacheAsBitmap();

        var bpm2 = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_light_1).
            setText('bpm').
            calcTextSize(director).
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(bContainer.width * 0.8,61).
            cacheAsBitmap();

        bContainer.addChild(bpm1);
        bContainer.addChild(bpm2);

        //// interval
        setInterval(function(){
            bpm1.setText(65 + Math.floor((Math.random() * 4) + 1)+"");
        },3000);

        //// date texts
        var font_nexa_light_date= new CAAT.Module.Font.Font().
            setFont('"Nexa-light"').
            setFontSize(20,"px").
            setFillStyle( "#4b4547" ).
            createDefault(1);

        var date = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_light_date).
            setText(UtilModule.getDate()).
            calcTextSize(director).
            setTextFillStyle('#4b4547').
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(20,30).
            cacheAsBitmap();

        var font_nexa_light_time= new CAAT.Module.Font.Font().
            setFont('"Nexa-light"').
            setFontSize(20,"px").
            setFillStyle( "#7c7c7c" ).
            createDefault(1);

        var time = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_light_time).
            setText(UtilModule.getTime(true)).
            calcTextSize(director).
            setTextFillStyle('#7c7c7c').
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(20,55).
            cacheAsBitmap();

        bContainer.addChild(date);
        bContainer.addChild(time);

        //// update time every minute
        setInterval(function (){
            date.setText(UtilModule.getDate());
            time.setText(UtilModule.getTime(true));
        },5 * 1000);

    }

    function createLudeiDeparturesDemoScreen (director , mainContainer) {

        var offsetX = director.width * 2;

        //// container
        var departuresContainer = new CAAT.Foundation.ActorContainer()
            .setGlobalAnchor(0,0.5)
            .setScale(1,1)
            .setBounds(offsetX,mainContainer.height/2,mainContainer.width/3,mainContainer.height)
            .setFillStyle('#f1AA00')
            .enableEvents(false);

        mainContainer.addChild(departuresContainer);

        //// black background
        var blackBg = new CAAT.Foundation.Actor()
            .setGlobalAnchor(0,0.5)
            .setScale(1,1)
            .setBounds(director.width * 3 ,mainContainer.height/2,mainContainer.width/3,mainContainer.height)
            .setFillStyle('#000')
            .enableEvents(false);
        mainContainer.addChild(blackBg);


        //// background images
        var imagesContainer = new CAAT.Foundation.ActorContainer()
            .setGlobalAnchor(0,0.5)
            .setScale(1,1)
            .setFillStyle('#f1AAAA')
            .setBounds(0,mainContainer.height/2,departuresContainer.width,departuresContainer.height)
            .enableEvents(false);
        departuresContainer.addChild(imagesContainer);


        var createBackgroundImage = function (name){

            return new CAAT.Actor().
                setBackgroundImage( director.getImage(name), false ).
                setGlobalAnchor(0.5,0.5).
                enableEvents(false).
                setSize(imagesContainer.width,imagesContainer.height).
                setLocation(imagesContainer.width * 0.5, imagesContainer.height * 0.5).
                setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);

        };

        var bgImags = [];
        bgImags.push(createBackgroundImage("bg_sf1"));
        bgImags.push(createBackgroundImage("bg_ny1"));
        bgImags.push(createBackgroundImage("bg_sf2"));
        bgImags.push(createBackgroundImage("bg_ny2"));

        for(var i = 0; i<bgImags.length; i++){
            imagesContainer.addChild(bgImags[i]);
        }

        var zOrder = 10;
        var currentImageShown = 0;
        var changeImageWithAlpha = function ( bgImags ){

            bgImags[currentImageShown].setAlpha(0);
            imagesContainer.setZOrder(bgImags[currentImageShown],zOrder);
            zOrder++;

            var ab = new CAAT.Behavior.AlphaBehavior().
                setDelayTime(0, 1000).
                setValues(0, 1);

            bgImags[currentImageShown].addBehavior(ab);

            currentImageShown ++;
            if(currentImageShown>=bgImags.length)currentImageShown = 0;

        };

        setInterval(function(){
            changeImageWithAlpha(bgImags)
        }, 8 * 1000);

        //// texts
        var txtContainer = new CAAT.Foundation.ActorContainer()
            .setBackgroundImage( director.getImage('txtbackground2'), false )
            .setGlobalAnchor(0.5,1)
            .setScale(1,1)
            .setBounds(departuresContainer.width/2 ,departuresContainer.height - 20,departuresContainer.width * 0.9,departuresContainer.height * 0.5)
            .setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE)
            .enableEvents(false);

        departuresContainer.addChild(txtContainer);

        //// plane
        var plane = new CAAT.Actor().
            setBackgroundImage( director.getImage("plane"), false ).
            setGlobalAnchor(1,0).
            enableEvents(false).
            setSize(director.getImage('plane').width,director.getImage('plane').height).
            setLocation(txtContainer.width - 20, 20).
            setImageTransformation( CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE);

        txtContainer.addChild(plane);

        //// SFO - JFK
        var font_nexa_bold = UtilModule.createFont('"Nexa-bold"',45,"#4b4547");
        var destination = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_bold).
            setText('SFO - JFK').
            calcTextSize(director).
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(20,20).
            cacheAsBitmap();

        txtContainer.addChild(destination);

        //// departs
        var font_nexa_light = UtilModule.createFont('"Nexa-light"',30,"#4b4547");
        var departs = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_light).
            setText('Departs 10:00am').
            calcTextSize(director).
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(20,80).
            cacheAsBitmap();

        txtContainer.addChild(departs);

        //// terminal
        var font_nexa_light_grey = UtilModule.createFont('"Nexa-light"',20,"#7c7c7c");
        var terminal = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_light_grey).
            setText('Terminal 2, Gate 30B').
            calcTextSize(director).
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(20,130).
            cacheAsBitmap();

        txtContainer.addChild(terminal);

        //// airline
        var airline = new CAAT.Foundation.UI.TextActor().
            setFont(font_nexa_light_grey).
            setText('Wright Airlines 256').
            calcTextSize(director).
            setLineWidth(1).
            enableEvents(false).
            setTextAlign('left').
            setLocation(20,155).
            cacheAsBitmap();

        txtContainer.addChild(airline);
    }

    function setupSlider (director , mainContainer){

        var initPosX = 0;
        var dblClick = false;

        mainContainer.enableDrag();

        mainContainer.mouseDown = function (){

            initPosX = mainContainer.x;
            dblClick = false;
        };

        mainContainer.mouseUp = function (event){

            if(dblClick){return;}

            this.__d_ax = -1;
            this.__d_ay = -1;

            var endPosX =  mainContainer.x;
            var dif = endPosX - initPosX;
            var margin = director.width / 3;
            var direction = "right";
            var isEnoughDrag = false;

            if(Math.abs(dif) > margin){
                isEnoughDrag = true;
                if(dif<0){
                    direction = "left";
                }else{
                    direction = "right";
                }
            }


            switch (wereable.currentStatus) {
                case wereable.status.WEATHER:
                    if(direction === "left" && isEnoughDrag){
                        mainContainer.moveTo(-mainContainer.width/3, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.HEART;
                    } else{
                        mainContainer.moveTo(0, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.WEATHER;
                    }
                    break;
                case wereable.status.HEART:
                    if(direction === "right" && isEnoughDrag){
                        mainContainer.moveTo(0, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.WEATHER;
                    } else if(direction === "left" && isEnoughDrag){
                        mainContainer.moveTo(-mainContainer.width/3 * 2, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.DEPARTURES;
                    } else{
                        mainContainer.moveTo(-mainContainer.width/3, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.HEART;
                    }
                    break;
                case wereable.status.DEPARTURES:
                    if(direction === "right" && isEnoughDrag){
                        mainContainer.moveTo(-mainContainer.width/3, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.HEART;
                    }else{
                        mainContainer.moveTo(-mainContainer.width/3 * 2, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                        wereable.currentStatus = wereable.status.DEPARTURES;
                    }
            }

        };

        mainContainer.mouseDblClick = function(){

            dblClick = true;

            if(wereable.currentStatus === wereable.status.DEPARTURES){
                mainContainer.moveTo(-mainContainer.width/3, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                wereable.currentStatus = wereable.status.HEART;
            } else if(wereable.currentStatus === wereable.status.HEART){
                mainContainer.moveTo(0, mainContainer.y,200,0,new CAAT.Interpolator().createExponentialOutInterpolator(6,false));
                wereable.currentStatus = wereable.status.WEATHER;

            }
        }

    }

    function createApp (director) {

        var appScene = director.createScene().setId("wearables.appScene");

        //// container
        var mainContainer = new CAAT.Foundation.ActorContainer()
            .setGlobalAnchor(0,0)
            .setScale(1,1)
            .setBounds(0,0,director.width * 3,director.height)
            .setFillStyle('#00ff00')
            .enableEvents(true);

        appScene.addChild(mainContainer);

        createWeatherDemoScreen(director,appScene,mainContainer);
        createLudeiLogoDemoScreen(director,mainContainer);
        createLudeiDeparturesDemoScreen(director,mainContainer);

        setupSlider(director,mainContainer);

        director.setScene(0);
        CAAT.loop(60);


    }

    function loadImages() {

        //// create director
        var director = createCanvas();

        new CAAT.ImagePreloader().loadImages(
            [
                {id:'sun',              url: 'static/res_tiles/sun.png'},
                {id:'weather_bg1',      url: 'static/res_tiles/weather_bg1.png'},
                {id:'weather_bg2',      url: 'static/res_tiles/weather_bg2.png'},
                {id:'weather_bg3',      url: 'static/res_tiles/weather_bg3.png'},
                {id:'degrees',          url: 'static/res_tiles/degrees.png'},
                {id:'w_txt_bg',         url: 'static/res_tiles/w_txt_bg.png'},
                {id:'logo',             url: 'static/res_tiles/ludei.png'},
                {id:'background',       url: 'static/res_tiles/backgorund1.png'},
                {id:'signal',           url: 'static/res_tiles/signal.png'},
                {id:'txtbackground',    url: 'static/res_tiles/txtbackground.png'},
                {id:'bg_ny1',           url: 'static/res_tiles/ny1.png'},
                {id:'bg_sf1',           url: 'static/res_tiles/sf1.png'},
                {id:'bg_ny2',           url: 'static/res_tiles/ny2.png'},
                {id:'bg_sf2',           url: 'static/res_tiles/sf2.png'},
                {id:'txtbackground2',   url: 'static/res_tiles/bgTxtD.png'},
                {id:'plane',            url: 'static/res_tiles/plane.png'}

            ],
            function( counter, images ) {

                if (counter == images.length) {
                    director.setImagesCache(images);
                    createApp(director);
                }
            }
        );

    }

    window.addEventListener(
        'load',
        loadImages,
        false);

})();
