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
import { SearchService } from '../service/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
  listInfo
  fromDate: NgbDate;
  listDataSearch
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  specialite="Tous les Specialites"
  regions="Tous les Régions"
  name=""
  map:Map
  pointmap: Feature;
  vectorSource: VectorSource;
  xyzSource: XyzSource;
  VectorLayer
  rasterLayer
  listPoint:Feature[]=[];
  popup:boolean=false;

  search=true
  listRegions=["Tous les Régions","Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]
  lsitSpecialite=["Tous les Specialites",
    "L’allergologie ou l’immunologie",
    "L’anesthésiologie",
    "L’andrologie",
    "La cardiologie",
    "La chirurgie cardiaque",
    "La chirurgie esthétique, plastique et reconstructive",
    "La chirurgie générale",
    "La chirurgie maxillo-faciale",
    "La chirurgie pédiatrique",
    "La chirurgie thoracique",
    "La chirurgie vasculaire",
    "La neurochirurgie",
    "La dermatologie",
    "L’endocrinologie",
    "La gastro-entérologie",
    "La gériatrie",
    "La gynécologie",
    "L’hématologie",
    "L’hépatologie",
    "L’infectiologie",
    "La médecine aiguë",
    "La médecine du travail",
    "La médecine générale",
    "La médecine interne",
    "La médecine nucléaire",
    "La médecine palliative",
    "La médecine physique",
    "La médecine préventive",
    "La néonatologie",
    "La néphrologie",
    "La neurologie",
    "L’odontologie",
    "L’oncologie",
    "L’obstétrique",
    "L’ophtalmologie",
    "L’orthopédie",
    "L’Oto-rhino-laryngologie",
    "La pédiatrie",
    "La pneumologie",
    "La rhumatologie",
    "La psychiatrie",
    "La radiologie",
    "La radiothérapie",
    "L’urologie"
      ]
    

  focus;
  focus1;
  focus2;
  focus3;
  focus4;

  constructor(private modalService: NgbModal, calendar: NgbCalendar ,private searchService:SearchService,private router:Router) { 
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



onChangeSpecialite(deviceValue) {
  this.specialite=deviceValue
  document.getElementById("map").style.display="block"

  this.search=true

  this.listDataSearch=this.searchRegion(this.regions,this.listInfo)
  this.listDataSearch=this.searchbyNom(this.name,this.listDataSearch)
  this.listDataSearch=this.searchbySpecialite(this.specialite,this.listDataSearch)
  if(this.listDataSearch.length==0){
    this.search=false
    document.getElementById("map").style.display="none"

  }else{
    this.setFeature(this.listDataSearch)

  }

}

searchbySpecialite(name,list){
  let i=0
  let listDataSearch=[]
if(name=="Tous les Specialites"){
  return list
}
  for(let c of list){
    if(c.specialites==name){
      listDataSearch[i++]=c;
    }
  }
  return listDataSearch;
}

onChange(deviceValue) {
  this.regions=deviceValue
  document.getElementById("map").style.display="block"

  this.search=true
  console.log(this.regions)
  this.listDataSearch=this.searchRegion(this.regions,this.listInfo)
  this.listDataSearch=this.searchbyNom(this.name,this.listDataSearch)
  this.listDataSearch=this.searchbySpecialite(this.specialite,this.listDataSearch)


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
  this.listDataSearch=this.searchRegion(this.regions,this.listInfo)
  this.listDataSearch=this.searchbyNom(this.name,this.listDataSearch)
  this.listDataSearch=this.searchbySpecialite(this.specialite,this.listDataSearch)

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
    if(c.firstName.toUpperCase().includes(name.toUpperCase()) ||c.lastName.toUpperCase().includes(name.toUpperCase())){
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
    console.log(region+" "+c.region)
    if(c.region==region){
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
    
    this.searchService.getByCategorie("medecins").pipe()
    .subscribe(data=>{
      this.listDataSearch=data
      console.log(data)
      this.listInfo=this.listDataSearch
      this.initilizemap(this.listDataSearch)
      this.onClickmap(this.listDataSearch)
      if(this.listDataSearch.length==0){
        this.search=false
      }

    })


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

  onClickmap(list){
    this.map.on('singleclick',function(event){
      this.forEachFeatureAtPixel(event.pixel,function(feature,layer){
        let clickedCoordinate = event.coordinate;
        let clickedFeatureName = feature.get('name');
        console.log(clickedFeatureName)
        for(let c of list){
          if(c.id==clickedFeatureName){
            document.getElementById("Modalid").textContent=c.id

            document.getElementById("ModalTitle").textContent=c.firstName+" "+c.lastName
            document.getElementById("ModalEmail").textContent=c.email
            document.getElementById("MdalAdresse").textContent=c.regions+","+c.adresse
            document.getElementById("ModalType").textContent=c.categorie

            document.getElementById("ModalPhone").textContent=c.phone_number
            document.getElementById("info").style.display='block'
            document.getElementById("Modalid").style.display='none'

            console.log(c)
          }
        }
      })
    }) 
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
  displayModal(){
    document.getElementById('info').style.display='none'
  }
  gotopage(){
    let id=document.getElementById('Modalid').textContent
    this.router.navigate(['user-profile/'+id])
  }
}
