import React from 'react'
import "./Filters.css"

function Filters() {
  return (
        <div className="Filters">
            <p className="filters-tit">FILTROS</p>
            <div className="filters-content" >
                <select id="inputState" className="form-control" name="tipo" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Tipo</option>
                    <option value="form-artesania-indigena">Artesanía indígena</option>
                    <option value="form-artesania-tradicional">Artesanía tradicional</option>
                    <option value="form-artesania-contemporanea">Artesanía contemporánea</option>
                </select>
                <select id="inputState" className="form-control" name="tipo" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Oficio</option>
                    <option value="form-joyeria">Joyería y bisutería</option>
                    <option value="form-tejeduria">Tejeduría y bordado</option>
                    <option value="form-cesteria">Cestería y sombrería</option>
                    <option value="form-ceramica">Cerámica y vidrio</option>
                    <option value="form-marroquinera">Marroquinería</option>
                    <option value="form-marqueteria">Marquetería</option>
                </select>
                <select id="inputState" className="form-control" name="tipo" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Región</option>
                    <option value="form-caribe">Caribe</option>
                    <option value="form-pacifica">Pacífica</option>
                    <option value="form-andina">Andina</option>
                    <option value="form-orinoquia">Orinoquía</option>
                    <option value="form-amazonia">Amazonía</option>
                </select>
                <button type="submit" className="btn">Filtrar</button>
            </div>
        </div>
  )
}

export default Filters