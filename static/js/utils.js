/**
 * Created by Ludei on 23/05/14.
 */

var UtilModule = (function () {

    return {

        getDate : function () {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            today = mm+'/'+dd+'/'+yyyy;

            return today;
        },

        getTime : function ( showAmPm ){

            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes;
            if(showAmPm){
                strTime = hours + ':' + minutes + ampm;
            }

            return strTime;
        },

        createFont : function (name , size , color){
            return new CAAT.Module.Font.Font().
                setFont(name).
                setFontSize(size,"px").
                setFillStyle( color ).
                createDefault(1);
        }

    };
}());
