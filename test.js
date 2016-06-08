import test from 'ava';
import Nightmare from 'nightmare';

const nightmare = Nightmare({ show: true });

test(function * (t) {
  const result = yield nightmare
    .goto('http://yahoo.com')
    .type('form[action*="/search"] [name=p]', 'github nightmare')
    .click('form[action*="/search"] [type=submit]')
    .wait('#main')
    .evaluate(function () {
      return document.querySelector('#main .searchCenterMiddle li a').href;
    })
    .end();

  t.true(result.includes('images.search.yahoo.com'));
});

