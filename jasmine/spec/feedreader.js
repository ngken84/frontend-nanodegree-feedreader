/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         // Tests to determine that each feed's url is defined and 
         // not empty
         it('each feed should have a url', function() {
            for(var i = 0, x = allFeeds.length; i < x; ++i) {
                expect(allFeeds[i].url.length).toBeGreaterThan(0);

            }
         });


        // Tests to determine that each feed's name is defined and 
         // not empty
         it('each feed should have a name', function() {
            for(var i = 0, x = allFeeds.length; i < x; ++i) {
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
         });
    });

    describe('The menu', function() {

        var body = $('body');

         //On initial load, the menu must be invisible
         it('menu is hidden on start up', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
         });

          // Click the menu icon and determine if the menu is still hidden
          it('menu is not hidden on menu link click', function() {
            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
          });

      });

    describe('Initial Entries', function() {

         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('after loadFeed, there is at least a single entry element in the feed container', function() {
            expect($('.entry').length).toBeGreaterThan(0);
         });
    });

    describe('New Feed Selection', function() {

         // this holds the previous Feed's entries to compare to the new feed entry
         var previousFeedData = [];

         beforeEach(function(done) {

            var entries = $('.entry');
            for(var i = 0, x = entries.length; i < x; ++i) {
                previousFeedData.push(entries.get(i));
            }

            // load data from the next feed
            loadFeed(1, function() {
                done();
            });
         });

        it('load feed new feed correctly', function(done) {
            var entries = $('.entry');
            var retVal = true;
            for(var i = 0, x = Math.min(entries.length, previousFeedData.length); i < x; ++i) {
                // compare contents of the current data and previous data
                if(retVal) {
                    retVal = (previousFeedData[i].textContent === entries.get(i).textContent);
                }
            }
            expect(retVal).toBe(false);
            done();
        });

     });

}());
