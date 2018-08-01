import React from 'react'

const Otsikko = props => {
    return (
        <h1>{props.nimi}</h1>
    )
}

const Sisalto = props => {
    const sisalto = props.osat.map((o) =>
        <Osa nimi={o.nimi} tehtavia={o.tehtavia} key={o.nimi} />
    )
    return (
        <div>
            {sisalto}
        </div>
    )
}

const Osa = props => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const Yhteensa = props => {
    const t = props.osat.map(osa => osa.tehtavia)
    const tulos = t.reduce((accumulator, currentValue) => accumulator + currentValue)
    return (
        <p>yhteensä {tulos} tehtävää </p>
    )
}


const Kurssi = ({kurssi}) => {
    return (
        <div>
            {Otsikko(kurssi)}
            {Sisalto(kurssi)}
            {Yhteensa(kurssi)}
        </div>
    )
}

export default Kurssi