var App = App || {};

App.buildForm = (function ($, win, doc) {
  'use strict';

    function setup () {
      getData('/schema-json', success);
      // getData('/schema-json', function(data){
      //   var result = JSON.parse(data);
      //   console.log(result._embedded.request_fields)
      // });
    }
    function live(selector, event, callback, context) {
      addEvent(context || document, event, function(e) {
          var qs = (context || document).querySelectorAll(selector);
          if (qs) {
              var el = e.target || e.srcElement, index = -1;
              var dataEl = el.dataset.id;
              while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) el = el.parentElement;
              if (index > -1) callback.call(el, e, dataEl);
          }
      });
    }
    function getData (url, success){
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
          if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    }
    function success (data){
      var result = JSON.parse(data);
        console.log(result._embedded.request_fields)
      buildRequestFields(result._embedded.request_fields);

    }
    function buildRequestFields(res) {
        var el = doc.getElementById('form-content');

        var html = "<div class='request-fields-list'>";

        for (var key in res) {
          var objVal = res[key].values;
            html += "<label class='name'>"+ res[key].name +"</label>";
            html += "<ul class='request-list'>";
            if(res[key].type === 'enumerable' && res[key].allow_multiple_value){
              for (var i in objVal) {
                console.log(objVal[i])
                html += "<li class='item'><input type='checkbox' name='"+res[key].name+"' id='Qual será o serviço?-0' value='"+objVal[i]+"'><label>"+ objVal[i] +"</label></li>";
              }
              html += "</ul>";
            } else {
              html += "<li>";
              html += "<label>"+ res[key].name +"</label>";
              html += "<select>";
              for (var i in objVal) {
                console.log(objVal[i])
                html += "<option value='"+objVal[i]+"'>"+objVal[i]+"</option>";
              }
              html += "</select></li>";
              html += "</ul>";
            }

            // if (res[key].allow_multiple_value) {
            //   html += "<label>"+ res[key].name +"</label>";
            // } else {
            //   html += "<label>"+ res[key].name +"</label>";
            //
            // }
            // var label = res.data[key];
            // var mask = fullItem.id;
            // var name = fullItem.currencyFormat;
            // var placeholder = fullItem.price;
            // var reference = fullItem.image;
            // var required = fullItem.installments;
            // var type = fullItem.price.toString().split(".")[0];
            // var priceDecimal = fullItem.price.toString().split(".")[1];
            // var title = fullItem.title;
            // var availableSizes = fullItem.availableSizes;
            //
            // html += "<li class='item' data-id='"+idItem+"'>";
            //   html += "<figure><img src='images/"+imagePath+"' alt='' /></figure>";
            //   html += "<span class='item-title'>" + title + "</span>";
            //   html += "<span class='wrap-hr'><hr></span>";
            //   html +=  "<span class='item-price'>"+currencyFormat+"<b>"+priceBig+"</b>."+priceDecimal+"</span>"
            //   html +=  "<span class='item-installment'>ou "+installments+"x de R$25,00</span>"
            // html +=  "</li>";
          }
        html +=  "</div>";
        // debugger
        // create a p element for inserting in el
        var newEl = document.createElement('div');
        newEl.innerHTML = html;

        // use the innerHTML property for inserting HTML content
        // or append a textNode to the p element
        // el.appendChild(html);
        el.appendChild(newEl);


        // el.insertBefore(html, null);
        // $('.big-banner').append(html);
    }
    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function ableBt () {
      var addfavorite = doc.querySelectorAll('.addfavorite');

      for (var i=0; i < addfavorite.length; i++){
        addfavorite[i].disabled = false;
      }
    }
    return {
      'setup': setup
    };

}(undefined, window, window.document));
App.buildForm.setup();
