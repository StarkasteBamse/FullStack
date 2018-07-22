import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = props => {
    return (
        <h1>{props.kurssi}</h1>
    )
}
const Sisalto = props => {
    const sisalto = props.osat.map((o) =>
        <Osa nimi={o.nimi} tehtavia={o.tehtavia} key={o.nimi}/>
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

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]
    return (
        <div>
            <div>
                <Otsikko kurssi={kurssi} />
                <Sisalto osat={osat} />
                <Yhteensa osat={osat} />
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)