import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../service/search.service';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import {Geolocation} from 'ol';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat, toLonLat} from 'ol/proj';
import * as olProj from 'ol/proj';
import { buffer } from 'ol/extent';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

var states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  model: any;

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  focus: any;
  focus1: any;
  rechecheForm:FormGroup
  search1=false;
  searchaction=false;
  ngSelect
  listDataSearch
  title="Tous les categories"
  listCategories=["Categories","Médecin","Urgence","Hopital","Clinique","Pharmacie","Ambulance","Laboratoire","Parapharmacie"]
  listRegions=["Tous les Règions","à proximité", "Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]
  pos=[]
  searchText;

  
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  
  constructor(
     private router:Router,
     private searchService:SearchService
     )
  { 
    this.rechecheForm = new FormGroup({
      categorie:new FormControl(null),
      region:new FormControl(null),
      nomsearch:new FormControl('')
    })
  }
  ngOnInit() {
   this.setDefaultValue()  
    states=[];
   this.searchService.getAll().subscribe(res=>{
     this.listDataSearch=res
     for(let x of this.listDataSearch)
      states[this.listDataSearch.length-1]=x.firstName+" "+x.lastName
    
   })
   this.initialize()
  document.getElementById('map').style.display='none'
  this.search
  
  }

  onChange(deviceValue) {
    if(deviceValue=="à proximité"){
      document.getElementById('map').style.display='block'

    }else{
      document.getElementById('map').style.display='none'

    }
  }

  setDefaultValue(){
    this.rechecheForm.patchValue({
      categorie : 'Categories',
      region:'Tous les Règions'
    })
  }
  searchRegion(region,list){
    let i=0
    let listDataSearch=[]
    if(region=="Tous les Régions"){
      return list
    }
  
    for(let c of list){
      if(c.regions==region){
        listDataSearch[i++]=c;
      }
    }
    return listDataSearch;
  }
  
  searchbyNom(name,list){
    let i=0
    let listDataSearch=[]
    let fullName;
  
    for(let c of list){
      fullName=c.firstName+" "+c.lastName
      if(c.firstName.toUpperCase().includes(name.toUpperCase()) || c.lastName.toUpperCase().includes(name.toUpperCase()) || fullName.toUpperCase().includes(name.toUpperCase()) ){
        listDataSearch[i++]=c;
      }
    }
    return listDataSearch;
  }
  searchAProximite(list){
    let i=0
    let listDataSearch=[]
    let minX,maxX,x;
    let y,minY,maxY
    
    x=parseFloat(localStorage.getItem('x'))
    y=parseFloat(localStorage.getItem('y'))
    minX=x-0.5
    minY=y-0.5
    maxX=x+0.5
    maxY=y+0.5

    console.log(x)
    console.log(y)

    for(let c of list){
      if(c.x >= minX && c.x<=maxX){
        if(c.y>= minY && c.x<= minY)
        listDataSearch[i++]=c
      }
    }

    return listDataSearch

  }

  onSubmit(){
    let val=this.rechecheForm.value;
    this.searchaction=true;

    document.getElementById("section1").classList.remove("section-image");
    document.getElementById("text1").classList.remove("text-white")
    document.getElementById("text2").classList.remove("text-white")
    console.log(val)
    this.search1=true;
    if(val.categorie!="Categories"){
      this.listDataSearch=[]
    switch(val.categorie){
      case "Médecin":
        this.title="Tous les Médecins"
        if(val.region=="Tous les Règions"){
          this.searchService.getByCategorie('medecins').subscribe(data=>{
            this.listDataSearch=data;
            console.log(data)
            if(val.nomsearch!=""){
              this.listDataSearch=this.searchbyNom(val.nomsearch,this.listDataSearch);
            }
          })
        }else if(val.region=="à proximité"){
          this.searchService.getByCategorie('medecins').subscribe(data=>{
            this.listDataSearch=data;
            this.listDataSearch=this.searchAProximite(this.listDataSearch)

          })

        }
        else{
        this.searchService.getByCategorieAndRegions('medecins',val.region).subscribe(data=>{
          this.listDataSearch=data;

          if(val.nomsearch!=""){
            this.listDataSearch=this.searchbyNom(val.nomsearch,this.listDataSearch);
            console.log(this.listDataSearch)
          }
        })
      }
        break;
      case "Urgence":
        this.router.navigate(['/urgence'],{queryParams:{region:val.region,}}) 
        break;
      case "Hopital":
        this.router.navigate(['/hopital'],{queryParams:{region:val.region,}}) 
        break;
      case "Clinique":
        this.router.navigate(['/clinique'],{queryParams:{region:val.region,}}) 
        break;
      case "Pharmacie":
        this.router.navigate(['/pharmacie'],{queryParams:{region:val.region,}}) 
        break;
      case "Ambulance":
          this.router.navigate(['/ambulance'],{queryParams:{region:val.region,}}) 
          break;
      case "Laboratoire":
          this.router.navigate(['/labo'],{queryParams:{region:val.region,}}) 
          break;
      case "Parapharmacie":
          this.router.navigate(['/parapharmacie'],{queryParams:{region:val.region,}}) 
          break;
      default:
        this.router.navigate(['/map'],{queryParams:{region:val.region,}}) 

    }
  }else if(val.region!="Tous les Règions"){
    this.listDataSearch=this.searchRegion(val.region,this.listDataSearch)
    this.listDataSearch=this.searchbyNom(val.nomsearch,this.listDataSearch)
      if(this.listDataSearch.length==0){
        this.search1=false;
      }else{
        this.search1=true;
      }
  }else if(val.nomsearch==""){
    this.listDataSearch=[]
    if(this.listDataSearch.length==0){
      this.search1=false;
    }else{
      this.search1=true;
    }
  }else{
    this.searchService.getAll().subscribe(data=>{
      this.listDataSearch=data
      this.listDataSearch=this.searchbyNom(val.nomsearch,this.listDataSearch)

    })
  }
  }
  onSearchChange(event){
    console.log(event)
  }
  gotopage(){
    
    let id=document.getElementById('Modalid').textContent
    this.router.navigate(['user-profile/'+id])
  }

   initialize(){
    const view = new View({
      center: [0, 0],
      zoom: 2,
    });
    
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: view,
    });
    
    const geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });
    
    function el(id) {
      return document.getElementById(id);
    }
    
      geolocation.setTracking(true);

    
    // update the HTML page when the position changes.
    geolocation.on('change', function () {
      const position=toLonLat(geolocation.getPosition())
      localStorage.setItem('x',position[0].toString())
      localStorage.setItem('y',position[1].toString())
      const bulgariaExtent = olProj.transformExtent([9.345023234, 30.238104147, 11.603526238, 37.228434539], 'EPSG:4326', 'EPSG:3857');

       map.setView(new View({
        extent:buffer(bulgariaExtent, 100000),
        showFullExtent:true,
  
        center:olProj.fromLonLat([position[0], position[1]]),
        zoom:8,
      }))
      el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
      el('altitude').innerText = geolocation.getAltitude() + ' [m]';
      el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
      el('heading').innerText = geolocation.getHeading() + ' [rad]';
      el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
    });
    // handle geolocation error.
    geolocation.on('error', function (error) {
      const info = document.getElementById('info');
      info.style.display = '';
    });
    
    const accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });
    
    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    
    geolocation.on('change:position', function () {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });
    
    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });

  }
}
