let Parser = require("./solution.js");
let assert = require("chai").assert;

describe("MyTests", () => {
    describe("Test constructor", function() {
        it("initialize correctly", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            assert.property(parser, '_data');
            assert.property(parser, '_log');
            assert.property(parser, '_addToLog');
            assert.property(parser, '_addToLogInitial');

            assert.equal(parser._log.length, 0);

            assert.isArray(parser._data);
            assert.isArray(parser._log);
            assert.isFunction(parser._addToLog);
        });
        it("check _data", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            let expect = [{Nancy: "architect"}, {John: "developer"}, {Kate: "HR"}];
            assert.deepEqual(parser._data, expect);
        });
    });

    describe("Test get data", function() {
        it("test 1", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');

            let expected = [{Nancy: "architect"}, {John: "developer"}, {"Kate": "HR"}];
            assert.deepEqual(parser.data, expected);
        });
    });

    describe("Test addEntries", function() {
        it("test 1", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            assert.equal(parser.addEntries("Steven:tech-support Edd:administrator"), "Entries added!");
            let expect = [{Nancy: "architect"}, {John: "developer"}, {Kate: "HR"}, {Steven: "tech-support"}, {Edd: "administrator"}];
            assert.deepEqual(parser.data, expect);
        });
    });

    describe("Test removeEntries", function() {
        it("test 1", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            parser.addEntries("Steven:tech-support Edd:administrator");
            assert.equal(parser.removeEntry("Kate"), 'Removed correctly!');
            
            let expect = [{Nancy: "architect"}, {John: "developer"}, {Steven: "tech-support"}, {Edd: "administrator"}];
            assert.deepEqual(parser.data, expect);
        });

        it("test 2", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            parser.addEntries("Steven:tech-support Edd:administrator");

            assert.throws(function() {
                parser.removeEntry("Kalina")
            }, 'There is no such entry!');
        });
    });

    describe("Test print()", function() {
        it("test 1", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            parser.addEntries("Steven:tech-support Edd:administrator");
            parser.removeEntry("Kate");
            
            let expect = 'id|name|position\n0|Nancy|architect\n1|John|developer\n2|Steven|tech-support\n3|Edd|administrator';
            assert.deepEqual(parser.print(), expect);
        });
    });

    describe("Test parser._log", function() {
        it("test 1", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            
            //assert.deepEqual(parser._addToLog(), "Added to log");
            parser.addEntries("Steven:tech-support Edd:administrator");
            parser.removeEntry("Kate")
            assert.deepEqual(parser._log, ["0: addEntries", "1: removeEntry"]);
            assert.deepEqual(parser._data[2], {Kate: "HR", deleted: true});
        });
    });

    describe("Test parser._log", function() {
        it("test 1", function() {
            let parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
            
            //assert.deepEqual(parser._addToLog(), "Added to log");
            parser.addEntries("Steven:tech-support Edd:administrator");
            parser.removeEntry("Kate")
            assert.deepEqual(parser._log, ["0: addEntries", "1: removeEntry"]);
            assert.deepEqual(parser._data[2], {Kate: "HR", deleted: true});
        });
    });
});