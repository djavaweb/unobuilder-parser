import test from 'ava'
import HTMLParser from '../src/index'

var html = `
<div id="test" class="test abc def" kind="row" editable style="background-color: red">
  <div class="abc" kind="column">
    <img src="test" class="test" />
    <span>Text</span>
  </div>
  test abarakadabara
<h1 class="momomo__hello momomo__hello-test">
  hello    world baba
</h1>
  <div class="uyt" kind="column">
    <button>abc</button>
  </div>
</div>
`

var htmlparser = new HTMLParser(html)

test('HTMLParser return an object', t => {
	t.is(typeof htmlparser, 'object')
});
