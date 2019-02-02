import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

@Injectable()
export class CatService {
    constructor(private http: Http) { }

    public getCats(limit: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http
                .get(`https://api.thecatapi.com/v1/images/search?limit=${limit}`)
                .subscribe((data: Response) => {
                    let catArray: Array<any> = data.json();
                    resolve(catArray);
                });
        })
    }

}