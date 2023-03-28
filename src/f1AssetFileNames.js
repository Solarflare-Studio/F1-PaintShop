

class F1AssetFileNames {

    constructor() {
        this.car_files = [ './assets/car/F1PS_F1_Car_V11_Rev4.glb',            // 3d model glb
                            './assets/textures/smallblackimage.jpg',     // customisable base colour map
                            './assets/car/00_CustomMainMaps/V10/512/F1PS_Car_Custom_V10_Normal.jpg',        // customisable normal
                            './assets/car/00_CustomMainMaps/V10/512/F1PS_Car_Custom_V10_AO.jpg',            // customisable ao
                            'notused',         // customisable metal // not loaded
                            'notused',     // customisable rough // not loaded
                            './assets/car/01_StaticMainMaps/V11/1k/F1PS_Car_Static_V11_BaseColor.jpg',      // static base map always stays the same
                            './assets/car/01_StaticMainMaps/V11/512/F1PS_Car_Static_V11_Normal.jpg',         // static base normal
                            './assets/car/01_StaticMainMaps/V11/512/F1PS_Car_Static_V11_AO.jpg',             // static base ao
                            './assets/car/01_StaticMainMaps/V11/512/F1PS_Car_Static_V11_Metal.jpg',          // static base metal
                            './assets/car/01_StaticMainMaps/V11/512/F1PS_Car_Static_V11_Roughness.jpg'   ];  // static base rough

        this.helmet_files = [ './assets/helmet/F1PS_Helmet_V09_Fix.glb',                // 3d model glb
                                './assets/textures/smallblackimage.jpg',     // customisable base colour map
                                './assets/helmet/00_CustomMainMaps/V9/512/F1PS_Helmet_Custom_V9_Normal.jpg',        // customisable normal
                                './assets/helmet/00_CustomMainMaps/V9/512/F1PS_Helmet_Custom_V9_AO.jpg',            // customisable ao
                                'notused',         // customisable metal // not loaded
                                'notused',     // customisable rough // not loaded
                                './assets/helmet/01_StaticMainMaps/V9/1k/F1PS_Helmet_Static_V9_BaseColor.jpg',      // static base map always stays the same
                                './assets/helmet/01_StaticMainMaps/V9/512/F1PS_Helmet_Static_V9_Normal.jpg',         // static base normal
                                './assets/helmet/01_StaticMainMaps/V9/512/F1PS_Helmet_Static_V9_AO.jpg',             // static base ao
                                './assets/helmet/01_StaticMainMaps/V9/512/F1PS_Helmet_Static_V9_Metal.jpg',          // static base metal
                                './assets/helmet/01_StaticMainMaps/V9/512/F1PS_Helmet_Static_V9_Roughness.jpg'     // static base rough
                                // './assets/helmet/visor/V8/1k/F1PS_Helmet_Visor_V8_BaseColor.jpg',      // static base map always stays the same
                                // './assets/helmet/visor/V8/1k/F1PS_Helmet_Visor_V8_Normal.jpg',         // static base normal
                                // './assets/helmet/visor/V8/1k/F1PS_Helmet_Visor_V8_AO.jpg',             // static base ao
                                // './assets/helmet/visor/V8/1k/F1PS_Helmet_Visor_V8_Metal.jpg',          // static base metal
                                // './assets/helmet/visor/V8/1k/F1PS_Helmet_Visor_V8_Roughness.jpg'     // static base rough


                            ];

    }


}

export { F1AssetFileNames };
