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

const assert = require('chai').assert;

describe("Film Studio", function() {
    it("Instantiation test", function(){
        let filmStudio = new FilmStudio('SU-Studio');

        let expected = "SU-Studio"
        let actual = filmStudio["name"];
        assert.equal(actual, expected);

        let expectedArrLen = 0;
        let actualArr = filmStudio["films"].length
        assert.equal(actual, expected);
    });

    it("function makeMovie - test 1", function() {
        let filmStudio = new FilmStudio('SU-Studio');

        let actual = typeof filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        let expected = "object";
        assert.equal(actual, expected);

        let currentName = filmStudio.films[0]["filmName"];
        let expectedName = "The Avengers";
        assert.equal(currentName, expectedName);

        let currentFilmRolesArrLen = filmStudio.films[0]["filmRoles"].length;
        let expectedFilmRolesArrLen = 4;
        assert.equal(currentFilmRolesArrLen, expectedFilmRolesArrLen);
    });

    it("function makeMovie - test 2", function() {
        let filmStudio = new FilmStudio('SU-Studio');
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy', 'Ant-man']);
        filmStudio.makeMovie('The New Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy', 'Black Panther']);

        let currentName = filmStudio.films[1]["filmName"];
        let expectedName = "The Avengers 2";
        assert.equal(currentName, expectedName);

        let currentFilmRolesArrLen = filmStudio.films[0]["filmRoles"].length;
        let expectedFilmRolesArrLen = 4;
        assert.equal(currentFilmRolesArrLen, expectedFilmRolesArrLen);
    });

    it('function makeMovie - test 3 | invalid arguments', function () {
        let filmStudio = new FilmStudio('SU-Studio');

        assert.throw(() => {
            filmStudio.makeMovie('The Avengers');
        }, 'Invalid arguments count');
    });

    it('function makeMovie - test 4 | invalid arguments', function () {
        let filmStudio = new FilmStudio('SU-Studio');

        assert.throw(() => {
            console.log(filmStudio.makeMovie(1, ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']));
        }, 'Invalid arguments');
    });

    it("function casting - test 1", function() {
        let filmStudio = new FilmStudio('SU-Studio');
        let actualOutput = filmStudio.casting("Joni", "Thor");
        let expectedOutput = "There are no films yet in SU-Studio.";
        assert.equal(actualOutput, expectedOutput);
    });

    it("function casting - test 2", function() {
        let filmStudio = new FilmStudio('SU-Studio');
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        let actualOutput = filmStudio.casting("Joni", "Thor");
        let expectedOutput = "You got the job! Mr. Joni you are next Thor in the The Avengers. Congratz!";
        assert.equal(actualOutput, expectedOutput);
    });

    it("function casting - test 3", function() {
        let filmStudio = new FilmStudio('SU-Studio');
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        let actualOutput = filmStudio.casting("Joni2", "4ikiboec");
        let expectedOutput = "Joni2, we cannot find a 4ikiboec role...";
        assert.equal(actualOutput, expectedOutput);
    });

    it("function lookForProducer - test 1", function() {
        let filmStudio = new FilmStudio('SU-Studio');
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        let actualOutput = filmStudio.lookForProducer("The Avengers");
        let expectedOutput = "Film name: The Avengers\nCast:\nfalse as Iron-Man\nfalse as Thor\nfalse as Hulk\nfalse as Arrow guy\n";
        assert.equal(actualOutput, expectedOutput);
    });

    it('function lookForProducer - test 2 | invalid arguments', function () {
        let filmStudio = new FilmStudio('SU-Studio');

        assert.throw(() => {
            filmStudio.lookForProducer('4ikiriki');
        }, '4ikiriki do not exist yet, but we need the money...');
    });

});