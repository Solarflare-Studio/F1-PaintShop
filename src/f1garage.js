import * as THREE from '../node_modules/three/build/three.module.js';
import { TWEEN } from '../node_modules/three/examples/jsm/libs/tween.module.min'



class F1Garage {


    constructor() {

        this.tweenin = 0;
        this.tweenout = 0;


        this.init();
    }
    init() {
        this.planeGeometry = new THREE.PlaneGeometry(1024,1024);

        var _self = this;
        // this.garageWall = 0;

        this.garageRoot = new THREE.Object3D();
        this.garageMaterial = this.newGarageMat();
        // this.garageMaterial.color = new THREE.Color( 0x323232)
        this.garageMaterial.color = new THREE.Color( 0xd0d0d0)

        this.backgroundImage = 0;
        this.backgroundMat =  new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide, // render both front and back faces
            // depthWrite: false, // disable writing to depth buffer
            // depthTest: false, // disable depth testing
            name: 'scene background',
        });
        this.plinthSidesMat = this.newGarageMat();
        this.plinthSidesMat.color = new THREE.Color( 0x322020)

        this.plinthSidesMat.transparent = false;

        this.plinthSidesMat.needsUpdate = true;



        this.garageMaterial.needsUpdate = true;

        this.garageShaderMaterial();


        let garageFloor = new THREE.Mesh( new THREE.CircleGeometry( 80, 32 ), this.garageMaterial );
        let garageFloorSFX = new THREE.Mesh( new THREE.CircleGeometry( 80, 32 ), this.garageSFXMaterial );
        let garageFloorSides = new THREE.Mesh( new THREE.CylinderGeometry( 80, 80, 10, 32, 1, true ), this.plinthSidesMat );
        garageFloorSides.layers.set(3); // with glow
        // garageFloorSides.layers.set(1); // without
        garageFloorSides.position.set(0,-5.9,0);


        garageFloorSFX.layers.set(3); // try on glow layer
        // garageFloorSFX.layers.set(1); // not glow layer
        garageFloorSFX.rotateX((Math.PI / 180)*-90);
        garageFloorSFX.position.set(0,-.2,0);

        garageFloor.layers.set(1);
        garageFloor.rotateX((Math.PI / 180)*-90);
        garageFloor.receiveShadow = true;
        
        // new floor
        this.garageRoot.add(garageFloor);
        this.garageRoot.add(garageFloorSides);
        this.garageRoot.add(garageFloorSFX);

        this.garageRoot.position.set(0,20,-20);
        
        // and shadow layer
        const shadowmaterial = new THREE.ShadowMaterial();
        shadowmaterial.opacity = 0.4;// 0.34;
        shadowmaterial.side = THREE.DoubleSide;
        shadowmaterial.transparent = true;
        shadowmaterial.needsUpdate=true;

        let garageFloorShadow = new THREE.Mesh( new THREE.PlaneGeometry(512,512), shadowmaterial );

        garageFloorShadow.position.set(0.0,0.05,0.0);
        

        garageFloorShadow.layers.set(1);
        garageFloorShadow.scale.set(0.5,0.5,0.5);
        garageFloorShadow.rotateX((Math.PI / 180)*90);
        garageFloorShadow.receiveShadow = true;
        this.garageRoot.add(garageFloorShadow);

        this.floorMode = 0;

        // create blank hex floor grid for later
        this.hexPixelBuffer = this.createHexPixelData(64,64);
        this.hexPixTexture = new THREE.DataTexture(this.hexPixelBuffer, 64,64, THREE.RGBFormat );
        this.garageSFXMaterial.uniforms.texture2.value = this.hexPixTexture;
        this.garageSFXMaterial.needsUpdate=true;
    }
    //======================
    createHexPixelData(width,height) {

        // create a pixel buffer with alternating black and white pixels
        var pixels = new Uint8Array(width * height * 3);
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var i = (y * width + x) * 3;
                var color = 0;// ((x ^ y) & 0x8) ? 255 : 0;
                pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
            }
        }
        return pixels;
    }
    //======================
    multplyByte(b,factor) {
        if(b!=0) {
            console.log('ss');
        }
        let floatValue = b / 255.0;
        let resultFloatValue = floatValue * factor;
        return Math.round(resultFloatValue * 255.0);
    }
    //======================

    startFloorMode(v,extras) {
        this.floorMode = v;
        this.garageSFXMaterial.uniforms.mode.value = v;
        this.garageSFXMaterial.uniforms.fTime.value = 0.;
        var self = this;
        if(this.floorMode == 0) { // wipe to zero

            if(this.tweenin!=0)
                this.tweenin.stop();
            // if(this.tweenout!=0)
            //     this.tweenout.stop();
            
            self.garageSFXMaterial.uniforms.dimmer.value = 0.8;
            this.tweenin = new TWEEN.Tween({ value: 255 })
            .to({ value: 0 },
                1000
            )
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function (object) {
                for (var i = 0; i < self.hexPixelBuffer.length; i += 3) {
                    if(self.hexPixelBuffer[i]>object.value) 
                        self.hexPixelBuffer[i] = object.value;
                    if(self.hexPixelBuffer[i+1]>object.value) self.hexPixelBuffer[i+1] = object.value;
                    if(self.hexPixelBuffer[i+2]>object.value) self.hexPixelBuffer[i+2] = object.value;
                }

                self.hexPixTexture.needsUpdate=true;
            })
            .onComplete(function () {
                // Call nextPosition only after the animation has completed
            })        
            .start()               
        }
        else if(this.floorMode == 1) { // floor circle spread
            self.garageSFXMaterial.uniforms.dimmer.value = 0.5;

            if(this.tweenin!=0)
                this.tweenin.stop();
            // if(this.tweenout!=0)
            //     this.tweenout.stop();


            this.tweenin = new TWEEN.Tween(self.garageSFXMaterial.uniforms.fTime)
            .to({
                    value: 1.0,
                },
                5000
            )
            .easing(TWEEN.Easing.Quintic.Out)
//            .easing(TWEEN.Easing.Cubic.Out)
            .onComplete(function () {
                self.floorMode = 0;
                self.garageSFXMaterial.uniforms.fTime.value = 0.0;
            })        
            .start()
        }
        else if(this.floorMode == 2) { // start grid
            var self = this;
            self.garageSFXMaterial.uniforms.dimmer.value = 0.8;

            if(this.tweenin!=0)
                this.tweenin.stop();
            // if(this.tweenout!=0)
            //     this.tweenout.stop();

            this.tweenin = new TWEEN.Tween({ value: 0 })
            .to({
                    value: 255,
                },
                2000
            )
            .easing(TWEEN.Easing.Quintic.InOut)
            .onUpdate(function (object) {
                const starty = 14;
                for(var y=starty;y<23;y++) {
                    var x = 21;
                    var i = x*3 + (y*64*3);
                    if(self.hexPixelBuffer[i]<object.value) self.hexPixelBuffer[i] = object.value;
                    if(self.hexPixelBuffer[i+1]<object.value) self.hexPixelBuffer[i+1] = object.value;
                    if(self.hexPixelBuffer[i+2]<object.value) self.hexPixelBuffer[i+2] = object.value;
                    x = 42;
                    i = x*3 + ((y+1.)*64*3);
                    if(self.hexPixelBuffer[i]<object.value) self.hexPixelBuffer[i] = object.value;
                    if(self.hexPixelBuffer[i+1]<object.value) self.hexPixelBuffer[i+1] = object.value;
                    if(self.hexPixelBuffer[i+2]<object.value) self.hexPixelBuffer[i+2] = object.value;
                }
                for(var x=21;x<43;x++) {
                    var i = x*3 + (starty*64*3);
                    if(self.hexPixelBuffer[i]<object.value) self.hexPixelBuffer[i] = object.value;
                    if(self.hexPixelBuffer[i+1]<object.value) self.hexPixelBuffer[i+1] = object.value;
                    if(self.hexPixelBuffer[i+2]<object.value) self.hexPixelBuffer[i+2] = object.value;
                    i = x*3 + ((starty-1)*64*3);
                    if(self.hexPixelBuffer[i]<object.value) self.hexPixelBuffer[i] = object.value;
                    if(self.hexPixelBuffer[i+1]<object.value) self.hexPixelBuffer[i+1] = object.value;
                    if(self.hexPixelBuffer[i+2]<object.value) self.hexPixelBuffer[i+2] = object.value;
                }

                self.hexPixTexture.needsUpdate=true;
            })
            .onComplete(function () {
                // Call nextPosition only after the animation has completed
            })        
            .start()            
        }
        else if(this.floorMode == 3) { // centre lights
            self.garageSFXMaterial.uniforms.wholegroundamount.value = 0.0;
            new TWEEN.Tween(self.garageSFXMaterial.uniforms.wholegroundamount)
            .to({
                    value: 1.0,
                },
                2000
            )
            .easing(TWEEN.Easing.Quintic.InOut)
            .start()
        }
    }
    //======================
    newGarageMat() {
        return new THREE.MeshStandardMaterial(
            {
                name: 'garagenewMaterial',
                fog: false,
                metalness: 0.5,
                envMapIntensity: 1.0,
                roughness: 0.8,
                emissiveIntensity: 1,
                aoMapIntensity: 1.0,

                side: THREE.FrontSide,
                transparent: true,
                normalScale: new THREE.Vector2(-0.2, 0.2),

                depthTest: true,
                depthWrite: false, // try
            }
        );
    }
    //======================

    garageShaderMaterial() {
        this.uniforms = {
            texture1: { value: 0 },  // base pattern
            texture2: { value: 0 },  // hex pixels for alternative method
            fTime: { value: 0.0},
            offset_y: { value: 0.0},
            offset_x: { value: 0.0},
            tot_x: { value: 0.0},
            tot_y: { value: 0.0},
            scale_x: { value: 1.0},
            scale_y: { value: 1.0},
            mode: {value: 0 },
            dimmer: {value: 0.5},
            wholegroundamount: {value: 0.0},
          };
  
        this.garageSFXMaterial = new THREE.ShaderMaterial({
            name: 'garageFloorSFXMaterial',

            uniforms: this.uniforms,
            vertexShader: `

            attribute vec4 tangent;

            varying vec2 vUv;
            varying float viewerDistance;
            varying vec3 vViewDirTangent;

            void main() {
                vUv = uv;
                vec3 vNormal = normalMatrix * normal;
                vec3 vTangent = normalMatrix * tangent.xyz;
                vec3 vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
            
                mat3 mTBN = transpose(mat3(vTangent, vBitangent, vNormal));

                vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
                vec3 viewDir = -mvPos.xyz;
                vViewDirTangent = mTBN * viewDir;
            
                gl_Position = projectionMatrix * mvPos;
            }
            `,
            fragmentShader: `
            uniform sampler2D texture1;
            uniform sampler2D texture2; // input texture to drive hexagons if non computational

            uniform float dimmer;
            uniform float wholegroundamount;

            varying vec2 vUv;
            uniform float fTime;
            uniform int mode;
            uniform float offset_x;
            uniform float offset_y;

            uniform float tot_x;
            uniform float tot_y;

            uniform float scale_x;
            uniform float scale_y;

            varying vec3 vViewDirTangent;
            //==================================================================
            float hash21(vec2 p)
            {
                return fract(sin(dot(p, vec2(141.13, 289.97)))*43758.5453);
            }
            //==================================================================
            float hex(in vec2 p)
            {
                const vec2 s = vec2(1.7320508, 1);

                p = abs(p);    
                return max(dot(p, s*.5), p.y); // Hexagon.
            }
            //==================================================================
            struct HexInfo {
                vec2 xy;
                float row;
                float column;
                int oddRow;
                int oddColumn;
            };
            //==================================================================
            HexInfo getHex(vec2 p)
            {    
                const vec2 s = vec2(1.7320508, 1);

                HexInfo hi;
                // The hexagon centers: Two sets of repeat hexagons are required to fill in the space, and
                // the two sets are stored in a "vec4" in order to group some calculations together. The hexagon
                // center we'll eventually use will depend upon which is closest to the current point. Since 
                // the central hexagon point is unique, it doubles as the unique hexagon ID.
                
                vec4 hC = floor(vec4(p, p - vec2(1, .5))/s.xyxy) + .5;
                
                // Centering the coordinates with the hexagon centers above.
                vec4 h = vec4(p - hC.xy*s, p - (hC.zw + .5)*s);
                hi.xy = h.xy;

                hi.row = h.z;
                hi.column = h.w;

                vec4 result=dot(h.xy, h.xy) < dot(h.zw, h.zw) 
                    ? vec4(h.xy, hC.xy) 
                    : vec4(h.zw, hC.zw + .5);

                hi.xy = result.xy;
                hi.column = result.z;
                hi.row = result.w;

                hi.oddColumn = 0;
                hi.oddRow = 0;
                return hi;
            }

            //==================================================================
            float curve(float x, float amount) {
                return pow(x, 1.0 / amount);
            }

            //==================================================================
            void main()
            {
                float tints[24] = float[24](1.,1.,1., 0.91,.04,.03,  0.59,.29,.91,    0.,1.,1.,
                    1.,1.,1.,  0.91,.04,.03,  0.59,.29,.91,    0.,1.,1.);

                const vec3 tintBlueCyan = vec3(0.18,.95,.96);
                const vec3 tintDarkPurple = vec3(0.59,.29,.91);
                const vec3 tintRed = vec3(0.91,.04,.03);

                // max extents
                const float maxc = 38.0;
                const float maxr = 66.0;
                
                const vec2 s = vec2(1.7320508, 1);

                vec2 uv = vUv;
                float vt = fTime; // effect from 0.0 to 1.0

                //
                const vec2 offset = vec2(-0.11, 0.02);
                const vec2 totgridsize = vec2(30.0, 30.0) + vec2(1.05, 1.57);

                vec2 u = uv.xy * totgridsize;
                u += offset + vec2( offset_x,offset_y + 0.03);
                
                HexInfo h = getHex(u*1. + s.yx);
                float eDist = hex(h.xy); // Edge distance.
                int ci = int(h.column * 2.0);
                int ri = int(h.row * 2.0);
                float cf = float(ci);
                float rf = float(ri);

                vec3 outcol = vec3(0.0);
                vec3 mode3col = vec3(0.0);

                // ==============
                if(int(mode)==2 || int(mode)==0) { // use pixelmap
                    vec2 targetuv=vec2(cf/maxc,rf/maxr);
                    vec3 colourpixels = texture2D(texture2, targetuv).xyz;
                    outcol = colourpixels.xyz;
                }
                // ==============
                else if(int(mode)==1) { // draws circle from centre outwards
                    float tc = vt * maxc;
                    float tr = vt * maxr;

                    // vec2 norm = vec2(cf, rf) - vec2(19.0,33.0 );
                    vec2 norm = vec2(cf, rf) - vec2(19.0,35.0 ); // real centre
                    norm.x *= 2.0;

                    // circle splash
                    float radius = 45.0 * vt;
                    float dist = length(norm);
                    if(dist <= radius) {
                        if( dist <= radius - 2.0) {
                            if(dist >= radius - 4.0)
                                outcol = tintDarkPurple;
                            else {
                                if(dist >= radius - 6.0) {
                                    outcol = tintRed;
                                }
                                else {
                                    if(dist >= radius - 10.0) {
                                        float calc = (dist - (radius-8.0))/5.0;
                                        outcol = tintRed * (calc);
                                    }
                                }
                            }
                        } 
                        else {
                            dist = (dist-radius) / (2.0);
                            outcol = tintBlueCyan * dist;
                        }
                    }
                }
                // else if(int(mode)==3) {
                //     vec2 norm = vec2(cf, rf) - vec2(19.0,35.0 ); // real centre
                //     norm.x *= 2.0;

                //     // circle splash
                //     float radius = 45.0 * 0.25;
                //     float dist = length(norm);
                //     if(dist <= radius) {    
                //         float curveAmount = 4.0;
                //         float curveDist = curve(eDist*.5, curveAmount);
                //         mode3col = (1.0 - curveDist);
                //     }
                // }
                // ==============
                // most modes just do hex outline by using mask from hex image
                vec4 colour = texture2D(texture1, uv);
                float g = colour.g;

                // if(mode==3) {
                //     float curveAmount = 4.0;
                //     float curveDist = curve(eDist*.5, curveAmount);
                //     outcol *= (1.0 - curveDist); 
                // }
                // else {
                //     outcol *= g;
                // }

                outcol *= g;
                outcol *= dimmer;// 0.5;


                // vec2 norm = vec2(cf, rf) - vec2(19.0,35.0 ); // real centre
                // norm.x *= 2.0;
                // float radius = 45.0 * 0.35;
                // float dist = length(norm);
                // if(dist <= 40.0 && wholegroundamount!=0.0) {
                if(wholegroundamount!=0.0) {
                    float curveAmount = 4.0;
                    float curveDist = curve(eDist*1., curveAmount);
                    if(g<=0.1) {
                        vec3 tintground = vec3(0.1,0,0) * wholegroundamount;
                        outcol = mix(outcol,  tintground, (1.0 - curveDist));
                    }
                }






                gl_FragColor = vec4(outcol, .6);
            }
            `,
            side: THREE.DoubleSide,
            transparent: true,
            blending: THREE.CustomBlending,
            blendEquation: THREE.AddEquation,
            blendSrc: THREE.SrcAlphaFactor,
            blendDst: THREE.OneMinusSrcAlphaFactor,
            // alphaTest: 0.1,
            depthWrite: false, // disable writing to depth buffer
            depthTest: true, // disable depth testing            


        //     side: THREE.FrontSide,
        //     transparent: false,
        //     blending: THREE.CustomBlending,
        //     blendEquation: THREE.AddEquation,
        //     blendSrc: THREE.SrcAlphaFactor,
        //     blendDst: THREE.OneMinusSrcAlphaFactor,
        //     alphaTest: 0.1,
        //   depthWrite: false, // disable writing to depth buffer
        //   depthTest: true, // disable depth testing            
        });
    }



    //======================

}

export { F1Garage };

