import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Map from 'ol/Map';
import {Tile as TitleLayer,Vector as VectorLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM'
import  View  from 'ol/View';
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import XyzSource from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style} from 'ol/style.js';
import Title from 'ol/layer/Tile';
import CircleStyle from 'ol/style/Circle';
import Overlay from 'ol/Overlay';
import { buffer } from 'ol/extent';

var listInfo=[
  {
    "id": "6241bc2d743785385d3d1641",
    "index": 0,
    "guid": "31d5f1f4-9c8e-486f-abb2-cea19be590b1",
    "isActive": true,
    "x": 10.1654,
    "y": 36.4335,
    "picture": "http://placehold.it/32x32",
    "name": "Mcleod Mcneil",
    "email": "mcleodmcneil@filodyne.com",
    "phone": "+1 (815) 514-3080",
    "address": "960 Norfolk Street, Winesburg, Alaska, 8860",
    "greeting": "Hello, Mcleod Mcneil! You have 9 unread messages.",
    "categories": "Pharmacie",
    "regions": "Tataouine"
  },
  {
    "id": "6241bc2dd0641eb0a688af02",
    "index": 1,
    "guid": "e3c292e5-5120-4a56-91f0-9e47f9178bc8",
    "isActive": true,
    "x": 10.0703,
    "y": 34.5817,
    "picture": "http://placehold.it/32x32",
    "name": "Leann Vance",
    "email": "leannvance@filodyne.com",
    "phone": "+1 (960) 452-2312",
    "address": "930 Stewart Street, Bannock, Rhode Island, 6975",
    "greeting": "Hello, Leann Vance! You have 8 unread messages.",
    "regions": "Nabeul"
  },
  {
    "id": "6241bc2d866b9d6aa793748c",
    "index": 2,
    "guid": "19b153d9-c7f7-456c-b5d1-cc3b32ad67a5",
    "isActive": false,
    "x": 10.9342,
    "y": 34.1886,
    "picture": "http://placehold.it/32x32",
    "name": "Alissa Simon",
    "email": "alissasimon@filodyne.com",
    "phone": "+1 (853) 598-3618",
    "address": "393 Lorimer Street, Sunriver, South Dakota, 9924",
    "greeting": "Hello, Alissa Simon! You have 4 unread messages.",
    "regions": "Nabeul"
  },
  {
    "id": "6241bc2d08841e8c69f16e51",
    "index": 3,
    "guid": "63afc070-8786-4626-95a3-befcede9d006",
    "isActive": false,
    "x": 10.1835,
    "y": 35.9531,
    "picture": "http://placehold.it/32x32",
    "name": "Santos Humphrey",
    "email": "santoshumphrey@filodyne.com",
    "phone": "+1 (888) 580-3862",
    "address": "938 Newel Street, Chautauqua, Marshall Islands, 1287",
    "greeting": "Hello, Santos Humphrey! You have 2 unread messages.",
    "regions": "Ben Arous"
  },
  {
    "id": "6241bc2ddc44ef442397d751",
    "index": 4,
    "guid": "f337c1e7-df6d-405e-82fc-006ef9965055",
    "isActive": false,
    "x": 10.9911,
    "y": 34.2005,
    "picture": "http://placehold.it/32x32",
    "name": "Blake Obrien",
    "email": "blakeobrien@filodyne.com",
    "phone": "+1 (860) 540-2406",
    "address": "400 Apollo Street, Allendale, Northern Mariana Islands, 3429",
    "greeting": "Hello, Blake Obrien! You have 3 unread messages.",
    "regions": "Manouba"
  },
  {
    "id": "6241bc2d26ba4c5059531fa9",
    "index": 5,
    "guid": "9f5c9eba-8b8c-4864-96c7-a5366184dc61",
    "isActive": false,
    "x": 10.2211,
    "y": 34.4339,
    "picture": "http://placehold.it/32x32",
    "name": "Marshall Howard",
    "email": "marshallhoward@filodyne.com",
    "phone": "+1 (814) 566-3690",
    "address": "290 Auburn Place, Knowlton, Vermont, 4519",
    "greeting": "Hello, Marshall Howard! You have 9 unread messages.",
    "regions": "Gabès"
  },
  {
    "id": "6241bc2d8c7f027a2824f1a1",
    "index": 6,
    "guid": "be55ee31-5d13-4ff4-997f-f714f18bec3e",
    "isActive": true,
    "x": 10.5228,
    "y": 36.2387,
    "picture": "http://placehold.it/32x32",
    "name": "Ella Ferrell",
    "email": "ellaferrell@filodyne.com",
    "phone": "+1 (833) 570-2069",
    "address": "992 Fleet Street, Ogema, Palau, 3344",
    "greeting": "Hello, Ella Ferrell! You have 8 unread messages.",
    "regions": "Zaghouan"
  },
  {
    "id": "6241bc2dee534770cb4c76e1",
    "index": 7,
    "guid": "10206e58-fd05-411a-bff1-21e3a5101422",
    "isActive": false,
    "x": 10.1959,
    "y": 35.4567,
    "picture": "http://placehold.it/32x32",
    "name": "Fowler Brooks",
    "email": "fowlerbrooks@filodyne.com",
    "phone": "+1 (978) 513-3137",
    "address": "312 Royce Street, Blue, Oregon, 6301",
    "greeting": "Hello, Fowler Brooks! You have 10 unread messages.",
    "regions": "Mahdia"
  },
  {
    "id": "6241bc2d65c25a2f416f3515",
    "index": 8,
    "guid": "9c37a0e5-1a4c-4ec2-a3fc-b7405d181a0a",
    "isActive": true,
    "x": 10.1312,
    "y": 34.6436,
    "picture": "http://placehold.it/32x32",
    "name": "Webster Bonner",
    "email": "websterbonner@filodyne.com",
    "phone": "+1 (968) 519-2885",
    "address": "438 Union Street, Riner, New Jersey, 8787",
    "greeting": "Hello, Webster Bonner! You have 2 unread messages.",
    "categories": "Pharmacie",
    "regions": "Bizerte"
  },
  {
    "id": "6241bc2d0d5de9a39aedf08f",
    "index": 9,
    "guid": "151c7335-a2e1-4eea-81cb-a071d0e9ede1",
    "isActive": true,
    "x": 10.7453,
    "y": 34.6334,
    "picture": "http://placehold.it/32x32",
    "name": "Mayra Alford",
    "email": "mayraalford@filodyne.com",
    "phone": "+1 (832) 513-2808",
    "address": "646 Fenimore Street, Kirk, Wisconsin, 8609",
    "greeting": "Hello, Mayra Alford! You have 10 unread messages.",
    "regions": "Sfax"
  },
  {
    "id": "6241bc2dc0d15a5f13c47d5b",
    "index": 10,
    "guid": "50dada10-74e6-4f84-b051-30ccb9a82c32",
    "isActive": false,
    "x": 10.2426,
    "y": 36.0363,
    "picture": "http://placehold.it/32x32",
    "name": "Cotton Cooke",
    "email": "cottoncooke@filodyne.com",
    "phone": "+1 (917) 421-3649",
    "address": "959 Highland Place, Dixie, Indiana, 2424",
    "greeting": "Hello, Cotton Cooke! You have 7 unread messages.",
    "regions": "Gafsa"
  },
  {
    "id": "6241bc2d11c0139e179f5840",
    "index": 11,
    "guid": "12308fd3-9bd9-4eb9-8328-9cd9931215ae",
    "isActive": true,
    "x": 10.1651,
    "y": 36.533,
    "picture": "http://placehold.it/32x32",
    "name": "Blackburn Conley",
    "email": "blackburnconley@filodyne.com",
    "phone": "+1 (913) 416-3249",
    "address": "658 Provost Street, Thornport, Maryland, 4609",
    "greeting": "Hello, Blackburn Conley! You have 1 unread messages.",
    "categories": "Pharmacie",
    "regions": "Kef"
  },
  {
    "id": "6241bc2dffd3b400bc4fae75",
    "index": 12,
    "guid": "d91855a0-2d5e-4b0c-91b4-7e37a5133d01",
    "isActive": false,
    "x": 10.964,
    "y": 35.4767,
    "picture": "http://placehold.it/32x32",
    "name": "Burke Estes",
    "email": "burkeestes@filodyne.com",
    "phone": "+1 (837) 514-2216",
    "address": "694 Halsey Street, Hondah, Federated States Of Micronesia, 1813",
    "greeting": "Hello, Burke Estes! You have 7 unread messages.",
    "regions": "Mahdia"
  },
  {
    "id": "6241bc2d5307e6ae3c9023a6",
    "index": 13,
    "guid": "08f4f106-b5b6-424d-bc37-9abe8bb981e8",
    "isActive": false,
    "x": 10.1603,
    "y": 35.0792,
    "picture": "http://placehold.it/32x32",
    "name": "Paige Trujillo",
    "email": "paigetrujillo@filodyne.com",
    "phone": "+1 (905) 401-2981",
    "address": "750 Jewel Street, Cataract, Guam, 1007",
    "greeting": "Hello, Paige Trujillo! You have 7 unread messages.",
    "regions": "Béja"
  },
  {
    "id": "6241bc2dcdfaa73e568edc68",
    "index": 14,
    "guid": "228f2561-5933-4e3c-8564-a7bf31bd3738",
    "isActive": false,
    "x": 10.5483,
    "y": 36.159,
    "picture": "http://placehold.it/32x32",
    "name": "Lynn Stewart",
    "email": "lynnstewart@filodyne.com",
    "phone": "+1 (968) 571-2047",
    "address": "314 Devoe Street, Lupton, Louisiana, 3413",
    "greeting": "Hello, Lynn Stewart! You have 10 unread messages.",
    "regions": "Gafsa"
  },
  {
    "id": "6241bc2d9c0363bc1c612000",
    "index": 15,
    "guid": "00cd8d08-136e-44ac-9414-0da5993e8056",
    "isActive": false,
    "x": 10.5216,
    "y": 36.7607,
    "picture": "http://placehold.it/32x32",
    "name": "Salinas Joseph",
    "email": "salinasjoseph@filodyne.com",
    "phone": "+1 (821) 417-2220",
    "address": "299 Debevoise Street, Castleton, Utah, 288",
    "greeting": "Hello, Salinas Joseph! You have 6 unread messages.",
    "regions": "Béja"
  },
  {
    "id": "6241bc2d2703c6448e357383",
    "index": 16,
    "guid": "b7bdaa4b-75c2-45d4-8872-dd2d45a6a8bf",
    "isActive": false,
    "x": 10.0149,
    "y": 36.1025,
    "picture": "http://placehold.it/32x32",
    "name": "Brewer Pena",
    "email": "brewerpena@filodyne.com",
    "phone": "+1 (892) 453-2221",
    "address": "501 Havens Place, Salix, North Dakota, 400",
    "greeting": "Hello, Brewer Pena! You have 5 unread messages.",
    "regions": "\tSousse"
  },
  {
    "id": "6241bc2dbf92b03c84ad21ef",
    "index": 17,
    "guid": "f7fd9643-c754-49fc-becd-0ac7ca7e040c",
    "isActive": true,
    "x": 10.5472,
    "y": 35.5904,
    "picture": "http://placehold.it/32x32",
    "name": "Long Velasquez",
    "email": "longvelasquez@filodyne.com",
    "phone": "+1 (948) 409-3735",
    "address": "857 Bridgewater Street, Yogaville, California, 7374",
    "greeting": "Hello, Long Velasquez! You have 6 unread messages.",
    "categories": "Pharmacie",
    "regions": "Gafsa"
  },
  {
    "id": "6241bc2d5ae483005c2f1f0b",
    "index": 18,
    "guid": "58ed0c19-e323-409c-885c-eff4207f9968",
    "isActive": false,
    "x": 10.0332,
    "y": 34.8046,
    "picture": "http://placehold.it/32x32",
    "name": "Frederick Burks",
    "email": "frederickburks@filodyne.com",
    "phone": "+1 (968) 483-3794",
    "address": "350 Vanderveer Street, Worton, South Carolina, 2423",
    "greeting": "Hello, Frederick Burks! You have 9 unread messages.",
    "regions": "Gafsa"
  },
  {
    "id": "6241bc2d221defebe7c1a484",
    "index": 19,
    "guid": "501b5330-cd6e-48f1-816e-73c17e3da7ff",
    "isActive": true,
    "x": 10.8025,
    "y": 34.076,
    "picture": "http://placehold.it/32x32",
    "name": "Mitchell Decker",
    "email": "mitchelldecker@filodyne.com",
    "phone": "+1 (958) 428-3680",
    "address": "204 Glen Street, Westmoreland, Oklahoma, 9410",
    "greeting": "Hello, Mitchell Decker! You have 5 unread messages.",
    "regions": "Béja"
  },
  {
    "id": "6241bc2dd1aeb2fb80d4b9fe",
    "index": 20,
    "guid": "1634a78c-2170-4d2d-be3e-d8e9e885b869",
    "isActive": true,
    "x": 10.0103,
    "y": 34.1165,
    "picture": "http://placehold.it/32x32",
    "name": "Rose Mack",
    "email": "rosemack@filodyne.com",
    "phone": "+1 (926) 470-3117",
    "address": "663 McClancy Place, Florence, District Of Columbia, 9150",
    "greeting": "Hello, Rose Mack! You have 3 unread messages.",
    "regions": "Kasserine"
  },
  {
    "id": "6241bc2d093435f996be4467",
    "index": 21,
    "guid": "bea82a11-c416-4f9d-ad91-28a8f29da658",
    "isActive": true,
    "x": 10.9656,
    "y": 35.8393,
    "picture": "http://placehold.it/32x32",
    "name": "Marcy Donaldson",
    "email": "marcydonaldson@filodyne.com",
    "phone": "+1 (804) 443-2984",
    "address": "816 Bevy Court, Beaverdale, New Mexico, 8920",
    "greeting": "Hello, Marcy Donaldson! You have 6 unread messages.",
    "regions": "Ben Arous"
  },
  {
    "id": "6241bc2d981007580a30fade",
    "index": 22,
    "guid": "e0b132f9-6a36-4144-a3d5-aa8139b9a2d7",
    "isActive": true,
    "x": 10.0549,
    "y": 36.6273,
    "picture": "http://placehold.it/32x32",
    "name": "Dean Barr",
    "email": "deanbarr@filodyne.com",
    "phone": "+1 (969) 427-2168",
    "address": "508 Bragg Street, Bowmansville, Michigan, 6742",
    "greeting": "Hello, Dean Barr! You have 10 unread messages.",
    "regions": "Siliana"
  },
  {
    "id": "6241bc2dc888aa4a52aca497",
    "index": 23,
    "guid": "95a98757-5369-4823-9766-e612a246de0a",
    "isActive": true,
    "x": 10.0935,
    "y": 35.8311,
    "picture": "http://placehold.it/32x32",
    "name": "Lewis Sandoval",
    "email": "lewissandoval@filodyne.com",
    "phone": "+1 (961) 597-2418",
    "address": "290 Dewitt Avenue, Kraemer, Puerto Rico, 3929",
    "greeting": "Hello, Lewis Sandoval! You have 9 unread messages.",
    "regions": "Nabeul"
  }
]

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.css']
})
export class PharmacieComponent implements OnInit {
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  regions="Tous les Régions";
  search=true;
  listDataSearch=[]
  name=""
  map:Map
  pointmap: Feature;
  vectorSource: VectorSource;
  xyzSource: XyzSource;
  VectorLayer
  rasterLayer
  listPoint:Feature[]=[];

  listRegions=["Tous les Régions","Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Moanstir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]


  constructor(private modalService: NgbModal, calendar: NgbCalendar) {  
     this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);}

    open(content, type, modalDimension) {
      if (modalDimension === 'sm' && type === 'modal_mini') {
          this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      } else if (modalDimension === '' && type === 'Notification') {
        this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } else {
          this.modalService.open(content,{ centered: true }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      }
  }
  
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }
  isRangeStart(date: NgbDate){
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate){
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate){
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate){
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date){
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date){
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model2 = this.model1;
    }
  }

  onChange(deviceValue) {
    this.regions=deviceValue
    document.getElementById("map").style.display="block"
  
    this.search=true
  
    this.listDataSearch=this.searchRegion(this.regions,listInfo)
    this.listDataSearch=this.searchbyNom(this.name,this.listDataSearch)
  
    if(this.listDataSearch.length==0){
      this.search=false
      document.getElementById("map").style.display="none"
    }else{
      this.setFeature(this.listDataSearch)
  
    }
  
  }
  
  onSearchChange(searchValue: string){
    this.name=searchValue
    document.getElementById("map").style.display="block"
  
    this.search=true
    this.listDataSearch=this.searchRegion(this.regions,listInfo)
    this.listDataSearch=this.searchbyNom(this.name,this.listDataSearch)
    if(this.listDataSearch.length==0){
      this.search=false
      document.getElementById("map").style.display="none"
  
    }else{
      this.setFeature(this.listDataSearch)
  
    }
  
  
  }
  searchbyNom(name,list){
    let i=0
    let listDataSearch=[]
  
    for(let c of list){
      if(c.name.toUpperCase().includes(name.toUpperCase())){
        listDataSearch[i++]=c;
      }
    }
    return listDataSearch;
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
  
  searchiId(id,list){
    let i=0
    let listDataSearch=[]
  
    for(let c of list){
      if(c.id==id){
        listDataSearch[i++]=c;
      }
    }
    return listDataSearch;
  }
    ngOnInit(): void {
      this.listDataSearch=listInfo
      if(this.listDataSearch.length==0){
        this.search=false
      }
      this.initilizemap(this.listDataSearch)
    //  this.onClickmap(this.listDataSearch)
    }
  
  
    setFeature(list){
  
      let i=0
      this.listPoint=[]
      for (let elment of list){
        let x=elment.x;
        let y=elment.y;
        let color="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
  
        this.listPoint[i]= new Feature({
          geometry: new Point(olProj.fromLonLat([x, y])),
          name:elment.id
        });
        this.listPoint[i++].setStyle(new Style({
          image: new CircleStyle({
            radius: 3,
            fill: new Fill({
              color: color
            }),
            stroke:new Stroke({
              color:color,
              width:3
            }),
          }),
          
        }))
  
  
      }
      let vectorSource=new VectorSource({
        features:[...this.listPoint]
      })
      this.VectorLayer=new VectorLayer({
        source: vectorSource
      })
  
      this.rasterLayer =new Title({
        source: new OSM()
      })
      this.setViewMap(list)
      this.map.setLayers([this.rasterLayer, this.VectorLayer])
  
    }
    initilizemap(list){
      const container = document.getElementById('popup');
      const content = document.getElementById('popup-content');
      const bulgariaExtent = olProj.transformExtent([9.345023234, 30.238104147, 11.603526238, 37.228434539], 'EPSG:4326', 'EPSG:3857');
  
      const overlay = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
        
      });
      let i=0;
      for (let elment of list){
        let x=elment.x;
        let y=elment.y;
        let color="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
  
        this.listPoint[i]= new Feature({
          geometry: new Point(olProj.fromLonLat([x, y])),
          name:elment.id
        });
        this.listPoint[i++].setStyle(new Style({
          image: new CircleStyle({
            radius: 3,
            fill: new Fill({
              color: color
            }),
            stroke:new Stroke({
              color:color,
              width:3
            }),
          }),
          
        }))
  
  
      }
  
      this.pointmap = new Feature({
        geometry: new Point(olProj.fromLonLat([10.0785, 34.4614]))
      });
    this.pointmap.setStyle(new Style({
        stroke:new Stroke({
          color:'#8959AB',
        }),
    }
    ))
    this.vectorSource=new VectorSource({
      features:[...this.listPoint]
    })
    this.VectorLayer=new VectorLayer({
      source: this.vectorSource
    })
    this.rasterLayer =new Title({
      source: new OSM()
    })
      this.map=new Map({
        target:'map',
        layers:[
          this.rasterLayer,this.VectorLayer
        ],
        view:new View({
          extent:buffer(bulgariaExtent, 100000),
          showFullExtent:true,
  
          center:olProj.fromLonLat([10.0785, 34.4614]),
          zoom:5,
        })
      })
      console.log(this.vectorSource)
  
    }

    onClickmap(list){
      this.map.on('singleclick',function(event){
        this.forEachFeatureAtPixel(event.pixel,function(feature,layer){
          let clickedCoordinate = event.coordinate;
          let clickedFeatureName = feature.get('name');
        
          open('detail','','')
          
        })
      }) 
    }
  
    setViewMap(list){
  
      let x=0;
      let y=0;
      let minx,miny,maxx,maxy;
       maxy=miny=list[0].y
       maxx=minx=list[0].x
      for(let c of list){
        x+=c.x;
        y+=c.y;
        if(minx>c.x)
          minx=c.x
        if(miny>c.y)
          miny=c.y
        if(maxx<c.x)
          maxx=c.x
        if(maxy<c.y)
          maxy=c.y
      }
      x=x/list.length
      y=y/list.length
      const bulgariaExtent = olProj.transformExtent([9.345023234, 30.238104147, 11.603526238, 37.228434539], 'EPSG:4326', 'EPSG:3857');
  
      this.map.setView(new View({
        extent:buffer(bulgariaExtent, 100000),
        showFullExtent:true,
  
        center:olProj.fromLonLat([x, y]),
        zoom:8,
      }))
  
    }
}
