const {useState, useEffect} = React;
    
function formatear(valor){
return (new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", currencyDisplay:"narrowSymbol",maximumFractionDigits: 0,  }).format(valor))
}

function App(){
    const [salario, setSalario] = useState(0);
    const [salarioSinAportes, setSalarioSinAportes] = useState(0);
    const [salarioQuincenal, setSalarioQuincenal] = useState(0);
    const [recargoNocturno, setRecargoNocturno] = useState(0);
    const [recargoDominical, setRecargoDominical] = useState(0);
    const [totalHorasExtra, setTotalHorasExtra] = useState(0);
    const [totalBono, setTotalBono] = useState(0);
    const [salarioBase, setSalarioBase] = useState(0);
    const [horasSemanales, setHorasSemanales] = useState(40);
    const [valorHora, setValorHora] = useState(0);
    const [turno, setTurno] = useState("am");
    const [diasDescanso, setDiasDescanso] = useState("s-d")
    const [horasExtra, setHorasExtra] = useState(0);
    const [bono, setBono] = useState(0);
    const [totalDeducciones, setTotalDeducciones] = useState(0);

    useEffect(()=> {

        if(salarioBase <0 || horasExtra <0 ) return;

        let valorHoraCalculado = 0;
        let valorRecargoNocturno = 0;
        let valorRecargoDomincal = 0;
        let valorHorasExtra = 0;
        let valorBono = 0;
        let nuevoSalario = 0;

        valorHoraCalculado = salarioBase/30/8
        setValorHora(valorHoraCalculado);

        if (turno === 'on') {
        valorRecargoNocturno = valorHora*7.5*20*0.35
        }
        setRecargoNocturno(valorRecargoNocturno);

        if (diasDescanso === 'v-s') {
        valorRecargoDomincal = valorHora*3.5*4*0.75
        } else if (diasDescanso === 'd-l') {
        valorRecargoDomincal = valorHora*4.5*4*0.75
        } else if (diasDescanso === 'otros') {
        valorRecargoDomincal = valorHora*8*4*0.75
        }
        setRecargoDominical(valorRecargoDomincal);

        valorHorasExtra = valorHora*1.25*horasExtra*4
        setTotalHorasExtra(valorHorasExtra);

        if (bono === 'bajo') {
        valorBono = 284250
        } else if (bono === 'medio') {
        valorBono = 322150
        } else if (bono === 'alto') {
        valorBono = 379500
        }
        setTotalBono(valorBono);

        nuevoSalario = salarioBase + valorRecargoNocturno + valorRecargoDomincal +valorHorasExtra +valorBono

        setSalario(nuevoSalario)
        setSalarioSinAportes(nuevoSalario*0.92)
        setSalarioQuincenal(nuevoSalario*0.92/2)
        setTotalDeducciones(nuevoSalario*0.08)

    }, [salarioBase, horasSemanales, bono, turno, diasDescanso, horasExtra, recargoNocturno, recargoDominical, totalHorasExtra, totalBono, valorHora])

    return (
    <div className="max-w-5xl bg-neutral-800 text-neutral-50 h-full m-auto flex flex-col justify-center items-center pt-10 pb-16 px-4 md:px-10 lg:px-24">
        <h1 className="text-3xl lg:text-4xl font-bold pb-6 lg:pb-12">💸 Calcula tu salario</h1>
        <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="card-col lg:col-span-2">  
            <label for="salario-base">💰 Salario base</label>
            <input className={ salarioBase <0  ? "styledInput bg-red-900 border-red-500 border-solid border-4": "styledInput" } onKeyUp={ (e)=> {
            e.target.value !== "" ?  setSalarioBase(parseInt(e.target.value)) : setSalarioBase(0) }  
            }
                type="number" name="salario-base" id="salario-base" min="0" placeholder="Ej. $2.000.000"/>
            </div>


            <div className="card-col lg:col-span-2">
            <label for="horasExtra"> ⏲️ Horas extra (semanal) </label>
            <input className={horasExtra < 0 ? "styledInput bg-red-900 border-red-500 border-solid border-4": "styledInput"} onKeyUp={ (e)=> e.target.value != '' ? setHorasExtra(parseInt(e.target.value)) : setHorasExtra(0) } type="number" name="horasExtra" id="horasExtra" placeholder="Ej. 4"/>
            </div>
        
            <div className="card-col">
            <label className="" for="horas-semanales">📝 Horas semanales</label>
            <input onKeyUp={ (e)=>setHorasSemanales(parseInt(e.target.value)) } type="number" name="horas-semanales" id="horas-semanales" disabled value="40" />
            </div>
            <div className="card-col" onChange={ (e)=>setTurno(e.target.value) }>
            <label for="turno">🌤️ Turno</label>
            <select name="turno" id="turno" className="styledInput">
                <option value="am">AM</option>  
                <option value="pm">PM</option>
                <option value="on">ON </option>
            </select>
            </div>

            <div className="card-col lg:col-span-2" onChange={ (e)=>setDiasDescanso(e.target.value) }>
            <label for="diasDescanso" >📅 Días de descanso</label>
            <select name="diasDescanso" id="diasDescanso" className="styledInput">
                <option value="otros">Otros</option>
                <option value="v-s">Viernes y sábado</option>
                <option value="d-l">Domingo y lunes</option>
                <option selected value="s-d">Sábado y domingo</option>
            </select>
            </div>

            <div className="card-col lg:col-span-2" onChange={ (e)=> setBono(e.target.value)}>
            <label for="bono">🤑 Bonificación del mes</label>
            <select name="bono" id="bono" className="styledInput">
                <option value="0">No bonifiqué :c</option>
                <option value="bajo">Piso 1 - $284.250</option>
                <option value="medio">Piso 2 - $322.150</option>
                <option value="alto">Piso 3 - $379.500</option>  
            </select>
            </div>
        

            <div className="card-resultados lg:col-span-2 bg-cyan-900 opacity-90">
            <div>
                <h2 className="text-lg font-medium ">Mensual bruto</h2>
                <p className="text-xs text-neutral-400">Salario total antes de descuentos</p>
            </div>

            <p className="text-3xl lg:text-4xl font-semibold">{formatear(salario)}</p>  
            </div>

            <div className="resultados lg:col-span-3 text-neutral-100 opacity-90">
            <div className="flex justify-between">
                <p>Valor hora ordinaria: </p>
                <p>{formatear(valorHora)}</p>
            </div>

            <div class="flex justify-between">
                <p>Recargo nocturno: </p>
                <p>{formatear(recargoNocturno)}</p>
            </div>

            <div class="flex justify-between">
                <p>Recargo dominical: </p>
                <p>{formatear(recargoDominical)}</p>
            </div>

            <div class="flex justify-between">
                <p>Total por bono: </p>
                <p>{formatear(totalBono)}</p>
            </div>

            <div class="flex justify-between">
                <p>Total por horas extra: </p>
                <p>{formatear(totalHorasExtra)}</p>
            </div>
            </div>

            <div class="card-resultados lg:col-span-3 bg-teal-700">
            <div>
                <h2 className="text-lg font-medium ">Mensual neto</h2>
                <p className="text-xs text-neutral-300 opacity-90">Luego de restar salud y pensión</p>
            </div>

            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <p className="text-3xl md:text-4xl lg:text-5xl font-semibold ">{formatear(salarioSinAportes)}</p>
                <div className="flex gap-1 lg:gap-0 lg:flex-col text-xs text-neutral-200 opacity-90">  
                <p>🚨 Total deducciones </p>
                <p>{formatear(totalDeducciones)}</p>
                </div>
            </div>
            </div>

            <div className="card-resultados lg:col-span-2 bg-cyan-900 opacity-90">
            <div>
                <h2 className="text-lg font-medium ">Aproximado quincenal</h2>
                <p className="text-xs text-neutral-400">Puede variar, recuerda que los bonos se pagan a final de mes</p>
            </div>

            <p className=" text-3xl lg:text-4xl font-semibold">{formatear(salarioQuincenal)}</p>
            </div>

            </div>
        </form>
    </div>
    )
}

    
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <App />
</React.StrictMode>
)

