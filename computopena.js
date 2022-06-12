const prompt = require("prompt-sync")({ sigint: true })
let calculoDias = () =>{
    let fecha1 = 0
    let fecha2 = 0
    let ingreso = "s"
    for(let i = 0; ingreso === "s"; i++){
        var aFecha1 = prompt("Ingrese la fecha de detención(dd/mm/aaaa): ").split('/');
        console.log(aFecha1)
        aFecha1[0] = Number(aFecha1[0]);
        aFecha1[1] = Number(aFecha1[1]*30);
        aFecha1[2] = Number(aFecha1[2]*360)
        console.log(aFecha1)
        fecha1 +=aFecha1.reduce((a,b) => a+b, 0)
        console.log(fecha1)
        var aFecha2 = prompt("Ingrese la fecha de libertad, sentencia o computo(dd/mm/aaaa): ").split('/');
        aFecha2[0] = Number(aFecha2[0]);
        aFecha2[1] = Number(aFecha2[1]*30);
        aFecha2[2] = Number(aFecha2[2]*360)
        console.log(aFecha2)
        fecha2 += aFecha2.reduce((a,b) => a+b, 0)
        console.log(fecha2)
        ingreso = prompt("Desea agregar otro periodo de detención (s/n)?: ")
        while (ingreso != "n" && ingreso != "s"){
            console.log("Valor incorrecto, por favor ingrese s/n")
            ingreso = prompt("Desea agregar otro periodo de detención (s/n)?: ")
        }
    }
        
        var dias = fecha2 - fecha1;
        if (dias === 0){
            dias = 1
        }
    if (dias % 360 === 0){
        detencion = `${Math.floor(dias/360)} año/s`
    } else if (dias > 360 && dias % 30 === 0){
        detencion = `${Math.floor(dias/360)} año/s y ${Math.floor((dias%360)/30)} mes/meses`
    } else if (dias > 360){
        detencion = `${Math.floor(dias/360)} año/s, ${Math.floor((dias%360)/30)} mes/meses y ${(dias%360)%30} días`
    } else if (dias > 30){
        detencion = `${Math.floor(dias/30)} mes/meses y ${dias%30} días`
    } else if (dias % 30 === 0){
        detencion = `${dias/30} mes/meses`;
    } else if (dias < 30){
        detencion = `${dias} días`;
    }
    console.log(`son ${detencion} de detención`);
    let condena = prompt("Ingrese el monto de la condena(días/meses/año): ").split("/")
    condena[0] = Number(condena[0]);
    condena[1] = Number(condena[1]*30);
    condena[2] = Number(condena[2]*360);
    condena = condena.reduce((a,b) => a+b, 0);
    let resto = condena - dias
    if (resto % 360 === 0){
        condena = []
        condena[0] = Math.floor(resto/360)
        condena[1] = 0
        condena[2] = 0
        pendiente = `${condena[0]} año/s`
    } else if (resto > 360 && resto % 30 === 0){
        condena = []
        condena[0] = Math.floor(resto/360)
        condena[1] = Math.floor((resto%360)/30)
        condena[2] = 0
        pendiente = `${condena[0]} año/s y ${condena[1]} mes/meses`
    } else if (resto > 360){
        condena = []
        condena[0] = Math.floor(resto/360)
        condena[1] = Math.floor((resto%360)/30)
        condena[2] = (resto%360)%30
        pendiente = `${condena[0]} año/s, ${condena[1]} mes/meses y ${condena[2]} días`
    } else if (resto > 30){
        condena = []
        condena[0] = 0
        condena[1] = Math.floor(resto/30)
        condena[2] = resto%30
        pendiente = `${condena[1]} mes/meses y ${condena[2]} días`
    } else if (resto % 30 === 0){
        condena = []
        condena[0] = 0
        condena[1] = resto/30
        condena[2] = 0
        pendiente = `${condena[1]} mes/meses`;
    } else if (resto < 30){
        condena = []
        condena[0] = 0
        condena[1] = 0
        condena[2] = resto
        pendiente = `${condena[2]} días`;
    } 
    console.log(`quedan cumplir ${pendiente} de detención`);

    let fechaActual = prompt("Ingrese la fecha actual (dd/mm/aaaa): ").split("/")
    fechaActual[0] = Number(fechaActual[0]);
    fechaActual[1] = Number(fechaActual[1]);
    fechaActual[2] = Number(fechaActual[2]);

    cumplimiento = []
    cumplimiento[0] = condena[2] + fechaActual[0]
    cumplimiento[1] = condena[1] + fechaActual[1]
    cumplimiento[2] = condena[0] + fechaActual[2]
    if (cumplimiento[0] > 31){
        cumplimiento[1]++
        cumplimiento[0] -= 30
    }
    if (cumplimiento[1] > 12){
        cumplimiento[2]++
        cumplimiento[1] -= 12
    }

    if((cumplimiento[1] != 1 && cumplimiento[1] != 3 && cumplimiento[1] != 5 && cumplimiento[1] != 7 && cumplimiento[1] != 8 && cumplimiento[1] != 10 && cumplimiento[1] != 12) && cumplimiento[0] > 30){
        cumplimiento[1]++
        cumplimiento[0] -= 30
    }
    if(cumplimiento[0] > 28 && cumplimiento[1] == 2 && cumplimiento[2] % 4 != 0){
        cumplimiento[1]++
        cumplimiento[0] -= 28
    }
    if(cumplimiento[0] > 29 && cumplimiento[1] == 2 && cumplimiento[2] % 4 == 0){
        cumplimiento[1]++
        cumplimiento[0] -= 29
    }
        console.log(`la pena se agota el ${cumplimiento[0]}/${cumplimiento[1]}/${cumplimiento[2]}`)
}
    

calculoDias();
