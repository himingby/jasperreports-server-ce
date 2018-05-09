define(["require","dataSource/model/BaseDataSourceModel","underscore","jquery","jrs.configs","requestSettings","dataSource/enum/connectionTypes","bi/repository/enum/repositoryResourceTypes","components.dialogs","bundle!all","bundle!jasperserver_config"],function(e){"use strict";var t=e("dataSource/model/BaseDataSourceModel"),s=e("underscore"),i=e("jquery"),r=e("jrs.configs"),o=e("requestSettings"),n=e("dataSource/enum/connectionTypes"),a=e("bi/repository/enum/repositoryResourceTypes"),u=e("components.dialogs"),p=e("bundle!all"),d=e("bundle!jasperserver_config"),l=t.extend({type:a.CUSTOM_DATA_SOURCE,constructor:function(e,i){this.defaults=s.extend({},this.defaults,{dataSourceName:i.dataSourceType,connectionType:n.CUSTOM}),t.prototype.constructor.apply(this,arguments)},initialize:function(e,s){var r=t.prototype.initialize.apply(this,arguments);return this.customFields=[],this.testable=!1,this.queryTypes=null,this.initialization=i.Deferred(),this.getCustomFieldsDefinition(),r},getCustomFieldsDefinition:function(){var e,t={};return s.extend(t,o,{Accept:"application/json"}),e=i.ajax({type:"GET",headers:t,url:r.contextPath+"/rest_v2/customDataSources/"+this.get("dataSourceName")}).done(s.bind(this.getCustomFieldsDefinitionDone,this)).fail(s.bind(this.getCustomFieldsDefinitionFail,this))},getCustomFieldsDefinitionDone:function(e){var t=this;e&&e.propertyDefinitions&&s.isArray(e.propertyDefinitions)&&(this.resetValidation(),this.testable=!!e.testable,this.queryTypes=e.queryTypes?e.queryTypes:null,s.each(e.propertyDefinitions,function(e){var i={};e.properties&&(e.properties=s(e.properties).reduce(function(e,t){return e[t.key]=t.value,e},{})),t.customFields.push(e),t.defaults[e.name]=e.defaultValue,t.options.isEditMode||t.set(e.name,e.defaultValue),"password"===e.name&&t.options.isEditMode&&!t.isNew()&&t.set("password",d["input.password.substitution"]),e.properties&&e.properties.mandatory&&(i[e.name]={required:!0,msg:p[t.get("dataSourceName")+"."+e.name+".required"]||p["required.field.specify.value"]},s.extend(t.validation,i))})),this.options.isEditMode||this.set(this.parse(this.attributes),{silent:!0}),this.initialization.resolve()},getCustomFieldsDefinitionFail:function(e){var t=!1,s="Failed to load custom data source definition. ";try{t=JSON.parse(e.responseText)}catch(i){}t&&(t[0]&&t[0].errorCode?s+="<br/>The reason is: "+t[0].errorCode:t.message&&(s+="<br/>The reason is: "+t.message),s+="<br/><br/>The full response from the server is: "+e.responseText),u.errorPopup.show(s)},parse:function(e){var i=t.prototype.parse.apply(this,arguments);return i=s.extend(i,this.parseProperties(e.properties)),delete e.properties,i},parseProperties:function(e){var t={};return s.isEmpty(e)||s.each(e,function(e){t[e.key]="password"===e.key?d["input.password.substitution"]:e.value}),t},toJSON:function(){var e=t.prototype.toJSON.apply(this,arguments);return this.customFieldsToJSON(e,this.customFields)},customFieldsToJSON:function(e,t){return s.isEmpty(t)||(e.properties=[],s.each(t,function(t){var s=e[t.name],i="password"===t.name;(!i||i&&s!==d["input.password.substitution"])&&(e.properties.push({key:t.name,value:s}),delete e[t.name])})),e},resetValidation:function(){this.validation=s.clone(l.prototype.validation)}});return l});