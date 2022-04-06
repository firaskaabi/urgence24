import { Component, OnInit } from '@angular/core';

import Overlay from 'ol/Overlay';
import { features } from 'process';
import { buffer } from 'ol/extent';
import { ActivatedRoute,Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


var listInfo=[
  {
    "id": "623dad8dce20610f1a97dcaa",
    "index": 0,
    "guid": "8f159f89-0bcd-4d72-ad14-c305af34c13b",
    "isActive": false,
    "x": 10.482,
    "y": 35.1789,
    "picture": "http://placehold.it/32x32",
    "name": "Dudley Osborn",
    "email": "dudleyosborn@zytrax.com",
    "phone": "+1 (834) 520-2844",
    "address": "263 Bevy Court, Mapletown, Georgia, 8721",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Dudley Osborn! You have 3 unread messages.",
    "regions": "Gafsa"
  },
  {
    "id": "623dad8d3f1e1d52af9cc4a9",
    "index": 1,
    "guid": "f7852ad4-0208-4e65-8968-317b4e3fd987",
    "isActive": false,
    "x": 10.0463,
    "y": 36.3083,
    "picture": "http://placehold.it/32x32",
    "name": "Lidia Mercado",
    "email": "lidiamercado@zytrax.com",
    "phone": "+1 (851) 571-3923",
    "address": "933 Village Road, Tuttle, Maryland, 7832",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Lidia Mercado! You have 7 unread messages.",
    "regions": "Tozeur"
  },
  {
    "id": "623dad8dbb70824a2c18a2f1",
    "index": 2,
    "guid": "733c9431-889e-4997-b3e9-5a6feaacd8e1",
    "isActive": false,
    "x": 10.865,
    "y": 35.8736,
    "picture": "http://placehold.it/32x32",
    "name": "Waller Guzman",
    "email": "wallerguzman@zytrax.com",
    "phone": "+1 (831) 428-3204",
    "address": "607 Wilson Avenue, Escondida, Idaho, 1468",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Waller Guzman! You have 9 unread messages.",
    "regions": "Kasserine"
  },
  {
    "id": "623dad8d263b66282270dd45",
    "index": 3,
    "guid": "392378ff-e222-4da8-89c3-88d6897ccf0b",
    "isActive": false,
    "x": 10.1408,
    "y": 34.6915,
    "picture": "http://placehold.it/32x32",
    "name": "Jessie Brooks",
    "email": "jessiebrooks@zytrax.com",
    "phone": "+1 (947) 455-2791",
    "address": "253 Highland Avenue, Sterling, Connecticut, 160",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Jessie Brooks! You have 6 unread messages.",
    "regions": "Tunis"
  },
  {
    "id": "623dad8dd35eadd14f7355d5",
    "index": 4,
    "guid": "b20c4765-8db6-4768-881c-a1b1de6ee878",
    "isActive": false,
    "x": 10.1188,
    "y": 34.1538,
    "picture": "http://placehold.it/32x32",
    "name": "Callie Knox",
    "email": "callieknox@zytrax.com",
    "phone": "+1 (831) 596-2834",
    "address": "739 Exeter Street, Orin, Oklahoma, 5561",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Callie Knox! You have 1 unread messages.",
    "regions": "Ariana"
  },
  {
    "id": "623dad8d20a7d544b17f48e9",
    "index": 5,
    "guid": "1841183d-7be0-4f63-8149-be2bacd0e87e",
    "isActive": true,
    "x": 10.713,
    "y": 36.9023,
    "picture": "http://placehold.it/32x32",
    "name": "Christina Mooney",
    "email": "christinamooney@zytrax.com",
    "phone": "+1 (907) 514-2773",
    "address": "472 Kensington Street, Lorraine, Wisconsin, 5466",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Christina Mooney! You have 10 unread messages.",
    "regions": "Bizerte"
  },
  {
    "id": "623dad8da45fb9d375356bed",
    "index": 6,
    "guid": "b865b6bb-87ee-4476-98b0-38b6f12e2d81",
    "isActive": true,
    "x": 10.2257,
    "y": 36.086,
    "picture": "http://placehold.it/32x32",
    "name": "Vance Stein",
    "email": "vancestein@zytrax.com",
    "phone": "+1 (826) 445-3068",
    "address": "166 Duryea Court, Greenbush, West Virginia, 7105",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Vance Stein! You have 9 unread messages.",
    "regions": "Tataouine"
  },
  {
    "id": "623dad8d6ba7bfd8fa414312",
    "index": 7,
    "guid": "1a06d444-b288-4076-93e2-367182bafdbb",
    "isActive": false,
    "x": 10.5177,
    "y": 36.6119,
    "picture": "http://placehold.it/32x32",
    "name": "Leanna Golden",
    "email": "leannagolden@zytrax.com",
    "phone": "+1 (934) 420-3184",
    "address": "974 Sunnyside Avenue, Garberville, Hawaii, 6386",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Leanna Golden! You have 6 unread messages.",
    "regions": "Medenine"
  },
  {
    "id": "623dad8dbed5517880b1dd0a",
    "index": 8,
    "guid": "2f8825b3-d6b3-47cd-bdb4-a08018485fae",
    "isActive": false,
    "x": 10.4607,
    "y": 36.2479,
    "picture": "http://placehold.it/32x32",
    "name": "Harding Reed",
    "email": "hardingreed@zytrax.com",
    "phone": "+1 (980) 434-3248",
    "address": "891 Strong Place, Fingerville, Alaska, 4950",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Harding Reed! You have 4 unread messages.",
    "regions": "Ben Arous"
  },
  {
    "id": "623dad8dbcd80cc5bf5f144b",
    "index": 9,
    "guid": "72bf7d57-965b-4bcb-b855-c356ca566167",
    "isActive": false,
    "x": 10.1959,
    "y": 35.6379,
    "picture": "http://placehold.it/32x32",
    "name": "Julianne Kaufman",
    "email": "juliannekaufman@zytrax.com",
    "phone": "+1 (978) 526-2548",
    "address": "539 Bay Parkway, Boyd, Northern Mariana Islands, 3491",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Julianne Kaufman! You have 7 unread messages.",
    "regions": "Mahdia"
  },
  {
    "id": "623dad8dd4e2734396f6fad3",
    "index": 10,
    "guid": "d7d202a6-5ec4-44f2-a151-5d0a3e8e16fe",
    "isActive": false,
    "x": 10.0597,
    "y": 34.9693,
    "picture": "http://placehold.it/32x32",
    "name": "Slater Lynch",
    "email": "slaterlynch@zytrax.com",
    "phone": "+1 (825) 480-3432",
    "address": "389 Erasmus Street, Topanga, Kentucky, 895",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Slater Lynch! You have 8 unread messages.",
    "regions": "Tataouine"
  },
  {
    "id": "623dad8def5506086d7ce924",
    "index": 11,
    "guid": "894ec4ce-0be2-454e-9827-3720f671cf8e",
    "isActive": false,
    "x": 10.304,
    "y": 35.7284,
    "picture": "http://placehold.it/32x32",
    "name": "Mayer Cote",
    "email": "mayercote@zytrax.com",
    "phone": "+1 (996) 428-3591",
    "address": "259 Knight Court, Maybell, Maine, 257",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Mayer Cote! You have 7 unread messages.",
    "regions": "Sidi Bouzid"
  },
  {
    "id": "623dad8dc78be06be089f518",
    "index": 12,
    "guid": "2652da8d-2267-47f5-b594-0b747fcaf24b",
    "isActive": true,
    "x": 10.0921,
    "y": 36.9785,
    "picture": "http://placehold.it/32x32",
    "name": "Andrews Griffin",
    "email": "andrewsgriffin@zytrax.com",
    "phone": "+1 (937) 528-3421",
    "address": "510 Anchorage Place, Belfair, Arizona, 4147",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Andrews Griffin! You have 10 unread messages.",
    "regions": "Sidi Bouzid"
  },
  {
    "id": "623dad8d33deda379bfda6d8",
    "index": 13,
    "guid": "c9fc5af0-6235-4fce-b5b8-53ecb82cfc70",
    "isActive": false,
    "x": 10.6328,
    "y": 36.6041,
    "picture": "http://placehold.it/32x32",
    "name": "Lesa Patrick",
    "email": "lesapatrick@zytrax.com",
    "phone": "+1 (936) 445-2430",
    "address": "845 Quincy Street, Sugartown, New Hampshire, 2036",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Lesa Patrick! You have 4 unread messages.",
    "regions": "Tataouine"
  },
  {
    "id": "623dad8df337c38da1deeea1",
    "index": 14,
    "guid": "31c353b8-a99d-4c2f-8397-164ba517bc64",
    "isActive": true,
    "x": 10.4932,
    "y": 35.9402,
    "picture": "http://placehold.it/32x32",
    "name": "Winifred King",
    "email": "winifredking@zytrax.com",
    "phone": "+1 (950) 540-3539",
    "address": "815 Lake Avenue, Bladensburg, Pennsylvania, 5456",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Winifred King! You have 2 unread messages.",
    "regions": "Siliana"
  },
  {
    "id": "623dad8d7c19906afc952f6a",
    "index": 15,
    "guid": "5d48eac6-d3b2-4734-9085-fc257eac6e99",
    "isActive": true,
    "x": 10.9419,
    "y": 35.775,
    "picture": "http://placehold.it/32x32",
    "name": "Head Peters",
    "email": "headpeters@zytrax.com",
    "phone": "+1 (888) 575-3415",
    "address": "649 Furman Avenue, Crumpler, Arkansas, 5890",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Head Peters! You have 9 unread messages.",
    "regions": "Ben Arous"
  },
  {
    "id": "623dad8d9b46311d919f619e",
    "index": 16,
    "guid": "b59b1465-5dac-490f-96d9-24ae18d2b2a7",
    "isActive": true,
    "x": 10.6199,
    "y": 35.0535,
    "picture": "http://placehold.it/32x32",
    "name": "Navarro Goff",
    "email": "navarrogoff@zytrax.com",
    "phone": "+1 (830) 484-2129",
    "address": "487 Lake Place, Cecilia, Guam, 8154",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Navarro Goff! You have 1 unread messages.",
    "regions": "Bizerte"
  },
  {
    "id": "623dad8dcd6a26a8db8dfc90",
    "index": 17,
    "guid": "e8becf55-fae0-47e6-af20-b213350d737d",
    "isActive": true,
    "x": 10.8492,
    "y": 35.3297,
    "picture": "http://placehold.it/32x32",
    "name": "Freda Noble",
    "email": "fredanoble@zytrax.com",
    "phone": "+1 (935) 540-3106",
    "address": "703 National Drive, Vincent, American Samoa, 5784",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Freda Noble! You have 4 unread messages.",
    "regions": "Sidi Bouzid"
  },
  {
    "id": "623dad8d0f936b2ffdc847ef",
    "index": 18,
    "guid": "68257226-b01b-4cec-b2a7-f6ea0828a098",
    "isActive": true,
    "x": 10.3697,
    "y": 35.2607,
    "picture": "http://placehold.it/32x32",
    "name": "Hines Paul",
    "email": "hinespaul@zytrax.com",
    "phone": "+1 (833) 443-3170",
    "address": "576 Eldert Lane, Murillo, Marshall Islands, 7611",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Hines Paul! You have 5 unread messages.",
    "regions": "Zaghouan"
  },
  {
    "id": "623dad8d601d6cbb4b4321e8",
    "index": 19,
    "guid": "ad980b2d-c267-4759-b1fc-fb6768d85eb2",
    "isActive": true,
    "x": 10.4778,
    "y": 35.223,
    "picture": "http://placehold.it/32x32",
    "name": "Edwards Savage",
    "email": "edwardssavage@zytrax.com",
    "phone": "+1 (990) 439-2306",
    "address": "487 Conway Street, Frank, Iowa, 5506",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Edwards Savage! You have 2 unread messages.",
    "regions": "Zaghouan"
  },
  {
    "id": "623dad8de87fea6705151dd4",
    "index": 20,
    "guid": "fe06eee3-0722-42e8-bfd8-d403cc612abb",
    "isActive": false,
    "x": 10.4925,
    "y": 34.5996,
    "picture": "http://placehold.it/32x32",
    "name": "Monica Juarez",
    "email": "monicajuarez@zytrax.com",
    "phone": "+1 (961) 432-3826",
    "address": "379 Moore Street, Waterloo, Massachusetts, 6103",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Monica Juarez! You have 1 unread messages.",
    "regions": "Kebili"
  },
  {
    "id": "623dad8dcb2ddb7c7adee8f2",
    "index": 21,
    "guid": "ee8456e2-c4a5-4d9c-84dd-97bed995a016",
    "isActive": true,
    "x": 10.053,
    "y": 34.5737,
    "picture": "http://placehold.it/32x32",
    "name": "Fisher Stafford",
    "email": "fisherstafford@zytrax.com",
    "phone": "+1 (816) 455-2350",
    "address": "282 Grace Court, Cashtown, Missouri, 9981",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Fisher Stafford! You have 5 unread messages.",
    "regions": "Siliana"
  },
  {
    "id": "623dad8d3dada7dec0d250c1",
    "index": 22,
    "guid": "cf8843c3-7a78-436d-bc0f-f7463badb04c",
    "isActive": false,
    "x": 10.4705,
    "y": 35.7662,
    "picture": "http://placehold.it/32x32",
    "name": "Fran Gallagher",
    "email": "frangallagher@zytrax.com",
    "phone": "+1 (841) 524-2666",
    "address": "159 Royce Street, Dante, Puerto Rico, 3799",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Fran Gallagher! You have 1 unread messages.",
    "regions": "Zaghouan"
  }
]

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  map:Map
  pointmap: Feature;
  vectorSource: VectorSource;
  VectorLayer
  rasterLayer
  listPoint:Feature[]=[];
  popup:boolean=false;
  region=""
  categorie=""
  listDataSearch=[];
  imgDetails
  nameDetails
  adresseDeatils
  phoneDetails
  urgenceDetails:any
  listRegions=["Région","Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Moanstir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]


  focus;
  focus1;
  focus2;
  focus3;
  focus4;

  constructor(private modalService: NgbModal, calendar: NgbCalendar,private route:ActivatedRoute) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.listDataSearch=listInfo
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
  this.listDataSearch=this.searchRegion(deviceValue,listInfo)
  console.log(this.listDataSearch)

}
onSearchChange(searchValue: string){
  this.listDataSearch=this.searchbyNom(searchValue,listInfo)

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
  console.log()
  let i=0
  let listDataSearch=[]
  if(region=="Région"){
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

    this.route.queryParams.subscribe(params=>{
      if(params.id!==null){
        this.listDataSearch=this.searchiId(params.id,listInfo)
      }

    })
  }

}
