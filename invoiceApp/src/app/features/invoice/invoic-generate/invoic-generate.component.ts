import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subject, takeUntil } from 'rxjs';
import { RestSigninService } from 'src/app/shared/services/rest-signin.service';
//importing the encoded font file
import { customFonts } from '../../../../assets/font/Gujrati_Chitra/gujrati_Chitra';

@Component({
  selector: 'app-invoic-generate',
  templateUrl: './invoic-generate.component.html',
  styleUrls: ['./invoic-generate.component.scss'],
})
export class InvoicGenerateComponent implements OnInit, OnDestroy {
  value;
  timeCategories = ['Morning', 'Afternoon', 'Evening', 'Night'];
  unitList = ['Kg', 'Gram', 'Pc', 'Dozen', 'Box', 'Pkt', 'Juddi'];
  products = [
    {
      id: 1,
      itemName: 'POTATO (બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 2,
      itemName: 'PETISH POTATO (પેટીસ બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 3,
      itemName: 'BIG POTATO (મોટા બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 4,
      itemName: 'TALEGAON POTATO (તલેગાવ બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 5,
      itemName: 'CHIPS POTATO (ચીપ્સ બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 6,
      itemName: 'SUKIBHAJI POTATO (સુકીભાજી બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 7,
      itemName: 'RED POTATO (લાલ બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 8,
      itemName: 'DAMALU POTATO (દમાલું)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 9,
      itemName: 'KASHMIRI BATAKI (કાશ્મીરી બટાકી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 10,
      itemName: 'UNDHIYA POTATO (ઊંધિયા બટેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 11,
      itemName: 'ONION (કાંદા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 12,
      itemName: 'MADRASI ONION (મદ્રાસી કાંદા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 13,
      itemName: 'WHITE ONION (સફેદ કાંદા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 14,
      itemName: 'UNDHIYA(SURTI) BRINJAL (સુરતી રવૈયા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 15,
      itemName: 'KANTAWALA BRINJAL (કાંટાવાલા રીંગણા {નાસીક})',
      unit: {
        KG: 0,
      },
    },
    {
      id: 16,
      itemName: 'BHARTHA((BIG) BRINJAL (ભરથા રીંગણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 17,
      itemName: 'LAMBA BRINJAL (લાંબા રીંગણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 18,
      itemName: 'GREEN BRINJAL (લીલા રીંગણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 19,
      itemName: 'SURTI PAPADI (સુરતી પાપડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 20,
      itemName: 'VALORE PAPADI (વાલોર પાપડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 21,
      itemName: 'KUNI PAPADI (કુણી પાપડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 22,
      itemName: 'PAVATHA (પાવઠા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 23,
      itemName: 'DESI VALORE PAPADI (દેશી વલોર પાપડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 24,
      itemName: 'SURTI KAND (સુરતી કંદ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 25,
      itemName: 'LAMBU KAND (લાંબુ કંદ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 26,
      itemName: 'SWEET POTATO (સક્કરીયા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 27,
      itemName: 'RAJERI BANANA (રાજેરી કેળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 28,
      itemName: 'ROW BANANA (કાચા કેળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 29,
      itemName: 'TINDHARI BANANA (તીનધારી કેળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 30,
      itemName: 'LILWA DANA (લીલવા દાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 31,
      itemName: 'TUVER DANA (તુવેર દાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 32,
      itemName: 'HARBHARA (GREEN CHANA) (હરભરા લીલા ચણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 33,
      itemName: 'AMERICAN CORN (મકાઈ દાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 34,
      itemName: 'BHUTTA (ભુટ્ટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 35,
      itemName: 'WHITE CORN (સફેદ મકાઈ દાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 36,
      itemName: 'ARVI (અળવી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 37,
      itemName: 'REAL GREEN PEAS (ફલી વટાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 38,
      itemName: 'FROZEN GREEN PEAS (ફ્રોઝેન વટાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 39,
      itemName: 'REAL GREEN PEAS DANA (ફલી વટાણા દાણા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 40,
      itemName: 'FLOWER (ફ્લાવર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 41,
      itemName: 'CABBAGE (કોબી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 42,
      itemName: 'BEANS (ફણસી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 43,
      itemName: 'CARROT (ગાજર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 44,
      itemName: 'HALWA CARROT (હલવા ગાજર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 45,
      itemName: 'ENGLISH CARROT (ઈગ્લીશ ગાજર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 46,
      itemName: 'CUCUMBER (કાકડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 47,
      itemName: 'DESI CUCUMBER (દેસી કાકડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 48,
      itemName: 'BEETROOT (બીટ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 49,
      itemName: 'SALAD TOMATO (સલાડ ટમેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 50,
      itemName: 'GRAVY TOMATO (ગ્રેવી ટમેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 51,
      itemName: 'STUFF TOMATO (સ્ટફ ટમેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 52,
      itemName: 'ROW TOMATO (કાચા ટમેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 53,
      itemName: 'TURIYA (તુરિયા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 54,
      itemName: 'GALAKA (ગલકા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 55,
      itemName: 'KARELA (કારેલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 56,
      itemName: 'DUDHI (દૂધી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 57,
      itemName: 'HALWA DUDHI (હલવા દૂધી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 58,
      itemName: 'TUMBDA DUDHI (તુમ્બડા દૂધી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 59,
      itemName: 'L.FINGARE (ભીંડા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 60,
      itemName: 'ARIYA CUCUMBER (આરિયા કાકડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 61,
      itemName: 'PARWAR (પરવર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 62,
      itemName: 'LAMBA PADWAL (લાંબા પડવલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 63,
      itemName: 'GUWAR (ગુવાર ફલી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 64,
      itemName: 'TINDORA (ટીનડોરા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 65,
      itemName: 'TINDSA (ટીનસા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 66,
      itemName: 'CHAULI (ચોળી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 67,
      itemName: 'GREEN CHAULI (લીલી ચોળી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 68,
      itemName: 'SURAN (સૂરણ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 69,
      itemName: 'BIG AVALA (મોટા આવલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 70,
      itemName: 'ROW PAPITA (કાચું પપૈયુ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 71,
      itemName: 'ROW MANGO (કાચી કેરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 72,
      itemName: 'TOTAPURI MANGO (તોતાપુરી કેરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 73,
      itemName: 'BHAVNAGARI CHILLY (ભાવનગરી મરચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 74,
      itemName: 'JODHPURI CHILLY (જોધપુરી મરચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 75,
      itemName: 'JOLERY CHILLY (જોલેરી મરચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 76,
      itemName: 'P K DOR CHILLY (પી કા ડોર મરચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 77,
      itemName: 'CHILLY (લવીંગયા મરચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 78,
      itemName: 'CHILLY (RED) (લવીંગયા મરચા લાલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 79,
      itemName: 'LAMBA MOLA MARCHA (લાંબા મોળા મરચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 80,
      itemName: 'LAMBA MOLA MARCHA (RED) (લાંબા મોળા મરચા લાલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 81,
      itemName: 'GREEN CAPCICUM (લીલા સીમલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 82,
      itemName: 'STUFF CAPCICUM (સ્ટફ સીમલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 83,
      itemName: 'BIG CAPCICUM (મોટા સીમલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 84,
      itemName: 'GINGER (આદુ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 85,
      itemName: 'LEMON (લીંબુ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 86,
      itemName: 'PILL GARLIC (છોલેલું લસણ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 87,
      itemName: 'GARLIC (સુકું લસણ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 88,
      itemName: 'GREEN GARLIC (લીલું લસણ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 89,
      itemName: 'AMBA TERMARIC (આંબા હળદર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 90,
      itemName: 'YELLOW TERMARIC (પીળી હળદર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 91,
      itemName: 'CORRAINDER (કોથમીર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 92,
      itemName: 'PALAK (પાલક)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 93,
      itemName: 'PALAK BIG PAN (મોટા પાન પાલક)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 94,
      itemName: 'MINT (ફૂદીના)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 95,
      itemName: 'KADI PATTA (લીમડો)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 96,
      itemName: 'METHI (મેથી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 97,
      itemName: 'BEPAN METHI (બેપાન મેથી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 98,
      itemName: 'SPRING ONION (લીલા કાંદા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 99,
      itemName: 'SARSAV (RAI) BHAJI (સરસવ(રાઈ) ભાજી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 100,
      itemName: 'BATHUVA BHAJI (બથુવા ભાજી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 101,
      itemName: 'SUVA BHAJI (સુવા ભાજી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 102,
      itemName: 'RED BHAJI (લાલ ભાજી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 103,
      itemName: 'KHATTI BHAJI (ખાટી ભાજી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 104,
      itemName: 'ROSE LEAVES (ગુલાબ પાંદડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 105,
      itemName: 'PURE ROSE (સાચા ગુલાબ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 106,
      itemName: 'PINK ROSE (પીંક ગુલાબ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 107,
      itemName: 'KELA PAN (કેળ ના પાન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 108,
      itemName: 'KELA PHUL (કેલા ફૂલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 109,
      itemName: 'DRUM STICK (સરગવાની સીંગ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 110,
      itemName: 'COCONUT (નારિયલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 111,
      itemName: 'GREEN MOGRI (લીલી મોગરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 112,
      itemName: 'RED MOGRI (લાલ મોગરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 113,
      itemName: 'MULA WHITE (સફેદ મૂળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 114,
      itemName: 'MULA RED (લાલ મૂળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 115,
      itemName: 'PATTRA PAN (પાતરા પાન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 116,
      itemName: 'PANAKI LEAVES (પાનકી ના પાન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 117,
      itemName: 'KOLKATA LEAVES (કલકતા પાન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 118,
      itemName: 'AJMA LEAVES (અજમા ના પાન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 119,
      itemName: 'SALAD PATTA (LETYUSH) GREEN (સલાડ પત્તા (લેટયુસ) લીલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 120,
      itemName: 'SALAD PATTA (LETYUSH) RED (સલાડ પત્તા (લેટયુસ) લાલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 121,
      itemName: 'SELLARY (સાલેરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 122,
      itemName: 'RED (YELLOW) PUMPKIN (લાલ ભોપલું)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 123,
      itemName: 'WHITE PUMPKIN (સફેદ ભોપલું)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 124,
      itemName: 'MADRASI CUCUMBER (મદ્રાસી કાકડી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 125,
      itemName: 'SALGAM (સલગમ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 126,
      itemName: 'BABYCORN (બેબીકોન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 127,
      itemName: 'RED CABBAGE (લાલ કોબી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 128,
      itemName: 'CHINESE CABBAGE (ચાઈનીસ કોબી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 129,
      itemName: 'RED CAPCICUM (લાલ સીમલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 130,
      itemName: 'YELLOW CAPCICUM (પીળા સીમલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 131,
      itemName: 'RED/YELLOW CAPCICUM (લાલ/પીળા સીમલા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 132,
      itemName: 'GREEN ZUKINEY (લીલા ઝુકીની)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 133,
      itemName: 'YELLOW ZUKINEY (પીળી જુકીની)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 134,
      itemName: 'GREEN/YELLOW ZUKINEY (લીલી/પીળી જુકીની)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 135,
      itemName: 'BROKOLY (બ્રોકોર્લી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 136,
      itemName: 'ICEBURG (આઈસબર્ગ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 137,
      itemName: 'ESPERGAS (એસપરગસ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 138,
      itemName: 'PARSLEY (પાર્સલી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 139,
      itemName: 'CHERRY TOMATO (ચેર્રી ટમેટા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 140,
      itemName: 'POKCHAI (પોક્ચાઈ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 141,
      itemName: 'LEMON GRASS (લેમન ગ્રાસ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 142,
      itemName: 'BESIL LEAVES (બેસીલ પત્તા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 143,
      itemName: 'LEMON LEAVES (લેમન પત્તા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 144,
      itemName: 'KAFIR LEMON LEAVES (કાફિર લેમન લીવ્સ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 145,
      itemName: 'LEAK (લીક)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 146,
      itemName: 'GALANGAL(THAI GINGER) (ગલાંગલ {થાય જીંજર})',
      unit: {
        KG: 0,
      },
    },
    {
      id: 147,
      itemName: 'ROSEMERRY (રોઝમેરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 148,
      itemName: 'OREGANO (ઓરેગાનો)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 149,
      itemName: 'KEL LEAVES (કેલ લીવ્સ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 150,
      itemName: 'ROMAN LETYUSH (રોમન લેટયુસ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 151,
      itemName: 'THAIM (થાઈમ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 152,
      itemName: 'MIX HUB (મીક્ષ હબ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 153,
      itemName: 'LOLOROSO (લોલોરોસો)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 154,
      itemName: 'EDMAMA (સોયાબીન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 155,
      itemName: 'EDIBAL FLOWER (એડીબલ ફ્લાવર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 156,
      itemName: 'AAVAKADU (આવકાડું)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 157,
      itemName: 'KOTHA (કોઠા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 158,
      itemName: 'AALKUL (આલકુલ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 159,
      itemName: 'LOTUS ROOT (કમલ કાક્ડી {લકડી})',
      unit: {
        KG: 0,
      },
    },
    {
      id: 160,
      itemName: 'BUTTAN MASHRUM (બટન મશરૂમ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 161,
      itemName: 'GREEN TEA (લીલી ચા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 162,
      itemName: 'UGAVELA MAG (ફણગાવેલા મગ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 163,
      itemName: 'UGAVELA MATH (ફણગાવેલા મઠ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 164,
      itemName: 'SPROUTED MIX (સ્પ્રાઉટેડ મીક્ષ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 165,
      itemName: 'PAKKA BANANA (પાકા કેળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 166,
      itemName: 'ELAICHI BANANA (એલચી કેળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 167,
      itemName: 'APPLE (સફરજન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 168,
      itemName: 'GREEN APPLE (લીલા સફરજન)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 169,
      itemName: 'PINAPPLE (અનાનસ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 170,
      itemName: 'POMEGRANATE (દાડમ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 171,
      itemName: 'ORANGES (સંતરા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 172,
      itemName: 'MOSAMBI (મોસંબી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 173,
      itemName: 'MALATA ORANGE (માલટા ઓરેન્જ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 174,
      itemName: 'MINI MALATA ORANGE ( મીની માલટા ઓરેન્જ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 175,
      itemName: 'CHIKU (ચીકુ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 176,
      itemName: 'PAKKA PAPITA (પાકા પપૈયા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 177,
      itemName: 'PEAR (પેર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 178,
      itemName: 'PERU (પેરૂ {જમરૂખ})',
      unit: {
        KG: 0,
      },
    },
    {
      id: 179,
      itemName: 'GREEN GRAPES (લીલી દ્રાક્ષ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 180,
      itemName: 'BLACK GRAPES (કાળી દ્રાક્ષ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 181,
      itemName: 'IMPORTATE GRAPES (ઈમ્પોટેટ દ્રાક્ષ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 182,
      itemName: 'WATERMILON (કલીન્ગર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 183,
      itemName: 'MUSKMILON (સકરટેટી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 184,
      itemName: 'STROBERRY (સ્ટોબેરી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 185,
      itemName: 'DRAGON FRUIT (ડ્રેગન ફ્રૂટ)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 186,
      itemName: 'IMPORTATE AAMLI (ઈમ્પોટેટ આમલી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 187,
      itemName: 'BOR (બોર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 188,
      itemName: 'CHANIYA BANIYA BOR (ચણિયા બનિયા બોર)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 189,
      itemName: 'STAR FRUIT (કમરક)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 190,
      itemName: 'SINGODA (શિંગોડા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 191,
      itemName: 'GREEN VARIYALI (લીલીવરિયાળી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 192,
      itemName: 'VILAYATI AAMBLI (વિલાયતી આંબલી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 193,
      itemName: 'KHATTI AAMBALI (ખટ્ટી આંબલી)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 194,
      itemName: 'SMALL AAMBADA (આંબળા)',
      unit: {
        KG: 0,
      },
    },
    {
      id: 195,
      itemName: 'SUGARKEN (શેરડી)',
      unit: {
        KG: 0,
      },
    },
  ];
  selectedUnit: String = '';

  //Form
  invoiceForm: FormGroup;
  selectedProduct = {};

  private unsubscribeAPIEventListenerData: Subject<Boolean> =
    new Subject<Boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private _invoiceService: RestSigninService
  ) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs; //Pdfmake Obj
    // // Add custom fonts to pdfMake
    // pdfMake.vfs = {
    //   ...pdfMake.vfs,
    //   ...customFonts,
    // };
  }

  ngOnInit(): void {
    //On Load Methods
    this.getInitalizedForm();
    this.getAllProduct();
  }

  // Method : Initalized Invoice Form
  getInitalizedForm() {
    //Random No
    let no = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    this.invoiceForm = this.formBuilder.group({
      invoiceNo: [no, Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceTime: ['', Validators.required],
      customerDetails: this.formBuilder.group({
        customerName: ['', Validators.required],
        customerEmail: [''],
        customerPhoneNumber: [''],
        customerMobileNumber: [''],
        customerAddress1: ['', Validators.required],
        customerAddress2: [''],
      }),
      BusinessDetails: this.formBuilder.group({
        BusinessName: [''],
        BusinessEmail: [''],
        BusinessPhoneNumber: [''],
        BusinessMobileNumber: [''],
        BusinessAddress1: [''],
        BusinessAddress2: [''],
      }),
      BillOfproducts: this.formBuilder.array([
        this.formBuilder.group({
          productName: ['', Validators.required],
          quantity: [0, [Validators.required]],
          unit: [0, Validators.required],
          rate: [0, Validators.required],
          amount: [0, Validators.required],
        }),
      ]),
      subTotal: [0.0],
      deliveryCharge: [0.0],
      cancelledCharge: [0.0],
      totalBill: [0.0],
    });
  }

  //Method: Get All Product
  getAllProduct() {
    this._invoiceService
      .getproductdetails()
      .pipe(takeUntil(this.unsubscribeAPIEventListenerData))
      .subscribe((data) => {
        if (data) {
          this.products = data;
        } else {
          this.products = [];
        }
      });
  }

  // Method: Used to get only product table obj
  get BillofproductArray() {
    return this.invoiceForm.get('BillOfproducts') as FormArray;
  }

  //Method: Add New Product for Invoice
  addNewProduct() {
    let newEntity = this.invoiceForm.get('BillOfproducts') as FormArray;
    newEntity.push(
      this.formBuilder.group({
        productName: ['', Validators.required],
        quantity: ['', Validators.required],
        unit: ['', Validators.required],
        rate: ['', Validators.required],
        amount: ['', Validators.required],
      })
    );
  }

  //Method: Remove New Product for Invoice
  removeProduct(index: number) {
    this.BillofproductArray.removeAt(index);
    this.calculateInvoiceSubTotal();
  }

  // Method : Generate Bill and Submit to API
  getInvoiceDetails() {
    this.invoiceForm.markAllAsTouched();
    const invoiceData = this.invoiceForm.value;
    this.generateInvoice(invoiceData); //Generate PDF
    // console.log('Invoice Form  :', this.invoiceForm);
    if (this.invoiceForm.valid) {
      console.log('Invoice Form  :', invoiceData);
    }
  }

  //Method: Used to Get Product AMount quantity and Rate Wise
  calculateTotalPrice(index: number) {
    let BillOfproducts = (this.invoiceForm.get('BillOfproducts') as FormArray)
      .controls;
    let selectedProduct = BillOfproducts[index];
    console.log('selectedProduct: ', selectedProduct);

    // let quantity = selectedProduct.value['quantity'];
    let quantity: number = selectedProduct.get('quantity').value;
    let rate: number = selectedProduct.get('rate').value;
    // let unit:number = selectedProduct.get('unit').value;

    //Check for Gram Unit
    let amount = Number((Number(quantity) * Number(rate)).toFixed(3));
    selectedProduct.get('amount').patchValue(amount, { emitEvent: false });

    this.calculateInvoiceSubTotal();
  }

  //Method : Find SubTotal of All the Product user Selected
  calculateInvoiceSubTotal() {
    let totalAmount = 0;
    let BillOfproducts = (this.invoiceForm.get('BillOfproducts') as FormArray)
      .controls;
    BillOfproducts.forEach((formObj) => {
      totalAmount += formObj.get('amount').value;
    });
    totalAmount = Number(totalAmount.toFixed(3));
    this.invoiceForm
      .get('subTotal')
      .patchValue(totalAmount, { emitEvent: false });

    this.calculateDeliveryCharge();
    this.calculateCancelledOrderCharge();
  }

  //Method: Add Delivery Charge
  calculateDeliveryCharge() {
    let subTotal = this.invoiceForm.get('subTotal').value;
    let totalBill = Number(
      (subTotal + this.invoiceForm.get('deliveryCharge').value).toFixed(3)
    );
    this.invoiceForm
      .get('totalBill')
      .patchValue(totalBill, { emitEvent: false });
  }

  //Method: Remove Cancelled Order Charge Charge
  calculateCancelledOrderCharge() {
    let subTotal: number = this.invoiceForm.get('subTotal').value;
    let totalBill = Number(
      (
        subTotal +
        this.invoiceForm.get('deliveryCharge').value -
        this.invoiceForm.get('cancelledCharge').value
      ).toFixed(3)
    );
    this.invoiceForm
      .get('totalBill')
      .patchValue(totalBill, { emitEvent: false });
  }

  generateInvoice(invoicedata: any) {
    const custName: string = String(
      invoicedata['customerDetails']['customerName']
    ).replace(' ', '_');
    const fileName: String =
      custName + '_' + 'BillNo' + '_' + invoicedata['invoiceNo'];

    // //Specifying the fonts which we are going to use in our PDF
    pdfMake.fonts = {
      NotoSans: {
        normal: '../../../../assets/font/NotoSans/NotoSansGujarati-Regular.ttf',
        bold: '../../../../assets/font/NotoSans/NotoSansGujarati-Medium.ttf',
        // italics: '../../../../assets/font/NotoSans/NotoSansGujarati-Bold.ttf',
      },
      // Chitra: {
      //   normal: 'GJ-TTChitraNormal.woff',
      // },
    };

    let dd = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
      background: function (currentPage, pageSize) {
        return {
          stack: [
            {
              canvas: [
                {
                  type: 'rect',
                  x: 25, // Left margin
                  y: 37, // Top margin
                  w: pageSize.width - 50, // Page width - (left margin + right margin)
                  h: pageSize.height - 90, // Page height - (top margin + bottom margin)
                  lineWidth: 2,
                  lineColor: '#000', // Border color
                },
              ],
            },
          ],
        };
      },
      content: [
        {
          text: 'MANUBHAI PANDYA',
          fontSize: 25,
          bold: true,
          alignment: 'center',
          color: '#000',
          font: 'NotoSans',
        },
        {
          text: '(FRESH & EXOTIC VEGETABLE SUPPLIERS)',
          fontSize: 10,
          alignment: 'center',
          decoration: 'underline',
          color: '#gray',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            {
              width: '35%',
              stack: [
                'BMC MUNICIPAL MARKET,',
                'Borivali (West),',
                'Mumbai-400092,',
              ],
              lineHeight: 1.15,
              fontSize: 11,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 10],
            },
            {
              width: '*',
              stack: [
                `Mob No : 9821159981`,
                'Tel No: 022 28901729 ',
                '022 28908169',
              ],
              lineHeight: 1.2,
              fontSize: 11,
              bold: true,
              alignment: 'right',
            },
          ],
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
          ], // Adding a horizontal line
        },
        {
          margin: [0, 20, 0, 10],
          columns: [
            {
              width: '60%',
              stack: [
                {
                  text: 'Bill To :',
                  alignment: 'left',
                  bold: true,
                  fontSize: 13,
                  margin: [0, 0, 0, 2],
                },
                { text: invoicedata.customerDetails.customerName },
                { text: invoicedata.customerDetails.customerEmail },
                { text: invoicedata.customerDetails.customerAddress1 },
                { text: invoicedata.customerDetails.customerAddress2 },
                { text: invoicedata.customerDetails.customerPhoneNumber },
                { text: invoicedata.customerDetails.customerMobileNumber },
              ],
              lineHeight: 1.2,
              margin: [0, 0, 0, 10],
            },
            {
              width: '*',
              margin: [0, 13, 0, 10],
              stack: [
                { text: `Invoice No: ${(Math.random() * 1000).toFixed(0)}` },
                {
                  text: `Date: ${new Date(
                    invoicedata.invoiceDate
                  ).toDateString()}`,
                },
                { text: `Time: ${invoicedata.invoiceTime}` },
              ],
              fontSize: 12,
              bold: true,
              lineHeight: 1.8,
              alignment: 'right',
            },
          ],
          columnGap: 10,
        },
        {
          lineHeight: 1.2,
          table: {
            headerRows: 1,
            widths: [250, 130, '*'],
            body: [
              [
                { text: 'VEGETABLES NAME', style: 'header' },
                { text: 'QUANTITY', style: 'header' },
                { text: 'TOTAL', style: 'header' },
              ],
              ...invoicedata.BillOfproducts.map((item) => [
                { text: item.productName.itemName },
                `${item.quantity} (${item.unit})`,
                item.amount,
              ]),
            ],
          },
        },
        {
          margin: [0, 15, 0, 5],
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Payment Subtotal',
                  border: [false, false, false, false],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, false],
                  text: `₹ ${invoicedata.subTotal}`,
                  alignment: 'right',
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Delivery Charge (+)',
                  border: [false, false, false, false],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `₹ ${invoicedata.deliveryCharge}`,
                  border: [false, false, false, false],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Vegetable Return Amount (-)',
                  border: [false, false, false, false],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `₹ ${invoicedata.cancelledCharge}`,
                  border: [false, false, false, false],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Total Amount',
                  bold: true,
                  fontSize: 16,
                  alignment: 'right',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `₹ ${invoicedata.totalBill}`,
                  bold: true,
                  fontSize: 16,
                  alignment: 'right',
                  border: [false, false, false, false],
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
      ],
      // defaultStyle: {
      //   font: 'Roboto',
      // },
      styles: {
        header: {
          fillColor: '#cccccc', // Gray color for the header
          bold: true,
          fontSize: 13,
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        // Document Footer
        documentFooterLeft: {
          fontSize: 10,
          margin: [25, 5, 5, 5],
          alignment: 'left',
        },
        documentFooterCenter: {
          fontSize: 10,
          margin: [25, 5, 5, 5],
          alignment: 'center',
        },
        documentFooterRight: {
          fontSize: 10,
          margin: [25, 5, 5, 5],
          alignment: 'right',
        },
      },
    };
    // pdfMake.createPdf(dd).download(fileName);
    pdfMake.createPdf(dd).open();
  }

  // Reset Form
  resetForm() {
    this.invoiceForm.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIEventListenerData.next(true);
    this.unsubscribeAPIEventListenerData.complete();
  }
}
