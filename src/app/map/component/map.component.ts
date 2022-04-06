import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
import { MapOverlayComponent } from './map-overlay/map-overlay.component';
import { MapOverlayServiceService } from '../map-overlay-service.service';
import { buffer } from 'ol/extent';
import { ActivatedRoute,Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';



var listInfo=[
  {
    "id": "623c62e9cca7c35f036f9e16",
    "index": 0,
    "guid": "855c15d8-e8ac-4334-9acf-878c280e3d00",
    "isActive": true,
    "x": 10.7435,
    "y": 34.7776,
    "picture": "http://placehold.it/32x32",
    "name": "Young Gay",
    "email": "younggay@naxdis.com",
    "phone": "+1 (924) 505-2643",
    "address": "441 Empire Boulevard, Freelandville, Washington, 6174",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Young Gay! You have 8 unread messages.",
    "categories": "Laboratoire",
    "regions": "Ben Arous"
  },
  {
    "id": "623c62e9ab95e16278ab3500",
    "index": 1,
    "guid": "80bea9b1-33cd-47c5-8e3f-0abe1564ce0e",
    "isActive": false,
    "x": 10.4024,
    "y": 36.3617,
    "picture": "http://placehold.it/32x32",
    "name": "Rojas Marsh",
    "email": "rojasmarsh@naxdis.com",
    "phone": "+1 (826) 457-2543",
    "address": "373 Forbell Street, Floriston, Nebraska, 2819",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Rojas Marsh! You have 2 unread messages.",
    "categories": "Clinique",
    "regions": "Kairouan"
  },
  {
    "id": "623c62e9c0ace1386bfecb3e",
    "index": 2,
    "guid": "b3c7ca31-b683-42c1-8cda-1f1f0be96daf",
    "isActive": true,
    "x": 10.8264,
    "y": 35.0096,
    "picture": "http://placehold.it/32x32",
    "name": "Bridgette Wilson",
    "email": "bridgettewilson@naxdis.com",
    "phone": "+1 (874) 496-3774",
    "address": "403 Green Street, Chautauqua, Oklahoma, 7275",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Bridgette Wilson! You have 2 unread messages.",
    "categories": "Ambulance",
    "regions": "Tataouine"
  },
  {
    "id": "623c62e9a80c83f5b8912054",
    "index": 3,
    "guid": "39de7181-e4a2-49a8-8ccf-128f0e6848b1",
    "isActive": false,
    "x": 10.3476,
    "y": 36.4542,
    "picture": "http://placehold.it/32x32",
    "name": "Gina Sheppard",
    "email": "ginasheppard@naxdis.com",
    "phone": "+1 (902) 424-2791",
    "address": "626 Murdock Court, Norwood, Marshall Islands, 9467",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Gina Sheppard! You have 8 unread messages.",
    "categories": "Urgence",
    "regions": "Ben Arous"
  },
  {
    "id": "623c62e90eb8e2792aba9300",
    "index": 4,
    "guid": "b69513a0-9d3a-44ba-b341-0515afef0638",
    "isActive": false,
    "x": 10.5599,
    "y": 34.3058,
    "picture": "http://placehold.it/32x32",
    "name": "Margery Cain",
    "email": "margerycain@naxdis.com",
    "phone": "+1 (965) 430-3374",
    "address": "810 Hewes Street, Como, South Carolina, 7415",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Margery Cain! You have 7 unread messages.",
    "categories": "Pharmacie",
    "regions": "Zaghouan"
  },
  {
    "id": "623c62e91217c7e4bfce9570",
    "index": 5,
    "guid": "4ed7a04d-47a3-4d24-b82d-d68ccb8d417d",
    "isActive": false,
    "x": 10.7219,
    "y": 35.242,
    "picture": "http://placehold.it/32x32",
    "name": "Charles Donaldson",
    "email": "charlesdonaldson@naxdis.com",
    "phone": "+1 (946) 470-2205",
    "address": "443 Butler Street, Marne, Indiana, 6834",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Charles Donaldson! You have 9 unread messages.",
    "categories": "Urgence",
    "regions": "Manouba"
  },
  {
    "id": "623c62e90190c3205a9d993f",
    "index": 6,
    "guid": "6e357289-4f64-4608-8544-6a8ec80a8ced",
    "isActive": true,
    "x": 10.829,
    "y": 35.6126,
    "picture": "http://placehold.it/32x32",
    "name": "Harrell Clayton",
    "email": "harrellclayton@naxdis.com",
    "phone": "+1 (890) 464-3954",
    "address": "165 Bergen Place, Blodgett, Kansas, 7779",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Harrell Clayton! You have 5 unread messages.",
    "categories": "Ambulance",
    "regions": "Tozeur"
  },
  {
    "id": "623c62e99dcf05fbd5a77ec8",
    "index": 7,
    "guid": "81c6c377-d1c7-446d-8d6f-6e368bf161ec",
    "isActive": false,
    "x": 10.9987,
    "y": 36.8847,
    "picture": "http://placehold.it/32x32",
    "name": "Mamie Elliott",
    "email": "mamieelliott@naxdis.com",
    "phone": "+1 (922) 527-3557",
    "address": "367 Kent Avenue, Lemoyne, Missouri, 2935",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Mamie Elliott! You have 3 unread messages.",
    "categories": "Médecin",
    "regions": "Mahdia"
  },
  {
    "id": "623c62e9784b0419ebdbcc22",
    "index": 8,
    "guid": "63628ceb-2a81-4519-9146-e1086d4e846f",
    "isActive": true,
    "x": 10.0179,
    "y": 36.323,
    "picture": "http://placehold.it/32x32",
    "name": "Wilda Huffman",
    "email": "wildahuffman@naxdis.com",
    "phone": "+1 (871) 529-3523",
    "address": "891 Wolf Place, Camas, Minnesota, 5226",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Wilda Huffman! You have 8 unread messages.",
    "categories": "Clinique",
    "regions": "Zaghouan"
  },
  {
    "id": "623c62e9c5ec22fcd8ec8810",
    "index": 9,
    "guid": "400f9a73-c2be-44f8-9422-60bd804e7e0d",
    "isActive": false,
    "x": 10.6725,
    "y": 35.4258,
    "picture": "http://placehold.it/32x32",
    "name": "Tanya Hudson",
    "email": "tanyahudson@naxdis.com",
    "phone": "+1 (968) 517-2861",
    "address": "743 Wilson Avenue, Greenbackville, Hawaii, 9264",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Tanya Hudson! You have 2 unread messages.",
    "categories": "Médecin",
    "regions": "Moanstir"
  },
  {
    "id": "623c62e9dcc8a0cf090b42bf",
    "index": 10,
    "guid": "5f3f6943-ef61-4c5f-aa0d-5162bf36d919",
    "isActive": false,
    "x": 10.7097,
    "y": 36.8359,
    "picture": "http://placehold.it/32x32",
    "name": "Castillo Barrett",
    "email": "castillobarrett@naxdis.com",
    "phone": "+1 (832) 577-2804",
    "address": "801 Windsor Place, Watchtower, Wyoming, 5623",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Castillo Barrett! You have 1 unread messages.",
    "categories": "Urgence",
    "regions": "Ben Arous"
  },
  {
    "id": "623c62e98d95b78cd6d2a340",
    "index": 11,
    "guid": "b9f13616-6f37-4d7d-b06a-4cbf1f3031d3",
    "isActive": false,
    "x": 10.0584,
    "y": 34.0525,
    "picture": "http://placehold.it/32x32",
    "name": "Keri Dudley",
    "email": "keridudley@naxdis.com",
    "phone": "+1 (855) 460-2923",
    "address": "196 Kosciusko Street, Mulino, Nevada, 7969",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Keri Dudley! You have 6 unread messages.",
    "categories": "Urgence",
    "regions": "Kef"
  },
  {
    "id": "623c62e9741b0479f11dab92",
    "index": 12,
    "guid": "d66e5f53-8c36-4916-a624-88f4f2d0da9a",
    "isActive": true,
    "x": 10.0877,
    "y": 35.0253,
    "picture": "http://placehold.it/32x32",
    "name": "Estrada Mcneil",
    "email": "estradamcneil@naxdis.com",
    "phone": "+1 (994) 572-2455",
    "address": "274 Cameron Court, Hendersonville, Pennsylvania, 2766",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Estrada Mcneil! You have 10 unread messages.",
    "categories": "Urgence",
    "regions": "Ariana"
  },
  {
    "id": "623c62e93c599ca1da2ac570",
    "index": 13,
    "guid": "299847bf-af4a-4784-871e-ed79b8be04c7",
    "isActive": true,
    "x": 10.0067,
    "y": 34.2041,
    "picture": "http://placehold.it/32x32",
    "name": "Harvey Huber",
    "email": "harveyhuber@naxdis.com",
    "phone": "+1 (928) 567-3970",
    "address": "167 Tillary Street, Chamberino, Colorado, 6465",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Harvey Huber! You have 2 unread messages.",
    "categories": "Clinique",
    "regions": "Kairouan"
  },
  {
    "id": "623c62e91afbe2a588c8b086",
    "index": 14,
    "guid": "1985c2f7-22d1-42ab-bc3b-c5848c766244",
    "isActive": true,
    "x": 10.8814,
    "y": 34.3834,
    "picture": "http://placehold.it/32x32",
    "name": "Olivia Kelley",
    "email": "oliviakelley@naxdis.com",
    "phone": "+1 (840) 499-2128",
    "address": "872 Homecrest Avenue, Broadlands, Tennessee, 7562",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Olivia Kelley! You have 4 unread messages.",
    "categories": "Hopital",
    "regions": "Gabès"
  },
  {
    "id": "623c62e9cf71e10707f42e83",
    "index": 15,
    "guid": "f8b7ce2c-6a20-4ce8-a71f-1eda4bbdf395",
    "isActive": false,
    "x": 10.463,
    "y": 35.2369,
    "picture": "http://placehold.it/32x32",
    "name": "Hattie Mckenzie",
    "email": "hattiemckenzie@naxdis.com",
    "phone": "+1 (941) 416-2424",
    "address": "921 Ocean Avenue, Townsend, California, 8098",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Hattie Mckenzie! You have 1 unread messages.",
    "categories": "Pharmacie",
    "regions": "Kebili"
  },
  {
    "id": "623c62e99d12c8e1a72eb934",
    "index": 16,
    "guid": "4a3ddc4b-b80d-4ad3-8f71-d354d2f52e10",
    "isActive": false,
    "x": 10.6716,
    "y": 35.5056,
    "picture": "http://placehold.it/32x32",
    "name": "Kenya Benjamin",
    "email": "kenyabenjamin@naxdis.com",
    "phone": "+1 (996) 416-3037",
    "address": "953 Stratford Road, Sunnyside, Texas, 1803",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Kenya Benjamin! You have 2 unread messages.",
    "categories": "Hopital",
    "regions": "Sousse"
  },
  {
    "id": "623c62e924cc8924d89403eb",
    "index": 17,
    "guid": "24949b67-954b-4fdb-acbd-8e215eb644e3",
    "isActive": false,
    "x": 10.9164,
    "y": 36.6462,
    "picture": "http://placehold.it/32x32",
    "name": "Dena Caldwell",
    "email": "denacaldwell@naxdis.com",
    "phone": "+1 (809) 514-3736",
    "address": "496 Ditmas Avenue, Brooktrails, Arkansas, 5138",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Dena Caldwell! You have 8 unread messages.",
    "categories": "Hopital",
    "regions": "Siliana"
  },
  {
    "id": "623c62e9a41f580282c54a84",
    "index": 18,
    "guid": "cc8767a3-2e2d-44f2-8b50-3396a12dd298",
    "isActive": false,
    "x": 10.1943,
    "y": 35.3154,
    "picture": "http://placehold.it/32x32",
    "name": "Doris Decker",
    "email": "dorisdecker@naxdis.com",
    "phone": "+1 (980) 546-2733",
    "address": "404 Gerritsen Avenue, Mammoth, Vermont, 7329",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Doris Decker! You have 7 unread messages.",
    "categories": "Urgence",
    "regions": "Kasserine"
  },
  {
    "id": "623c62e9a297fad56f71ba4d",
    "index": 19,
    "guid": "69efa243-ccb0-4092-b07d-412d52f14181",
    "isActive": false,
    "x": 10.4257,
    "y": 36.7197,
    "picture": "http://placehold.it/32x32",
    "name": "Brenda Hendricks",
    "email": "brendahendricks@naxdis.com",
    "phone": "+1 (832) 572-3453",
    "address": "566 Sandford Street, Byrnedale, Massachusetts, 1853",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Brenda Hendricks! You have 1 unread messages.",
    "categories": "Laboratoire",
    "regions": "Siliana"
  },
  {
    "id": "623c62e95c266a56ccca6cb7",
    "index": 20,
    "guid": "9a981df8-a43c-4ccf-bae6-c6598e6c2f3c",
    "isActive": false,
    "x": 10.0553,
    "y": 34.6151,
    "picture": "http://placehold.it/32x32",
    "name": "Erma Page",
    "email": "ermapage@naxdis.com",
    "phone": "+1 (896) 456-2243",
    "address": "866 Arlington Place, Edneyville, Florida, 3159",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Erma Page! You have 4 unread messages.",
    "categories": "Hopital",
    "regions": "Jendouba"
  },
  {
    "id": "623c62e9ae01c340d34082d1",
    "index": 21,
    "guid": "eb2b5516-6cfe-4238-9b02-619f90ae83e2",
    "isActive": false,
    "x": 10.8612,
    "y": 34.0039,
    "picture": "http://placehold.it/32x32",
    "name": "Jessie Vaughan",
    "email": "jessievaughan@naxdis.com",
    "phone": "+1 (834) 483-2959",
    "address": "862 Grove Place, Richmond, West Virginia, 5228",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Jessie Vaughan! You have 7 unread messages.",
    "categories": "Clinique",
    "regions": "Gabès"
  },
  {
    "id": "623c62e9c13569e22070b49e",
    "index": 22,
    "guid": "c0a2495f-ce2c-4633-b53a-451050f3e078",
    "isActive": true,
    "x": 10.9761,
    "y": 34.11,
    "picture": "http://placehold.it/32x32",
    "name": "Wilder Galloway",
    "email": "wildergalloway@naxdis.com",
    "phone": "+1 (944) 523-2069",
    "address": "955 Montauk Avenue, Yardville, Kentucky, 2850",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Wilder Galloway! You have 9 unread messages.",
    "categories": "Hopital",
    "regions": "Siliana"
  },
  {
    "id": "623c62e90326b1023d8dfdfe",
    "index": 23,
    "guid": "ce4794aa-86cf-49e1-bff2-84b6b3eb999f",
    "isActive": true,
    "x": 10.4798,
    "y": 36.2188,
    "picture": "http://placehold.it/32x32",
    "name": "Lea Sutton",
    "email": "leasutton@naxdis.com",
    "phone": "+1 (875) 551-3159",
    "address": "489 Ingraham Street, Alafaya, District Of Columbia, 5852",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Lea Sutton! You have 10 unread messages.",
    "categories": "Urgence",
    "regions": "Moanstir"
  },
  {
    "id": "623c62e928c9912975e33549",
    "index": 24,
    "guid": "f954bab2-de88-4406-84d6-a91e41010043",
    "isActive": false,
    "x": 10.1708,
    "y": 34.8121,
    "picture": "http://placehold.it/32x32",
    "name": "Wise Hansen",
    "email": "wisehansen@naxdis.com",
    "phone": "+1 (991) 433-3742",
    "address": "280 School Lane, Websterville, Idaho, 9714",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Wise Hansen! You have 4 unread messages.",
    "categories": "Ambulance",
    "regions": "Gabès"
  },
  {
    "id": "623c62e9c7e20ad713e74884",
    "index": 25,
    "guid": "3045629f-f558-49a6-be0a-07e573cee24e",
    "isActive": true,
    "x": 10.4775,
    "y": 35.1684,
    "picture": "http://placehold.it/32x32",
    "name": "Franklin Carney",
    "email": "franklincarney@naxdis.com",
    "phone": "+1 (801) 533-2648",
    "address": "286 Preston Court, Bluffview, Guam, 3402",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Franklin Carney! You have 1 unread messages.",
    "categories": "Pharmacie",
    "regions": "Moanstir"
  },
  {
    "id": "623c62e929187847ef756f22",
    "index": 26,
    "guid": "820cc3d0-8abd-460b-b5d3-fdcc646034cd",
    "isActive": false,
    "x": 10.9018,
    "y": 34.3124,
    "picture": "http://placehold.it/32x32",
    "name": "King Whitney",
    "email": "kingwhitney@naxdis.com",
    "phone": "+1 (811) 427-3938",
    "address": "754 Gain Court, Thermal, Virginia, 9733",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, King Whitney! You have 3 unread messages.",
    "categories": "Urgence",
    "regions": "Mahdia"
  },
  {
    "id": "623c62e92cf75406fb861f75",
    "index": 27,
    "guid": "f8d0bc82-29b6-4808-988a-f892ae0fa1d2",
    "isActive": false,
    "x": 10.6138,
    "y": 34.4037,
    "picture": "http://placehold.it/32x32",
    "name": "Gracie Green",
    "email": "graciegreen@naxdis.com",
    "phone": "+1 (841) 425-2867",
    "address": "723 Madoc Avenue, Dola, South Dakota, 2505",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Gracie Green! You have 7 unread messages.",
    "categories": "Laboratoire",
    "regions": "Tozeur"
  },
  {
    "id": "623c62e9746db82662708a17",
    "index": 28,
    "guid": "a9e58e00-8aa7-4b01-824b-740a390c8782",
    "isActive": false,
    "x": 10.9,
    "y": 34.1298,
    "picture": "http://placehold.it/32x32",
    "name": "Berry Dixon",
    "email": "berrydixon@naxdis.com",
    "phone": "+1 (876) 457-2323",
    "address": "890 Troy Avenue, Edgar, Ohio, 3327",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Berry Dixon! You have 3 unread messages.",
    "categories": "Urgence",
    "regions": "Manouba"
  },
  {
    "id": "623c62e90d1684532241ae43",
    "index": 29,
    "guid": "e7c4ffc9-fe2a-4af1-a153-3194b290f6c3",
    "isActive": false,
    "x": 10.1112,
    "y": 36.3908,
    "picture": "http://placehold.it/32x32",
    "name": "Espinoza Davis",
    "email": "espinozadavis@naxdis.com",
    "phone": "+1 (832) 599-2771",
    "address": "694 Lester Court, Mayfair, Mississippi, 7462",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Espinoza Davis! You have 10 unread messages.",
    "categories": "Ambulance",
    "regions": "Mahdia"
  },
  {
    "id": "623c62e96a142a018ab50124",
    "index": 30,
    "guid": "8877fa66-b6ea-4bb5-945c-8b71a27c7363",
    "isActive": false,
    "x": 10.3812,
    "y": 34.8923,
    "picture": "http://placehold.it/32x32",
    "name": "Tessa Webb",
    "email": "tessawebb@naxdis.com",
    "phone": "+1 (931) 533-2148",
    "address": "143 Livonia Avenue, Thornport, Montana, 9491",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Tessa Webb! You have 8 unread messages.",
    "categories": "Clinique",
    "regions": "Bizerte"
  },
  {
    "id": "623c62e95a4cade998c50e33",
    "index": 31,
    "guid": "f5b94e75-a0cc-494a-9367-1f46c0debea4",
    "isActive": true,
    "x": 10.0393,
    "y": 36.9096,
    "picture": "http://placehold.it/32x32",
    "name": "Loretta Newman",
    "email": "lorettanewman@naxdis.com",
    "phone": "+1 (810) 423-2171",
    "address": "281 Mersereau Court, Callaghan, Delaware, 8096",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Loretta Newman! You have 1 unread messages.",
    "categories": "Clinique",
    "regions": "Sidi Bouzid"
  },
  {
    "id": "623c62e9dfae8acecd03803a",
    "index": 32,
    "guid": "de955a31-676d-4951-a750-397044a752a8",
    "isActive": true,
    "x": 10.1157,
    "y": 36.5277,
    "picture": "http://placehold.it/32x32",
    "name": "Holcomb Hood",
    "email": "holcombhood@naxdis.com",
    "phone": "+1 (811) 581-3870",
    "address": "968 Bradford Street, Shrewsbury, Alabama, 5643",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Holcomb Hood! You have 7 unread messages.",
    "categories": "Médecin",
    "regions": "Bizerte"
  },
  {
    "id": "623c62e93dfd11f3ed825eee",
    "index": 33,
    "guid": "f3dbfcd2-7c23-480d-bcad-b63536f19df3",
    "isActive": false,
    "x": 10.7345,
    "y": 36.4531,
    "picture": "http://placehold.it/32x32",
    "name": "Hebert Mcintyre",
    "email": "hebertmcintyre@naxdis.com",
    "phone": "+1 (930) 465-3210",
    "address": "445 Reed Street, Cazadero, Federated States Of Micronesia, 4436",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Hebert Mcintyre! You have 6 unread messages.",
    "categories": "Médecin",
    "regions": "Tataouine"
  },
  {
    "id": "623c62e94f251d3db227ac8e",
    "index": 34,
    "guid": "fc43c9fe-2c39-4076-8f28-e544275e5c0c",
    "isActive": true,
    "x": 10.9115,
    "y": 35.4357,
    "picture": "http://placehold.it/32x32",
    "name": "Leta Ratliff",
    "email": "letaratliff@naxdis.com",
    "phone": "+1 (848) 589-3951",
    "address": "967 Strickland Avenue, Kidder, North Dakota, 9633",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Leta Ratliff! You have 10 unread messages.",
    "categories": "Médecin",
    "regions": "Moanstir"
  },
  {
    "id": "623c62e9da6236e40e564cd1",
    "index": 35,
    "guid": "1dd19617-954e-455a-9a8a-ebb1fbc48840",
    "isActive": true,
    "x": 10.5098,
    "y": 34.4083,
    "picture": "http://placehold.it/32x32",
    "name": "Everett Waller",
    "email": "everettwaller@naxdis.com",
    "phone": "+1 (900) 468-2298",
    "address": "702 Glenwood Road, Gila, New Hampshire, 2489",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Everett Waller! You have 2 unread messages.",
    "categories": "Laboratoire",
    "regions": "Sidi Bouzid"
  },
  {
    "id": "623c62e91719171d52420f95",
    "index": 36,
    "guid": "cfb4a505-8f39-4897-bad0-f71381ecd469",
    "isActive": false,
    "x": 10.033,
    "y": 35.2095,
    "picture": "http://placehold.it/32x32",
    "name": "Valeria Murphy",
    "email": "valeriamurphy@naxdis.com",
    "phone": "+1 (953) 569-3336",
    "address": "298 Marconi Place, Tetherow, Illinois, 6525",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Valeria Murphy! You have 2 unread messages.",
    "categories": "Ambulance",
    "regions": "Tataouine"
  },
  {
    "id": "623c62ea9b88a29e6ae782b0",
    "index": 37,
    "guid": "e14c815b-0878-4fb9-aa33-c60add700b06",
    "isActive": true,
    "x": 10.7918,
    "y": 36.7771,
    "picture": "http://placehold.it/32x32",
    "name": "Enid Guzman",
    "email": "enidguzman@naxdis.com",
    "phone": "+1 (984) 584-3538",
    "address": "226 Oceanic Avenue, Nescatunga, American Samoa, 7687",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Enid Guzman! You have 1 unread messages.",
    "categories": "Urgence",
    "regions": "Jendouba"
  },
  {
    "id": "623c62ea478c01931da608dc",
    "index": 38,
    "guid": "63b748fa-4b1c-46c6-bd83-7e380d7a83f6",
    "isActive": false,
    "x": 10.7394,
    "y": 36.6735,
    "picture": "http://placehold.it/32x32",
    "name": "Francine Scott",
    "email": "francinescott@naxdis.com",
    "phone": "+1 (883) 498-2025",
    "address": "723 Mill Avenue, Kingstowne, Palau, 3557",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Francine Scott! You have 1 unread messages.",
    "categories": "Ambulance",
    "regions": "Nabeul"
  },
  {
    "id": "623c62eaaf2a019a0bf81914",
    "index": 39,
    "guid": "df9b2001-d94d-4555-a4e8-0f28ea988033",
    "isActive": false,
    "x": 10.4656,
    "y": 34.5917,
    "picture": "http://placehold.it/32x32",
    "name": "Manuela Hardin",
    "email": "manuelahardin@naxdis.com",
    "phone": "+1 (967) 525-2062",
    "address": "371 Sedgwick Street, Henrietta, Michigan, 643",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Manuela Hardin! You have 2 unread messages.",
    "categories": "Hopital",
    "regions": "Zaghouan"
  },
  {
    "id": "623c62ea58fb6507cec8b4e7",
    "index": 40,
    "guid": "7b45af8d-1bd7-4e48-a7e9-50ee3063db39",
    "isActive": false,
    "x": 10.6377,
    "y": 34.0272,
    "picture": "http://placehold.it/32x32",
    "name": "Lynch Tillman",
    "email": "lynchtillman@naxdis.com",
    "phone": "+1 (815) 532-2049",
    "address": "840 Applegate Court, Camino, Louisiana, 4900",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Lynch Tillman! You have 1 unread messages.",
    "categories": "Urgence",
    "regions": "Bizerte"
  },
  {
    "id": "623c62ea9657daeebfa2a8b0",
    "index": 41,
    "guid": "177cd52d-c238-4095-9e72-7f56d864eea0",
    "isActive": false,
    "x": 10.1032,
    "y": 34.4177,
    "picture": "http://placehold.it/32x32",
    "name": "Beck Cantrell",
    "email": "beckcantrell@naxdis.com",
    "phone": "+1 (830) 483-3513",
    "address": "373 Beverly Road, Greensburg, Maryland, 3658",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Beck Cantrell! You have 9 unread messages.",
    "categories": "Ambulance",
    "regions": "Kef"
  },
  {
    "id": "623c62eae626f18cd20faae7",
    "index": 42,
    "guid": "dda7729b-0dbd-4861-8c72-49e7445b2a22",
    "isActive": true,
    "x": 10.2026,
    "y": 34.4361,
    "picture": "http://placehold.it/32x32",
    "name": "Lou Morrison",
    "email": "loumorrison@naxdis.com",
    "phone": "+1 (861) 439-3736",
    "address": "349 Lacon Court, Nutrioso, Rhode Island, 9686",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Lou Morrison! You have 6 unread messages.",
    "categories": "Médecin",
    "regions": "Kairouan"
  },
  {
    "id": "623c62ea59d5c436723ceb5b",
    "index": 43,
    "guid": "b2331a8f-1ea4-4b87-a103-50580c4527ff",
    "isActive": true,
    "x": 10.5189,
    "y": 36.1979,
    "picture": "http://placehold.it/32x32",
    "name": "Rebecca Meyers",
    "email": "rebeccameyers@naxdis.com",
    "phone": "+1 (861) 573-3180",
    "address": "286 Billings Place, Avalon, Arizona, 1839",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Rebecca Meyers! You have 3 unread messages.",
    "categories": "Hopital",
    "regions": "Kasserine"
  },
  {
    "id": "623c62eaed7e19d6774a7d78",
    "index": 44,
    "guid": "dec23d1c-b42e-4544-ba12-99a079a5b5da",
    "isActive": true,
    "x": 10.0524,
    "y": 35.7609,
    "picture": "http://placehold.it/32x32",
    "name": "Moon Moran",
    "email": "moonmoran@naxdis.com",
    "phone": "+1 (928) 563-3055",
    "address": "519 Fillmore Place, Islandia, Alaska, 8931",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Moon Moran! You have 6 unread messages.",
    "categories": "Pharmacie",
    "regions": "Bizerte"
  },
  {
    "id": "623c62ea460280a37c7d6b1b",
    "index": 45,
    "guid": "63446c8b-9d7a-4972-a25d-e324c67fb072",
    "isActive": true,
    "x": 10.0915,
    "y": 36.4803,
    "picture": "http://placehold.it/32x32",
    "name": "Logan Forbes",
    "email": "loganforbes@naxdis.com",
    "phone": "+1 (946) 496-3023",
    "address": "312 Miami Court, Fairlee, Puerto Rico, 7773",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Logan Forbes! You have 3 unread messages.",
    "categories": "Hopital",
    "regions": "Tataouine"
  },
  {
    "id": "623c62ea37a3c1e7d69edc2d",
    "index": 46,
    "guid": "6455b1aa-0713-49ac-b60d-e4f4789f6212",
    "isActive": false,
    "x": 10.39,
    "y": 36.7388,
    "picture": "http://placehold.it/32x32",
    "name": "Justice Noble",
    "email": "justicenoble@naxdis.com",
    "phone": "+1 (995) 545-3119",
    "address": "870 Norman Avenue, Groton, Iowa, 227",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Justice Noble! You have 5 unread messages.",
    "categories": "Laboratoire",
    "regions": "Manouba"
  },
  {
    "id": "623c62ea2fdce548d1975442",
    "index": 47,
    "guid": "93b37a78-f6fb-4e4d-aae2-16660a6978ef",
    "isActive": true,
    "x": 10.7493,
    "y": 35.9529,
    "picture": "http://placehold.it/32x32",
    "name": "Cassandra Walton",
    "email": "cassandrawalton@naxdis.com",
    "phone": "+1 (928) 461-3270",
    "address": "366 Hutchinson Court, Waverly, North Carolina, 7107",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Cassandra Walton! You have 3 unread messages.",
    "categories": "Laboratoire",
    "regions": "Tataouine"
  },
  {
    "id": "623c62eabdaef14c0b712e05",
    "index": 48,
    "guid": "def24968-ac9e-4870-9e9c-48f2abdef618",
    "isActive": false,
    "x": 10.443,
    "y": 36.8219,
    "picture": "http://placehold.it/32x32",
    "name": "Santiago Howell",
    "email": "santiagohowell@naxdis.com",
    "phone": "+1 (875) 598-3574",
    "address": "810 India Street, Crenshaw, Oregon, 6352",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Santiago Howell! You have 2 unread messages.",
    "categories": "Médecin",
    "regions": "Tozeur"
  },
  {
    "id": "623c62ea34e5f5cbedc99803",
    "index": 49,
    "guid": "229e84cb-23d5-4052-afe2-26ac0b330a18",
    "isActive": true,
    "x": 10.2833,
    "y": 35.3249,
    "picture": "http://placehold.it/32x32",
    "name": "Valerie Conrad",
    "email": "valerieconrad@naxdis.com",
    "phone": "+1 (944) 472-2510",
    "address": "298 Richards Street, Calverton, Connecticut, 6155",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Valerie Conrad! You have 9 unread messages.",
    "categories": "Urgence",
    "regions": "Kasserine"
  },
  {
    "id": "623c62ea40d4366642442146",
    "index": 50,
    "guid": "3a0d9a8f-6af9-426c-91e0-d249920ed5ba",
    "isActive": false,
    "x": 10.0294,
    "y": 35.1414,
    "picture": "http://placehold.it/32x32",
    "name": "Gomez Alvarez",
    "email": "gomezalvarez@naxdis.com",
    "phone": "+1 (986) 552-3118",
    "address": "699 Bedell Lane, Heil, Georgia, 8941",
    "region": "<ReferenceError: regions is not defined>",
    "categorie": "<ReferenceError: categories is not defined>",
    "greeting": "Hello, Gomez Alvarez! You have 2 unread messages.",
    "categories": "Pharmacie",
    "regions": "Kairouan"
  }
]

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit,AfterViewInit {
  @ViewChild(MapOverlayComponent) mapoverlay:MapOverlayComponent;
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
  listDataSearch:any=[];
  id="";
  type="";
  private rootViewContainer: ViewContainerRef;

  constructor(
    private modalService:MapOverlayServiceService,
    private viewContainerRef: ViewContainerRef,
    private route:ActivatedRoute,
    private router:Router,
    private searchService:SearchService


  ) { }


  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {

      if(params.region!=null){
        this.region=params.region
      }
      if(params.categorie!=null){
        this.categorie=params.categorie
      }
      if(params.id!=null){
        this.id=params.id
        this.searchService.getByIdAndCategorie(this.id,"").pipe().subscribe(data=>{
          this.listDataSearch[0]=data
          this.initilizemap(this.listDataSearch);
          this.onClickmap(this.listDataSearch);
          this.setViewMap(this.listDataSearch)
        })

      }else{
        this.listDataSearch=[];
        this.searchService.getAll().subscribe(data=>{
          this.listDataSearch=data
          if(this.region!="Région"){
            this.listDataSearch=this.searchRegion(this.region,this.listDataSearch)
    
          }
          if(this.categorie!="Categories"){
            this.listDataSearch=this.searchCategorie(this.categorie,this.listDataSearch)
          }
          this.initilizemap(this.listDataSearch);
          this.onClickmap(this.listDataSearch);
          this.setViewMap(this.listDataSearch)
        })
     }
    })

  }
  ngAfterViewInit(): void {
    
  }
  searchCategorie(categorie,list){
    let i=0
    let listDataSearch=[]

    for(let c of list){
      if(c.categories==categorie){
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

  searchRegion(region,list){
    let i=0
    let listDataSearch=[]

    for(let c of list){
      if(c.regions==region){
        listDataSearch[i++]=c;
      }
    }
    return listDataSearch;
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
        zoom:6,
      })
    })
  }
  displayModal(){
    document.getElementById('info').style.display='none'
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
  onDoubleClickmap(){
    this.map.on('click',function(event){
      document.getElementById("info").style.display='none';
    })
  }
  openModal( modalTitle, modalText) {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent(modalTitle, modalText);
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
  gotopage(){

    this.id=document.getElementById('Modalid').textContent
    this.type=document.getElementById('ModalType').textContent
    if(this.type=="medecin")
    this.router.navigate(['user-profile/'+this.id])
    if(this.type=="Urgence")
      this.router.navigate(['urgence'],{queryParams:{id:this.id}})
  }
  }