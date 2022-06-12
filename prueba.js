var detencion = 12
dias = 420

if (dias > 360 && dias % 30 === 0){
    console.log(Math.floor(dias/360))
    console.log((dias%360)/30)
    detencion = `${Math.floor(dias/360)} año/s y ${Math.floor((dias%360)/30)} mes/meses`

}

console.log(detencion)