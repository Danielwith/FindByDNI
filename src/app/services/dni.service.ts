import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DniServicio {
  // https://apiperu.dev/dashboard
  token: String =
    'ca48acc69082c2a68efaa5d0b31257ca37e9462a6467328905b3b52aa5d67ab9';

  constructor(private httpClient: HttpClient) {}

  getData(dni: Number) {
    return this.httpClient.get(
      `https://apiperu.dev/api/dni/${dni}?api_token=${this.token}`
    );
  }
}
