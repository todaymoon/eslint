/**
 * @fileoverview Tests for no-warning-comments rule.
 * @author Alexander Schmidt <https://github.com/lxanders>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-warning-comments"),
	RuleTester = require("../../../lib/rule-tester/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-warning-comments", rule, {
	valid: [
		{ code: "// any comment", options: [{ terms: ["fixme"] }] },
		{ code: "// any comment", options: [{ terms: ["fixme", "todo"] }] },
		"// any comment",
		{ code: "// any comment", options: [{ location: "anywhere" }] },
		{
			code: "// any comment with TODO, FIXME or XXX",
			options: [{ location: "start" }],
		},
		"// any comment with TODO, FIXME or XXX",
		{ code: "/* any block comment */", options: [{ terms: ["fixme"] }] },
		{
			code: "/* any block comment */",
			options: [{ terms: ["fixme", "todo"] }],
		},
		"/* any block comment */",
		{
			code: "/* any block comment */",
			options: [{ location: "anywhere" }],
		},
		{
			code: "/* any block comment with TODO, FIXME or XXX */",
			options: [{ location: "start" }],
		},
		"/* any block comment with TODO, FIXME or XXX */",
		"/* any block comment with (TODO, FIXME's or XXX!) */",
		{
			code: "// comments containing terms as substrings like TodoMVC",
			options: [{ terms: ["todo"], location: "anywhere" }],
		},
		{
			code: "// special regex characters don't cause a problem",
			options: [{ terms: ["[aeiou]"], location: "anywhere" }],
		},
		'/*eslint no-warning-comments: [2, { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }]*/\n\nvar x = 10;\n',
		{
			code: '/*eslint no-warning-comments: [2, { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }]*/\n\nvar x = 10;\n',
			options: [{ location: "anywhere" }],
		},
		{ code: "// foo", options: [{ terms: ["foo-bar"] }] },
		"/** multi-line block comment with lines starting with\nTODO\nFIXME or\nXXX\n*/",
		{ code: "//!TODO ", options: [{ decoration: ["*"] }] },
	],
	invalid: [
		{
			code: "// fixme",
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "fixme" },
				},
			],
		},
		{
			code: "// any fixme",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "any fixme" },
				},
			],
		},
		{
			code: "// any fixme",
			options: [{ terms: ["fixme"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "any fixme" },
				},
			],
		},
		{
			code: "// any FIXME",
			options: [{ terms: ["fixme"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "any FIXME" },
				},
			],
		},
		{
			code: "// any fIxMe",
			options: [{ terms: ["fixme"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "any fIxMe" },
				},
			],
		},
		{
			code: "/* any fixme */",
			options: [{ terms: ["FIXME"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "FIXME", comment: "any fixme" },
				},
			],
		},
		{
			code: "/* any FIXME */",
			options: [{ terms: ["FIXME"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "FIXME", comment: "any FIXME" },
				},
			],
		},
		{
			code: "/* any fIxMe */",
			options: [{ terms: ["FIXME"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "FIXME", comment: "any fIxMe" },
				},
			],
		},
		{
			code: "// any fixme or todo",
			options: [{ terms: ["fixme", "todo"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "any fixme or todo",
					},
				},
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "todo", comment: "any fixme or todo" },
				},
			],
		},
		{
			code: "/* any fixme or todo */",
			options: [{ terms: ["fixme", "todo"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "any fixme or todo",
					},
				},
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "todo", comment: "any fixme or todo" },
				},
			],
		},
		{
			code: "/* any fixme or todo */",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "todo", comment: "any fixme or todo" },
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "any fixme or todo",
					},
				},
			],
		},
		{
			code: "/* fixme and todo */",
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "fixme and todo" },
				},
			],
		},
		{
			code: "/* fixme and todo */",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "todo", comment: "fixme and todo" },
				},
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "fixme and todo" },
				},
			],
		},
		{
			code: "/* any fixme */",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "any fixme" },
				},
			],
		},
		{
			code: "/* fixme! */",
			options: [{ terms: ["fixme"] }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "fixme", comment: "fixme!" },
				},
			],
		},
		{
			code: "// regex [litera|$]",
			options: [{ terms: ["[litera|$]"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "[litera|$]",
						comment: "regex [litera|$]",
					},
				},
			],
		},
		{
			code: "/* eslint one-var: 2 */",
			options: [{ terms: ["eslint"] }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "eslint",
						comment: "eslint one-var: 2",
					},
				},
			],
		},
		{
			code: "/* eslint one-var: 2 */",
			options: [{ terms: ["one"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: { matchedTerm: "one", comment: "eslint one-var: 2" },
				},
			],
		},
		{
			code: "/* any block comment with TODO, FIXME or XXX */",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "any block comment with TODO, FIXME or...",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "any block comment with TODO, FIXME or...",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "xxx",
						comment: "any block comment with TODO, FIXME or...",
					},
				},
			],
		},
		{
			code: "/* any block comment with (TODO, FIXME's or XXX!) */",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "any block comment with (TODO, FIXME's or...",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "any block comment with (TODO, FIXME's or...",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "xxx",
						comment: "any block comment with (TODO, FIXME's or...",
					},
				},
			],
		},
		{
			code: "/** \n *any block comment \n*with (TODO, FIXME's or XXX!) **/",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "* *any block comment *with (TODO,...",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "* *any block comment *with (TODO,...",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "xxx",
						comment: "* *any block comment *with (TODO,...",
					},
				},
			],
		},
		{
			code: "// any comment with TODO, FIXME or XXX",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "any comment with TODO, FIXME or XXX",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "fixme",
						comment: "any comment with TODO, FIXME or XXX",
					},
				},
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "xxx",
						comment: "any comment with TODO, FIXME or XXX",
					},
				},
			],
		},
		{
			code: "// TODO: something small",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "TODO: something small",
					},
				},
			],
		},
		{
			code: "// TODO: something really longer than 40 characters",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "TODO: something really longer than 40...",
					},
				},
			],
		},
		{
			code: "/* TODO: something \n really longer than 40 characters \n and also a new line */",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "TODO: something really longer than 40...",
					},
				},
			],
		},
		{
			code: "// TODO: small",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "TODO: small",
					},
				},
			],
		},
		{
			code: "// https://github.com/eslint/eslint/pull/13522#discussion_r470293411 TODO",
			options: [{ location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "...",
					},
				},
			],
		},
		{
			code: "// Comment ending with term followed by punctuation TODO!",
			options: [{ terms: ["todo"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "Comment ending with term followed by...",
					},
				},
			],
		},
		{
			code: "// Comment ending with term including punctuation TODO!",
			options: [{ terms: ["todo!"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo!",
						comment: "Comment ending with term including...",
					},
				},
			],
		},
		{
			code: "// Comment ending with term including punctuation followed by more TODO!!!",
			options: [{ terms: ["todo!"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo!",
						comment: "Comment ending with term including...",
					},
				},
			],
		},
		{
			code: "// !TODO comment starting with term preceded by punctuation",
			options: [{ terms: ["todo"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "!TODO comment starting with term...",
					},
				},
			],
		},
		{
			code: "// !TODO comment starting with term including punctuation",
			options: [{ terms: ["!todo"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "!todo",
						comment: "!TODO comment starting with term...",
					},
				},
			],
		},
		{
			code: "// !!!TODO comment starting with term including punctuation preceded by more",
			options: [{ terms: ["!todo"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "!todo",
						comment: "!!!TODO comment starting with term...",
					},
				},
			],
		},
		{
			code: "// FIX!term ending with punctuation followed word character",
			options: [{ terms: ["FIX!"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "FIX!",
						comment: "FIX!term ending with punctuation...",
					},
				},
			],
		},
		{
			code: "// Term starting with punctuation preceded word character!FIX",
			options: [{ terms: ["!FIX"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "!FIX",
						comment: "Term starting with punctuation preceded...",
					},
				},
			],
		},
		{
			code: "//!XXX comment starting with no spaces (anywhere)",
			options: [{ terms: ["!xxx"], location: "anywhere" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "!xxx",
						comment: "!XXX comment starting with no spaces...",
					},
				},
			],
		},
		{
			code: "//!XXX comment starting with no spaces (start)",
			options: [{ terms: ["!xxx"], location: "start" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "!xxx",
						comment: "!XXX comment starting with no spaces...",
					},
				},
			],
		},
		{
			code: "/*\nTODO undecorated multi-line block comment (start)\n*/",
			options: [{ terms: ["todo"], location: "start" }],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "TODO undecorated multi-line block...",
					},
				},
			],
		},
		{
			code: "///// TODO decorated single-line comment with decoration array \n /////",
			options: [
				{ terms: ["todo"], location: "start", decoration: ["*", "/"] },
			],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "/// TODO decorated single-line comment...",
					},
				},
			],
		},
		{
			code: "///*/*/ TODO decorated single-line comment with multiple decoration characters (start) \n /////",
			options: [
				{ terms: ["todo"], location: "start", decoration: ["*", "/"] },
			],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "todo",
						comment: "/*/*/ TODO decorated single-line comment...",
					},
				},
			],
		},
		{
			code: "//**TODO term starts with a decoration character",
			options: [
				{ terms: ["*todo"], location: "start", decoration: ["*"] },
			],
			errors: [
				{
					messageId: "unexpectedComment",
					data: {
						matchedTerm: "*todo",
						comment: "**TODO term starts with a decoration...",
					},
				},
			],
		},
	],
});
