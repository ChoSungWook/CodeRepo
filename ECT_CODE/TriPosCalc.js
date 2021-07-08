//var express = require('express');

var data = [[37.571335,126.828456],[37.570850,126.825557],[37.568594,126.824415],[37.567138,126.825073],[37.565967,126.827543],[37.566678,126.830788],[37.568963,126.831567],[37.569019,126.827805]];
const selectIdx = [0,3,5];
const selectRssi = [-60,-120,-60];
var pushList = new Array();

function getTriPos(pushList)
{
  console.log('getTriPos');
            // select min pos 
            var latitudeMin = Math.min(pushList[0].founderPhoneLatitude,pushList[1].founderPhoneLatitude,pushList[2].founderPhoneLatitude);
            var longitudeMin = Math.min(pushList[0].founderPhoneLongitude,pushList[1].founderPhoneLongitude,pushList[2].founderPhoneLongitude);

            console.log('latitudeMin'+latitudeMin);/// 21-03-30 NaN 나오는 중 ㅡ 디버깅 해야함
            var latitude = Math.floor(latitudeMin*1000)*1000;
            var longitude = Math.floor(longitudeMin*1000)*1000;

            var maxDist = Math.min(pushList[0].foundDeviceRSSI,pushList[1].foundDeviceRSSI,pushList[2].foundDeviceRSSI);
            console.log('guide pos ::: '+latitude+','+longitude);


            var pos = new Array();
            var posIdx = [0,1,2];
            for(i=0;i<3;++i)
            {
              var resPushData = pushList[i];
              var tmp = 0;
              if(maxDist == resPushData.foundDeviceRSSI)
                 {
                   tmp = posIdx[i];
                   posIdx[i] = posIdx[2];
                   posIdx[2] = tmp;
                   break;
                 }
            }

            for(i=0;i<3;++i)
            {
              var resPushData = pushList[posIdx[i]];
              pos[posIdx[i]]={
                dist : resPushData.foundDeviceRSSI*(-1),
                lat : resPushData.founderPhoneLatitude*1000000-latitude,
                long :resPushData.founderPhoneLongitude*1000000-longitude
              };
            }
            var tmp_lat = getPosTwice(pos[0].dist,pos[0].lat,pos[1].dist,pos[1].lat);
            var tmp_long = getPosTwice(pos[0].dist,pos[0].long,pos[1].dist,pos[1].long);

            var dst = Math.ceil(getDest(tmp_lat,tmp_long,pos[2].lat,pos[2].long));
            var dst_result = dst;
            var result_lat ;
            var result_long ;
           if(dst>pos[2].dist)
            {
                console.log('in point');
                dst_result = dst-pos[2].dist;
                result_lat = getPosTwice(pos[2].dist,pos[2].lat,dst_result,tmp_lat);
                result_long = getPosTwice(pos[2].dist,pos[2].long,dst_result,tmp_long);
                
            }else
            {// 비율로 외점 구하는 식
              console.log('out point '+dst+'<'+pos[2].dist);
              dst_result = pos[2].dist * (-1);
              result_lat = getPosTwice(dst_result,pos[2].lat,dst,tmp_lat);
              result_long = getPosTwice(dst_result,pos[2].long,dst,tmp_long);

            }
           

                result_lat = (latitude+result_lat)/1000000;
                result_long = (longitude+result_long)/1000000; 
            const result_pos =
            {
              lat : result_lat,
              long : result_long
            }
            console.log(result_lat+","+result_long);
            return result_pos;
}

function getTwicePos(pushList)
{
  console.log('getTwicePos '+JSON.stringify(pushList));

  var latitudeMin = Math.min(pushList[0].founderPhoneLatitude,pushList[1].founderPhoneLatitude);
  var longitudeMin = Math.min(pushList[0].founderPhoneLongitude,pushList[1].founderPhoneLongitude);

  console.log('latitudeMin  '+latitudeMin);/// 21-03-30 NaN 나오는 중 ㅡ 디버깅 해야함
  var latitude = Math.floor(latitudeMin*1000)*1000;
  var longitude = Math.floor(longitudeMin*1000)*1000;
  console.log('guide pos ::: '+latitude+','+longitude);

 
  var pos = new Array();

  for(i=0;i<2;++i)
  {
    var resPushData = pushList[i];
    pos[i]={
      dist : resPushData.foundDeviceRSSI*(-1),
      lat : resPushData.founderPhoneLatitude*1000000-latitude,
      long :resPushData.founderPhoneLongitude*1000000-longitude
    };
  }
  var result_lat = getPosTwice(pos[0].dist,pos[0].lat,pos[1].dist,pos[1].lat);
  var result_long = getPosTwice(pos[0].dist,pos[0].long,pos[1].dist,pos[1].long);
  result_lat = (latitude+result_lat)/1000000;
  result_long = (longitude+result_long)/1000000; 
  const result_pos = 
  {
    lat : result_lat,
    long : result_long
  }

  return result_pos;
}
function getPosTwice(rssi_a,x_a,rssi_b,x_b)
{

  var rssi_value = rssi_a+rssi_b
  if(rssi_value==0)
      rssi_value = 2
    // console.log(`P=((${rssi_a}*${x_a})+(${rssi_b}*${x_b}))/(${rssi_value})`)
  var p = ((rssi_a*x_a)+(rssi_b*x_b))/(rssi_value);
  return Math.round(p);
}

function getDest(t_x,t_y,c_x,c_y){return Math.sqrt(Math.pow(c_x-t_x,2) + Math.pow(c_y-t_y,2))/10}

// main
{

  for(i=0;i<3;++i)
  {
    var dataObj = {
      foundDeviceRSSI : selectRssi[i],
      founderPhoneLatitude : data[selectIdx[i]][0],
      founderPhoneLongitude : data[selectIdx[i]][1],
    }
    pushList.push(dataObj);
  }
  var position = getTriPos(pushList);
  
}