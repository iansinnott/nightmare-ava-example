import test from 'ava';
import Nightmare from 'nightmare';

const nightmare = Nightmare({ show: true });

/**
 * NOTE: Tests are run serially (as opposed to the default of concurrently)
 * because otherwise errors are thrown. I'm not clear on why just yet, but it
 * may be something to do with using only a single instance of Nightmare for all
 * concurrent tests.
 *
 * This problem can be solved by creating multiple instances of Nightmare in
 * each concurrent tests. For our purposes here I chose to demonstrate serial
 * tests instead, which do allow us to use only one Nightmare instance.
 */

test.serial('Generators!', function * (t) {
  const result = yield nightmare
    .goto('http://yahoo.com')
    .type('form[action*="/search"] [name=p]', 'github nightmare')
    .click('form[action*="/search"] [type=submit]')
    .wait('#main')
    .evaluate(function () {
      return document.querySelector('#main .searchCenterMiddle li a').href;
    });

  t.true(result.includes('images.search.yahoo.com'));
});

test.serial('Async/Await!', async t => {
  const result = await nightmare
    .goto('http://yahoo.com')
    .type('form[action*="/search"] [name=p]', 'github nightmare')
    .click('form[action*="/search"] [type=submit]')
    .wait('#main')
    .evaluate(function () {
      return document.querySelector('#main .searchCenterMiddle li a').href;
    });

  t.true(result.includes('images.search.yahoo.com'));
});

