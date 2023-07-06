export default async function () {
    try {
  
      // const url = 'https://f1-cms.com/api/paint-shop-websites?'
      const url = 'https://f1-cms.com/api/driver-delta-languages?populate=*'
    
      const params = new URLSearchParams({
        // locale: lang,
      })
      // const params = 'lan=' + lang;
      const token = '4627d2fd8a8215feef865cd477cedfff11d01f47d0d3f36640495ac0ac094686d841d1bc03d38cea740fed6dc4cefad9071307d6b18cece7c036bcb0d1379f6100689828d1b6c726eb0348481aab93b9d125f8c6cf8f525d4fcc851edffe3aeaedddab7d91d7d1708efa6ddf11a1eda9a75831083c1535e17eccd6ed97f14125'
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

        return parseData.data || {}
        // return parseData.data[0]?.attributes || {}
      }
    } catch (err) {
      console.error(err, 'languages-list-api')
    }
  
    return {}
  }
  