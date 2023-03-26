import * as THREE from '../node_modules/three/build/three.module.js';
import { TWEEN } from '../node_modules/three/examples/jsm/libs/tween.module.min'
import {DEBUG_MODE} from './adminuser'

const totalfilestoloadperc = 85;
var currentProgress = 0;
export var percentageTexturesLoaded = 0;
var isAutoSelectingPattern = true; // to indicate whether user has actually clicked on thumb or part of auto procedure setting up
let selectedLanguage = document.querySelector("#selectedLanguage");
selectedLanguage.innerHTML = "English";
// new html

const dropdownArrow = document.querySelector("#dropdownArrow");



export function uihandlelanguageChange(e,f1Aws) {
  var languageArr = e.split(',');
  const langfile = languageArr[2] +"/" + languageArr[1]; // filename for language
  selectedLanguage.innerHTML = languageArr[0];
//   console.log('>>>>>>      lingo = ' + languageArr[0]);

  f1Aws.loadfromAWS('languages',langfile,1,null,f1Aws);  
}

export function setAutoSelectingPattern(_val) {
    isAutoSelectingPattern = _val;
}
export function getAutoSelectingPattern() {
    return isAutoSelectingPattern;
}


export function updateProgress(percent,msg) {
    if(percent==-99) { // reset to 0
        currentProgress=0;
        percentageTexturesLoaded=0;
    }
    else {
        // const progress = document.getElementById("progress");
        currentProgress = currentProgress + percent;
        // progress.style.width = ((currentProgress / totalfilestoloadperc)*100) + "%";
        percentageTexturesLoaded = (currentProgress / totalfilestoloadperc) *100.0;
        if(DEBUG_MODE)
            console.log(">> percent loaded = " + currentProgress + " - " + msg);
    }
}

class F1Gui {

    constructor(processJSON) {
        // this.backgroundcolourtype = 0;
        // this.colourbackgroundSolidColour = '#FFD933';
        // this.colourbackgroundBottomColour = '#ffff00';
        // this.colourbackgroundTopColour = '#ff0000';
        // this.totalfilestoloadperc = 85;

        this.scaleDevice = 1.0;
        this.currentPage = 1;
        this.inPresets = false;
        // this.currentProgress = 0;
        this.pickingColour = false;

        this.processJSON = processJSON;

        this.bestToolPosY = 0;
        this.tabContentPos = 0;
        this.tabBodyPos = 0;
        this.tabHeight = 0;


        // adaptive gui layout mods
        // the html element list that require css overides
        // -------
        // general elements:
        // tabBody
        // allTabs
        // -------
        // pattern elements:
        // layer1patterns_ins
        // -------
        // paint elements:
        // various
        // -------
        // tag elements:
        // tag colours/entry
        // layer2tags_ins
        // -------
        // sponsor elements:
        // sponsor colours various
        // layer3sponsors_ins
        // -------
        // complete / finish elements:
        // finishSelectionContent
        // -------
        this.tabBody_minh = "360px";
        this.tabBody_maxh = "360px";
        this.tabBody_padding = "360px";


        this.init();
    }

    init() {

    }

    //======================

    setBackgroundColourByID(_elementID,_col) {        this.setBackgroundColour(document.getElementById(_elementID),_col);    }
    setBackgroundColour(_element,_col) {        _element.style.backgroundColor = _col;    }

    //======================
	pickedChannelPaint(_index) {
        this.pickingColour = true;

        switch (_index) {
            case 0:
                document.getElementById('whichchanneltext').innerHTML = document.getElementById('LK_paint_base').innerHTML;//"BASE COLOUR";
                break;
            case 1:
                document.getElementById('whichchanneltext').innerHTML = document.getElementById('LK_paint_primary').innerHTML;// "PRIMARY COLOUR";
                break;
            case 2:
                document.getElementById('whichchanneltext').innerHTML = document.getElementById('LK_paint_secondary').innerHTML;// "SECONDARY COLOUR";
                break;
            case 3:
                document.getElementById('whichchanneltext').innerHTML = document.getElementById('LK_tagstyle_paint').innerHTML;// "STYLE COLOUR";
                break;
            case 4:
                document.getElementById('whichchanneltext').innerHTML = document.getElementById('LK_tag_paint').innerHTML;// "TAG COLOUR";
                break;
            case 6:
                document.getElementById('whichchanneltext').innerHTML = document.getElementById('LK_sponsor_paint').innerHTML;// "SPONSOR COLOUR";
                break;
        }

    }
    //======================

    //======================
    getElementColour(_index ) {
        var elementID;
        if(_index==0)
            elementID = 'basepaintbutton';
        else if(_index==1)
            elementID = 'primarypaintbutton';
        else if(_index==2)
            elementID = 'secondarypaintbutton';
        else if(_index==3) // tag style colours
            elementID = 'tagstylepaintbutton';
        else if(_index==4) // tag colours
            elementID = 'tagpaintbutton';
        else if(_index==6) // decal colours (5 is untouchable)
            elementID = 'sponsorpaintbutton';

        return window.getComputedStyle(  document.getElementById(elementID) ,null).getPropertyValue('background-color');
    }

    //======================
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    //======================
    showPage(_page,_hide) {
        this.currentPage = _page;

        if(DEBUG_MODE)
            console.log("**** changed page = " + _page);

        if(_page == 1) { // patterns page
        }
        else if(_page==2) { // paint
            if(this.processJSON.liveryData['Layers'][0].patternId == -1) {  // a none pattern
                // no 1st pattern selected, so hide second and third paint choices
                // document.getElementById("flexpair").classList.add("hidden");
                document.getElementById('primesecondpaints').classList.add('f1hidden');
            }
            else {
                document.getElementById('primesecondpaints').classList.remove('f1hidden');
            }
        }
        else if(_page==3) { // tags
            // set tag colour buttons
            // var tagstylecolour = this.processJSON.liveryData['Layers'][1].Channels[0].tint;
            // var tagcolour = this.processJSON.liveryData['Layers'][1].Channels[1].tint;
        }
        else if(_page==4) { // decals
            // var decalcolour = this.processJSON.liveryData['Layers'][2].Channels[1].tint;
        }
        else if(_page==5) { // launch AR = todo, is actually prepare paint job
        }
        else if(_page==6) { // actual launch ar page
        }
        else if(_page==7) { // actual launch ar page
        }

    }
    //======================
    changedPage(topage) {
        this.currentPage = topage;
        if(this.processJSON.liveryData['Layers'][0].patternId==-1) { // is a NONE pattern
            const col = this.processJSON.liveryData['Layers'][0].Channels[0].tint;
            const ele = document.getElementById('basepaintbutton');
            ele.backgroundColor = col;
            // hide primary and second colour pickers...
        }

        var patternThumbElement = 0;
        var hasfound = false;
        var layerindex = 0;
        var patternblock = 0;
        if(topage==1 || topage==2) { // base pattern or base paint
            patternblock = document.getElementById('layer1patterns_ins');
            layerindex = 0;
        }
        else if(topage==3) { // tag
            patternblock = document.getElementById('layer2tags_ins');
            layerindex = 1;
        }
        else if(topage==4) { // sponsor
            patternblock = document.getElementById('layer3sponsors_ins');
            layerindex = 2;
        }

        // seek out thumb element from its pattern id attribute


        if(patternblock!=0) {
            for(var i=0;i<patternblock.children.length;i++) {
                const id= patternblock.children[i].children[1].children[0].children[0].getAttribute('patternId');

//                const id= patternblock.children[i].children[0].getAttribute('patternId');
                if(this.processJSON.liveryData['Layers'][layerindex].patternId == id){
                    // matched!
                    if(DEBUG_MODE)
                        console.log("matched");
                    hasfound=true;
                    // patternThumbElement = patternblock.children[i].children[0];
                    patternThumbElement = patternblock.children[i].children[1].children[0].children[0];
                    break;
                }
            }
        }
        if(!hasfound && DEBUG_MODE)
            console.log(">> **** error finding matching pattern");

        if(topage == 1) { // first page of patterns

            this.showPage( 1, false);

            if(patternThumbElement!=0) {
                //
                setAutoSelectingPattern(true);  // try without !! todo fix
                patternThumbElement.click();
            }
        }
        else if(topage == 2) { // paint

            this.showPage( 2, false);
            if(patternThumbElement!=0) {
                //
                setAutoSelectingPattern( true);  // try without !! todo fix
                patternThumbElement.click();
            }
        }
        else if(topage == 3) { // tags

            this.showPage( 3, false);

            if(patternThumbElement!=0) {
                //
                setAutoSelectingPattern(true);
                patternThumbElement.click();
            }
        }
        else if(topage == 4) { // decals

            this.showPage( 4, false);

            if(patternThumbElement!=0) {
                isAutoSelectingPattern = true;
                patternThumbElement.click();
            }

        }
        else if(topage == 5) { // final page to AR?

            this.showPage( 5, false);
        }
    }


    //======================
    setRendererSize(renderWidth, renderHeight, renderer,camera) {

        renderer.setSize( renderWidth, renderHeight );

        if(camera) {
            camera.top = renderHeight*0.5;
            camera.bottom = -renderHeight*0.5;
            camera.left = -renderWidth*0.5;
            camera.right = renderWidth*0.5;
            camera.aspect = renderWidth / renderHeight;
            camera.updateProjectionMatrix () ;
        }
    }
    //======================
    setSize(w,h,renderer,camera, colorPatternPicker ) {

   
        const viewportHeight = h;
        const viewportWidth = window.innerWidth;


        const tabContent = document.getElementById('tabContent');
        const rect = tabContent.getBoundingClientRect();
        const top = rect.top + window.pageYOffset;

        const heightRatio = rect.height / viewportHeight;
        // console.log("**** >" + top + " ratio = " + heightRatio);

        const head = document.getElementById('header');
        const recth = tabContent.getBoundingClientRect();
        // alert('recth = ' + recth.top);
      


        // this.bestToolPosY = 360; // from html css
        // this.setRendererSize(w,h - this.bestToolPosY, renderer,camera);

        this.tabContentPos = rect.height;

        const tabBody = document.getElementById('tabBody');
        const rect2 = tabBody.getBoundingClientRect();
        const top2 = rect2.top + window.pageYOffset;


        this.tabBodyPos = rect2.height;

        const tabHeadingHeight = this.tabContentPos - this.tabBodyPos;


        this.setRendererSize(w,h - this.tabBodyPos, renderer,camera);


        
        if(rect.height==0) { // only in intro
            return;
        }
        const buttonblock = document.getElementById('f1nextbackbuttons');


        const percentageThreshold = 0.55;
        if(heightRatio>=percentageThreshold) { //0.55) { // then reduce
            this.setRendererSize(w,h - this.tabBodyPos, renderer,camera);


            // intro
            // document.getElementById('welcomebutton').classList.remove('text-2xl')
            document.getElementById('tutorialstartbutton').classList.remove('!py-3')
            document.getElementById('tutorialblock').style.marginBottom='75px';
            

            const tabBodyElement = document.getElementById('tabBody');
            tabBodyElement.style.paddingTop='0.5rem';

            tabBodyElement.classList.remove('min-h-[360px]');
            tabBodyElement.classList.remove('max-h-[360px]');
            // tabBodyElement.classList.add('seminmaxheight')
            // tabBodyElement.classList.add('seminmaxpaintheight')


            const allTabs = document.getElementById('allTabs');
            allTabs.classList.remove('min-h-[255px]');
            allTabs.style.minHeight = "200px";
            allTabs.style.maxHeight = "200px";
            
            const tabPaint = document.getElementById('paint');
            tabPaint.classList.remove('min-h-[220px]');
            // document.getElementById('LK_paint_base').classList.add('reducetopmargin');
            

            document.getElementById('tabsfoot').classList.add('reduceTabs');
            const tabelements = document.querySelectorAll('.tab');
            tabelements.forEach(function(element) {
                element.classList.add('reduceTabsHeight');
            });
            
            // if(which==1 || which==3) {
            // 	buttonblock.style = "margin-top: 1rem!important";
            // } else if( which==2 || which==4) {
            // if(which==1 || which==3) {
            buttonblock.style.marginTop = "0.5rem!important";


            const elements = document.querySelectorAll('.next-btn');
            elements.forEach(function(element) {
                element.classList.remove('!py-3');
                element.classList.add('sebutton');
                // element.style.touchAction= 'manipulation';

            });
            const elements2 = document.querySelectorAll('.prev-btn');
            elements2.forEach(function(element) {
                element.classList.remove('!py-3');
                element.classList.add('sebutton');
                // elements2.style.touchAction= 'manipulation';
            });

            // paint
            document.getElementById('whichchanneltext').classList.add('reducetopmargin');


            const elements3 = document.querySelectorAll('.color-picker');
            elements3.forEach(function(element) {
                element.classList.add('secolourpicker');                
            });
            document.getElementById('paintseparator').style.display='none';

            // document.getElementById('paintachannelblock').classList.add('seminmaxpaintheight');
            document.getElementById('paintachannelblock').classList.add('seminmaxheight');

            document.getElementById('glosstypeblock').style.marginBottom="0.1rem";

            document.getElementById('pattern').style.paddingTop="0.5rem";

            const layer1ins=document.getElementById('layer1patterns_ins');
            layer1ins.classList.remove('max-h-[220px]');
            layer1ins.classList.add('selayer1ins');

            const layer2ins=document.getElementById('layer2tags_ins');
            layer2ins.classList.remove('max-h-[150px]');
            layer2ins.classList.add('selayer2ins');

            const layer3ins=document.getElementById('layer3sponsors_ins');
            layer3ins.classList.remove('max-h-[150px]');
            layer3ins.classList.add('selayer3ins');

            document.getElementById('finishSelectionContent').classList.remove('nonsefinishblock');
            document.getElementById('finishSelectionContent').classList.add('sefinishblock');
        }
        else {
            // if(which==1 || which==3) {
            // buttonblock.style.marginTop = "1rem!important";
            // } else if( which==2 || which==4) {
            // 	buttonblock.style = "margin-top: 0.5rem!important";
            // const layer1ins=document.getElementById('layer1patterns_ins');
            // layer1ins.classList.remove('max-h-[220px]');
            // layer1ins.classList.add('layer1patterns_ins_extras');


        }




        return;
        // TODO HTML


        const rootElement = document.querySelector(':root');
        const toolsElement = document.getElementById('palette_toolsBlock')

        const lerp = (a, b, t) => (b-a)*t+a;
        const unlerp = (a, b, t) => (t-a)/(b-a);
        const map = (a1, b1, a2, b2, t) => lerp(a2, b2, unlerp(a1, b1, t));


        var fontsizepix = 20;
        var gapHeightBase = 19;
//        fontsizepx = w / 20.0;
        const aspectratio = h / w;

        fontsizepix = map(290,800,12,18,w);
        fontsizepix += map(1.5,3.0,-2,2,aspectratio);
        if(DEBUG_MODE)
            console.log(">> ** fontsizepix="+fontsizepix);
        gapHeightBase = map(10,20,0.5,20,fontsizepix);

        if(DEBUG_MODE)
            console.log(fontsizepix + ",aspectratio = " + fontsizepix + ", " + aspectratio );
        // fontsizepix = (fontsizepix*aspectratio*0.8);

        // if(w<290)
        //     fontsizepix = 12;
        // else if(w<320)
        //     fontsizepix = 14;
        // else if(w<500)
        //     fontsizepix = 16;
        // else if(w<800)
        //     fontsizepix = 18;

        // if(h<600) {
        //     fontsizepix = 14;
        //     gapHeightBase = 2;
        //     document.getElementById('redspacer').style.display="none";
        // }
        // else {
        //     document.getElementById('redspacer').style.display="block";
        // }

        rootElement.style.setProperty('--rootFontSize', fontsizepix + 'px');
        rootElement.style.setProperty('--gapHeightBase', gapHeightBase + 'px');

        // colorPatternPicker.handleRadius = fontsizepix * 0.4;
        // colorPatternPicker.width = w * 0.5;
        // colorPatternPicker.props.handleRadius = fontsizepix * 0.4;
        // colorPatternPicker.props.width = w * 0.5;
        // have moved changing colour picker into f1engine, todo check delete / create if onsize...



        //

        // var bottomButtonsHeight = document.getElementById('backornextblock').clientHeight;
        var bottomButtonsHeight = fontsizepix * 2;

        var toolsPosY = h - ((bottomButtonsHeight * 13) + (gapHeightBase*5));
        rootElement.style.setProperty('--toolsPosY', toolsPosY + 'px');
        this.bestToolPosY = toolsPosY;
        this.tabHeight = bottomButtonsHeight * 2;


        document.getElementById('guicontainer').style.height = this.tabHeight + "px";


        var toolsPosX = 0;

        rootElement.style.setProperty('--screenWidth', w + 'px');

        // document.getElementById('my-iframe').style.width = (w-50) + "px";
        // document.getElementById('my-iframe').style.height = (h-50) + "px";
        


        var toolsWidth = w;
        toolsElement.style.width = toolsWidth + 'px';
        toolsElement.style.left = toolsPosX + 'px';
//        toolsElement.style.top = toolsPosY + 'px';

        const patternsWidth = (toolsWidth-36) * 0.45;
        const patternsHeight = patternsWidth * 0.44;
        
        rootElement.style.setProperty('--patternWidth', patternsWidth + 'px');
        rootElement.style.setProperty('--patternHeight', patternsHeight + 'px');


        // also set intro page divider
        // new html todo
        // document.getElementById('tut2block').style.height = toolsPosY + "px";
        // document.getElementById('tut1block').style.height = (h-toolsPosY) + "px";



        // we want to add a bit more to the bottom so that the gui tabs have some 3D window to edges of..
        var clientHeight = this.tabHeight;// document.getElementById('guitabs').clientHeight;

        // set height of bottom panel to always reach bottom

        // TODO NEW HTML

        var mainHeight = document.getElementById('oldmaincontainerblock').offsetHeight ;
        //        document.getElementById('toolscontainer').style.height = (mainHeight - toolsPosY) + 'px';
        //        toolsElement.style.height = (mainHeight - toolsPosY) + 'px';
        document.getElementById('toolscontainer').style.height = (mainHeight - toolsPosY - clientHeight) + 'px';

        var maxHeightPatternsPanel = (mainHeight - toolsPosY - clientHeight) - (bottomButtonsHeight*3);
//        maxHeightPatternsPanel = maxHeightPatternsPanel - (0); // bottom margin
        rootElement.style.setProperty('--layersContainerHeight', maxHeightPatternsPanel + 'px');


        // set max-height of the tags scrolling container
        var tagblock = document.getElementById('tagblock');
        var decalblock = document.getElementById('decalblock');
        var washiddendecal = false;
        if(decalblock.classList.contains('hidden')) {
            washiddendecal = true;
        }




        var tagBlockHeight = document.getElementById('gettagblockheight').clientHeight ;
        if(document.getElementById('tagblock').classList.contains('hidden')) {
            document.getElementById('tagblock').classList.remove('hidden');
            tagBlockHeight = document.getElementById('gettagblockheight').clientHeight ;
            document.getElementById('tagblock').classList.add('hidden');
        }

        rootElement.style.setProperty('--layersTagContainerHeight', (maxHeightPatternsPanel-tagBlockHeight) + 'px');


        var decalBlockHeight = document.getElementById('getdecalblockheight').clientHeight ;
        if(document.getElementById('decalblock').classList.contains('hidden')) {
            document.getElementById('decalblock').classList.remove('hidden');
            decalBlockHeight = document.getElementById('getdecalblockheight').clientHeight ;
            document.getElementById('decalblock').classList.add('hidden');
        }


        rootElement.style.setProperty('--layersDecalsContainerHeight', (maxHeightPatternsPanel - decalBlockHeight) + 'px');


        if(this.currentPage!=3) // not actually in tagblock...
            document.getElementById('tagblock').classList.add('hidden');



        this.setRendererSize(w,toolsPosY + this.tabHeight, renderer,camera);


        // calculate height of tabs to offset the height from top (making them appear in the 3D area, above the top of the rest of the gui)
        // var guitabsHeight = document.getElementById('guitabs').clientHeight;
        // rootElement.style.setProperty('--guiTabHeight', guitabsHeight + 'px');

        if(washiddendecal)
            document.getElementById('decalblock').classList.add('hidden');

    }
  

}
export { F1Gui };


