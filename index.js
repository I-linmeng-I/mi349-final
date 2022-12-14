var exalUrl = "/data/lianjin.xlsx"
var dlc=5
var levelList = new Array()
var currentLevel = 1
var currentExp =0

window.οnlοad=load();

var totalCostNum=0
var totalGold=0

function load(){

    var req = new XMLHttpRequest();
	req.open("GET", "/data/level.xlsx", true);
	req.responseType = "arraybuffer";
	req.onload = function(e) {
	  var workbook = XLSX.read(req.response);
		list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

        list.map(res=>{
            var dataData=new Array()
            for(let sheet in res){
                dataData.push(res[sheet])
            }
            levelList.push(dataData)
        })
	};
	
	req.send();


    let list_domm = document.querySelector('.selectListBody')
	list_domm.innerHTML = ''
    
    exalToSheet()
}

function JobOnClick(job)
{
    exalUrl = `/data/${job}.xlsx`;

    let list_dom = document.querySelector('.selectListBody')
	list_dom.innerHTML = ''


    let CostNum = document.querySelector('.totalCost')
    totalCostNum = 0
    CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
    let GoldNum = document.querySelector('.totalGold')
    totalGold =0
    GoldNum.innerHTML=`获得金币数：${totalGold}`

    let levelNum = document.querySelector('.afterLevel')
    currentLevel =1
    levelNum.innerHTML=`等级:1`
    let expNum = document.querySelector('.afterExp')
    currentExp =0
    expNum.innerHTML=`经验值:0/300`
    let perNum = document.querySelector('.afterPer')
    perNum.innerHTML=`0%`
    document.querySelector('.inside-per').style.width="0%"
	
    exalToSheet()
}

function DlcOnClick(a)
{
    dlc =a;
	
    exalToSheet()
}

function exalToSheet(){
    let list = ''
	/* set up async GET request */
	var req = new XMLHttpRequest();
	req.open("GET", exalUrl, true);
	req.responseType = "arraybuffer";
	req.onload = function(e) {
	  var workbook = XLSX.read(req.response);
		list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[dlc]])


		let list_dom = document.querySelector('.missionListBody')
		list_dom.innerHTML = ''
        


		if(exalUrl != `/data/duantie.xlsx`){
            list_dom.appendChild(addTH((list[0])))
		    list.map(res=>{
			    list_dom.appendChild(addTD(res))
		    })
        }
        else{
            list_dom.appendChild(addTHZhujia((list[0])))
		    list.map(res=>{
			    list_dom.appendChild(addTDZhujia(res))
		    })
        }

        OnHqChange()
	};
	
	req.send();
}

function OnHqChange(){
    let HQChecked = !document.getElementById("HQCheck").checked
    let list_dom = document.querySelector(".missionListBody")
    

    let list_domm = document.querySelector(".selectListBody")

    if(HQChecked){
        for(let i=0;i<list_dom.rows.length;i++){
            let exp = Number(list_dom.rows[i].cells[3].innerHTML)
            list_dom.rows[i].cells[3].innerHTML = exp*2
    
    
            let gold = Number(list_dom.rows[i].cells[4].innerHTML)
            list_dom.rows[i].cells[4].innerHTML = gold*2
        }
        for(let i=0;i<list_domm.rows.length;i++){
            let exp = Number(list_domm.rows[i].cells[3].innerHTML)
            list_domm.rows[i].cells[3].innerHTML = exp*2
    
            
            let gold = Number(list_domm.rows[i].cells[4].innerHTML)
            list_domm.rows[i].cells[4].innerHTML = gold*2
        }
    }
    else{
        for(let i=0;i<list_dom.rows.length;i++){
            let exp = Number(list_dom.rows[i].cells[3].innerHTML)
            list_dom.rows[i].cells[3].innerHTML = exp/2
    
    
            let gold = Number(list_dom.rows[i].cells[4].innerHTML)
            list_dom.rows[i].cells[4].innerHTML = gold/2
        }
        for(let i=0;i<list_domm.rows.length;i++){
            let exp = Number(list_domm.rows[i].cells[3].innerHTML)
            list_domm.rows[i].cells[3].innerHTML = exp/2
    
            
            let gold = Number(list_domm.rows[i].cells[4].innerHTML)
            list_domm.rows[i].cells[4].innerHTML = gold/2
        }
    }

    calculateResult()
}

function addTH(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(sheet)
    }
    item = makeitem(data,dataData)

    return item
}
function addTD(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(data[sheet])
    }
    item = makeitem(data,dataData)

    return item
}

function makeitem(data,dataData){
    let item = document.createElement('tr')
    item.className = 'item'

    item.addEventListener('click',function(e){
        let item = document.createElement('tr')
        item.className = 'item'

        item.innerHTML +=  this.innerHTML

        item.cells[3].style.display = 'none'
        item.cells[4].style.display = 'none'


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectListBody')

        for(let i=0;i<list_domm.rows.length;i++){
            if(list_domm.rows[i].cells[1].innerHTML == item.cells[1].innerHTML)
            {
                list_domm.rows[i].cells[6].innerHTML++
                return
            }
        }

        item.addEventListener('click',function(e){
            if(this.cells[6].innerHTML>1){
                this.cells[6].innerHTML--
                
            }
            else{
                this.remove()
            }
            calculateResult()
        })

        list_domm.appendChild(item)
        calculateResult()
    },false)

    var level = ""
    var missionName = ""
    for(let i=0;i<dataData[2].length;i++){
        if(dataData[2][i]==']'){
            for(let j=1;j<i;j++){
                level+=dataData[2][j]
            }
            for(let z=i+1;z<dataData[2].length;z++){
                missionName+=dataData[2][z]
            }
        }
    }
    

    item.innerHTML +=  `<td class="box level">${level}</td>`
    item.innerHTML +=  `<td class="name">${missionName}</td>`
    item.innerHTML +=  `<td class="place">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box exp">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box gold">${dataData[0]}</td>`
    item.innerHTML +=  `<td class="box item">${dataData[4]}</td>`

    return item
}

function addTHZhujia(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(sheet)
    }

    let item = document.createElement('tr')
    item.className = 'item'
    
    item.addEventListener('click',function(e){
        let item = document.createElement('tr')
        item.className = 'item'

        item.innerHTML +=  this.innerHTML

        item.cells[3].style.display = 'none'
        item.cells[4].style.display = 'none'


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectListBody')

        for(let i=0;i<list_domm.rows.length;i++){
            if(list_domm.rows[i].cells[1].innerHTML == item.cells[1].innerHTML)
            {
                list_domm.rows[i].cells[6].innerHTML++
                return
            }
        }

        item.addEventListener('click',function(e){
            if(this.cells[6].innerHTML>1){
                this.cells[6].innerHTML--
                
            }
            else{
                this.remove()
            }
            calculateResult()
        })

        list_domm.appendChild(item)
        calculateResult()
    },false)

    var level = ""
    var missionName = ""
    for(let i=0;i<dataData[0].length;i++){
        if(dataData[0][i]==']'){
            for(let j=1;j<i;j++){
                level+=dataData[0][j]
            }
            for(let z=i+1;z<dataData[0].length;z++){
                missionName+=dataData[0][z]
            }
        }
    }
    

    item.innerHTML +=  `<td class="box level">${level}</td>`
    item.innerHTML +=  `<td class="name">${missionName}</td>`
    item.innerHTML +=  `<td class="place">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box exp">${dataData[2]}</td>`
    item.innerHTML +=  `<td class="box gold">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box item">${dataData[4]}</td>`

    return item
}

function addTDZhujia(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(data[sheet])
    }
    let item = document.createElement('tr')
    item.className = 'item'
    
    item.addEventListener('click',function(e){
        let item = document.createElement('tr')
        item.className = 'item'

        item.innerHTML +=  this.innerHTML

        item.cells[3].style.display = 'none'
        item.cells[4].style.display = 'none'


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectListBody')

        for(let i=0;i<list_domm.rows.length;i++){
            if(list_domm.rows[i].cells[1].innerHTML == item.cells[1].innerHTML)
            {
                list_domm.rows[i].cells[6].innerHTML++
                return
            }
        }

        item.addEventListener('click',function(e){
            if(this.cells[6].innerHTML>1){
                this.cells[6].innerHTML--
                
            }
            else{
                this.remove()
            }
            calculateResult()
        })

        list_domm.appendChild(item)
        calculateResult()
    },false)

    var level = ""
    var missionName = ""
    for(let i=0;i<dataData[0].length;i++){
        if(dataData[0][i]==']'){
            for(let j=1;j<i;j++){
                level+=dataData[0][j]
            }
            for(let z=i+1;z<dataData[0].length;z++){
                missionName+=dataData[0][z]
            }
        }
    }
    

    item.innerHTML +=  `<td class="box level">${level}</td>`
    item.innerHTML +=  `<td class="name">${missionName}</td>`
    item.innerHTML +=  `<td class="place">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box exp">${dataData[2]}</td>`
    item.innerHTML +=  `<td class="box gold">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box item">${dataData[4]}</td>`

    return item
}

function calculateResult(){
    let exp =0

    currentLevel =1
    totalGold =0 
    totalCostNum =0
    
    let list_domm = document.querySelector(".selectListBody")

    for(let i=0;i<list_domm.rows.length;i++){
        let item = list_domm.rows[i]
        
        exp += Number(item.cells[3].innerHTML)
        
    
        totalCostNum++
        
        
        if(item.cells[5].innerHTML.indexOf('（3次）')>-1){
            totalGold += Number(item.cells[4].innerHTML)
            totalGold += Number(item.cells[4].innerHTML)
            totalGold += Number(item.cells[4].innerHTML)
        }
        else{
            totalGold += Number(item.cells[4].innerHTML)
        }
    }
    for(let i=currentLevel-1;i<levelList.length;i++){
        if(exp>=levelList[i][1]){
            exp -= levelList[i][1]
            currentLevel++ 
        }
        else{
            break
        }
    }

    let PerNum = document.querySelector('.afterPer')
    let per =exp/levelList[currentLevel-1][1]*100
    let perbar = document.querySelector('.inside-per')
    perbar.style.width = `${per}%`
    PerNum.innerHTML = `${per.toFixed(2)}%`

    let LevelNum = document.querySelector('.afterLevel')
    LevelNum.innerHTML = `等级:${currentLevel}`

    let ExpNum = document.querySelector('.afterExp')
    ExpNum.innerHTML = `经验值:${exp}/${levelList[currentLevel-1][1]}`

    let CostNum = document.querySelector('.totalCost')
    CostNum.innerHTML=`消耗理符数量：${totalCostNum}`

    let GoldNum = document.querySelector('.totalGold')
    GoldNum.innerHTML=`获得金币数：${totalGold}`

}