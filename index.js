var exalUrl = "/data/lianjin.xlsx"
var dlc=5
var levelList = new Array()

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

        console.log(list[1])
	};
	
	req.send();


    let list_domm = document.querySelector('.selectList')
	list_domm.innerHTML = ''
        
    let itemm = document.createElement('tr')
	itemm.className = 'item'
    itemm.innerHTML += `
    <th class="box level">等级</th>
    <th class="name">理符名称</th>
    <th class="place">提交位置</th>
    <th class="box item">提交道具</th>
    <th class="box missionNum">数量</th>
    `
    list_domm.appendChild(itemm)
    exalToSheet()
}

function JobOnClick(job)
{
    exalUrl = `/data/${job}.xlsx`;

    let list_domm = document.querySelector('.selectList')
	list_domm.innerHTML = ''
        
    let itemm = document.createElement('tr')
	itemm.className = 'item'
    itemm.innerHTML += `
    <th class="box level">等级</th>
    <th class="name">理符名称</th>
    <th class="place">提交位置</th>
    <th class="box item">提交道具</th>
    <th class="box missionNum">数量</th>
    `
    list_domm.appendChild(itemm)
    console.log(1)

    let CostNum = document.querySelector('.totalCost')
    totalCostNum = 0
    CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
    let GoldNum = document.querySelector('.totalGold')
    totalGold =0
    GoldNum.innerHTML=`消耗理符数量：${totalGold}`
	
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


		let list_dom = document.querySelector('.missionList')
		list_dom.innerHTML = ''
        
        let item = document.createElement('tr')
		item.className = 'item'
        item.innerHTML += `
        <th class="box level">等级</th>
        <th class="name">理符名称</th>
        <th class="place">提交位置</th>
        <th class="box exp">经验</th>
        <th class="box gold">奖励金币</th>
        <th class="box item">提交道具</th>
        `
        list_dom.appendChild(item)


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
	};
	
	req.send();
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

        let CostNum = document.querySelector('.totalCost')
        totalCostNum++
        CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
        let GoldNum = document.querySelector('.totalGold')
        
        if(item.cells[5].innerHTML.indexOf('（3次）')>-1){
            totalGold += Number(item.cells[4].innerHTML)
            totalGold += Number(item.cells[4].innerHTML)
            totalGold += Number(item.cells[4].innerHTML)
            GoldNum.innerHTML=`获得金币数：${totalGold}`
        }
        else{
            totalGold += Number(item.cells[4].innerHTML)
            GoldNum.innerHTML=`获得金币数：${totalGold}`
        }

        item.cells[3].style.display = 'none'
        item.cells[4].style.display = 'none'


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectList')

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
            let CostNum = document.querySelector('.totalCost')
            totalCostNum--
            CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
            let GoldNum = document.querySelector('.totalGold')
            if(item.cells[5].innerHTML.indexOf('（3次）')>-1){
                totalGold -= Number(item.cells[4].innerHTML)
                totalGold -= Number(item.cells[4].innerHTML)
                totalGold -= Number(item.cells[4].innerHTML)
                GoldNum.innerHTML=`获得金币数：${totalGold}`
            }
            else{
                totalGold -= Number(item.cells[4].innerHTML)
                GoldNum.innerHTML=`获得金币数：${totalGold}`
            }
        })

        list_domm.appendChild(item)
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

        let CostNum = document.querySelector('.totalCost')
        totalCostNum++
        CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
        let GoldNum = document.querySelector('.totalGold')
        totalGold += Number(item.cells[4].innerHTML)
        GoldNum.innerHTML=`消耗理符数量：${totalGold}`

        item.cells[3].style.display = 'none'
        item.cells[4].style.display = 'none'


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectList')

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
            let CostNum = document.querySelector('.totalCost')
            totalCostNum--
            CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
            let GoldNum = document.querySelector('.totalGold')
            totalGold -= Number(this.cells[4].innerHTML)
            GoldNum.innerHTML=`消耗理符数量：${totalGold}`
        })

        list_domm.appendChild(item)
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

        let CostNum = document.querySelector('.totalCost')
        totalCostNum++
        CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
        let GoldNum = document.querySelector('.totalGold')
        totalGold += Number(item.cells[4].innerHTML)
        GoldNum.innerHTML=`消耗理符数量：${totalGold}`

        item.cells[3].style.display = 'none'
        item.cells[4].style.display = 'none'


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectList')

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
            let CostNum = document.querySelector('.totalCost')
            totalCostNum--
            CostNum.innerHTML=`消耗理符数量：${totalCostNum}`
            let GoldNum = document.querySelector('.totalGold')
            totalGold -= Number(this.cells[4].innerHTML)
            GoldNum.innerHTML=`消耗理符数量：${totalGold}`
        })

        list_domm.appendChild(item)
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

