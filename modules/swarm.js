/**
	@module swarm
*/

const protocol = require('protocol');
const log = require('./utils/logger').create('swarm');

module.exports = {
	/**
	Register swarm bzz and bzzr protocols. In case of an error callback will
	be called with the error. This can only be called after the app is ready.
	
	// BvK: Swarm is currently exposed over the HTTP interface. Need to discuss
	// this with Ramesh and Fabian if we can do this over the ipc interface,
	// maybe fully integrated with web3.	
	@method registerProtocol
	*/
	registerProtocol: function(host, callback) {
		log.info('register [bzz, bzzr] protocol (endpoint: ' + host + ')');
		
		// Register the bzz protocol that can be used to fetch DApp's from swarm.
		// Examples:
		//    bzz://<hash>
		//    bzz://<hash>/index.html
		protocol.registerHttpProtocol('bzz', function(request, callback) {
			// strip bzz:// prefix
			var path = request.url.substring(6);
	
			// assemble bzz url
			var url = host + '/bzz:/' + path;
			
			log.debug('fetch', url);
	
			// execute HTTP request
			callback({url: url, method: 'GET'});
	
		}, function(error) {
				if (error) {
					callback('Failed to register bzz protocol: ' + error);
				}
		});

		// Register the bzz raw protocol that can be used to fetch content by hash.
		// Examples:
		// 	bzzr://<hash>
		protocol.registerHttpProtocol('bzzr', function(request, callback) {
			// strip bzzr:// prefix
			var hash = request.url.substring(7);
	
			// assemble bzzr url
			var url = host + '/bzzr:/' + hash
	
			log.debug('fetch swarm content', url);
				
			// execute regular HTTP request
			callback({url: url, method: 'GET'});
	
		}, function(error) {
			if (error) {
				callback('Failed to register bzzr protocol: ' + error);
			}
		});
	}
};

