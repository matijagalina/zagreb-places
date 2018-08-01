const CLIENT_ID = 'KLK03YFGYUM2RATX5DN10ICGGGKCZKQZZ5PZHI5DN2NXGBMW'
const CLIENT_SECRET = '4SZT545QQER5DAWGYWFSMCRIPUHCLT0CMZ0A4ANYMIGZP02Z'
const VERSION = '20180323'
// const idUrl = 'https://api.foursquare.com/v2/venues/search'
const detailsUrl = 'https://api.foursquare.com/v2/venues/'


// export function getVenue(lat, lng) {

//   return new Promise(
//     function (resolve, reject) {
//       fetch(idUrl + '?ll=' + lat + ',' + lng + '&v=' + VERSION + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET)
//         .then(function (response) { return response.json() })
//         .then(function (response) {
//           resolve(response);
//         })
//         .catch(function (error) {
//           reject(error);
//         });
//     }
//   )
// }

export function getVenueDetails(id) {

  return new Promise(
    function (resolve, reject) {
      fetch(detailsUrl + id + '?v=' + VERSION + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET)
        .then(function (response) { return response.json() })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    }
  )
}
