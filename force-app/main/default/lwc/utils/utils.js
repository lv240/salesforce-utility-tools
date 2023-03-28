export function exportCSVFile(tableColumns, totalData, fileTitle){
    if(!totalData || !totalData.length){
        return null
    }
    const jsonObject = JSON.stringify(totalData)
    const result = convertToCSV(jsonObject, tableColumns)
    if(result === null) return
    const blob = new Blob([result])
    const exportedFilename = fileTitle ? fileTitle+'.csv' :'export.csv'
    if(navigator.msSaveBlob){
        navigator.msSaveBlob(blob, exportedFilename)
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)){
        const link = window.document.createElement('a')
        link.href='data:text/csv;charset=utf-8,' + encodeURI(result);
        link.target="_blank"
        link.download=exportedFilename
        link.click()
    } else {
        const link = document.createElement("a")
        if(link.download !== undefined){
            const url = URL.createObjectURL(blob)
            link.setAttribute("href", url)
            link.setAttribute("download", exportedFilename)
            link.style.visibility='hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
    

}
function convertToCSV(objArray, tableColumns){
    const columnDelimiter = ','
    const lineDelimiter = '\r\n'
    const actualHeaderKey = Object.keys(tableColumns[0])
    console.log('actualHeaderKey',actualHeaderKey)
    for(let shoehead in tableColumns){
        console.log('shoehead',tableColumns[0][shoehead])
    }
    var headerToShow = Object.values(tableColumns[0])
    console.log('headerToShow',headerToShow) 
    let str = ''
    str+=headerToShow.join(columnDelimiter) 
    console.log('str',str);
    str+=lineDelimiter
    console.log('str1',str);
    const data = typeof objArray !=='object' ? JSON.parse(objArray):objArray
    console.log('data',data);
for(let abc in data){
    var bcd = data[abc];
    console.log('abcd',bcd);
bcd.forEach(obj=>{
    console.log(obj)
    console.log(obj.cellValue)
        let line = ''
       /*  for(let actualhead in actualHeaderKey){
            var headactual = actualHeaderKey[actualhead].label;
            console.log('headactual',headactual)
        } */
        console.log('actualHeaderKey',actualHeaderKey);
        actualHeaderKey.forEach(key=>{
            console.log('key>>',key)
            if(line !=''){
                line+=columnDelimiter
                console.log('line',line);
            }
            let strItem = obj.cellValue+''
            console.log("strItem", strItem)
            line+=strItem? strItem.replace(/,/g, ''):strItem
            console.log("line>>", line)
        })
        str+=line+lineDelimiter
    })
}
    console.log("str5", str)
    return str
}