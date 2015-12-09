window['__onGCastApiAvailable'] = function(loaded, errorInfo)
{
	if (loaded)
	{
		initializeCastApi();
	} else
	{
		console.log(errorInfo);
	}
}

var currentMediaURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';

var session;

initializeCastApi = function()
{
	var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
	var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
	
	chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

function launchApp()
{
	chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

function loadMedia()
{
	var mediaInfo = new chrome.cast.media.MediaInfo(currentMediaURL);
	var request = new chrome.cast.media.LoadRequest(mediaInfo);
	
	session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
	
	function onMediaDiscovered(how, media)
	{
		currentMedia = media;
	}
}

function onRequestSessionSuccess(e)
{
	session = e;
}

function receiverListener(e)
{
	if (e === chrome.cast.ReceiverAvailability.AVAILABLE)
	{
		
	}
}

function sessionListener(e)
{
	session = e;
	
	if (session.media.length != 0)
	{
		onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
	}
}

function onInitSuccess(e)
{
	
}

function onError(e)
{
	
}

function onLaunchError(e)
{
	
}

function onMediaError(e)
{
	}