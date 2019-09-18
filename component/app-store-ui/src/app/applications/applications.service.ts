
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../config/api.endpoints';
import {
  GetApplicationsParam, Application, Subscription,
  ApplicationListResult, ApplicationDetails, SubscriptionResult
} from './applications.data.models';
import { Observable } from 'rxjs';
import { TokenData } from '../authentication/authentication.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.data.models';

@Injectable()
export class ApplicationsService {

  private accessToken: TokenData;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select((s) => s.authentication.tokenDetails).subscribe((auth) => {
      this.accessToken = auth;
    })
  }

  getAllApplications(): Observable<ApplicationListResult> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + this.accessToken.access_token
      })
    };
    return this.http.get<ApplicationListResult>(ApiEndpoints.applications.getAllApplications, httpOptions);
  }

  getApplicationsDetails(appId: string): Observable<ApplicationDetails> {
    const endpoint = `${ApiEndpoints.applications.getAllApplications}/${appId}`;
    return this.http.get<ApplicationDetails>(endpoint);
  }

  getApplicationSubscriptions(appId: string): Observable<SubscriptionResult> {
    const endpoint = `${ApiEndpoints.subscriptions}/?applicationId=${appId}`;
    return this.http.get<SubscriptionResult>(endpoint);
  }
}
