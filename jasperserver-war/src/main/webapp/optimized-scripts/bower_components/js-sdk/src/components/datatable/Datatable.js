define(["require","jquery","backbone","underscore","text!./datatableTemplate.html","./DatatableModel","./datatableData","logger"],function(e){"use strict";var t=(e("jquery"),e("backbone")),a=e("underscore"),l=e("text!./datatableTemplate.html"),r=e("./DatatableModel"),i=e("./datatableData");e("logger").register("Datatable");return t.View.extend({template:a.template(l),initialize:function(){this.model=new r(i),this.render()},render:function(){return this.$el.html(this.template(this.model.toJSON())),this}})});