import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "../services/config.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private configService: ConfigService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({url: `${this.configService.getApiBaseUrl()}${req.url}`});
        return next.handle(apiReq);
    }
}