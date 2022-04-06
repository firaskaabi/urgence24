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
    "id": "6241c235527548456c303d0e",
    "index": 0,
    "guid": "a032500a-4760-4b26-9f9b-6ee42cc2abb0",
    "isActive": false,
    "x": 10.4959,
    "y": 34.3641,
    "picture": "http://placehold.it/32x32",
    "name": "Cortez Ford",
    "email": "cortezford@filodyne.com",
    "phone": "+1 (807) 572-2644",
    "address": "326 Grand Street, Sanford, District Of Columbia, 1949",
    "greeting": "Hello, Cortez Ford! You have 7 unread messages.",
    "regions": "Manouba"
  },
  {
    "id": "6241c235de57ef843ffc522d",
    "index": 1,
    "guid": "a5c91c1d-70e9-425a-93ad-306f425fe62c",
    "isActive": true,
    "x": 10.4093,
    "y": 34.4494,
    "picture": "http://placehold.it/32x32",
    "name": "Jami Rivers",
    "email": "jamirivers@filodyne.com",
    "phone": "+1 (898) 474-2465",
    "address": "609 Humboldt Street, Newkirk, Nebraska, 3694",
    "greeting": "Hello, Jami Rivers! You have 2 unread messages.",
    "regions": "Sfax"
  },
  {
    "id": "6241c23508150323793f84a6",
    "index": 2,
    "guid": "d4a0493b-3c71-412f-a2e7-bac88e070793",
    "isActive": false,
    "x": 10.5409,
    "y": 34.9199,
    "picture": "http://placehold.it/32x32",
    "name": "Berta Sawyer",
    "email": "bertasawyer@filodyne.com",
    "phone": "+1 (981) 548-3016",
    "address": "422 Fenimore Street, Springhill, Tennessee, 7529",
    "greeting": "Hello, Berta Sawyer! You have 7 unread messages.",
    "regions": "\tSousse"
  },
  {
    "id": "6241c2350c122420d25951d7",
    "index": 3,
    "guid": "1a479e93-05d7-43c4-be80-b14c95c248c9",
    "isActive": false,
    "x": 10.8605,
    "y": 34.5044,
    "picture": "http://placehold.it/32x32",
    "name": "Watson Aguilar",
    "email": "watsonaguilar@filodyne.com",
    "phone": "+1 (955) 595-3067",
    "address": "584 Interborough Parkway, Cotopaxi, Rhode Island, 9644",
    "greeting": "Hello, Watson Aguilar! You have 2 unread messages.",
    "regions": "Kairouan"
  },
  {
    "id": "6241c235f4673c71d5540fea",
    "index": 4,
    "guid": "4ce4e6f7-edbd-48d9-b144-858f24f332ae",
    "isActive": false,
    "x": 10.2607,
    "y": 36.9982,
    "picture": "http://placehold.it/32x32",
    "name": "Donaldson Kim",
    "email": "donaldsonkim@filodyne.com",
    "phone": "+1 (896) 596-2112",
    "address": "496 Middagh Street, Efland, Mississippi, 4477",
    "greeting": "Hello, Donaldson Kim! You have 1 unread messages.",
    "regions": "Moanstir"
  },
  {
    "id": "6241c2359809333771519688",
    "index": 5,
    "guid": "f67d5bbe-3129-41b7-acf5-6c1cedf61123",
    "isActive": true,
    "x": 10.4397,
    "y": 34.6051,
    "picture": "http://placehold.it/32x32",
    "name": "Vargas Garrett",
    "email": "vargasgarrett@filodyne.com",
    "phone": "+1 (852) 448-3102",
    "address": "931 Tapscott Street, Deputy, Delaware, 1076",
    "greeting": "Hello, Vargas Garrett! You have 9 unread messages.",
    "regions": "\tSousse"
  },
  {
    "id": "6241c235bb2dab12479ea0db",
    "index": 6,
    "guid": "8e21d298-da6b-401c-aaad-5aff0af2bbdf",
    "isActive": false,
    "x": 10.0561,
    "y": 35.8185,
    "picture": "http://placehold.it/32x32",
    "name": "Vilma Finch",
    "email": "vilmafinch@filodyne.com",
    "phone": "+1 (888) 548-2651",
    "address": "287 Orange Street, Gorst, North Dakota, 1132",
    "greeting": "Hello, Vilma Finch! You have 2 unread messages.",
    "regions": "Sfax"
  },
  {
    "id": "6241c23542ed43245661e6e7",
    "index": 7,
    "guid": "3a98488e-a047-4c03-b809-c932b11e96cc",
    "isActive": true,
    "x": 10.5091,
    "y": 35.6656,
    "picture": "http://placehold.it/32x32",
    "name": "Young Chambers",
    "email": "youngchambers@filodyne.com",
    "phone": "+1 (936) 533-3247",
    "address": "287 Hyman Court, Eggertsville, Wisconsin, 7207",
    "greeting": "Hello, Young Chambers! You have 4 unread messages.",
    "regions": "Sidi Bouzid"
  },
  {
    "id": "6241c2354b5ca8fd43db22c1",
    "index": 8,
    "guid": "68e56ab1-07fb-4c54-aa99-5855356a6625",
    "isActive": true,
    "x": 10.1717,
    "y": 36.8378,
    "picture": "http://placehold.it/32x32",
    "name": "Howe Combs",
    "email": "howecombs@filodyne.com",
    "phone": "+1 (855) 445-3631",
    "address": "328 Stryker Court, Waverly, Colorado, 4475",
    "greeting": "Hello, Howe Combs! You have 5 unread messages.",
    "regions": "Nabeul"
  },
  {
    "id": "6241c2354c24b07a91761bcd",
    "index": 9,
    "guid": "e08483b8-e380-476b-af34-cd6e68e76e23",
    "isActive": false,
    "x": 10.3682,
    "y": 34.0873,
    "picture": "http://placehold.it/32x32",
    "name": "Constance Morris",
    "email": "constancemorris@filodyne.com",
    "phone": "+1 (876) 407-3460",
    "address": "378 Manor Court, Kenwood, Oklahoma, 4326",
    "greeting": "Hello, Constance Morris! You have 1 unread messages.",
    "regions": "Ben Arous"
  },
  {
    "id": "6241c235562adce3cf0310e1",
    "index": 10,
    "guid": "c100550d-896b-4a02-8db7-48bdaabd013a",
    "isActive": false,
    "x": 10.8313,
    "y": 35.9174,
    "picture": "http://placehold.it/32x32",
    "name": "Molly Spence",
    "email": "mollyspence@filodyne.com",
    "phone": "+1 (899) 493-3684",
    "address": "950 Franklin Avenue, Springdale, Missouri, 9422",
    "greeting": "Hello, Molly Spence! You have 9 unread messages.",
    "regions": "Ariana"
  },
  {
    "id": "6241c2352119f21e384a4071",
    "index": 11,
    "guid": "4a35a33c-6569-4524-bce6-3dd6fc772eb2",
    "isActive": false,
    "x": 10.8808,
    "y": 35.6725,
    "picture": "http://placehold.it/32x32",
    "name": "Buckley Joyce",
    "email": "buckleyjoyce@filodyne.com",
    "phone": "+1 (980) 402-3446",
    "address": "553 McDonald Avenue, Hinsdale, Puerto Rico, 7576",
    "greeting": "Hello, Buckley Joyce! You have 6 unread messages.",
    "regions": "Zaghouan"
  },
  {
    "id": "6241c2352c879acb38f2770a",
    "index": 12,
    "guid": "b2876337-5474-4b4e-ad03-cfd08c044f99",
    "isActive": false,
    "x": 10.054,
    "y": 35.2574,
    "picture": "http://placehold.it/32x32",
    "name": "Sofia Bowman",
    "email": "sofiabowman@filodyne.com",
    "phone": "+1 (978) 578-3685",
    "address": "575 Imlay Street, Bellamy, Pennsylvania, 8525",
    "greeting": "Hello, Sofia Bowman! You have 7 unread messages.",
    "regions": "Tunis"
  },
  {
    "id": "6241c235e40385de91fc719e",
    "index": 13,
    "guid": "0ceb7c00-70af-4abe-b7e3-f3f3430b19cb",
    "isActive": true,
    "x": 10.0424,
    "y": 34.1313,
    "picture": "http://placehold.it/32x32",
    "name": "Debbie Beasley",
    "email": "debbiebeasley@filodyne.com",
    "phone": "+1 (927) 600-3996",
    "address": "582 Dover Street, Jessie, Connecticut, 6741",
    "greeting": "Hello, Debbie Beasley! You have 1 unread messages.",
    "regions": "Kasserine"
  },
  {
    "id": "6241c2358cac6a0235220fdd",
    "index": 14,
    "guid": "b275d8c0-07b5-4915-bbc8-7ad957eec67e",
    "isActive": true,
    "x": 10.1978,
    "y": 35.0501,
    "picture": "http://placehold.it/32x32",
    "name": "Rosario Bullock",
    "email": "rosariobullock@filodyne.com",
    "phone": "+1 (866) 520-2300",
    "address": "505 Lawn Court, Hanover, Northern Mariana Islands, 2114",
    "greeting": "Hello, Rosario Bullock! You have 2 unread messages.",
    "regions": "Moanstir"
  },
  {
    "id": "6241c2353a95d086da623fe1",
    "index": 15,
    "guid": "9517177f-b993-43c2-bf5e-c7bb06ce8574",
    "isActive": true,
    "x": 10.9771,
    "y": 35.6643,
    "picture": "http://placehold.it/32x32",
    "name": "Lelia King",
    "email": "leliaking@filodyne.com",
    "phone": "+1 (872) 583-3957",
    "address": "307 Ovington Court, Nettie, Virgin Islands, 2752",
    "greeting": "Hello, Lelia King! You have 2 unread messages.",
    "regions": "\tMedenine"
  },
  {
    "id": "6241c235e53ccf06e5b48df2",
    "index": 16,
    "guid": "84175f75-de30-42bc-bb16-715c286a1fa5",
    "isActive": true,
    "x": 10.3658,
    "y": 36.2333,
    "picture": "http://placehold.it/32x32",
    "name": "Delores Delgado",
    "email": "deloresdelgado@filodyne.com",
    "phone": "+1 (912) 430-3435",
    "address": "448 Canda Avenue, Idledale, Guam, 1972",
    "greeting": "Hello, Delores Delgado! You have 2 unread messages.",
    "regions": "Béja"
  },
  {
    "id": "6241c23522ebaa02fa48f966",
    "index": 17,
    "guid": "29699773-12ac-4fa8-873c-7489fddf2746",
    "isActive": true,
    "x": 10.7383,
    "y": 35.2236,
    "picture": "http://placehold.it/32x32",
    "name": "Hurley Lancaster",
    "email": "hurleylancaster@filodyne.com",
    "phone": "+1 (834) 587-2008",
    "address": "709 Surf Avenue, Cavalero, Montana, 2706",
    "greeting": "Hello, Hurley Lancaster! You have 4 unread messages.",
    "categories": "Laboratoire",
    "regions": "Bizerte"
  },
  {
    "id": "6241c235fce85f735f455d6f",
    "index": 18,
    "guid": "4f9d7184-1068-45aa-891a-783d7f9b5717",
    "isActive": false,
    "x": 10.8477,
    "y": 34.1389,
    "picture": "http://placehold.it/32x32",
    "name": "Ernestine Wise",
    "email": "ernestinewise@filodyne.com",
    "phone": "+1 (871) 594-2638",
    "address": "389 Grimes Road, Northridge, Idaho, 1131",
    "greeting": "Hello, Ernestine Wise! You have 5 unread messages.",
    "regions": "Ben Arous"
  },
  {
    "id": "6241c23572fe0251c8b7d803",
    "index": 19,
    "guid": "fded9687-caf7-41bc-a73d-61d904bd33fd",
    "isActive": true,
    "x": 10.1144,
    "y": 34.2837,
    "picture": "http://placehold.it/32x32",
    "name": "Strong Summers",
    "email": "strongsummers@filodyne.com",
    "phone": "+1 (888) 528-3370",
    "address": "289 Danforth Street, Marysville, Texas, 2157",
    "greeting": "Hello, Strong Summers! You have 2 unread messages.",
    "regions": "Gabès"
  },
  {
    "id": "6241c235c8855a113670a734",
    "index": 20,
    "guid": "8d8eac74-4fb8-41b3-96be-b9cd99b5417a",
    "isActive": true,
    "x": 10.6573,
    "y": 35.0642,
    "picture": "http://placehold.it/32x32",
    "name": "Adams Mullen",
    "email": "adamsmullen@filodyne.com",
    "phone": "+1 (950) 599-3240",
    "address": "214 Brigham Street, Haena, Arizona, 4870",
    "greeting": "Hello, Adams Mullen! You have 9 unread messages.",
    "regions": "\tMedenine"
  },
  {
    "id": "6241c2353656ab9c7689f83d",
    "index": 21,
    "guid": "869f3cde-3bb2-4224-bd45-e697fb40c115",
    "isActive": true,
    "x": 10.3461,
    "y": 35.2507,
    "picture": "http://placehold.it/32x32",
    "name": "Jarvis Martin",
    "email": "jarvismartin@filodyne.com",
    "phone": "+1 (899) 523-2542",
    "address": "115 Boulevard Court, Hachita, New York, 3760",
    "greeting": "Hello, Jarvis Martin! You have 5 unread messages.",
    "regions": "Moanstir"
  },
  {
    "id": "6241c235bb7e3a6b9e090376",
    "index": 22,
    "guid": "fc7aae6c-15f8-40f3-bb9a-f45478966316",
    "isActive": true,
    "x": 10.2765,
    "y": 36.3881,
    "picture": "http://placehold.it/32x32",
    "name": "Simon Gallagher",
    "email": "simongallagher@filodyne.com",
    "phone": "+1 (926) 500-2928",
    "address": "100 Lee Avenue, Ezel, Arkansas, 236",
    "greeting": "Hello, Simon Gallagher! You have 8 unread messages.",
    "categories": "Laboratoire",
    "regions": "\tMedenine"
  }
]
@Component({
  selector: 'app-clinique',
  templateUrl: './clinique.component.html',
  styleUrls: ['./clinique.component.css']
})
export class CliniqueComponent implements OnInit {
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  listRegions=["Région","Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Moanstir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]
  regions="Région";
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
  popup:boolean=false;
  region=""
  categorie=""
  id="";
  type="";
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  constructor(private modalService: NgbModal, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }
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
