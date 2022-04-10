import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Geolocation from 'ol/Geolocation';
@Component({
  selector: 'app-add-medecin',
  templateUrl: './add-medecin.component.html',
  styleUrls: ['./add-medecin.component.css']
})
export class AddMedecinComponent implements OnInit {
  
  listRegions=["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Manouba","	Medenine","Moanstir","Nabeul","Sfax","Sidi Bouzid","Siliana","	Sousse","	Tataouine","Tozeur","	Tunis","	Zaghouan"]
  lsitSpecialite=[
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

  constructor() { }

  ngOnInit(): void {
    //this.initilizemap();
  }


  initilizemap(){
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
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });
    
    function el(id) {
      return document.getElementById(id);
    }
    
      geolocation.setTracking(true);
      console.log(geolocation.getAccuracy())
      
    
    // update the HTML page when the position changes.
    geolocation.on('change', function () {
      el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
      el('altitude').innerText = geolocation.getAltitude() + ' [m]';
      el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
      el('heading').innerText = geolocation.getHeading() + ' [rad]';
      el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
    });
    
    // handle geolocation error.
    geolocation.on('error', function (error) {
      const info = document.getElementById('info');
      info.innerHTML = "error";
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
