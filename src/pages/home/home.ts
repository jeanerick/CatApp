import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { Http, Response} from "@angular/http";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public catUrl;
  constructor(public navCtrl: NavController, private http: Http,
    public loadingCtrl: LoadingController) {
    this.getCat();
  }

  public getCat() {


    let loading = this.loadingCtrl.create({
      content: 'Encontrando felicidade'
    });

    loading.present();

    this.http
      .get("https://api.thecatapi.com/v1/images/search")
      .subscribe((data:Response) => {
      let catArray:Array<any> = data.json();
        this.catUrl = catArray[0].url;
        loading.dismiss();
      });
    1;
  }
}
