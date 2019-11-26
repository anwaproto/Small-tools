$('.container').hide(0)
var liveArr = []
function cb(a){
    console.log(a)
}
function live_arr(arr){
    var cl=arr.cctv.person.length
    var yl=arr.ygw.person.length
    var gl=arr.gjzx.person.length
    var cctv1 = arr.cctv.person.slice(0,Math.round(cl/2))
    var cctv2 = arr.cctv.person.slice(Math.round(cl/2),cl)
    var ygw1 = arr.ygw.person.slice(0,Math.round(yl/2))
    var ygw2 = arr.ygw.person.slice(Math.round(yl/2),yl)
    var gjzx1 = arr.gjzx.person.slice(0,Math.round(gl/2))
    var gjzx2 = arr.gjzx.person.slice(Math.round(gl/2),gl)
    liveArr.push(cctv1,ygw1,gjzx1,cctv2,ygw2,gjzx2)
    scene()
}

function scene(){
    $('.container').show(0)
    for(var i=0;i<liveArr.length;i++){
        var a = liveArr[i].slice(0,4)
        liveArr[i] = liveArr[i].concat(a)
        
        for(var j=0;j<liveArr[i].length;j++){
            var html = "<li class='name'>"+liveArr[i][j].name+"</li>"
            $('.nameList').eq(i).append(html)
        }
    }



    var setAction = []
    var winH = $(window).height()
    var isScoll = false
    var timer
    var setArr
    var eq
    var t
    var listH = []
    var swit = true
    var activeId=[]


    $('.switch').click(function(){
        if(swit){
            if(isScoll){
                swit = false
                isScoll = false
                setStop(0)
                setStop(1)
                setStop(2)
                setStop(3)
                setStop(4)
                setStop(5)
            }else{
                timer = 10
                activeId=[]
                setArr = []
                eq = 0
                t = [0,0,0,0,0,0]
                isScoll = true
                $(this).html('停止')
                play(0)
                play(1)
                play(2)
                play(3)
                play(4)
                play(5)
                $('.active').html('').css({opacity:0})
            }
        }
    })

    function play(num){
        listH[num] = $('.nameList').eq(num).height()
        setAction[num] = setInterval(function(){
            $('.nameList').eq(num).stop(true,true)
            if(listH[num]+t[num]<=240){
                t[num]=0
                $('.nameList').eq(num).css('top',t[num])
            }
            t[num]-=60
            $('.nameList').eq(num).animate({top:t[num]},30)
            
        },60)
    }
    function setStop(num){
        var ti = 1
        clearInterval(setAction[num])
        setAction[num] = setInterval(function(){
            $('.active').eq(num).animate({opacity:1},0)
            $('.nameList').eq(num).stop(true,true)
            if(listH[num]+t[num]<=240){
                t[num]=0
                $('.nameList').eq(num).css('top',t[num]);
            }
            t[num]-=60
            $('.nameList').eq(num).animate({top:t[num]},150,function(){
                ti++
                if(ti>=timer){
                    clearInterval(setAction[num])
                    end(num)
                }
            })       
        },100+ti*200)
    }






    function rotation_end(num){
        var listT = Math.abs(Math.round($('.nameList').eq(num).css('top').split('p')[0]))
        var big = Math.round(2 + listT/60)
        $('.box_c .nameList').eq(num).find('.name').css({color:'rgba(255,255,255,0.5)'})
        $('.container .box p').eq(num).hide()
        $('.container .box').eq(num).css({backgroundColor:'rgba(1,33,77,0.5)'})
        $('.nameList').eq(num).find('.name').eq(big).css({color:'#fff'})
        setArr[num] = liveArr[num][big]
    }

    function chou_end(num){
        console.log(setArr)
        for(var i = 0;i<setArr.length;i++){
            if(setArr[i]==''){
                return
            }else{
            var comp = i==0||i==3?'央视网':i==1||i==4?'央广网':i==2||i==5?'国际在线':''
            var html = '<div class="list_box">'+
            '<div class="activeName">'+setArr[i].name+'</div>'+
            '<div class="company">'+comp+'</div>'+
            '<div class="department">'+setArr[i].dept+'</div>'+
            '</div>'
            $('.container').hide(0)
            $('.switch').hide(0)
            $('.active_box').hide(0)
            $('.activeList').append(html).show(0)
            $('.lihua').show(0)
            activeId.push(parseInt(setArr[i].id))
            }
        }
        var zhong = "http://app2.vote.cntv.cn/H5dati/JZJzj.jsp?cmd=zj&id="+activeId.join(',')+"&callback=cb"
        $('body').append('<script src="'+zhong+'"></script>')
    }

    function end(num){
        if(listH[num]+t[num]<=240){
            t[num]=0
            $('.nameList').eq(num).stop(true,true).css('top',t[num])
        }
        $('.nameList').eq(num).stop(true,true).animate({top:t[num]-25},500,function(){
            rotation_end(num)
            if(num==5){
                $('.active').eq(num).animate({opacity:1},2000,function(){
                    chou_end(num)
                })
            }    
        })
    }
}