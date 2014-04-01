# krautli_yo#

`Krautli` is supposed to become an app that allows users to log positions of their favorite plants and find them back at times certain of their plantparts become harvestable.
It started offline as a collection of notes and photos taken with a smartphone - so the photos contain the geoposition of the photo taken - to locate the found plant later on.

Since that's pretty tideous - the idea of `Krautli` was born.


## Technical Note ##

The app will be a SPA(Single-Page-Application) that is running in a browser or a native wrapper for Android or iOS devices. Anyhow it should always work with a recent browser on every device.

### The Techstack behind: ###
- Angular JS as the frontend framework
- git as versioning / repository
- twitter bootstrap as UI Library providing interaction and visual patterns
- yeoman / grunt / bower
 - provide the development frameing
 - prototyoing setup
 - unit / integration testing 
- other dependencies
 - angularLocalStorage installed via bower https://github.com/agrublev/angularLocalStorage to be able saving app state and data in browsres local storage with simplified API and fallback to cookies


## Getting started with your development on `Krautli` ##

1. Get git running
2. SSH Config https://help.github.com/articles/generating-ssh-keys#macosx
3. Get Yeoman / Bower / Grunt --> http://www.sitepoint.com/kickstart-your-angularjs-development-with-yeoman-grunt-and-bower/ and http://blog.safaribooksonline.com/2013/07/02/web-applications-with-yeoman/
4. Checkout the code from: [repo]

## Screens and usecases ##

### Usecase 1. save a known plant for the first time ###
- wandering through forest in march
- you found blueberries and wnat to keep the position for later return
- open the `Krautli` app on your iphone
- tap `store plant position` button
- you will see a `list of all known plants` under the headline `search among known plants`
- start typing `blueberry` 
- tapping `Blueberries` in the list leads to a detail-view of `Blueberries`
- while you verify that you picked the right plant from photos you see
- you save the spot where you are by tapping the `Save this plants position`
- the position appears in the list of saved positions with date, radius and geodata



 


