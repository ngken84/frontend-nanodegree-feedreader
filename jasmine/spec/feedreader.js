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

         // Test to determine if user is able to add a new feed to 
         // the application
         it('user is able to add a new feed', function() {
            var newFeed = { name: 'new feed', url: 'http://www.fake.net'};
            addNewFeed(newFeed);
            var testVal = $.inArray(newFeed, allFeeds);
            expect(testVal).toBe(true);
         });

         // Test to determine if user is able to remove a feed
         it('user is able to remove a feed', function() {
            var feedToRemove = allFeeds[0];
            removeFeed(0);
            var testVal = $.inArray(feedToRemove, allFeeds);
            expect(testVal).toBe(false);
         });

    });

    describe('Favorite Feeds', function() {

        // Test to determine if a user is able to add a favorite feed
        it('user is able to add a favorite feed', function() {
            var newFavFeed = allFeeds[0];
            addFavoriteFeed(newFavFeed);
            var testVal = $.inArray(newFavFeed, favoriteFeeds);
            expect(testVal).toBe(true);
        });
    })

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
            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
          });

      });

    describe('Initial Entries', function() {

         beforeEach(function(done) {
            loadFeed(0, done);
         });

         // Ensure that after loading a feed, there is at least one entry
         it('after loadFeed, there is at least a single entry element in the feed container', function() {
            expect($('.entry').length).toBeGreaterThan(0);
         });
    });

    describe('New Feed Selection', function() {

         // this holds the previous Feed's entries to compare to the new feed entry
         var previousFeedData;

         beforeEach(function(done) {
            loadFeed(0, function() {
                previousFeedData = $('.feed').html();
                loadFeed(1, done);
            })
         });

        // Test to see if a new feed is selected, the html in the feed div is different
        it('load feed new feed correctly', function() {
            var entries = $('.entry');
            var retVal = $('.feed').html() === previousFeedData;
            expect(retVal).toBe(false);
        });

     });

}());
