import { CatService } from './../../services/CatService';
import { Component } from "@angular/core";
import { NavController, LoadingController, InfiniteScrollContent, AlertController, Loading } from "ionic-angular";
import { Http, Response } from "@angular/http";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  public cats: any = [];
  private loading: Loading;

  private LOADING_INITIAL_NUMBER: number = 20;
  private LOADING_SLIDE_NUMBER: number = 20;
  
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private catService: CatService,
    private alertCtrl: AlertController) {
    this.initCats();
  }

  onEnd(slides:Slides){
    if (slides.getActiveIndex() === slides.length() - 2) {
      this.catService.getCats(this.LOADING_SLIDE_NUMBER).then( _cats => {
        this.cats = [...this.cats,..._cats];
        slides.slideNext();
      } )
    }
  }

  initCats() {
    this.loadingMessage('Encontrando Felicidade');

    this.loading.present();
    this.catService.getCats(this.LOADING_INITIAL_NUMBER).then(_cats => {
      this.cats = _cats;
      this.closeMessage()
    })
  }

  loadingMessage(content){
    this.loading = this.loadingCtrl.create({
      content
    });

    this.loading.present();
  }

  closeMessage(){
    this.loading.dismiss();
  }

  presentAlert(title,subTitle,message){
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      message,
      buttons: ['OK']
    })

    alert.present();
  }

}
