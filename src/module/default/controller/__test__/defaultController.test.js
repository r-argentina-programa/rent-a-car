const bootstrapTests = require('../../../../__test__/test.init');
const DefaultController = require('../defaultController');

let container = null;
/**
* @type {DefaultController}
*/
let controller = null;
let res = null;

beforeEach(async (done) => {
    container = await bootstrapTests();
    controller = container.get('DefaultController');
    res = {
        render: jest.fn(),
        send: jest.fn()
    };
    done();
})

describe('Default Controller', () => {
    test('index action', async (done) => {
        await controller.index({}, res)
        expect(res.render).toHaveBeenCalledTimes(1);

        done();
    });

    test('renders correct js file for frontend and defines window.ReservationStatus', async (done) => {
        await controller.reservationStatus({}, res)
        expect(res.send).toHaveBeenCalledTimes(1);
        const firstArg = res.send.mock.calls.pop().pop();
        expect(firstArg).toContain('window.ReservationStatus');
        done();
    });

    test('Configures routes', () => {
        controller.configureRoutes({get: jest.fn()});
    })
})