import { Collections, Status } from '@libs/models';
import * as firebase from 'firebase-admin';
import { mockFirestore } from '../mocks';
import { StatusService } from './status.service';

describe('StatusService', () => {
  const service = new StatusService();
  const uid = '12345';
  let firestore;

  beforeEach(() => {
    firestore = mockFirestore();
    jest.spyOn(firebase, 'firestore').mockImplementation(() => firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setOnline', () => {
    describe('existing uid', () => {
      beforeEach(() => {
        service.setOnline(uid);
      });

      it('should find "users" collection', () => {
        expect(firestore.collection).toHaveBeenCalledWith(Collections.Users);
      });

      it('should find document with uid', () => {
        expect(firestore.doc).toHaveBeenCalledWith(uid);
      });

      it('should set online status', () => {
        expect(firestore.update).toHaveBeenCalledWith({ status: Status.ONLINE });
      });
    });

    describe('undefined uid', () => {
      beforeEach(() => {
        service.setOnline(null);
      });

      it('should not call "firestore"', () => {
        expect(firestore.collection).not.toHaveBeenCalled();
      });
    });
  });

  describe('setOffline', () => {
    describe('existing uid', () => {
      beforeEach(() => {
        service.setOffline(uid);
      });

      it('should find "users" collection', () => {
        expect(firestore.collection).toHaveBeenCalledWith(Collections.Users);
      });

      it('should find document with uid', () => {
        expect(firestore.doc).toHaveBeenCalledWith(uid);
      });

      it('should set offline status', () => {
        expect(firestore.update).toHaveBeenCalledWith({ status: Status.OFFLINE });
      });
    });

    describe('undefined uid', () => {
      beforeEach(() => {
        service.setOffline(null);
      });

      it('should not call "firestore"', () => {
        expect(firestore.collection).not.toHaveBeenCalled();
      });
    });
  });
});
