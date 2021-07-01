
(function() {
    var dataObject = new Object();
    var dataList = new Array();
    var initializedFlag = false;
    var auth = 1; // debug: -1 admin 0 normal: 1  


  
    function formatParams( params ){
    return "?" + Object
            .keys(params)
            .map(function(key){
            return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    }  
  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
  function getLocalTime (time){

    var localTime = new Date(time);
    var createAt = localTime.getFullYear().pad(4)+"-"+(localTime.getMonth()+1).pad(2)+"-"+localTime.getDate()+"     "+
        localTime.getHours().pad(2) +":"+ localTime.getMinutes().pad(2) +":"+ localTime.getSeconds().pad(2)+":"+localTime.getMilliseconds().pad(3);

      return createAt;
    }


    document.getElementById("submitPW").onclick=
    function(){
        var pwValue = document.getElementById("pwValue");

        if(pwValue.disabled)
        {
            console.log("already login");
            return;
        }
        initializedFlag = true;
        liItemInit();
        var pw = pwValue.value;
        console.log(pw);
        if(pw==='admin')
            auth = 0;
        
        pwValue.disabled = true;
    }


  var tagList = new Array();
    function getDataText(data)
    {
        var datDiv = document.createElement('div');
        datDiv.style['margin-left'] = '10px';
        var dataSizeText = 'data-size : '+data.length;
        var tagdata = "tag:\r\n";
        if(auth == 0)
        {
          var tagText = document.getElementById('tagText');//.textContent.slice(',');
          tagList = tagText.value.split(',');
          var jsonProperty;
          if(data[0]=='{' && data[data.length-1]=='}')
          {
            console.log("json data");
            data = data.slice(1,data.length-1);
            jsonProperty = data.split(',');
            var i=0,j=0;
            for(i=0;i<tagList.length;++i)
            {
              var idx = jsonProperty.findIndex(data => data.includes(tagList[i]+":"));
              if(idx!=-1)
              {
                tagdata+= jsonProperty[idx]+"\r\n";
                data = data.slice(0,idx)+data.slice(jsonProperty[idx].length+1,data.length-1);
              }
            }

          }
          datDiv.appendChild(document.createTextNode(tagdata));
          datDiv.appendChild(document.createElement('br'));
        }

        var dataText='data : '+data;
        datDiv.appendChild(document.createTextNode(dataSizeText));
        datDiv.appendChild(document.createElement('br'));
        datDiv.appendChild(document.createTextNode(dataText));
        return datDiv;
    }
    function liItemInit()
    {
        dataObject.dataList = dataList;
        dataObject.addData = function(rawData)
        {
            var data =
            {
                id : dataList.length,
                absDate : new Date().getTime(),
                data : rawData
            }

            var newData = document.createElement('li');
            newData.id = 'data'+data.id;
            newData.classList.add('list-item');
            var textData = document.createElement('p');
            textData.textContent = "data";
            var timeData = document.createElement('font');
            timeData.style.float = 'right';
            timeData.textContent = getLocalTime(data.absDate);
            textData.appendChild(timeData);
            newData.appendChild(textData);
            
            var detail = document.createElement('li');
            detail.id = 'detail'+data.id;
            detail.style.display = 'none';
            detail.appendChild(getDataText(data.data));
            detail.style['margin-left'] = '10px';

            newData.onclick = function()
            {
                console.log(""+newData.id+" is clicked")
                if(detail.style.display =='none'){
                    detail.style.display = 'inline';
                }
                else{
                    detail.style.display = 'none';
                }
            }
            
            

            dataObject.dataList.push(data);
            var element_datalist = document.getElementById('dataList'); 
            element_datalist.insertBefore(detail, element_datalist.firstChild);  
            element_datalist.insertBefore(newData, element_datalist.firstChild); 


        }
    }

//====================================================================
// Block. Menu Button listener
//====================================================================
var menu_list = ['menu_liveData','menu_settings'];
function clearSelectItem()
{
  var i=0;
  for(i=0;i<menu_list.length;++i)
  {
    var clist = document.getElementById(menu_list[i]);
    if(clist.classList.contains('selected-menu-label'))
      {
          clist.classList.remove('selected-menu-label');
          clist.classList.add('menu-label');
      } 

  }
}
function selectMenu(id)
{
  var menu_id = document.getElementById(id);
  clearSelectItem();
  menu_id.classList.remove('menu-label');
  menu_id.classList.add('selected-menu-label');
}
document.getElementById('menu_liveData').onclick=function(){  
  selectMenu('menu_liveData');
  document.getElementById('dataList').style.display = '';
  document.getElementById('settingSec').style.display='none';
}
document.getElementById('menu_settings').onclick=function(){
    selectMenu('menu_settings');
    document.getElementById('dataList').style.display = 'none';
    document.getElementById('settingSec').style.display='';

    if(auth == 1)
    {
      document.getElementById('tagFunc').style.display = 'none';
    }
    else
    {
      document.getElementById('tagFunc').style.display = '';

    }
}
////

    document.getElementById('funcBtn').onclick=
    function()
    {
      console.log("function button clicked");
      console.log(document.getElementById('dataList').style.display);
        
        if(initializedFlag == 1)
          dataObject.addData('TestData');
        /*if(initializedFlag == 1){
            var url = "/api/data";
            ajaxGrant(url, "GET", {} , {}, onGetScanDataSuccess,onGetScanDataFail);
          }
          else {
            console.log("any client is not opened");
          }*/
    }

   
    setInterval(function()
    {
        if(initializedFlag == 1){
            var url = "/api/data";
            ajaxGrant(url, "GET", {} , {}, onGetScanDataSuccess,onGetScanDataFail);
          }
          else {
            console.log("any client is not opened");
          }
    },3*1000);
 
 function onGetScanDataSuccess(response)
 {
     response = JSON.parse(response);
     console.log('res.len :: '+response.length);
     
     var i =0;
     for(i=0;i<response.length;++i)
     {
         if(typeof(response[i])=='object')
         {
           if(response[i].length!=0)
              dataObject.addData(JSON.stringify(response[i]));
          }
         else
            dataObject.addData(response[i].toString());
     }
     
 }
 function onGetScanDataFail(response)
 {
     if( typeof(response) =='undefined')
        console.log('[fail] data queue is empty');
     else
        console.log('[fail] '+response);
 }
//====================================================================
// Block. Internal function for Transaction API with WebServer
//====================================================================
function ajaxGrant(baseUrl, method, params, payload, successCallback, failCallback){
    var xhr = new XMLHttpRequest();
  //    var auth = "Bearer " + jwtToken;
    var url = baseUrl + formatParams(params);
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
  //    xhr.setRequestHeader("Grpc-Metadata-Authorization", auth);
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4 ) {
        return;
      }
      if (xhr.status != 200) {
        failCallback();
        return;
      }
      successCallback(xhr.responseText);
    };

    xhr.send(JSON.stringify(payload));
  }

   


} ) ();