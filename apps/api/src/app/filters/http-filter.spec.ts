import { environment } from '@api/environments/environment';
import { HttpExceptionFilter } from './http-filter';

describe('HttpExceptionFilter', () => {
  const filter = new HttpExceptionFilter();
  const timestamp = '2021-06-23T08:36:26.513Z';
  const exception = {
    getStatus: jest.fn(),
  } as any;
  const response = {
    status: () => response,
    redirect: jest.fn(),
    json: jest.fn(),
  };
  const request = {
    url: '/test',
  };
  const host = {
    switchToHttp: () => {
      return {
        getResponse: () => response,
        getRequest: () => request,
      };
    },
  } as any;

  it('should be created', () => {
    expect(filter).toBeTruthy();
  });

  describe('catch', () => {
    beforeEach(() => {
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(timestamp);
    });

    it('should redirect to url if the response is 404', () => {
      exception.getStatus.mockReturnValue(404);
      filter.catch(exception, host);

      expect(response.redirect).toHaveBeenCalledWith(environment.redirectURL);
    });

    it('should return jsom object if the response is not 404', () => {
      exception.getStatus.mockReturnValue(400);
      filter.catch(exception, host);

      expect(response.json).toHaveBeenCalledWith({
        statusCode: 400,
        timestamp,
        path: request.url,
      });
    });
  });
});
