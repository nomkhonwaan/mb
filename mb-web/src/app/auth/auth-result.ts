/**
 * An authentication result which contains "accessToken", "idToken" and "expiresAt".
 *
 * @param accessToken string A temporary token string which will be expired soon
 * @param idToken     string An identifier token which contains user details
 * @param expiresIn   number Valid time since the access token was created until expire
 */
export default interface AuthResult {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}
