/**
 * External Dependencies
 */
import { ajax } from 'rxjs/ajax';

/**
 * An API client for dealing with GraphQL server.
 */
class ApiClient {
  constructor(builder) {
    this.url = builder.url;
    this.headers = builder.headers;
  }

  /**
   * Returns an API client's builder class.
   */
  static get Builder() {
    /**
     * A builder class for building API client.
     */
    class Builder {
      // Pre-defined request headers
      headers = {
        'Content-Type': 'application/json',
      };

      /**
       * Allows customizing request headers.
       * 
       * @param {object} headers 
       */
      withHeaders(headers) {
        this.headers = headers;
        return this;
      }

      /**
       * Sets a backend URL.
       * 
       * @param {string} url 
       */
      withBackendUrl(url) {
        this.url = url;
        return this;
      }

      /**
       * Returns a new API client which constructs from builder object.
       */
      build() {
        return new ApiClient(this);
      }
    }

    return new Builder();
  }

  /**
   * Sends a query to the GraphQL server.
   * 
   * @param {string} query 
   * @param {object} variables 
   */
  do(query, variables = {}, headers = {}) {
    return ajax({
      method: 'POST',
      url: this.url,
      headers: Object.assign({}, this.headers, headers),
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  }
}

export default ApiClient;
