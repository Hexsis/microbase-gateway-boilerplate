import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class CustomDataSource extends RemoteGraphQLDataSource {
  willSendRequest(opts: { request: any, context: any }): void {
    const { request, context } = opts;
    const user = context.user;

    user?.isAuthenticated && request.http.headers.set('is-authenticated', user.isAuthenticated);
    user?.id && request.http.headers.set('user-id', user.id);
    user?.role && request.http.headers.set('user-role', user.role);
  }
  async didReceiveResponse(opts: { response: any, context: any }): Promise<any> {
    const {
      response,
      context
    } = opts;
    const cacheControl = response.http.headers.get('cache-control');
    
    console.log('cacheControl', cacheControl);

    // Return the response, even when unchanged.
    return response;
  }
}