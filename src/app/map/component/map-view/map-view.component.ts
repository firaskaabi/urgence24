import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {Tile as TitleLayer,Vector as VectorLayer} from 'ol/layer.js';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import XyzSource from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import {Fill, Icon, Stroke, Style} from 'ol/style.js';
import Title from 'ol/layer/Tile';
import CircleStyle from 'ol/style/Circle';
import { toStringHDMS } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import { features } from 'process';
import { buffer } from 'ol/extent';


var listInfo=[
  {
    "id": "6239db5c9cea09ce4d6d0973",
    "index": 0,
    "guid": "6c7c0635-8a73-442e-b2ff-1531dccbb297",
    "isActive": true,
    "x": 10.2884,
    "y": 34.8303,
    "picture": "http://placehold.it/32x32",
    "name": "Cohen Hampton",
    "email": "cohenhampton@pivitol.com",
    "phone": "+1 (864) 437-2541",
    "address": "767 Classon Avenue, Trucksville, North Carolina, 1694",
    "greeting": "Hello, Cohen Hampton! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5cf54b2c1d2bfcdacf",
    "index": 1,
    "guid": "4d17325f-5373-48b2-a00e-f9c4c482387c",
    "isActive": true,
    "x": 10.8362,
    "y": 34.2468,
    "picture": "http://placehold.it/32x32",
    "name": "Casandra Rios",
    "email": "casandrarios@pivitol.com",
    "phone": "+1 (869) 407-2572",
    "address": "666 Batchelder Street, Rew, Minnesota, 5813",
    "greeting": "Hello, Casandra Rios! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c5fc9f5a63fe89499",
    "index": 2,
    "guid": "a5ae6130-0bc6-45a0-b336-b87676421489",
    "isActive": true,
    "x": 10.909,
    "y": 35.1576,
    "picture": "http://placehold.it/32x32",
    "name": "Mcdaniel Emerson",
    "email": "mcdanielemerson@pivitol.com",
    "phone": "+1 (844) 503-3859",
    "address": "834 Sharon Street, Holcombe, Oregon, 8946",
    "greeting": "Hello, Mcdaniel Emerson! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c6a80b21c0a0f9959",
    "index": 3,
    "guid": "7ea49bbc-81f2-4582-bf88-3368af21c883",
    "isActive": false,
    "x": 10.6682,
    "y": 35.4238,
    "picture": "http://placehold.it/32x32",
    "name": "Agnes Gentry",
    "email": "agnesgentry@pivitol.com",
    "phone": "+1 (829) 575-2852",
    "address": "594 Fayette Street, Carlton, Guam, 176",
    "greeting": "Hello, Agnes Gentry! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5ca9c7c1d571fbbd4f",
    "index": 4,
    "guid": "a705e73e-b8ac-463b-8258-893dc344926e",
    "isActive": false,
    "x": 10.8879,
    "y": 36.8981,
    "picture": "http://placehold.it/32x32",
    "name": "Leila Dickerson",
    "email": "leiladickerson@pivitol.com",
    "phone": "+1 (866) 600-3806",
    "address": "349 Butler Street, Caron, Ohio, 1287",
    "greeting": "Hello, Leila Dickerson! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c5b6b78cb7481ca28",
    "index": 5,
    "guid": "fd2f083d-9293-4570-a416-08f5e119f1d2",
    "isActive": false,
    "x": 10.8322,
    "y": 34.6974,
    "picture": "http://placehold.it/32x32",
    "name": "Sherri Prince",
    "email": "sherriprince@pivitol.com",
    "phone": "+1 (968) 515-3381",
    "address": "984 Ditmas Avenue, Vicksburg, Virgin Islands, 656",
    "greeting": "Hello, Sherri Prince! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c959e182d16e3a15e",
    "index": 6,
    "guid": "55b7de6e-9d31-405b-a154-205f5f387d04",
    "isActive": false,
    "x": 10.9875,
    "y": 36.6997,
    "picture": "http://placehold.it/32x32",
    "name": "Smith Murray",
    "email": "smithmurray@pivitol.com",
    "phone": "+1 (874) 447-3565",
    "address": "837 Garden Street, Dubois, Florida, 4660",
    "greeting": "Hello, Smith Murray! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c9ea380e3a53802e7",
    "index": 7,
    "guid": "b92bd125-9625-47da-b9dd-9bf3dbf980d7",
    "isActive": true,
    "x": 10.4617,
    "y": 35.4444,
    "picture": "http://placehold.it/32x32",
    "name": "Gregory Diaz",
    "email": "gregorydiaz@pivitol.com",
    "phone": "+1 (835) 470-3660",
    "address": "590 Jackson Place, Tolu, Indiana, 8629",
    "greeting": "Hello, Gregory Diaz! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c076587a38287d303",
    "index": 8,
    "guid": "34391552-3fc2-466d-bbea-9f752347062e",
    "isActive": true,
    "x": 10.406,
    "y": 36.8136,
    "picture": "http://placehold.it/32x32",
    "name": "Jackie Baker",
    "email": "jackiebaker@pivitol.com",
    "phone": "+1 (940) 557-2456",
    "address": "194 Louise Terrace, Bridgetown, Puerto Rico, 1719",
    "greeting": "Hello, Jackie Baker! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c3ed4fef24a85a9ca",
    "index": 9,
    "guid": "4cd5dbf8-7fd4-4a7c-aa84-7e0c360c5a4f",
    "isActive": true,
    "x": 10.6796,
    "y": 36.5936,
    "picture": "http://placehold.it/32x32",
    "name": "Cindy Irwin",
    "email": "cindyirwin@pivitol.com",
    "phone": "+1 (897) 452-3457",
    "address": "157 Malta Street, Belfair, California, 7092",
    "greeting": "Hello, Cindy Irwin! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5cd2fbe26f819b570f",
    "index": 10,
    "guid": "682a1b5d-c3cc-46c5-aa90-2f90139fde94",
    "isActive": true,
    "x": 10.9889,
    "y": 34.2713,
    "picture": "http://placehold.it/32x32",
    "name": "Gould Griffith",
    "email": "gouldgriffith@pivitol.com",
    "phone": "+1 (936) 515-3450",
    "address": "751 Thornton Street, Hamilton, Texas, 3112",
    "greeting": "Hello, Gould Griffith! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c783eae20eba64450",
    "index": 11,
    "guid": "974d69e0-8411-4183-9820-929ac30eab2a",
    "isActive": false,
    "x": 10.436,
    "y": 36.6843,
    "picture": "http://placehold.it/32x32",
    "name": "Mcmillan Mcpherson",
    "email": "mcmillanmcpherson@pivitol.com",
    "phone": "+1 (822) 583-2375",
    "address": "677 Powers Street, Hemlock, South Carolina, 8766",
    "greeting": "Hello, Mcmillan Mcpherson! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5ca7530ce53c8a764a",
    "index": 12,
    "guid": "26588712-128a-4149-8527-f1764cfaade1",
    "isActive": true,
    "x": 10.9037,
    "y": 36.99,
    "picture": "http://placehold.it/32x32",
    "name": "Sargent Avila",
    "email": "sargentavila@pivitol.com",
    "phone": "+1 (852) 505-3159",
    "address": "989 Walker Court, Wacissa, Maryland, 3649",
    "greeting": "Hello, Sargent Avila! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c85a14f9ce248d063",
    "index": 13,
    "guid": "7f358dc4-8c69-4aec-a4b9-439f99db3a34",
    "isActive": false,
    "x": 10.6703,
    "y": 34.5486,
    "picture": "http://placehold.it/32x32",
    "name": "Blankenship Fitzpatrick",
    "email": "blankenshipfitzpatrick@pivitol.com",
    "phone": "+1 (915) 515-3203",
    "address": "193 Granite Street, Bagtown, Iowa, 7121",
    "greeting": "Hello, Blankenship Fitzpatrick! You have 8 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5ccb7572c2e02c30a2",
    "index": 14,
    "guid": "bdfd23de-b910-4fc4-adc5-9ef6ec65e527",
    "isActive": true,
    "x": 10.056,
    "y": 35.6143,
    "picture": "http://placehold.it/32x32",
    "name": "Cooley Larsen",
    "email": "cooleylarsen@pivitol.com",
    "phone": "+1 (866) 434-3985",
    "address": "542 Bainbridge Street, Eastmont, Arkansas, 8892",
    "greeting": "Hello, Cooley Larsen! You have 1 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c518d64b7135a6b50",
    "index": 15,
    "guid": "c8051aff-cfee-4164-b3ed-a5f7e1f6531d",
    "isActive": true,
    "x": 10.6302,
    "y": 36.7123,
    "picture": "http://placehold.it/32x32",
    "name": "Whitney Ruiz",
    "email": "whitneyruiz@pivitol.com",
    "phone": "+1 (803) 403-3247",
    "address": "176 Dekalb Avenue, Allamuchy, Montana, 3495",
    "greeting": "Hello, Whitney Ruiz! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c3625df5ee4ffe3ee",
    "index": 16,
    "guid": "fe42e1e6-b155-4ad9-b290-e952327ac6a7",
    "isActive": false,
    "x": 10.862,
    "y": 36.1602,
    "picture": "http://placehold.it/32x32",
    "name": "Denise Bullock",
    "email": "denisebullock@pivitol.com",
    "phone": "+1 (850) 571-3994",
    "address": "743 Gallatin Place, Emison, New York, 744",
    "greeting": "Hello, Denise Bullock! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c618a24f855a32423",
    "index": 17,
    "guid": "1a147429-9075-481d-beb4-59068b28fe87",
    "isActive": true,
    "x": 10.6559,
    "y": 35.6631,
    "picture": "http://placehold.it/32x32",
    "name": "Nadine Mclean",
    "email": "nadinemclean@pivitol.com",
    "phone": "+1 (979) 523-2534",
    "address": "874 Metropolitan Avenue, Wilsonia, Utah, 2544",
    "greeting": "Hello, Nadine Mclean! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c184655205f415676",
    "index": 18,
    "guid": "16fcf680-e3a3-47f3-b2a2-3586436fd980",
    "isActive": true,
    "x": 10.9747,
    "y": 34.9298,
    "picture": "http://placehold.it/32x32",
    "name": "English Hartman",
    "email": "englishhartman@pivitol.com",
    "phone": "+1 (883) 582-2877",
    "address": "490 Bennet Court, Linwood, Virginia, 1600",
    "greeting": "Hello, English Hartman! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c1de00f7a3ad9dba5",
    "index": 19,
    "guid": "ffb80484-8426-4e20-97f7-66e5828c465e",
    "isActive": false,
    "x": 10.1823,
    "y": 36.132,
    "picture": "http://placehold.it/32x32",
    "name": "Curtis Barnes",
    "email": "curtisbarnes@pivitol.com",
    "phone": "+1 (922) 559-2386",
    "address": "773 Veterans Avenue, Sunriver, Nevada, 1277",
    "greeting": "Hello, Curtis Barnes! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5cca364b60ba0db382",
    "index": 20,
    "guid": "20123224-2c67-40a1-b275-0d734d43d657",
    "isActive": true,
    "x": 10.1161,
    "y": 34.0425,
    "picture": "http://placehold.it/32x32",
    "name": "Rebekah Hubbard",
    "email": "rebekahhubbard@pivitol.com",
    "phone": "+1 (969) 496-2290",
    "address": "502 Clove Road, Kiskimere, Georgia, 3377",
    "greeting": "Hello, Rebekah Hubbard! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c2523576808a727a8",
    "index": 21,
    "guid": "10821dc6-2e4d-4038-8d69-19bcdaf2a497",
    "isActive": false,
    "x": 10.0333,
    "y": 36.7137,
    "picture": "http://placehold.it/32x32",
    "name": "Case Gardner",
    "email": "casegardner@pivitol.com",
    "phone": "+1 (997) 577-3101",
    "address": "124 Tillary Street, Rossmore, Palau, 2680",
    "greeting": "Hello, Case Gardner! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c0aec9cfd8a0f7017",
    "index": 22,
    "guid": "e9cd3698-6560-4160-a757-8c4b99df81b0",
    "isActive": false,
    "x": 10.5835,
    "y": 36.5357,
    "picture": "http://placehold.it/32x32",
    "name": "Foreman Pennington",
    "email": "foremanpennington@pivitol.com",
    "phone": "+1 (801) 402-3830",
    "address": "458 Georgia Avenue, Harviell, South Dakota, 10000",
    "greeting": "Hello, Foreman Pennington! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c0d1b061ad51a6688",
    "index": 23,
    "guid": "a049afee-2369-49dc-bb80-18ca2d4f10ef",
    "isActive": false,
    "x": 10.3449,
    "y": 36.0934,
    "picture": "http://placehold.it/32x32",
    "name": "Aida Kirkland",
    "email": "aidakirkland@pivitol.com",
    "phone": "+1 (969) 487-3818",
    "address": "208 Ivan Court, Gibbsville, Delaware, 1967",
    "greeting": "Hello, Aida Kirkland! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c1f7c37ae4f8046ce",
    "index": 24,
    "guid": "b904a89d-b6e0-4cbb-849e-7331490d7b7d",
    "isActive": false,
    "x": 10.207,
    "y": 35.7363,
    "picture": "http://placehold.it/32x32",
    "name": "Frost Dyer",
    "email": "frostdyer@pivitol.com",
    "phone": "+1 (957) 572-2419",
    "address": "368 Rockaway Parkway, Savannah, New Hampshire, 2768",
    "greeting": "Hello, Frost Dyer! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5cd52820f290dc0d6c",
    "index": 25,
    "guid": "36585166-7a99-49c2-8e4e-815e822f5e37",
    "isActive": true,
    "x": 10.9747,
    "y": 36.1657,
    "picture": "http://placehold.it/32x32",
    "name": "Lynne Reeves",
    "email": "lynnereeves@pivitol.com",
    "phone": "+1 (945) 459-3864",
    "address": "969 Wolcott Street, Virgie, Alabama, 1706",
    "greeting": "Hello, Lynne Reeves! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5ca4d6d77ba7b0b667",
    "index": 26,
    "guid": "c28bb588-a1c4-43a9-b159-6efcd9372794",
    "isActive": false,
    "x": 10.0365,
    "y": 35.371,
    "picture": "http://placehold.it/32x32",
    "name": "Hope Mcdaniel",
    "email": "hopemcdaniel@pivitol.com",
    "phone": "+1 (802) 414-2950",
    "address": "525 Forbell Street, Ilchester, Oklahoma, 9316",
    "greeting": "Hello, Hope Mcdaniel! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5cad695892d6b102c0",
    "index": 27,
    "guid": "4d55fd28-c486-4e0f-a8cd-bc7f23b1c225",
    "isActive": true,
    "x": 10.1806,
    "y": 36.1645,
    "picture": "http://placehold.it/32x32",
    "name": "Amparo Vaughan",
    "email": "amparovaughan@pivitol.com",
    "phone": "+1 (830) 487-3451",
    "address": "276 Hill Street, Ada, Idaho, 3648",
    "greeting": "Hello, Amparo Vaughan! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c95fe40d3e263cb70",
    "index": 28,
    "guid": "a8f906f0-def5-4d06-a66f-7b93b58624c1",
    "isActive": true,
    "x": 10.4227,
    "y": 36.5511,
    "picture": "http://placehold.it/32x32",
    "name": "Lolita Decker",
    "email": "lolitadecker@pivitol.com",
    "phone": "+1 (812) 547-3510",
    "address": "910 Jackson Court, Saticoy, Marshall Islands, 5107",
    "greeting": "Hello, Lolita Decker! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5ce0b37d7a354210fb",
    "index": 29,
    "guid": "15b84ed5-661a-42cc-a50a-39a445033a3c",
    "isActive": false,
    "x": 10.1793,
    "y": 35.7992,
    "picture": "http://placehold.it/32x32",
    "name": "Bonner William",
    "email": "bonnerwilliam@pivitol.com",
    "phone": "+1 (914) 561-2240",
    "address": "637 Wortman Avenue, Jacksonburg, New Mexico, 7183",
    "greeting": "Hello, Bonner William! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c21010be47fb47282",
    "index": 30,
    "guid": "0bf8b7fd-e390-4533-b370-291622ef52bf",
    "isActive": false,
    "x": 10.3056,
    "y": 36.7403,
    "picture": "http://placehold.it/32x32",
    "name": "Justice Snyder",
    "email": "justicesnyder@pivitol.com",
    "phone": "+1 (912) 569-3187",
    "address": "153 Arkansas Drive, Bison, North Dakota, 4860",
    "greeting": "Hello, Justice Snyder! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c100aad808ce57c3b",
    "index": 31,
    "guid": "224ebfd4-47e1-401a-8199-bd50e66480b3",
    "isActive": true,
    "x": 10.3427,
    "y": 36.2305,
    "picture": "http://placehold.it/32x32",
    "name": "Ray Brady",
    "email": "raybrady@pivitol.com",
    "phone": "+1 (831) 405-2921",
    "address": "421 Adams Street, Roosevelt, Mississippi, 5962",
    "greeting": "Hello, Ray Brady! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c0a46e93363612ab6",
    "index": 32,
    "guid": "78914c6e-0a05-46ac-958b-7dfa55baeb0a",
    "isActive": true,
    "x": 10.6404,
    "y": 36.1837,
    "picture": "http://placehold.it/32x32",
    "name": "Oliver Keller",
    "email": "oliverkeller@pivitol.com",
    "phone": "+1 (839) 500-2146",
    "address": "268 Plymouth Street, Manila, Illinois, 4951",
    "greeting": "Hello, Oliver Keller! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5cc1631126a355a78d",
    "index": 33,
    "guid": "d69e2614-cf3f-41ab-a09b-bff86692c967",
    "isActive": true,
    "x": 10.6961,
    "y": 34.7771,
    "picture": "http://placehold.it/32x32",
    "name": "Rosa Baldwin",
    "email": "rosabaldwin@pivitol.com",
    "phone": "+1 (996) 548-2245",
    "address": "322 Scholes Street, Darlington, Wisconsin, 9270",
    "greeting": "Hello, Rosa Baldwin! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5ccb2303af1f76dd77",
    "index": 34,
    "guid": "7bb9b49b-d575-4371-924f-8bcd0e2c162c",
    "isActive": true,
    "x": 10.1582,
    "y": 34.5552,
    "picture": "http://placehold.it/32x32",
    "name": "Olga Britt",
    "email": "olgabritt@pivitol.com",
    "phone": "+1 (860) 401-2395",
    "address": "742 Poly Place, Gasquet, Massachusetts, 7225",
    "greeting": "Hello, Olga Britt! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5cedb1c97d2b71468d",
    "index": 35,
    "guid": "62d22a7f-06cc-44e3-9a8a-c79776e247f1",
    "isActive": false,
    "x": 10.826,
    "y": 35.6567,
    "picture": "http://placehold.it/32x32",
    "name": "Jessica Lambert",
    "email": "jessicalambert@pivitol.com",
    "phone": "+1 (911) 429-3714",
    "address": "431 Cambridge Place, Blandburg, Louisiana, 1264",
    "greeting": "Hello, Jessica Lambert! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c0a35ab29866e3d28",
    "index": 36,
    "guid": "6906de84-4ded-48e2-8f25-5f21492879f0",
    "isActive": false,
    "x": 10.7056,
    "y": 35.9348,
    "picture": "http://placehold.it/32x32",
    "name": "Juana Harper",
    "email": "juanaharper@pivitol.com",
    "phone": "+1 (957) 593-2730",
    "address": "217 Barwell Terrace, Lorraine, Connecticut, 1481",
    "greeting": "Hello, Juana Harper! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c766623eb18b8532b",
    "index": 37,
    "guid": "2c895102-b309-4d6c-a834-ada8a5f9d1d2",
    "isActive": false,
    "x": 10.4171,
    "y": 34.3402,
    "picture": "http://placehold.it/32x32",
    "name": "Jeanne Burris",
    "email": "jeanneburris@pivitol.com",
    "phone": "+1 (919) 416-3447",
    "address": "624 Madison Street, Leroy, Alaska, 6286",
    "greeting": "Hello, Jeanne Burris! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5cdd5834b38f3d8a22",
    "index": 38,
    "guid": "11ec94cb-9341-48ea-b526-9446afd80ff9",
    "isActive": false,
    "x": 10.1191,
    "y": 36.8668,
    "picture": "http://placehold.it/32x32",
    "name": "Duncan Klein",
    "email": "duncanklein@pivitol.com",
    "phone": "+1 (806) 511-3074",
    "address": "141 Monument Walk, Martinsville, New Jersey, 5420",
    "greeting": "Hello, Duncan Klein! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5ccc41dd608e7d73c3",
    "index": 39,
    "guid": "047212bd-0861-42af-bd65-afd33a537c81",
    "isActive": true,
    "x": 10.7251,
    "y": 34.8151,
    "picture": "http://placehold.it/32x32",
    "name": "Celina Barton",
    "email": "celinabarton@pivitol.com",
    "phone": "+1 (938) 441-2649",
    "address": "596 Hart Place, Bascom, Colorado, 6203",
    "greeting": "Hello, Celina Barton! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c4613a199982874a3",
    "index": 40,
    "guid": "c94b131c-daf2-4276-98ef-dba9bb2260b0",
    "isActive": false,
    "x": 10.9285,
    "y": 35.6896,
    "picture": "http://placehold.it/32x32",
    "name": "Ratliff Key",
    "email": "ratliffkey@pivitol.com",
    "phone": "+1 (939) 439-3851",
    "address": "708 Hillel Place, Elrama, Federated States Of Micronesia, 4805",
    "greeting": "Hello, Ratliff Key! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c55c3dfa9bbcb6654",
    "index": 41,
    "guid": "cfade462-bc6e-46db-a347-e503c59a6076",
    "isActive": true,
    "x": 10.1388,
    "y": 35.1363,
    "picture": "http://placehold.it/32x32",
    "name": "Lakeisha Snider",
    "email": "lakeishasnider@pivitol.com",
    "phone": "+1 (870) 408-3701",
    "address": "256 Bragg Court, Clay, Michigan, 4344",
    "greeting": "Hello, Lakeisha Snider! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5cef559192822a3412",
    "index": 42,
    "guid": "e53af86d-aabb-4bde-a395-33e5d020106f",
    "isActive": false,
    "x": 10.6279,
    "y": 36.2214,
    "picture": "http://placehold.it/32x32",
    "name": "Vargas Coffey",
    "email": "vargascoffey@pivitol.com",
    "phone": "+1 (963) 541-3166",
    "address": "839 Polhemus Place, Elbert, Washington, 1093",
    "greeting": "Hello, Vargas Coffey! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5ca36ebd9cc07690f8",
    "index": 43,
    "guid": "bdf1f38a-b0a0-4523-9356-4c2e443698b5",
    "isActive": false,
    "x": 10.0589,
    "y": 34.6429,
    "picture": "http://placehold.it/32x32",
    "name": "Blake Dawson",
    "email": "blakedawson@pivitol.com",
    "phone": "+1 (942) 445-3753",
    "address": "435 Neptune Avenue, Siglerville, American Samoa, 7263",
    "greeting": "Hello, Blake Dawson! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5c156887ad4f2e9c70",
    "index": 44,
    "guid": "d6011cbb-7515-4314-b43e-2dd02bf9e27e",
    "isActive": true,
    "x": 10.406,
    "y": 36.1678,
    "picture": "http://placehold.it/32x32",
    "name": "Burris David",
    "email": "burrisdavid@pivitol.com",
    "phone": "+1 (938) 519-3246",
    "address": "603 Elton Street, Boykin, Wyoming, 7151",
    "greeting": "Hello, Burris David! You have 8 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c493936050aa21cd7",
    "index": 45,
    "guid": "3067e548-d35f-4c19-acac-7004a5cf74f2",
    "isActive": true,
    "x": 10.6316,
    "y": 34.981,
    "picture": "http://placehold.it/32x32",
    "name": "Sherry Duffy",
    "email": "sherryduffy@pivitol.com",
    "phone": "+1 (870) 452-2851",
    "address": "158 Lincoln Road, Valmy, Maine, 1738",
    "greeting": "Hello, Sherry Duffy! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c7d20ded46c4b9094",
    "index": 46,
    "guid": "1c6d859d-2413-402d-b283-c88ff51485f8",
    "isActive": false,
    "x": 10.5316,
    "y": 34.8794,
    "picture": "http://placehold.it/32x32",
    "name": "Griffin Pierce",
    "email": "griffinpierce@pivitol.com",
    "phone": "+1 (855) 590-3817",
    "address": "746 Crooke Avenue, Floriston, Tennessee, 3963",
    "greeting": "Hello, Griffin Pierce! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c97ece86191cdbe9d",
    "index": 47,
    "guid": "985c06e8-a749-40b5-85db-64a3daff6a7f",
    "isActive": false,
    "x": 10.0393,
    "y": 34.0548,
    "picture": "http://placehold.it/32x32",
    "name": "Gross Suarez",
    "email": "grosssuarez@pivitol.com",
    "phone": "+1 (954) 552-2232",
    "address": "862 Lexington Avenue, Groveville, Northern Mariana Islands, 2932",
    "greeting": "Hello, Gross Suarez! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "id": "6239db5c06220d68ccabb69d",
    "index": 48,
    "guid": "97b536c0-d24b-41d0-87fb-3156f2970586",
    "isActive": false,
    "x": 10.5812,
    "y": 34.0831,
    "picture": "http://placehold.it/32x32",
    "name": "James Michael",
    "email": "jamesmichael@pivitol.com",
    "phone": "+1 (894) 531-2798",
    "address": "354 Stuyvesant Avenue, Cressey, Missouri, 4263",
    "greeting": "Hello, James Michael! You have 1 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "id": "6239db5c5fd91c78fd5f9f20",
    "index": 49,
    "guid": "3f8a5f16-2b25-44ca-97ae-266ed1bc477b",
    "isActive": true,
    "x": 10.1092,
    "y": 36.8232,
    "picture": "http://placehold.it/32x32",
    "name": "Greta Richmond",
    "email": "gretarichmond@pivitol.com",
    "phone": "+1 (841) 521-3686",
    "address": "762 Bath Avenue, Hailesboro, Vermont, 249",
    "greeting": "Hello, Greta Richmond! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "id": "6239db5cf9597e76f0b7d06a",
    "index": 50,
    "guid": "f7d7dbd8-58c7-4880-82f8-482625c3b116",
    "isActive": false,
    "x": 10.9463,
    "y": 36.7994,
    "picture": "http://placehold.it/32x32",
    "name": "Therese Vang",
    "email": "theresevang@pivitol.com",
    "phone": "+1 (963) 595-3751",
    "address": "966 Ryder Avenue, Salix, District Of Columbia, 3908",
    "greeting": "Hello, Therese Vang! You have 10 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Ariana"

  },
  {
    "id": "6239db5cc24076def89ed8d6",
    "index": 51,
    "guid": "be23a943-5ec7-485c-9f5f-0921afc99dc3",
    "isActive": true,
    "x": 10.8528,
    "y": 34.2544,
    "picture": "http://placehold.it/32x32",
    "name": "Bean Holden",
    "email": "beanholden@pivitol.com",
    "phone": "+1 (903) 439-2531",
    "address": "267 Abbey Court, Boling, West Virginia, 3747",
    "greeting": "Hello, Bean Holden! You have 9 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Souuse"
  },
  {
    "id": "6239db5c0754bfaafe93d7fb",
    "index": 52,
    "guid": "e379391b-db86-41b8-af01-0aa3d3e8ed7f",
    "isActive": false,
    "x": 10.2008,
    "y": 34.2338,
    "picture": "http://placehold.it/32x32",
    "name": "Lane Wheeler",
    "email": "lanewheeler@pivitol.com",
    "phone": "+1 (931) 596-3391",
    "address": "827 Oxford Street, Ladera, Kansas, 2556",
    "greeting": "Hello, Lane Wheeler! You have 9 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Monastir"
  },
  {
    "id": "6239db5c047ae8b9adf6f7a2",
    "index": 53,
    "guid": "b0ea852d-6f8c-484d-a42b-1f1d1b39048b",
    "isActive": true,
    "x": 10.883,
    "y": 34.0883,
    "picture": "http://placehold.it/32x32",
    "name": "Gallegos Compton",
    "email": "gallegoscompton@pivitol.com",
    "phone": "+1 (812) 494-3256",
    "address": "661 Channel Avenue, Clayville, Hawaii, 6826",
    "greeting": "Hello, Gallegos Compton! You have 1 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Monastir"
  },
  {
    "id": "6239db5c414b29b3cb06fea7",
    "index": 54,
    "guid": "bb8211fa-a9bb-4679-a1f9-f55ea63abacc",
    "isActive": false,
    "x": 10.2438,
    "y": 35.369,
    "picture": "http://placehold.it/32x32",
    "name": "Kathie Turner",
    "email": "kathieturner@pivitol.com",
    "phone": "+1 (874) 478-2695",
    "address": "456 Tompkins Place, Dowling, Pennsylvania, 7903",
    "greeting": "Hello, Kathie Turner! You have 5 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Monastir"
  },
  {
    "id": "6239db5cd421eccd0d0db675",
    "index": 55,
    "guid": "a31a1265-aa41-41ce-a2c8-7da851aff72c",
    "isActive": false,
    "x": 10.804,
    "y": 36.4416,
    "picture": "http://placehold.it/32x32",
    "name": "Joyner Allison",
    "email": "joynerallison@pivitol.com",
    "phone": "+1 (850) 595-3480",
    "address": "906 Lott Place, Walland, Kentucky, 2403",
    "greeting": "Hello, Joyner Allison! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
    ,"regions":"Monastir"
  },
  {
    "id": "6239db5c65a843f438c27ab3",
    "index": 56,
    "guid": "650694f7-c840-4ea8-a998-f1fbc5972a6c",
    "isActive": false,
    "x": 10.2209,
    "y": 34.923,
    "picture": "http://placehold.it/32x32",
    "name": "Sheri Morse",
    "email": "sherimorse@pivitol.com",
    "phone": "+1 (966) 506-2050",
    "address": "239 Stockholm Street, Grayhawk, Arizona, 5146",
    "greeting": "Hello, Sheri Morse! You have 2 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Monastir"
  },
  {
    "id": "6239db5c4c35d557c161dcfd",
    "index": 57,
    "guid": "571bc18c-7548-43e3-8463-78ef75310f21",
    "isActive": false,
    "x": 10.7585,
    "y": 35.0285,
    "picture": "http://placehold.it/32x32",
    "name": "Day Conley",
    "email": "dayconley@pivitol.com",
    "phone": "+1 (886) 513-2074",
    "address": "609 Calyer Street, Silkworth, Rhode Island, 8860",
    "greeting": "Hello, Day Conley! You have 10 unread messages.",
    "favoriteFruit": "apple"
    ,"regions":"Monastir"
  }
]


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  map:Map
  pointmap: Feature;
  vectorSource: VectorSource;
  xyzSource: XyzSource;
  VectorLayer
  rasterLayer
  listPoint:Feature[]=[];
  popup:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.initilizemap();
  }
  initilizemap(){
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
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
    for (let elment of listInfo){
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
    this.vectorSource=new VectorSource({
      features:[...this.listPoint]
    })
    this.VectorLayer=new VectorLayer({
      source: this.vectorSource
    })
    this.rasterLayer =new Title({
      source: new OSM()
    })

    const openCycleMapLayer = new TileLayer({
      source: new OSM({
        attributions: [
          'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
          ATTRIBUTION,
        ],
        url:
          'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
          '?apikey=9971e941fcd74c75b441fac02c23853d',
      }),
    });
    
    const openSeaMapLayer = new TileLayer({
      source: new OSM({
        attributions: [
          'All maps © <a href="https://www.openseamap.org/">OpenSeaMap</a>',
          ATTRIBUTION,
        ],
        opaque: false,
        url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
      }),
    });
    
    const map = new Map({
      layers: [openCycleMapLayer, openSeaMapLayer,this.rasterLayer,this.VectorLayer],
      target: 'map',
      view: new View({
        maxZoom: 18,
        center: olProj.fromLonLat([10.0785, 34.4614]),
        zoom: 6,
      }),
    });
  }
  displayModal(){
    document.getElementById('info').style.display='none'
  }
  onClickmap(){
    this.map.on('singleclick',function(event){
      this.forEachFeatureAtPixel(event.pixel,function(feature,layer){
        let clickedCoordinate = event.coordinate;
        let clickedFeatureName = feature.get('name');
        console.log(clickedFeatureName)
        for(let c of listInfo){
          if(c.id==clickedFeatureName){
            document.getElementById("ModalTitle").textContent=c.name
            document.getElementById("ModalEmail").textContent=c.email
            document.getElementById("MdalAdresse").textContent=c.address
            document.getElementById("ModalPhone").textContent=c.phone
            document.getElementById("info").style.display='block'
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


}
