var App = App || {};

App.buildForm = (function (win, doc) {
  'use strict';

    function setup () {
      getData('/schema-json', success);
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
      var form = doc.getElementById('form-content');
      var inputs = doc.getElementsByTagName('input');
      var selects = form.getElementsByTagName('select');
      var searchButton = doc.getElementById('search-button');
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
          var bread = doc.getElementsByClassName('step');

          for (var i=0; i<bread.length; i++){
            if (hasClass(bread[i], 'active')) {
              removeClass(bread[i], 'active');
              addClass(bread[bread.length-1], 'active');
            }
          }
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
      var label = doc.getElementById('label-' + elementId);

      if (label) {
        label.parentNode.removeChild(label);

        element.removeAttribute('class');
      }
    }

    function showErrorMessage(element) {
      var label;
      var message = element.getAttribute('data-message') ? element.getAttribute('data-message') : 'Este campo é requerido';
      var elementId = element.getAttribute('id');

      if (doc.getElementById('label-' + elementId)) return;

      label = doc.createElement('label');

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
                html += "<li class='item'><input type='checkbox' required='"+res[key].required+"' name='"+res[key].name+"' id='checkbox-"+[i]+"' value='"+objVal[i]+"'><label for='checkbox-"+[i]+"'>"+ objVal[i] +"</label></li>";
              }
              html += "</ul>";
            }
            else if (res[key].type === 'textarea') {
              html += "<li><textarea rows='4' cols='50' placeholder="+res[key].placeholder+"></textarea></li>";
            }
            else {
              html += "<li>";
              html += "<select required='true' id='select-"+[key]+"'>";
              html += "<option placeholder='Selecione' value=''>Selecione</option>";
              for (var i in objVal) {
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

      var html = "<div class='user-fields-list'><p>Falta Pouco!</p><small>Preencha mais algumas informações para que os profissionais indicados possam entrar em contato.</small><ul>";
      for (var key in res) {
        var objVal = res[key].values;
          html += "<li><label class='name'>"+ res[key].label +"</label>";
          html += "<input type='"+res[key].type+"' required='"+res[key].required+"' placeholder='"+res[key].placeholder+"'></li>";
        }
        html += "</ul>";
        html += "<button type='submit' >Finalizar</button>";

        fieldsetTarget.innerHTML = html;
    }

    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }

    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function hasClass(el, className) {
      return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
    }

    function addClass(el, className) {
      if (el.classList) el.classList.add(className);
      else if (!hasClass(el, className)) el.className += ' ' + className;
    }

    function removeClass(el, className) {
      if (el.classList) el.classList.remove(className);
      else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
    }

    return {
      'setup': setup
    };

}(window, window.document));
App.buildForm.setup();
