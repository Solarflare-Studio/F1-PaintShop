import {DEBUG_MODE} from './adminuser'



class F1User {

    constructor() {
        this.forcecar = true;
        this.isHelmet = false;

        this.init();
    }
    init() {

        // expects params in url for userID, username and useremail and whether to use car or helmet model
        // eg: https://www.f1.com/F1PaintShop.html?u="12345"&n="benedict"&e="ben@world.com"&m=car


        var _self = this;
        console.log("\nStarting F1PaintShop\nSolarFlareStudios\n2023\n");
        console.log('version: ' + document.getElementById('versionid').innerHTML);
        const params = new URLSearchParams(document.location.search)
       
/*https://testrace.eventshouse.dev/microsite/index?waid=7870142279c10454b2bce1866d14da7c82f8ee3c0f87b85ea34f85ae4c6d989f88cc0025859c2ff2c26efe9c01799649093356abb0b4c15db4351af3d5b34bfca3NsGp7mJppF4%2FjbN%2F7Xm4nl%2FqVU74QpU3u1COCBxjQ%3D#
https://testrace.eventshouse.dev/microsite/index?waid=7870142279c10454b2bce1866d14da7c82f8ee3c0f87b85ea34f85ae4c6d989f88cc0025859c2ff2c26efe9c01799649093356abb0b4c15db4351af3d5b34bfca3NsGp7mJppF4%2FjbN%2F7Xm4nl%2FqVU74QpU3u1COCBxjQ%3D#
also:  example of an URL we'd link users to would be https://webactivationaddress.com/?uuid=69f59c273b6e669ac32a6dd5e1b2cb63333d8b004f9696447aee2d422ce63763&lan=en

*/



        // this.userID = (params.get('uuid') ? params.get('uuid') : "noID"); // user id
        const uuidParam = params.get('uuid');
        const uuid = uuidParam ? uuidParam.replace(/['"]+/g, '') : "noID";
        this.userID = uuid;

        this.userName = (params.get('n') ? params.get('n').toLowerCase() : "no name"); // user name
        this.userEmail = (params.get('e') ? params.get('e') : "no email"); // user email
        this.userCarOrHelmet = (params.get('m') ? params.get('m').toLowerCase() : "c"); // car or helmet

        this.userConsole = (params.get('c') ? params.get('c') : 0); // console
        this.userGFX = (params.get('g') ? params.get('g') : 1); // user gfx mode 1,2 or 4k!
        
        // this.languageCode = (params.get('lan') ? params.get('lan').toLowerCase() : "en"); // language
        
        // changed from forced lowercase for french canadian fr-CA 14/6/23
        this.languageCode = (params.get('lan') ? params.get('lan') : "en"); // language

        if(this.languageCode == 'qf') {
            this.languageCode = 'fr-CA';
        }

        // this.languageCode = "ENG";
        this.capturemode = 0;
        if(this.userConsole==2) {
            this.userConsole = 0;
            this.capturemode = 1;
        }
        else if(this.userConsole==3) {
            this.userConsole = 0;
            this.capturemode = 2;
        }

        DEBUG_MODE=this.userConsole;


        // if no uuid, then need to go back to www registration then
        if(!this.userConsole && this.userID == 'noID') {
            // redirect
           window.location.href = 'https://fanzone.live/';

        }
        
        if(this.forcecar && this.userCarOrHelmet!='h') this.userCarOrHelmet='c';
        const aUserParam = params.get('u');
        
        // if(this.userGFX==2) {
        //     const txt = document.getElementById('LK_menu_gfx_02').innerHTML;
        //     document.getElementById('selectedGfx').innerHTML=txt;
        // }
        // else {
        //     const txt = document.getElementById('LK_menu_gfx_01').innerHTML;
        //     document.getElementById('selectedGfx').innerHTML=txt;
        //     // document.getElementById('selectedGfx').innerHTML="Amazing HD";
        // }


        // clearCookies();
        
        
        // strip double quotes out of name and email address
        this.userID = (this.userID.replace(/['"]+/g, ''));
        this.userName = (this.userName.replace(/['"]+/g, ''));
        this.userEmail = (this.userEmail.replace(/['"]+/g, ''));
        this.userCarOrHelmet = (this.userCarOrHelmet.replace(/['"]+/g, ''));
        this.languageCode = (this.languageCode.replace(/['"]+/g, ''));

        

        if(DEBUG_MODE) {
            console.log(">> ** name:" + this.userName + ", id:" + this.userID + ", email:"+ this.userEmail + ", model:"+ this.userCarOrHelmet + ", lang:" + this.languageCode);
            document.getElementById('versionid').style.display='block';
        }
        

        this.cookie_livery_value=""; // temp placeholder whilst cookies not needed
        /* remove cookies for now not needed
        // read in if existing cookies
        var cookie_uniqueID_value = document.cookie.replace(/(?:(?:^|.*;\s*)userID\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var cookie_name_value = document.cookie.replace(/(?:(?:^|.*;\s*)userName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var cookie_email_value = document.cookie.replace(/(?:(?:^|.*;\s*)userEmail\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var cookie_languageCode_value = document.cookie.replace(/(?:(?:^|.*;\s*)languageCode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // var cookie_carorhelmet_value = document.cookie.replace(/(?:(?:^|.*;\s*)userCarOrHelmet\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        this.cookie_livery_value = document.cookie.replace(/(?:(?:^|.*;\s*)F1Livery\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(aUserParam==null) {
            this.cookie_livery_value="";
        }
    
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Expires in 1 year
        var expires = "expires=" + d.toUTCString();

        // cookie_uniqueID_value="";
        if(cookie_uniqueID_value=="" || cookie_uniqueID_value=="noID") {
            if(DEBUG_MODE)
                console.log(">> *** cookie = NONE PRESENT\n ** creating");
            this.writeCookies();
        }
        // else {
        if(DEBUG_MODE)
            console.log(">> *** cookie:\nuserID:" + cookie_uniqueID_value +"\nuserName:" + cookie_name_value +"\nuserEmail:" + cookie_email_value +"\n");
        // if we've no url params, use cookie data
        if(this.userID=="noID") {
            this.userID = cookie_uniqueID_value;// (userID.replace(/['"]+/g, ''));
            this.userName = cookie_name_value;// (userName.replace(/['"]+/g, ''));
            this.userEmail = cookie_email_value;// (userEmail.replace(/['"]+/g, ''));
            this.languageCode = cookie_languageCode_value;
            // userCarOrHelmet = cookie_carorhelmet_value;
        }

        // debug delete cookie
        //  document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //  document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //  document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


        this.clearCookies();
        */


        if(this.userID=="")
            this.userID="noID";

        if(this.userID=="noID") {
            if(DEBUG_MODE)
                console.log(">> *** No user id");	
        }


        if(this.userCarOrHelmet=='h') {
            this.isHelmet = true;
            // document.getElementById('LK_welcome_01').classList.add('hidden');
            // document.getElementById('LK_welcome_02').classList.remove('hidden');
        }

        if(DEBUG_MODE) {
            document.getElementById('versionid').classList.add('console');
            document.getElementById('versionid').classList.add('console_button');	
            document.getElementById('versionid').style.color='black';
            document.getElementById('versionid').style.opacity=1.;

            document.getElementById('fpsindicator').style.display="";
        }
        else {

            // to implement at release = hide version number
            // document.getElementById('versionid').innerHTML="";
        }
    



    }
    //======================
    deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    //======================
    clearCookies() {
        this.deleteCookie('userID');
        this.deleteCookie('userName');
        this.deleteCookie('userEmail');
        this.deleteCookie('F1Livery');
    
        // deleteCookie('userCarOrHelmet');
    }
    //======================
    writeCookies() {
        var cookieName = "my_cookie";
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Expires in 1 year
        var expires = "expires=" + d.toUTCString();
        document.cookie = 'userID' + "=" + this.userID + "; " + expires + "; path=/";
        document.cookie = 'userName' + "=" + this.userName + "; " + expires + "; path=/";
        document.cookie = 'userEmail' + "=" + this.userEmail + "; " + expires + "; path=/";
        document.cookie = 'languageCode' + "=" + this.languageCode + "; " + expires + "; path=/";
        // livery cookie!
        // see json
    }
    //======================
    

    //======================

}

export { F1User };


