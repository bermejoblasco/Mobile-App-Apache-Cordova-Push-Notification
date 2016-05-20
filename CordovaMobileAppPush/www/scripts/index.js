// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var element = document.getElementById("deviceready");
        element.innerHTML = 'Device Ready';
        element.className += ' ready';

        var client = new WindowsAzure.MobileServiceClient('https://xxx.azurewebsites.net');
        var pushOptions = {
            android: {
                senderID: 'your poroject number'                            
            },
            ios: {
                alert: true,
                badge: true,
                sound: true
            },
            windows: {
            }
        };

        var pushHandler = PushNotification.init(pushOptions);


        pushHandler.on('registration', function (data) {                        
            // For cross-platform, you can use the device plugin to determine the device
            // Best is to use device.platform
            var name = 'gcm'; // For android - default
            if (device.platform.toLowerCase() === 'ios')
                name = 'apns';
            if (device.platform.toLowerCase().substring(0, 3) === 'win')
                name = 'wns';
            client.push.register(name, data.registrationId);            
        });

        pushHandler.on('notification', function (data) {
            // data is an object and is whatever is sent by the PNS - check the format
            // for your particular PNS
            alert("Notification: " + data.message)
        });

        pushHandler.on('error', function (error) {
            // Handle errors
            alert("error push: " + error)
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();