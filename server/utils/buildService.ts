import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest(opts: { request: any, context: any }) {
    const { request, context } = opts;
    const user = context.user;

    user?.isAuthenticated && request.http.headers.set('is-authenticated', user.isAuthenticated);
    user?.id && request.http.headers.set('user-id', user.id);
    user?.role && request.http.headers.set('user-role', user.role);
  }
}