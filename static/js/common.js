var COMMON = {

    formatDate: function(pattern, date) {
       if (typeof date == 'number') date = new Date(date);
       function formatNumber(data, format) { //3
           format = format.length;
           data = data || 0;
           return format == 1 ? data : String(Math.pow(10, format) + data).slice(-format);
       }
  
       var result = pattern.replace(/([YMDhsm])\1*/g, function(format) {
           switch (format.charAt()) {
               case 'Y':
                   return formatNumber(date.getFullYear(), format);
               case 'M':
                   return formatNumber(date.getMonth() + 1, format);
               case 'D':
                   return formatNumber(date.getDate(), format);
               case 'w':
                   return date.getDay() + 1;
               case 'h':
                   return formatNumber(date.getHours(), format);
               case 'm':
                   return formatNumber(date.getMinutes(), format);
               case 's':
                   return formatNumber(date.getSeconds(), format);
           }
       });
       console.log('ersult', result, date);
       return result;
    },
    //obter parametro de URL
    getUrlParam: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //Construir um objeto que contem o coteudo de destino
      var r = window.location.search.substr(1).match(reg);  //Corresponder paramentro de destino
      if (r != null) return unescape(r[2]); return null; //return contúdo
    },
    // obter contúdo de cookie
    getCookieItem: function (key) {
      if (!key) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }
  };