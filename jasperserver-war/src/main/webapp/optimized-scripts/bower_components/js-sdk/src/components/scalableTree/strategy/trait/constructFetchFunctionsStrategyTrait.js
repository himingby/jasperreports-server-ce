define(["require","underscore"],function(n){var r=n("underscore");return{constructFetchFunctions:function(n,e){var t,u=[];return r.each(e,function(e){t=r.partial(n,e),u.push(t)},this),u}}});