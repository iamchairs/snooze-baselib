describe('Value', function() {
	'use strict';

	var snooze = require('snooze');
	var should = require('should');

	require('../main.js');
	snooze.module('myApp', ['snooze-baselib']);

	beforeEach(function() {
		snooze.module('myApp').EntityManager.removeEntity('val');
		snooze.module('myApp').configs.length = 0;
		snooze.module('myApp').runs.length = 0;
	});

	it('should be defined', function() {
		(typeof snooze.module('myApp').value).should.not.equal('undefined');
	});

	it('should inject an object value', function(done) {
		snooze.module('myApp')
			.value('val', {foo: 'bar'})
			.run(function(val) {
				val.foo.should.equal('bar');
				done();
			})
			.wakeup();
	});

	it('should inject an array value', function(done) {
		snooze.module('myApp')
			.value('val', ['foo'])
			.run(function(val) {
				val[0].should.equal('foo');
				done();
			})
			.wakeup();
	});

	it('should inject a non-object value', function(done) {
		snooze.module('myApp')
			.value('val', 'foo')
			.run(function(val) {
				val.should.equal('foo');
				done();
			})
			.wakeup();
	});

	it('should inject a function value', function(done) {
		snooze.module('myApp')
			.value('val', function() {
				return 'foo';
			})
			.run(function(val) {
				val().should.equal('foo');
				done();
			})
			.wakeup();
	});

	it('should update an object value between runs', function(done) {
		snooze.module('myApp')
			.value('val', {foo: 'bar'})
			.run(function(val) {
				val.foo.should.equal('bar');
				val.foo = 'baz';
			})
			.run(function(val) {
				val.foo.should.equal('baz');
				done();
			})
			.wakeup();
	});

	it('should update a value using the module.value method', function(done) {
		snooze.module('myApp')
			.value('val', {foo: 'bar'})
			.value('val', {foo: 'baz'})
			.run(function(val) {
				val.foo.should.equal('baz');
				snooze.module('myApp').value('val', {foo: 'qux'});
			})
			.run(function(val) {
				val.foo.should.equal('qux');
				done();
			})
			.wakeup();
	});
});