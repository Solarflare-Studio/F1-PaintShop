import * as THREE from '../node_modules/three/build/three.module.js';

class F1Settings {
    constructor() {
        this.tonemappingtype = THREE.ReinhardToneMapping;

        this.mainLight1Intensity = 1.0;//0.27;//0.3;
        this.mainLight2Intensity = 1.0;//0.77;//0.3;
        this.mainLight1IntensityH = 1.73;//0.27;//0.3;
        this.mainLight2IntensityH = 1.73;//0.77;//0.3;

        this.spotLight1Intensity = 1.0;//0.7;//0.5;
        this.spotLight2Intensity = 1.0;//0.6;//0.5;
        this.spotLight1IntensityH = 2.0;//0.7;//0.5;
        this.spotLight2IntensityH = 2.0;//0.6;//0.5;


        this.dirLight1Intensity = 2.0;//3.5;//2.0;// 2.3;
        this.dirLight1IntensityH = 2.0;//3.5;//2.0;// 2.3;



        this.dirLight2Intensity = 2.0;//2.3;

        this.ambientLightIntensity = 0.0;//0.3;
        this.ambientLightIntensityH = 0.96;//0.3;

        this.tonemappingamount = 2.3;//1.5;

        this.envStrenghtCustom = 2.3;//2.5;
        this.envStrengthStatic = 5.0;//4.0;
        this.envStrengthGarage = 3.5;// 5.2;//3.0;
        this.envStrengthPlinthSides = 1.5;

        this.envStrengthVisor = 5.0;
    }
}
export const f1Settings = new F1Settings();



