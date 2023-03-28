export function exportCSVFile(objList, totalData, fileTitle){
    if(!totalData || !totalData.length){
        return null
    }
    const jsonObject = JSON.stringify(totalData)
    const result = convertToCSV(jsonObject, objList)
    console.log('result',result)
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
function convertToCSV(objArray, objList){
    const columnDelimiter = ','
    const lineDelimiter = '\r\n'
    const actualHeaderKey = Object.keys(objList)
    console.log('actualHeaderKey',actualHeaderKey)
    const headerToShow = Object.values(objList) 
    console.log('headerToShow',headerToShow)
    let str = ''
    str+=headerToShow.join(columnDelimiter) 
    str+=lineDelimiter
    const data = typeof objArray !=='object' ? JSON.parse(objArray):objArray

    data.forEach(obj=>{
        console.log(obj)

        let line = ''
        actualHeaderKey.forEach(key=>{
            if(line !=''){
                line+=columnDelimiter
            }
            let strItem = obj[key]+''
            line+=strItem? strItem.replace(/,/g, ''):strItem
        })
        str+=line+lineDelimiter
    })
    console.log("str", str)
    return str
}