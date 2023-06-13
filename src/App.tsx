
import {FormEvent, useEffect,useState,useRef} from 'react'
import './App.css'
import { datosTareas,EntidadTarea } from './data'

function App() {

  const [renderUI,setRenderUI] = useState<boolean>();
  const [textButton,setTextbutton] = useState("Crear");
  const [IdTarea,setIdTarea] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const input = useRef<HTMLInputElement>(null);

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
  function getValuesTask(id: string){
   
    let res = BuscarTareaId(id)
  
    if (input.current !== null && res?.Titulo != null && textarea.current && res?.Descripcion) {
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
      
      if (input.current !== null && res?.Titulo != null && textarea.current != null && res?.Descripcion) {
        res.Titulo = input.current.value
        res.Descripcion = textarea.current.value 
        setRenderUI(true)
        setTextbutton("Crear");
      }     
     }
  }

  //metodo eliminar tarea
  function eliminarTarea(indexTarea: number):void{
     datosTareas.splice(indexTarea,1)
     setRenderUI(true)
  }

  // metodo buscar tarea por ID
 function BuscarTareaId(id: string): EntidadTarea | null {  
  const tareaEncontrada = datosTareas.find(tarea => tarea.Id === id);
  
  if(tareaEncontrada == null) return null;
  return tareaEncontrada
}

  return (
    <>
      <div className='app'>
        <main className='main'>
        <form className='d-flex gap-2 card' onSubmit={crearTarea}>
        <h2 className='card-header'>Nueva</h2>
            <div className=''>
                <input ref={input} name='tareaName' className='form-control' type="text" placeholder='Titulo' />
            </div>
            <div>
                <textarea ref={textarea} name="tareaDescripcion" className='form-control' placeholder='Descripcion' cols={40} rows={7}></textarea>
            </div>
             <button className='btn btn-outline-success' type='submit'>{textButton}</button>
        </form>
        <section className='col-6 section_tareas'>
           <div>
           <h4 className='card-header'>Lista de Tareas</h4>
           <span>tareas: ({datosTareas.length})</span>
            <ul id='content' className='d-flex flex-column gap-3 p-3'>
               {
                datosTareas.map((t,i) => (
                  <li key={i}>
                     <div className='card d-flex justify-content-center align-items-center'>
                         <span className='card-header'>{t.Titulo}</span>
                         <p className='text_descripcion'>{t.Descripcion}</p>
                     <div className='d-flex gap-2'>
                        <button type='button' onClick={() => getValuesTask(t.Id)} value={t.Id} className='btn btn-secondary'>Editar</button>
                        <button onClick={() => eliminarTarea(i)} value={i} className='btn btn-danger'>Eliminar</button>
                     </div>
                     </div>
                  </li>
                ))
               }
            </ul>
            <span className={datosTareas.length > 0 ? "" : 'bg-secondary rounded-pill p-2 text-white'}>{datosTareas.length == 0 ? "sin tareas" : ""}</span>
           </div>
        </section>
        </main>
    </div>
        <footer className='footer'>
           <span>By: Leo Castillo</span>
        </footer>
    </>
  )
}

export default App
