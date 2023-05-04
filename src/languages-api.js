export default async function (lang) {
    try {
      console.log(lang, 'lang')
  
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
  
      const url = 'https://f1-cms.com/api/pit-portal-websites?'
      const params = new URLSearchParams({
        locale: lang,
      })
      const token = '8519d023a29ce54d24fb80cf4b59b555ee2d7e9f7c5793e757703a5db15e293c639c3b0ebc00c1d39e1af9397c136ca119c7cb719c010d138b125916b740f10a70b314d6600fe5f51532a6463f7d082d114a4df80bf034d4281cc23222a06c62311e6e4cf3169aa59726fb6650506e1c7c5a10c2fee7586683dcb263ece1beeb'
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
  
      const responce = await fetch(url + params, {
        method: 'GET',
        headers,
      })
  
      const parseData = await responce.json()
  
      console.log(parseData, 'parseData')
  
      if (parseData && parseData.data && parseData.data.length > 0) {
        return parseData.data[0]?.attributes || {}
      }
    } catch (err) {
      console.error(err, 'languages-api')
    }
  
    return {}
  }
  