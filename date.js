function dateStyle(date){
    date = date || Date.parse(new Date())
    function date_fil(a){
        if(a.length == 1){
            return '0'+a
        }
        return a
    }
    var Y = new Date(date).getFullYear().toString()
    var M = (new Date(date).getMonth()+1).toString()
    var D = new Date(date).getDate().toString()
    var h = new Date(date).getHours().toString()
    var m = new Date(date).getMinutes().toString()
    var s = new Date(date).getSeconds().toString()
    return [[date_fil(Y),date_fil(M),date_fil(D)],[date_fil(h),date_fil(m),date_fil(s)]]
}