import './Style.css'
import './Input.css'
import { useState,useEffect} from 'react'


function App() {

  const [fdetencion, setFdetencion] = useState("dd/mm/aaaa")
  const [fliberacion, setFliberacion] = useState("dd/mm/aaaa")
  const [diasdetenido, setDiasdetenido] = useState(0)
  const [error, setError] = useState([false,"Todos los campos son obligatorios"])

  var aFecha1
  var fecha1
  var aFecha2
  var fecha2
  var fecha3

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("Enviando Info")
    if (fliberacion == "dd/mm/aaaa" || fdetencion == "dd/mm/aaaa" || fliberacion == "" || fdetencion == "" ) {
      setError([true,"Todos los campos son obligatorios."])
    } else {
      
      aFecha1 = fdetencion.split('-')
      aFecha1[0] = Number(aFecha1[0]*360)
      aFecha1[1] = Number(aFecha1[1]*30)
      aFecha1[2] = Number(aFecha1[2])
      console.log(aFecha1)
      fecha1 = aFecha1.reduce((a,b) => a+b, 0)
  
      aFecha2 = fliberacion.split('-')
      console.log(aFecha1)
      aFecha2[0] = Number(aFecha2[0]*360);
      aFecha2[1] = Number(aFecha2[1]*30);
      aFecha2[2] = Number(aFecha2[2])
      fecha2 = aFecha2.reduce((a,b) => a+b, 0)
      console.log(fecha1,fecha2)
      fecha3 = fecha2-fecha1
      console.log(fecha3)
      if (fecha3<=0) {
        setError([true,"La fecha de liberación no puede ser igual o menor a la de detención."])
      }else{

        setDiasdetenido( diasdetenido + fecha3)
        setFdetencion("dd/mm/aaaa")
        setFliberacion("dd/mm/aaaa")
        setError(false)

      }
    }

  }

  const handleMas = (e) => {
    e.preventDefault()
    setDiasdetenido(diasdetenido+1)
  }
  const handleMenos = (e) => {
    e.preventDefault()
    setDiasdetenido(diasdetenido>0?diasdetenido-1:diasdetenido)
  }

  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className='font-black text-7xl text-indigo-600 w-full flex justify-center text-shadow text-center'>
        Sistema Computo De Pena
      </div>
      <div className='flex justify-center mt-4'>

        <form className='w-96 shadow-xl text-center p-3 mt-5 ml-5' onSubmit={handleSubmit}>


          <div className={error[0]?'border-l-4 border-red-800 h-15 font-bold w-full flex justify-center items-center text-black mt-3 mb-3 bg-red-300':"hidden  :"}>{error[1]}</div>

          <label htmlFor='fecha-detencion' className='font-bold text-center text-xl '>Ingrese la Fecha de Detención: </label>
          <input onChange={e=>setFdetencion(e.target.value)} value={fdetencion} type="date" id='fecha-detencion' className='w-full h-10 text-xl border-2 border-indigo-600 rounded-md mt-3 mb-3'>
          </input>

          <label htmlFor='fecha-liberacion' className='font-bold text-center text-xl '>Ingrese la fecha de libertad, sentencia o computo: </label>
          <input onChange={e=>setFliberacion(e.target.value)} value={fliberacion} type="date" id='fecha-liberacion' className='w-full h-10 text-xl border-2 border-indigo-600 rounded-md mt-3'>
          </input>

          <input type="submit" value="Acumular fechas" className="bg-indigo-600 w-full h-8 rounded-md mt-5 font-bold text-white uppercase">
          </input>
          
          <div className='mt-3 bg-white font-bold rounded-md p-2 text-indigo-600 shadow-xl'>
            Dias De Detención Acumulados: {diasdetenido}
          </div>
          <div className='mt-3 flex justify-around'>
            <button onClick={(e)=>handleMas(e)} className="bg-indigo-600 h-7 w-7 rounded-md font-bold text-xl text-white text-center "><span className='relative bottom-0.5'>+</span></button>
            <button onClick={(e)=>handleMenos(e)} className="bg-indigo-600 h-7 w-7 rounded-md font-bold text-xl text-white text-center "><span className='relative bottom-0.5'>-</span></button>
            <button onClick={(e)=>handleMenos(e)} className="bg-indigo-600 h-7 w-7 rounded-md font-bold text-xl text-white text-center "><span className='relative bottom-0.5'>-</span></button>

          </div>
          

        </form>

        <div>

        </div>

      </div>
    </div>
  )
}

export default App
