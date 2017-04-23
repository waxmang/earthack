//connect all modules together

angular.module('earthackApp', [
    'app.routes',
    'mainCtrl',
    'uiGmapgoogle-maps'
]).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA49SaLCsV4ytd_YSkJQfWcNSW6YrW-u0E',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});
