var App = App || {};

App.buildForm = (function ($, win, doc) {
  'use strict';

    function setup () {
      getData('/schema-json', success);
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
      var targetEl = doc.getElementById('form-content');
      var result = JSON.parse(data);
      buildRequestFields(result._embedded.request_fields, targetEl);
      buildUserFields(result._embedded.user_fields, targetEl);

    }
    function buildRequestFields(res, targetEl) {

        var fieldsetTarget = targetEl.querySelector('.request_fields');
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
            }
            else if (res[key].type === 'big_text') {
              html += "<li><textarea rows='4' cols='50'></textarea></li>";
            }
            else {
              html += "<li>";
              html += "<select>";
              for (var i in objVal) {
                console.log(objVal[i])
                html += "<option value='"+objVal[i]+"'>"+objVal[i]+"</option>";
              }
              html += "</select></li>";
              html += "</ul>";
            }
          }
        html +=  "<button type='button'>Buscar profissionais</button></div>";

        fieldsetTarget.innerHTML = html;
    }
    function buildUserFields (res, targetEl){
      var fieldsetTarget = targetEl.querySelector('.user_fields');

      var html = "<div class='request-fields-list'>";

      for (var key in res) {
        var objVal = res[key].values;
          html += "<label class='name'>"+ res[key].name +"</label>";
          html += "<ul class='request-list'>";
          html += "<li>";
          html += "<select>";

          html += "</select></li>";
        }
        html += "</ul>";

        fieldsetTarget.innerHTML = html;
      console.log('ressss user', res)
    }
    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    return {
      'setup': setup
    };

}(undefined, window, window.document));
App.buildForm.setup();
