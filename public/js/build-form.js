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

      configForm();

    }

    function configForm() {
      var form = document.getElementById('form-content');
      var inputs = form.getElementsByTagName('input');
      var selects = form.getElementsByTagName('select');
      var searchButton = document.getElementById('search-button');
      var i;
      var input;
      var select
      var fieldsets = form.getElementsByTagName('fieldset');

      for (i = 0; i < inputs.length; i ++) {
        input = inputs[i];

        addEvent(input, 'blur', validateField);
        addEvent(input, 'change', validateField);
      }

      for (i = 0; i < selects.length; i ++) {
        select = selects[i];

        addEvent(select, 'blur', validateField);
        addEvent(select, 'change', validateField);
      }

      addEvent(searchButton, 'click', function callbackValidation() {
        for (i = 0; i < fieldsets[0].getElementsByTagName('input').length; i ++) {
          input = fieldsets[0].getElementsByTagName('input')[i];

          validateField({
            target: input,
          });
        }

        for (i = 0; i < fieldsets[0].getElementsByTagName('select').length; i ++) {
          select = fieldsets[0].getElementsByTagName('select')[i];

          validateField({
            target: select,
          });
        }

        if (form.getElementsByClassName('error').length === 0) {
          fieldsets[0].setAttribute('class', 'hidden');
          fieldsets[1].removeAttribute('class');
        }
      });
    }

    function validateField(e) {
      var element = e.target;

      if ((element.getAttribute('required') === 'true' || element.value.length > 0)
        && element.getAttribute('type') === 'email'
        && !/^.+@.+\..+$/.test(element.value)) {
        showErrorMessage(element);
      } else {
        hideErrorMessage(element);
      }

      if (element.getAttribute('required') === 'true' && element.value.replace(/\s/g, '') === '') {
        showErrorMessage(element);
      } else {
        hideErrorMessage(element);
      }
    }

    function hideErrorMessage(element) {
      var elementId = element.getAttribute('id');
      var label = document.getElementById('label-' + elementId);

      if (label) {
        label.parentNode.removeChild(label);

        element.removeAttribute('class');
      }
    }

    function showErrorMessage(element) {
      var label;
      var message = element.getAttribute('data-message') ? element.getAttribute('data-message') : 'Preencha este campo corretamente';
      var elementId = element.getAttribute('id');

      if (document.getElementById('label-' + elementId)) return;

      label = document.createElement('label');

      label.setAttribute('for', elementId);
      label.setAttribute('class', 'error');
      label.setAttribute('id', 'label-' + elementId);
      label.innerHTML = message;

      element.setAttribute('class', 'error');

      element.parentNode.appendChild(label);
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
                html += "<li class='item'><input type='checkbox' required='"+res[key].required+"' name='"+res[key].name+"' id='Qual será o serviço?-0' value='"+objVal[i]+"'><label>"+ objVal[i] +"</label></li>";
              }
              html += "</ul>";
            }
            else if (res[key].type === 'textarea') {
              html += "<li><textarea rows='4' cols='50'></textarea></li>";
            }
            else {
              html += "<li>";
              html += "<select required='true' id='select-"+[key]+"'>";
              html += "<option placeholder='selecione' value=''>selecione</option>";
              for (var i in objVal) {
                console.log(objVal[i])
                html += "<option value='"+objVal[i]+"'>"+objVal[i]+"</option>";
              }
              html += "</select></li>";
              html += "</ul>";
            }
          }
        html +=  "<button id='search-button' type='button'>Buscar profissionais</button></div>";

        fieldsetTarget.innerHTML = html;
    }
    function buildUserFields (res, targetEl){
      var fieldsetTarget = targetEl.querySelector('.user_fields');

      var html = "<div class='user-fields-list'><p>Falta Pouco!</p><small>Preencha mais algumas informações para que os profissionais indicados possam entrar em contato.</small>";
      for (var key in res) {
        var objVal = res[key].values;
          html += "<label class='name'>"+ res[key].label +"</label>";
          html += "<input type='"+res[key].type+"' required='"+res[key].required+"' placeholder='"+res[key].placeholder+"'>";
        }

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
