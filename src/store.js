if (window && !window.store) {
    window.store = {
      userData: {
        c: 0,
        uuid: 0,
        lan: 'en',
        fname: '',
        lname: '',
        dob: '1948-06-31',
      },
      languageData: {},
      activeScreen: 'splash',
      activePopup: '',
      AWSConfig: null,
      settingGUI: {},
      currentMarker: '',
      runAfterLoading: () => {
      },
    }
}
  
      // this.userID = 'noID'
      // this.modelType = 'c'
      // this.datetimestamp = 'nodate'
      // this.adminUser = false
      // this.languageCode = 'en'
      // this.languageFileAWS = 'english.json'