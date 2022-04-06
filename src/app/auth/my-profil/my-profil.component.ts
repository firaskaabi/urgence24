import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
import Map from 'ol/Map';
import {Tile as TitleLayer} from 'ol/layer.js';
import  View  from 'ol/View';
import * as olProj from 'ol/proj';
import { Point } from 'ol/geom';
import XyzSource from 'ol/source/XYZ';
import {Fill, Stroke, Style} from 'ol/style.js';
import Title from 'ol/layer/Tile';
import CircleStyle from 'ol/style/Circle';
import Overlay from 'ol/Overlay';
import { buffer } from 'ol/extent';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { DomSanitizer } from '@angular/platform-browser';
import {toStringHDMS} from 'ol/coordinate';
import {fromLonLat, toLonLat} from 'ol/proj';
import { EditProfilService } from 'src/app/service/edit-profil.service';
var position:any
@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.css']  
})
export class MyProfilComponent implements OnInit {
  
  map:Map
  pointmap: Feature;
  vectorSource: VectorSource;
  xyzSource: XyzSource;
  VectorLayer
  rasterLayer
  listPoint:Feature[]=[];
  popup:boolean=false;
  view=new View();
  region=""
  categorie=""

  constructor(private route:ActivatedRoute,private searchService:SearchService ,private editPorfilService:EditProfilService) { }
  id
  userInfo
  editPosition=false;
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.searchService.getByIdAndCategorie(this.id,"").subscribe(data=>{
      console.log(data)
      this.userInfo=data;
      this.initilizemap(this.userInfo)
      document.getElementById("map").style.display="none"

    // this.setViewMap(this.userInfo)
    })
  }
  initilizemap(list){
    const container = document.getElementById('popup');
    const bulgariaExtent = olProj.transformExtent([9.345023234, 30.238104147, 11.603526238, 37.228434539], 'EPSG:4326', 'EPSG:3857');
    let i=0;
      let x=11//list.x;
      let y=34//list.y;
      let color="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";

      this.listPoint[0]= new Feature({
        geometry: new Point(olProj.fromLonLat([x, y])),
        name:list.id
      });
      this.listPoint[0].setStyle(new Style({
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

        center:olProj.fromLonLat([x, y]),
        zoom:8,
      })
    })
    this.map.on('click',function(e){
      position=toLonLat(e.coordinate)
      console.log(toLonLat(e.coordinate))
      console.log(position)
    })

   
  }

  setFeature(corX,corY){

    let i=0
    this.listPoint=[]
      let x=corX;
      let y=corY;
      let color="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";

      this.listPoint[0]= new Feature({
        geometry: new Point(olProj.fromLonLat([x, y])),
        name:"mypostion"
      });
      this.listPoint[0].setStyle(new Style({
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


    
    let vectorSource=new VectorSource({
      features:[...this.listPoint]
    })
    this.VectorLayer=new VectorLayer({
      source: vectorSource
    })

    this.rasterLayer =new Title({
      source: new OSM()
    })
    this.setViewMap(corX,corY)
    this.map.setLayers([this.rasterLayer, this.VectorLayer])

  }
  

  setViewMap(corX,CorY){

    let x=0;
    let y=0;
    let minx,miny,maxx,maxy;
     y=maxy=miny=CorY
     x=maxx=minx=corX
    
  
    const bulgariaExtent = olProj.transformExtent([9.345023234, 30.238104147, 11.603526238, 37.228434539], 'EPSG:4326', 'EPSG:3857');

    this.map.setView(new View({
      extent:buffer(bulgariaExtent, 100000),
      showFullExtent:true,

      center:olProj.fromLonLat([x, y]),
      zoom:8,
    }))

  }

  showmap(){
    this.editPosition=true
    document.getElementById("map").style.display="block"
  }
  savePosition(){
    console.log(position)
    this.editPorfilService.editPosition(this.id,position[0],position[1]).subscribe(data=>{
      console.log(data)
    })
    this.editPosition=false
    document.getElementById("map").style.display="none"

  }

}
