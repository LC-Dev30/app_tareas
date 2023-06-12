
import {FormEvent, useEffect,useState,useRef} from 'react'
import './App.css'
import { datosTareas,EntidadTarea } from './data'

function App() {

  const [renderUI,setRenderUI] = useState<boolean>();
  const [textButton,setTextbutton] = useState("Crear");
  const [IdTarea,setIdTarea] = useState("");
  const textarea = useRef<HTMLTextAreaElement>();
  const input = useRef<HTMLInputElement>();

  useEffect(() => {
    setRenderUI(false)

    if(input.current?.value.length && textarea.current?.value.length){
        input.current.value = ""
        textarea.current.value = "";
    }
   
  },[renderUI])
  
  //metodo crear tarea
  function crearTarea(e:FormEvent){
    e.preventDefault();
    
    if(textButton === 'Editar'){
      EditarTarea();
      return;
    }

    const formdata = new FormData(e.currentTarget as HTMLFormElement);
    
    const dataObj:EntidadTarea = {
      Id:crypto.randomUUID(),
      Titulo: formdata.get("tareaName") as string,
      Descripcion:formdata.get("tareaDescripcion") as string
    }

     datosTareas.unshift(dataObj)
     setRenderUI(true)
  }

//metodo optener valores de input para editar tarea
  function getValuesTask(e: MouseEvent){
    const valueBoton = e.target as HTMLButtonElement;
   
    let res = BuscarTareaId(valueBoton.value)
  
    if (input.current !== undefined && res?.Titulo != null && textarea.current && res?.Descripcion) {
      input.current.value = res?.Titulo
      textarea.current.value = res.Descripcion
      setIdTarea(res.Id)
      setTextbutton("Editar");
    }
  }

//metodo Editar tarea 
  function EditarTarea(): void{
     if(textButton == 'Editar'){
      const res = BuscarTareaId(IdTarea);
      
      if (input.current !== undefined && res?.Titulo != null && textarea.current && res?.Descripcion) {
        res.Titulo = input.current.value
        res.Descripcion = textarea.current.value 
        setRenderUI(true)
        setTextbutton("Crear");
      }     
     }
  }

  //metodo eliminar tarea
  function eliminarTarea(e: MouseEvent){
     const indexTarea = e.target as HTMLButtonElement;
     datosTareas.splice(parseInt(indexTarea.value),1)
     setRenderUI(true)
  }

  // metodo buscar tarea por ID
 function BuscarTareaId(id: string): EntidadTarea | null {  
  const tareaEncontrada = datosTareas.find(tarea => tarea.Id === id);
  
  if(tareaEncontrada == null) return null;
  return tareaEncontrada
}

  return (
    <div className='d-flex col-12'>
        <form className='d-flex gap-2 card col-6' onSubmit={crearTarea}>
        <h2 className=''>Nueva</h2>
            <div className=''>
                <input ref={input} name='tareaName' className='form-control' type="text" placeholder='Titulo' />
            </div>
            <div>
                <textarea ref={textarea} name="tareaDescripcion" className='form-control' placeholder='Descripcion' cols={40} rows={7}></textarea>
            </div>
             <button className='btn btn-success' type='submit'>{textButton}</button>
        </form>
        <section className='col-6'>
           <h4>Lista de Tareas</h4>
           <div className='section_tareas'>
            <ul className='d-flex flex-column gap-3 p-3'>
               {
                datosTareas.map((t,i) => (
                  <li key={i}>
                     <div className='card d-flex justify-content-center align-items-center'>
                         <span className='card-header'>{t.Titulo}</span>
                         <p>{t.Descripcion}</p>
                     <div className='d-flex gap-2'>
                        <button type='button' onClick={getValuesTask} value={t.Id} className='btn btn-secondary'>Editar</button>
                        <button onClick={eliminarTarea} value={i} className='btn btn-danger'>Eliminar</button>
                     </div>
                     </div>
                  </li>
                ))
               }
            </ul>
            <span>{datosTareas.length == 0 ? "sin tareas!" : ""}</span>
           </div>
        </section>
    </div>
  )
}

export default App
