let assert = require('chai').assert;

class AutoService {

    constructor(garageCapacity) {
        this.garageCapacity = garageCapacity;
        this.workInProgress = [];
        this.backlogWork = [];
    }

    get availableSpace() {
        return this.garageCapacity - this.workInProgress.length;
    }

    repairCar() {

        let workingPlace = this.workInProgress.length > 0 ? this.workInProgress : this.backlogWork;

        if (workingPlace.length > 0) {

            let keysForRepair = [];
            Object.keys(workingPlace[0].carInfo)
                .filter((k) => workingPlace[0].carInfo[k] === 'broken')
                .forEach((k) => keysForRepair.push(k));

            workingPlace.shift();
            if (keysForRepair.length > 0) {
                return `Your ${keysForRepair.join(' and ')} were repaired.`;
            } else {
                return 'Your car was fine, nothing was repaired.'
            }
        }
        else {
            return 'No clients, we are just chilling...'
        }
    }

    signUpForReview(clientName, plateNumber, carInfo) {

        let currentClient = {
            plateNumber,
            clientName,
            carInfo
        };

        if (this.availableSpace > 0) {
            this.workInProgress.push(currentClient);
        } else {
            this.backlogWork.push(currentClient);
        }
    }

    carInfo(plateNumber, clientName) {

        let checkCar =
            this.workInProgress.filter((carInfo) => carInfo.plateNumber === plateNumber && carInfo.clientName === clientName)[0] ||
            this.backlogWork.filter((carInfo) => carInfo.plateNumber === plateNumber && carInfo.clientName === clientName)[0];

        if (checkCar) {
            return checkCar;
        } else {

            return `There is no car with platenumber ${plateNumber} and owner ${clientName}.`;
        }
    }
}

describe("Tests AutoService", function() {
    describe("Tests constructor", function() {
        it("valid input", function() {
            let autoService = new AutoService(10);
            assert.equal(10, autoService.garageCapacity);
            assert.deepEqual([], autoService.workInProgress);
            assert.deepEqual([], autoService.backlogWork);
        });
     });
     
    describe("Tests get availableSpace", function() {
        it("valid output 1", function() {
            let autoService = new AutoService(10);
            assert.equal(10, autoService.availableSpace);
        });

        it("valid output 2", function() {
            let autoService = new AutoService(10);
            autoService.workInProgress = [1, 2];
            assert.equal(8, autoService.availableSpace);
        });
    });

    describe("Tests signUpForReview", function() {
        // beforeEach(function () {
        //     let autoService = new AutoService(2);
        // });

        it("valid output 1", function() {
            let autoService = new AutoService(2);
            autoService.signUpForReview('Kalina', 1405, 'blqblq');
            let actual = autoService.workInProgress;
            let expected = [{plateNumber: 1405, clientName: "Kalina", carInfo: "blqblq"}];
            assert.deepEqual(actual, expected);
        });

        it("valid output 2", function() {
            let autoService = new AutoService(0);
            autoService.signUpForReview('Kalinaa', 14405, 'blsadfqblq');
            let actual = autoService.backlogWork;
            let expected = [{plateNumber: 14405, clientName: "Kalinaa", carInfo: "blsadfqblq"}];
            assert.deepEqual(actual, expected);
        });
     });
});