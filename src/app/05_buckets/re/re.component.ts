
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const tab:string = "\t";
const newline:string = "\n";
const sampleCode:string = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ" + newline + "0123456789 _+-.,!@#$%^&*();\/|<>\"\'" + newline + "12345 -98.7 3.141 .6180 9,000 +42" + newline + "555.123.4567" + tab + "+1-(800)-555-2468" + newline + "foo@demo.net" + tab + "bar.ba@test.co.uk" + newline + "www.demo.com" + tab + "http://foo.co.uk" + newline + "http://donotfold.be/foo.html?q=bar" + newline + "http://donotfold.be";
const regexData:object[] = [
	{
		"title": "Allright. Let's get started!",
		"body": "<p>Use the arrows above or on your keyboard to navigate.</p>",
		"code": null,
		"regex": null,
		"info": null,
		"flags": null
	},
	{
		"title": "Character classes",
		"body": "<p>Let's try to catch the fox...</p>",
		"code": "The quick brown fox jumps over the lazy dog.",
		"regex": "fox",
		"info": "Check! Easy, no? ;)",
		"flags": null
	},
	{
		"title": "Alternation",
		"body": "<p>Let's catch all the animals now.</p>",
		"code": "The quick brown fox jumps over the lazy dog.",
		"regex": "fox|dog",
		"info": "<p>Use the pipe character to alternate between expressions. It acts like a boolean OR.</p>",
		"flags": null
	},
	{
		"title": "Character classes",
		"body": "<p>Let's find all word characters, alphanumeric and underscore.</p>",
		"code": sampleCode,
		"regex": "\\w",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.</p>",
		"flags": null
	},
	{
		"title": "Character classes",
		"body": "<p>Carefull though! ;)</p>",
		"code": sampleCode + newline + newline + "Merde, mon français est très pauvre.",
		"regex": "\\w",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.</p>",
		"flags": null
	},
	{
		"title": "Quantifiers",
		"body": "<p>Let's group them together.</p>",
		"code": sampleCode,
		"regex": "\\w+",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.<br />The <code>+</code> sign matches 1 or more of the preceding token.</p>",
		"flags": null
	},
	{
		"title": "Quantifiers",
		"body": "<p>There are different methods to group multiple items, here's the same result.</p>",
		"code": sampleCode,
		"regex": "\\w{1,}",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.<br />The <code>{1,}</code> part matches 1 or more of the preceding token.</p>",
		"flags": null
	},
	{
		"title": "Quantifiers",
		"body": "<p>There are different methods to group multiple items, here's the same result.</p>",
		"code": sampleCode,
		"regex": "\\w{2,3}",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.<br />Use <code>{a,b}</code> to match at least <code>a</code> and maximum <code>b</code> instances, for example <code>{2,3}</code> to match at least 2 and maxium 3 instances.</p>",
		"flags": null
	},
	{
		"title": "Quantifiers",
		"body": "<p>Use an asterisk to match 0 or more of the preceding tokens.</p>",
		"code": sampleCode,
		"regex": "\\w*",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.<br />The <code>*</code> matches the preceding expression 0 or more times, equivalent to <code>{0,}</code>.</p>",
		"flags": null
	},
	{
		"title": "Quantifiers",
		"body": "<p>Another option is the questionmark. It matches the preceding expression 0 or 1 time.</p>",
		"code": sampleCode,
		"regex": "\\w?",
		"info": "<p><code>\\w</code> matches any word character, alphanumeric and underscore.<br />The <code>?</code> matches the preceding expression 0 or 1 time, equivalent to <code>{0,1}</code>.</p>",
		"flags": null
	},
	{
		"title": "Quantifiers",
		"body": "<p>A good example of the questionmark:</p>",
		"code": "Should I write colouur, colour or color?! Let's use colour!",
		"regex": "colou?r",
		"info": "<p>The <code>?</code> matches the preceding expression 0 or 1 time, equivalent to <code>{0,1}</code>.</p>",
		"flags": null
	},
	{
		"title": "Character classes",
		"body": "<p>Let's catch any character, except line breaks.</p>",
		"code": sampleCode,
		"regex": ".",
		"info": "<p>The dot matches any character except line breaks.</p>",
		"flags": null
	},
	{
		"title": "Character classes",
		"body": "<p>You'll often see this: <code>.*</code><br />This will group every character together, except line breaks.</p>",
		"code": sampleCode,
		"regex": ".*",
		"info": "<p>My personal experience with regular expressions is that you should try to avoid using <code>.*</code> whenever you can, because people tend to catch more than they want. But sometimes you just want to catch everything.</p>",
		"flags": null
	},
	{
		"title": "Escaped characters",
		"body": "<p>What if you want to search for a dot?</p>",
		"code": sampleCode,
		"regex": "\\.",
		"info": "Some characters have a special meaning in regular expressions and must be escaped when you're searching for them.",
		"flags": null
	},
	{
		"title": "Escaped characters",
		"body": "<p>Here's a list of charachters to escape:<br /><code>tab: \\t<br />line feed: \\n<br />carriage return: \\r<br />backslash: \\\\<br />etc: \\. \\+ \\* \\? \\/ \\| \\$ \\^ \\( \\) \\[ \\] \\{ \\} ...</code></p>",
		"code": sampleCode,
		"regex": "\\|",
		"info": null,
		"flags": null
	},
	{
		"title": "Still catching on?",
		"body": "<p>Good! Because this was only the beginning :)<br />Let's talk about flags and anchors, and a couple of character classes I've skipped.</p>",
		"code": null,
		"regex": null,
		"info": "<p>Let's go!</p>",
		"flags": null
	},
	{
		"title": "Flags",
		"body": "<p>Expression flags change how the expression is interpreted. Depending on your programming language, there are maximum three flags: <code>g</code>, <code>i</code> or <code>m</code>. You can combine them to your likes.</p><p>In javascript flags follow the backslash of the expression:</p>",
		"code": sampleCode,
		"regex": "d",
		"info": "<blockquote><strong>ATTENTION!</strong><br />In all previous examples in this demo, all three flags where hidden to you, but all three where enabled!</blockquote><p>Let's get into detail flag by flag...</p>",
		"flags": "gim"
	},
	{
		"title": "Flags",
		"body": "<p><code>g</code> stands for 'global search'.</p><p>When you remove this flag, the regular expression will return only one (the first) match.</p>",
		"code": sampleCode,
		"regex": "d",
		"info": null,
		"flags": "g"
	},
	{
		"title": "Flags",
		"body": "<p><code>g</code> stands for 'global search'.</p><p>When you remove this flag, the regular expression will return only one (the first) match.</p>",
		"code": sampleCode,
		"regex": "d",
		"info": null,
		"flags": ""
	},
	{
		"title": "Flags",
		"body": "<p><code>i</code> stands for 'ignore case'.</p>",
		"code": sampleCode,
		"regex": "d",
		"info": null,
		"flags": "gi"
	},
	{
		"title": "Flags",
		"body": "<p><code>i</code> stands for 'ignore case'.</p>",
		"code": sampleCode,
		"regex": "d",
		"info": "<p>So <code>/<strong>d|D</strong>/</code> will give the same result as <code>/<strong>d</strong>/i</code>.</p>",
		"flags": "g"
	},
	{
		"title": "Flags",
		"body": "<p><code>m</code> stands for 'multiline'.</p><p>But before I can explain multiline, you need to know about anchors...</p>",
		"code": null,
		"regex": null,
		"info": null,
		"flags": null
	},
	{
		"title": "Anchors",
		"body": "<p>An anchor matches a position, not a character. To match the beginning of a string, you can use the <code>^</code> anchor.</p>",
		"code": sampleCode,
		"regex": "^5",
		"info": "<p>Note that the other <code>5</code> charachters aren't selected because they aren't at the beginning of a line.</p>",
		"flags": "gim"
	},
	{
		"title": "Anchors",
		"body": "<p>To match the end of a string, you can use the <code>$</code> anchor.</p>",
		"code": sampleCode,
		"regex": "\\w+$",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Flags",
		"body": "<p>The multiline flag in the previous examples was enabled. Here's the result with the multiline disabled:</p>",
		"code": sampleCode,
		"regex": "\\w+$",
		"info": "<p>Without the multiline flag, the beginning or end anchors look for the beginning or end of the whole string, not the line.</p>",
		"flags": "gi"
	},
	{
		"title": "Anchors",
		"body": "<p>Another type of anchors are word boundaries.</p><p>Use <code>\\b</code> to find the position (not a character) of a word. Word boundaries are found by whitespaces, punctuation or the start/end of a string.</p><p>Let's look for <code>ab</code> <em>without</em> the word boundary:</p>",
		"code": "ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me girl<br />ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me abc girl",
		"regex": "ab",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Anchors",
		"body": "<p>Another type of anchors are word boundaries.</p><p>Use <code>\\b</code> to find the position (not a character) of a word. Word boundaries are found by whitespaces, punctuation or the start/end of a string.</p><p>Now let's look for <code>ab</code> <em>with</em> a word boundary before it:</p>",
		"code": "ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me girl<br />ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me abc girl",
		"regex": "\\bab",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Anchors",
		"body": "<p>A good example of using a word boundary might be this:</p>",
		"code": "Hey Yousef, you and me look great in that YouTube movie. Did your younger brother make it?",
		"regex": "\\byou\\b",
		"info": "<p>Note that only the <code>you</code> has been matched, not the 'Yousef', 'YouTube', 'your' and 'younger' because of the word boundaries.</p>",
		"flags": "gim"
	},
	{
		"title": "Anchors",
		"body": "<p>If you use a capital B instead of the lowercase version, it will work the other way around:</p>",
		"code": "Hey Yousef, you and me look great in that YouTube movie. Did your younger brother make it?",
		"regex": "you\\B",
		"info": "<p>A <code>\\B</code> matches any position that is not a word boundary.</p>",
		"flags": "gim"
	},
	{
		"title": "Character classes",
		"body": "<p>Earlier in this demo you saw the use of <code>\\w</code> to catch a word caracter (alphanumeric &amp; underscore). If you want to catch everything except these, use a capital:</p>",
		"code": sampleCode,
		"regex": "\\W",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Character classes",
		"body": "<p>Next to word characters, you can also catch a digit:</p>",
		"code": sampleCode,
		"regex": "\\d",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Character classes",
		"body": "<p>Or the other way around by using a capital:</p>",
		"code": sampleCode,
		"regex": "\\D",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Character classes",
		"body": "<p>Same story for a whitespace character (matches spaces, tabs and line breaks):</p>",
		"code": sampleCode,
		"regex": "\\s",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Character classes",
		"body": "<p>And again, the other way around by using a capital:</p>",
		"code": sampleCode,
		"regex": "\\S",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Character classes",
		"body": "<p>Hm, wait... what if I catch 'whitespaces' and 'no whitespaces'?</p>",
		"code": sampleCode,
		"regex": "\\s|\\S",
		"info": "Check. This selects everything, because I search for whitespaces with <code>\\s</code> OR (with the pipe character) no whitespaces <code>\\S</code>.",
		"flags": "gim"
	},
	{
		"title": "Still catching on?",
		"body": "<p>Good! Because you might have started realizing regular expressions can get pretty complex?<br />Lets go to the next level and talk about groups and lookarounds...</p>",
		"code": null,
		"regex": null,
		"info": null,
		"flags": null
	},
	{
		"title": "Capturing group",
		"body": "<p>Round brackets have two functions:</p><ol><li>they group multiple tokens together</li><li>they create a capture group for extracting a substring or using a backreference</li></ol><p>Let's talk about grouping first...</p>",
		"code": null,
		"regex": null,
		"info": null,
		"flags": null
	},
	{
		"title": "Capturing group",
		"body": "<p>Use round brackets to group multiple tokens:</p>",
		"code": "Hahaha, this is getting complex :') haha hah!",
		"regex": "(ha)+",
		"info": "<p>In this example we look for <code>ha</code> and placed round brackets around both characters to group them.<br />The plus sign matches 1 or more of the previous token, in this case the 'ha' group.</p><p>If we wouldn't group the 'ha'-characters with brackets, the plus sign would only work on the 'a'.</p>",
		"flags": "gim"
	},
	{
		"title": "Capturing group",
		"body": "<p>The other function is to capture a group. A capture group remembers the value of the match.</p>",
		"code": "LOL... if you say pap in Flanders it means dad or porridge... #weeeeird",
		"regex": "(\\w)a\\1",
		"info": "<p>The <code>(\\w)</code> makes a capture group of a word character.<br />The <code>a</code> just looks for a 'a' character.<br />And the <code>\\1</code> matches the result of the first capture group, we call it a backreference.</p><p>Note that the regex didn't catch the LOL because there's no <code>a</code> in the middle and also didn't catch the <code>say</code> in the sentence because the first and last character aren't the same.</p>",
		"flags": "gim"
	},
	{
		"title": "Capturing group",
		"body": "<p>You can use multiple capturing groups in your regular expression, and even groups within groups. The backreference matches the reference of a previous capture group. For example <code>\\1</code> matches the result of the first capture group, <code>\\2</code> the second, etc.</p>",
		"code": "The ghost said booooooo booboo booooooboo!",
		"regex": "(b)(o)\\2\\1",
		"info": "<p>Wooops :P</p>",
		"flags": "gim"
	},
	{
		"title": "Non-capturing group",
		"body": "<p>But what if I want to group a bunch of characters, but don't want to mess up my backreferences?!</p><p>Easy, there are 'non-capturing groups':</p>",
		"code": "Foo and bar are foolish words, don't you think?",
		"regex": "(?:foo)\\w",
		"info": "<p>The <code>(?:foo)</code> groups these multiple tokens together: <code>foo</code>, without creating a capture group. So you won't be able to use a backreference like <code>\\1</code>. Might sound weird now, but it's definitely usefull in many cases.</p><p>Note that the regex doesn't match <code>Foo</code> because of the <code>\\w</code> after the group, it matches a word character, remember?</p>",
		"flags": "gim"
	},
	{
		"title": "Positive lookahead",
		"body": "<p>Lookaheads can be used to match a token without including it in the result.<br />For example:</p>",
		"code": "ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me girl<br />ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me abc girl",
		"regex": "a(?=bc)",
		"info": "<p>The <code>a</code> looks for all a-characters, but the <code>(?=bc)</code> group (positive lookahead) makes sure the a will only be matched when the <code>a</code> is followed by <code>bc</code>.</p><p>Note that we only match the <code>a</code>, not the whole regex. Otherwise we could have just looked for <code>/abc/gim</code>.</p>",
		"flags": "gim"
	},
	{
		"title": "Negative lookahead",
		"body": "<p>Rather work the other way around, and only match the <code>a</code> when it's not followed by <code>bc</code>?<br />Use a negative lookahead:</p>",
		"code": "ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me girl<br />ABC<br />It's easy as, 123<br />As simple as, do re mi<br />ABC, 123<br />Baby, you and me abc girl",
		"regex": "a(?!bc)",
		"info": "<p>The <code>a</code> looks for all a-characters, but the <code>(?!bc)</code> group (negative lookahead) makes sure the a will only be matched when the <code>a</code> isn't followed by <code>bc</code>.</p>",
		"flags": "gim"
	},
	{
		"title": "Still catching on?",
		"body": "<p>It's getting complex, no?<br />We're almost there... #fiew</p>",
		"code": null,
		"regex": null,
		"info": null,
		"flags": null
	},
	{
		"title": "Character sets",
		"body": "<p>Character sets are easy to match any character in a set, here's an example:</p>",
		"code": sampleCode,
		"regex": "[abc]",
		"info": "<p>Use square brackets to make a character set. In this example we look for all individual word characters in the set. It's similar to <code>a|b|c</code>.</p>",
		"flags": "gim"
	},
	{
		"title": "Negated set",
		"body": "<p>If you want to match any character that's <strong>not</strong> in the character set, use a circumflex at the start of the set:</p>",
		"code": sampleCode,
		"regex": "[^abc]",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Range",
		"body": "<p>Another function of the square brackets are ranges. It matches a character with a character code between two specified caracters (this includes the ones you specify).</p>",
		"code": sampleCode,
		"regex": "[e-p]",
		"info": "<p>Use square brackets to make a character set and set a range with a dash character. In this example we look for all word characters with a character code from <code>e</code> to <code>p</code>.</p>",
		"flags": "gim"
	},
	{
		"title": "Range",
		"body": "<p>This works for numbers too:</p>",
		"code": sampleCode,
		"regex": "[4-8]",
		"info": null,
		"flags": "gim"
	},
	{
		"title": "Negated range",
		"body": "<p>If you want to match everything that's <strong>not</strong> in a character range, use a circumflex character at the start of the set:</p>",
		"code": sampleCode,
		"regex": "[^4-8]",
		"info": "<p>Carefull though, as you can see, it doesn't match all numbers that aren't in the set, but matches any character that isn't in the set.</p>",
		"flags": "gim"
	},
	{
		"title": "Awesome!",
		"body": "<p>You're at the end of my demo!<br />I hope you learned a lot from this.</p><p>If you still have some time, let's go through some demo's of regular expressions now...</p>",
		"code": null,
		"regex": null,
		"info": null,
		"flags": "gim"
	}
];

@Component({
	selector: 're-component',
	templateUrl: './re.component.html'
})

export class REComponent {

	paramsSubscription:any;
	data:object[];

	step:number;
	steps:number;
	current:object;

	constructor(private router:Router,
				private activatedRoute:ActivatedRoute) {}

	ngOnInit() {

		document['REgexKeydown'] = (key:any) => {

			if(key.which === 37) { this.prev(); }
			if(key.which === 39) { this.next(); }

		};

		document.removeEventListener('keydown', document['REgexKeydown']);
		document.addEventListener('keydown', document['REgexKeydown']);

		this.paramsSubscription = this.activatedRoute.params.subscribe(params => {

			this.step = parseInt(params['re']) || 1;
			this.data = regexData;
			this.steps = this.data.length;

			if(this.data[this.step - 1]) {

				this.current = this.data[this.step - 1];

			} else {

				this.router.navigateByUrl('/woops');

			}

		});

	}

	next() { this.goto(this.step + 1); }
	prev() { this.goto(this.step - 1); }

	goto(step:number) {

		let goto:string = '/';

		if(step > this.steps) {

			goto += 'demos';

		} else if(step >= 1) {

			goto += 're/' + step;

		}

		this.router.navigateByUrl(goto);

	}

	ngOnDestroy() {

		document.removeEventListener('keydown', document['REgexKeydown'] || null);

		if(this.paramsSubscription) {

			this.paramsSubscription.unsubscribe();

		}

	}

}
