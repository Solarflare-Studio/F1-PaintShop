export default async function (lang) {
    try {
      // console.log(lang, 'lang')
  
      // for test
      // const responce = await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve({
      //       attributes: {
      //         'pp_welcome_header_f1Pitportal': 'F1 Pit Portal',
      //         'pp_welcome_text_grabYourPhone': 'Grab your phone, scan the door, and see it come to life!',
      //         'pp_welcome_button_next': 'NEXT',
      //         'pp_welcome_button_back': 'BACK',
      //         'pp_permission_header_allowCam': 'Allow Camera',
      //         'pp_permission_text_enjoyExperience': 'To enjoy this experience, we need your permission to access your camera.\n',
      //         'pp_permission_button_allow': 'ALLOW\n',
      //         'pp_permission_button_deny': 'DENY\n',
      //         'pp_tutorial_header_tutorial': 'Tutorial\n',
      //         'pp_tutorial_text_fitDoorway': 'Fit the doorway in the frame of this icon.\n',
      //         'pp_tutorial_button_ok': 'OK!\n',
      //         'pp_loop_header_saySpeed': 'Say speed!\n',
      //         'pp_loop_text_getSnapHappy': 'Get snap happy. Tap the camera button to snap a shot [or hold to take a video]\n',
      //         'pp_loop_button_ok': 'OK\n',
      //         'pp_loop_button_save': 'Save\n',
      //         'pp_loop_button_share': 'Share\n',
      //         'pp_loading_header_f1paintShop': null,
      //         'pp_loading_text_prepping': null,
      //         'pp_menu_item_menu': null,
      //         'pp_menu_item_language': 'LANGUAGE',
      //         'pp_menu_item_lanEngUk': 'ENGLISH',
      //         'pp_menu_item_lanEngEsCa': 'CARRIBEAN SPANISH',
      //         'pp_menu_item_tAndC': null,
      //         'pp_menu_item_security': null,
      //       },
      //     })
      //   }, 500)
      // })
  
      const url = 'https://f1-cms.com/api/paint-shop-websites?'
      const params = new URLSearchParams({
        locale: lang,
      })
      // const params = 'lan=' + lang;
      const token = 'c93e7c383a1fb252d3e00914c6ec99f2ef5d50c407ff587c2e3923315989dddffefc5472feda9ca69db85d9c816cc897b66dc2e59ea00855b02b89940f8233d4153a262d2735024beeb91aea2cb99a75bf733b5c7ba286dcc0dd74c18bcf78fd79db9053b7f74a74a68e95d6487dc536efa8e77f689f6aae9fedbcab2e21d8b0'
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
  

      // const params = 'locale=' + lang;

      const responce = await fetch(url + params.toString(), {
        method: 'GET',
        headers,
      })
  
      const parseData = await responce.json()
  
      // console.log(parseData, 'parseData')
  
      if (parseData && parseData.data && parseData.data.length > 0) {

        // console.log('language attributes = ' + parseData.data[0].attributes)

        return parseData.data[0]?.attributes || {}
      }
    } catch (err) {
      console.error(err, 'languages-api')
    }
  
    return {}
  }
  