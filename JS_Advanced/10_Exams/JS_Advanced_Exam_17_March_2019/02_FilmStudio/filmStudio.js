class FilmStudio {

    constructor(studioName) {
        this.name = studioName;
        this.films = [];
    }

    casting(actor, role) {
        let isTheActorIsUnemployed = true;
        let output;

        if (this.films.length) {

            for (let f of this.films) {

                let roles = f.filmRoles.filter((r) => r.role === role);

                if (roles.length) {
                    let filmIndex = this.films.indexOf(f);
                    let wantedRole = this.films[filmIndex].filmRoles.filter((fR) => fR.role === role)[0];
                    let roleIndex = this.films[filmIndex].filmRoles.indexOf(wantedRole);

                    this.films[filmIndex].filmRoles[roleIndex].actor = actor;
                    isTheActorIsUnemployed = false;
                    output = `You got the job! Mr. ${actor} you are next ${role} in the ${f.filmName}. Congratz!`;
                    break;
                }
            }

            if (isTheActorIsUnemployed) {
                output = `${actor}, we cannot find a ${role} role...`;
            }

        } else {
            output = `There are no films yet in ${this.name}.`;
        }

        return output;
    }

    makeMovie(filmName, roles) {

        if (arguments.length === 2) {

            let firstArgIsString = typeof arguments[0] === 'string';
            let secondArgIsArray = arguments[1] instanceof Array;

            if (firstArgIsString && secondArgIsArray) {
                let findedFilms = this.films.filter((f) => f.filmName.includes(filmName));

                let filmRoles = roles.reduce((acc, cur) => {
                    let curFilmRole = {
                        role: cur,
                        actor: false
                    };
                    acc.push(curFilmRole);
                    return acc;
                }, []);

                let film = {
                    filmName,
                    filmRoles
                };

                if (findedFilms.length > 0) {
                    film.filmName += ` ${++findedFilms.length}`;
                }

                this.films.push(film);
                return film;
            } else {
                throw ('Invalid arguments')
            }

        } else {
            throw ('Invalid arguments count')
        }
    }

    lookForProducer(film) {

        let f = this.films.filter((f) => f.filmName === film)[0];
        let output;

        if (f) {
            output = `Film name: ${f.filmName}\n`;
            output += 'Cast:\n';
            Object.keys(f.filmRoles).forEach((role) => {
                output += `${f.filmRoles[role].actor} as ${f.filmRoles[role].role}\n`;
            });
        } else {
            throw new Error(`${film} do not exist yet, but we need the money...`)
        }

        return output;
    }
}

let assert = require('chai').assert;

describe("Tests FilmStudio class", function() {
    describe("Test constructor", function() {
        it("initialize correctly", function() {
            let studio = new FilmStudio('Kalina');
            assert.property(studio, 'name');
            assert.property(studio, 'films');
            assert.equal(studio.name, "Kalina"); //1 test
            assert.isArray(studio.films); //2 test
        });
    });
    describe("Test makeMovie", function() {
        it("word correctly", function() {
            let studio = new FilmStudio('Kalina');
            let output = studio.makeMovie('Fight', ['fighter', 'bush', 'driver']);
            let expectedFilmName = 'Fight';
            let expectedRoles = [{actor: false, role: 'fighter'}, {actor: false, role: 'bush'}, {actor: false, role: 'driver'}];
            assert.equal(output.filmName, expectedFilmName); //test 7
            assert.deepEqual(output.filmRoles, expectedRoles); //no tests
        });

        it("does not word correctly", function() { //tests 5 and 6
            let studio = new FilmStudio('Kalina');
            assert.throws(function() {
                studio.makeMovie('Fight', 1);
            }, 'Invalid arguments');

            assert.throws(function() {
                studio.makeMovie('Fight', "1");
            }, 'Invalid arguments');

            assert.throws(function() { //tests 3 and 4
                studio.makeMovie('Fight');
            }, 'Invalid arguments count');
        });
    });
    describe("Test casting", function() {
        it("word correctly/ found role", function() { //test 10
            let studio = new FilmStudio('Kalina');
            studio.makeMovie('Fight', ['fighter', 'bush', 'driver']);
            let output = studio.casting('Pesho', 'fighter');
            assert.equal(output, 'You got the job! Mr. Pesho you are next fighter in the Fight. Congratz!');
        });
        it("word correctly/ no role", function() { //test 11 and 12
            let studio = new FilmStudio('Kalina');
            studio.makeMovie('Fight', ['fighter', 'bush', 'driver']);
            let output = studio.casting('Pesho', 'blq blq');
            assert.equal(output, 'Pesho, we cannot find a blq blq role...');
        });
        it("does not word correctly", function() { //tests 8 and 9
            let studio = new FilmStudio('Kalina');
            let output = studio.casting('Pesho', 'fighter');
            assert.equal(output, 'There are no films yet in Kalina.');
        });
    });
    describe("Test lookForProducer", function() {
        it("throws error/ film does not exists", function() {
            let studio = new FilmStudio('Kalina');
            assert.throws(function() {
                studio.lookForProducer('Fight');
            }, 'Fight do not exist yet, but we need the money...');
        });
        it("work correctly", function() {
            let studio = new FilmStudio('Kalina');
            studio.makeMovie('Fight', ['fighter', 'bush', 'driver']);
            let output = studio.lookForProducer('Fight');
            assert.equal(output, 'Film name: Fight\nCast:\nfalse as fighter\nfalse as bush\nfalse as driver\n');
        });
    });
});
