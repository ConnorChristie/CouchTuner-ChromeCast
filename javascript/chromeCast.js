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

var currentMediaURL = 'http://89.36.224.55/2t4w5d22azv5epwppnxs25o3du4oafkgqdjdgbsffzl4ykumi2z3nxj3fsea/tn6i0jqegabk_n.ts?video=0';

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
	
	mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
	mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
	mediaInfo.contentType = 'video/mp4';
	
	mediaInfo.metadata.title = 'CouchTuner';
	
	var request = new chrome.cast.media.LoadRequest(mediaInfo);
	request.autoplay = true;
	request.currentTime = 0;
	
	session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
	
	function onMediaDiscovered(how, media)
	{
		currentMedia = media;
		
		media.addUpdateListener(onMediaStatusUpdate);
	}
}

function onMediaStatusUpdate(e)
{
	
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