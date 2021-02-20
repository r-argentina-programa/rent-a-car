import { AppController } from '../app.controller';
import { ReservationStatuses } from '../../reservation/ReservationStatus';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('getReservationStatuses', () => {
    it('should return an object with reservation statuses', async () => {
      expect(await appController.getStatuses()).toBe(ReservationStatuses);
    });
  });
});
