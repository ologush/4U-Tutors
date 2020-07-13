var SquareConnect = require('square-connect');
var defaultClient = SquareConnect.ApiClient.instance;

defaultClient.basePath = 'https://connect.squareupsandbox.com';
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = "EAAAEJtgSBiYcxmLRJUmBidsr3qvk_FtJTi76MhIg9BVhFCDHJYR-6JR5nJoGbz4";

var api = new SquareConnect.LocationsApi();

